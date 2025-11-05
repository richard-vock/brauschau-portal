import { fail, redirect } from "@sveltejs/kit";
import { getBeers } from "$lib/server/beers";

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
  const session = await locals.auth.validate();
  if (!session || !session.user.admin) {
    throw redirect(302, "/");
  }

  const beers = await getBeers();
  const escapeNewlines = (str) => {
    return str.replace(/\r\n/g, "\\n").replace(/[;]/g, ".");
  };
  const tuples = beers.map((beer) => {
    return [
      beer.stand,
      beer.group_name,
      beer.user_name,
      beer.beer_name,
      beer.style,
      `${beer.abv}%`,
      beer.gravity,
      beer.ibu,
      escapeNewlines(beer.description),
    ];
  });
  const csv = [
    [
      "Stand",
      "Gruppe",
      "Name",
      "Bier",
      "Stil",
      "Alkohol",
      "Stammwürze",
      "Bitterkeit",
      "Beschreibung",
    ],
    ...tuples,
  ]
    .map((row) => row.join(";"))
    .join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="bierliste.csv"',
    },
  });

  // return {
  //     headers: {
  //         'Content-Type': 'text/csv',
  //         'Content-Disposition': 'attachment; filename="bierliste.csv"'
  //     },
  //     body: csv
  // };
}
