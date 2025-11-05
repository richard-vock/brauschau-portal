import { redirect } from "@sveltejs/kit";
import { sql } from "@vercel/postgres";

import { getBeers, getNumBeersPerUser } from "$lib/server/beers";

import { init, id } from "@instantdb/admin";
import { VITE_INSTANT_APP_ADMIN_TOKEN } from "$env/static/private";
import type { Actions, PageServerLoad } from "./$types";

const APP_ID = "d25c25b4-b02e-4c42-8364-1272953154f0";
const ADMIN_TOKEN = VITE_INSTANT_APP_ADMIN_TOKEN;

let instantDb: ReturnType<typeof init> | null = null;

const getInstantDb = () => {
  if (!ADMIN_TOKEN) {
    throw new Error("INSTANT_APP_ADMIN_TOKEN is not configured");
  }
  if (!instantDb) {
    instantDb = init({ appId: APP_ID, adminToken: ADMIN_TOKEN });
  }
  return instantDb;
};

const getInviteCodes = async () => {
  const invites = await sql`
        SELECT key
        FROM invites
        ORDER BY key;
    `;
  return invites.rows.map((invite) => invite.key);
};

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session || !session.user.admin) {
    throw redirect(302, "/");
  }

  const users = await sql`
        SELECT id, auth_user.name, email, verified, groups.name AS group, brewer_places.place
        FROM auth_user
        LEFT JOIN groups ON auth_user.group_id = groups.group_id
        LEFT JOIN brewer_places ON auth_user.id = brewer_places.user_id;
    `;

  let sorted = users.rows;
  sorted.sort((a, b) => {
    if (a.group === b.group) {
      return a.name.localeCompare(b.name);
    }
    return (a.group ?? "zzz").localeCompare(b.group ?? "zzz");
  });

  const total = {
    users: users.rows.length,
    external: users.rows.filter(
      (user) => user.group !== "Bonner Heimbrauer e.V.",
    ).length,
  };

  const beers = await getBeers();
  const beerCounts = await getNumBeersPerUser();
  const beerTotal = beerCounts.reduce(
    (acc, cur) => acc + parseInt(cur.count),
    0,
  );

  const invites = await getInviteCodes();

  return { users: sorted, beers, beerCounts, beerTotal, total, invites };
};

export const actions: Actions = {
  delete: async ({ request, locals }) => {
    const form = await request.formData();
    const id = form.get("userid");

    await sql`
            DELETE FROM beers WHERE user_id = ${id}
        `;
    await sql`
            DELETE FROM user_verify_requests WHERE user_id = ${id}
        `;
    await sql`
            DELETE FROM user_session WHERE user_id = ${id}
        `;
    await sql`
            DELETE FROM user_key WHERE user_id = ${id}
        `;
    await sql`
            DELETE FROM groups WHERE owner_id = ${id}
        `;
    await sql`
            DELETE FROM auth_user WHERE id = ${id}
        `;
  },
  assign: async ({ request }) => {
    const form = await request.formData();
    const id = form.get("userid");
    const stand = form.get("stand");

    await sql`
            INSERT INTO brewer_places (user_id, place) VALUES (${id}, ${stand})
            ON CONFLICT (user_id) DO UPDATE SET place = ${stand}
        `;
  },
  instantdb: async () => {
    const db = getInstantDb();
    const beers = await getBeers();
    const groupIds = new Map<string, string>();

    const data = await db.query({ beers: {}, groups: {} });
    const { beers: dbBeers, groups: dbGroups } = data;

    db.transact(dbBeers.map((b) => db.tx.goals[b.id].delete()));
    db.transact(dbGroups.map((g) => db.tx.goals[g.id].delete()));

    for (const beer of beers) {
      const oldGroupId = beer.group_id ?? "";

      let groupId: string | undefined = undefined;
      if (oldGroupId !== "") {
        groupId = groupIds.get(oldGroupId) ?? undefined;
        if (groupId === undefined) {
          groupId = id();
          await db.transact([
            db.tx.groups[groupId].update({
              description: beer.group_desc ?? "",
              name: beer.group_name,
              original_id: oldGroupId,
            }),
          ]);
          groupIds.set(oldGroupId, groupId!);
          console.log(`created new group ${groupId}`);
        }
      }

      const beerId = id();
      await db.transact([
        db.tx.beers[beerId].update({
          abv: beer.abv ?? "",
          description: beer.description ?? "",
          gravity: beer.gravity ?? "",
          ibu: beer.ibu ?? "",
          name: beer.beer_name ?? "",
          place: beer.stand ?? "",
          style: beer.style ?? "",
          recipe: beer.recipe ?? "",
          untappd: beer.untappd ?? "",
          user: beer.user_name ?? "",
        }),
      ]);

      if (groupId) {
        console.log(`Linking beer ${beerId} to group ${groupId}`);
        await db.transact([db.tx.beers[beerId].link({ groups: groupId })]);
      }
    }
  },
};
