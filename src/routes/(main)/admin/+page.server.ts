import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { sql } from "@vercel/postgres";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session || !session.user.admin) {
        throw redirect(302, '/');
    }

    const users = await sql`
        SELECT id, auth_user.name, email, verified, groups.name AS group FROM auth_user LEFT JOIN groups ON auth_user.group_id = groups.group_id;
    `;

    let sorted = users.rows;
    sorted.sort((a, b) => {
        console.log(a);
        if (a.group === b.group) {
            return a.name.localeCompare(b.name);
        }
        return (a.group ?? "zzz").localeCompare(b.group ?? "zzz");
    });

    const total = {
        users: users.rows.length,
        external: users.rows.filter(user => user.group !== 'Bonner Heimbrauer e.V.').length,
    };

    return { users: sorted, total };
}

export const actions: Actions = {
    delete: async ({ request, locals }) => {
        const form = await request.formData();
        const id = form.get('userid');

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
    }
};
