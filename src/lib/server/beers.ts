import { sql } from "@vercel/postgres";

export const getBeers = async () => {
  const beers = await sql`
        SELECT
            beers.id as id,
            groups.name AS group_name,
            auth_user.name AS user_name,
            beers.name as beer_name,
            style,
            abv,
            gravity,
            ibu,
            beers.description as description,
            recipe,
            untappd,
            brewer_places.place
        FROM beers
        LEFT JOIN auth_user ON auth_user.id = beers.user_id
        LEFT JOIN groups ON auth_user.group_id = groups.group_id
        LEFT JOIN brewer_places ON auth_user.id = brewer_places.user_id
        ORDER BY group_name, user_name, id;
    `;

  let sortedBeers = beers.rows;
  sortedBeers.sort((a, b) => {
    const firstPlaceA = parseInt(("" + (a.place ?? 999)).split("-")[0]);
    const firstPlaceB = parseInt(("" + (b.place ?? 999)).split("-")[0]);
    if (firstPlaceA !== firstPlaceB) {
      return firstPlaceA - firstPlaceB;
    }
    if (a.group_name === b.group_name) {
      if (a.user_name === b.user_name) {
        return a.beer_name.localeCompare(b.beer_name);
      }
      return (a.user_name ?? "zzz").localeCompare(b.user_name ?? "zzz");
    }
    return (a.group_name ?? "zzz").localeCompare(b.group_name ?? "zzz");
  });

  const sanitize = (str) => {
    if (!str) {
      return "";
    }
    str = str.trim();
    str = str.replace(/%$/, "");
    return str;
  };

  return sortedBeers.map((beer, idx) => {
    return {
      group_name: sanitize(beer.group_name),
      user_name: sanitize(beer.user_name),
      beer_name: sanitize(beer.beer_name),
      style: sanitize(beer.style),
      abv: sanitize(beer.abv),
      gravity: sanitize(beer.gravity),
      ibu: sanitize(beer.ibu),
      description: sanitize(beer.description),
      recipe: sanitize(beer.recipe),
      untappd: sanitize(beer.untappd),
      stand: beer.place,
    };
  });
};

export const getNumBeersPerUser = async () => {
  const beers = await sql`
        SELECT auth_user.name as brewer, email, count(beers.id)
        FROM auth_user
        LEFT JOIN beers on auth_user.id = beers.user_id
        GROUP BY (auth_user.name, email)
        ORDER BY count DESC, auth_user.name;
    `;

  return beers.rows;
};
