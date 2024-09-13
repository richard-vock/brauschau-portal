import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { sql } from "@vercel/postgres";

const getBeers = async () => {
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
            untappd
        FROM beers
        LEFT JOIN auth_user ON auth_user.id = beers.user_id
        LEFT JOIN groups ON auth_user.group_id = groups.group_id
        ORDER BY group_name, user_name, id;
    `;
    
    let sortedBeers = beers.rows;
    sortedBeers.sort((a, b) => {
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
            return '';
        }
        str = str.trim();
        str = str.replace(/%$/, '');
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
            stand: idx + 1
        };
    });
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
    const session = await locals.auth.validate();
    if (!session || !session.user.admin) {
        throw redirect(302, '/');
    }

    const beers = await getBeers();
    const escapeNewlines = (str) => {
        return str.replace(/\r\n/g, '\\n').replace(/[;]/g, '.');
    }
    const tuples = beers.map(beer => {
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
        ['Stand', 'Gruppe', 'Name', 'Bier', 'Stil', 'Alkohol', 'Stammwürze', 'Bitterkeit', 'Beschreibung'],
        ...tuples
    ].map(row => row.join(';')).join('\n');

    return new Response(
        csv,
        {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="bierliste.csv"'
            },
        }
    );

    // return {
    //     headers: {
    //         'Content-Type': 'text/csv',
    //         'Content-Disposition': 'attachment; filename="bierliste.csv"'
    //     },
    //     body: csv
    // };
}
