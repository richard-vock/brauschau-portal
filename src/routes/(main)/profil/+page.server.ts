import { auth } from '$lib/server/lucia';
import logger from '$lib/server/winston';

import crypto from 'crypto';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { sql } from "@vercel/postgres";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, '/');

    const res = await sql`
        SELECT name, description FROM groups WHERE group_id = ${session.user.group} LIMIT 1;
    `;
    let group = null;
    let group_name = null;
    let group_desc = null;
    if (res.rowCount !== 0) {
        group = session.user.group;
        group_name = res.rows[0]["name"];
        group_desc = res.rows[0]["description"];
    }

    const beers = await sql`
        SELECT * FROM beers WHERE user_id = ${session.user.userId};
    `;

    return {
        user: {
            name: session.user.name,
            group: session.user.group,
            email: session.user.email,
        },
        form: {
            groupname: group_name,
            groupdesc: group_desc,
        },
        beers: beers.rows,
    };
};

export const actions: Actions = {
    save_name: async ({ locals, request }) => {
        const session = await locals.auth.validate();
        if (!session) throw redirect(302, '/');

        const form = await request.formData();
        const name = form.get('name');
        await auth.updateUserAttributes(
            session.user.userId,
            { name }
        );
    },
    join_group: async ({ locals, request }) => {
        const session = await locals.auth.validate();
        if (!session) throw redirect(302, '/');

        const form = await request.formData();
        const code = form.get('code');

        if (code.length === 0) {
            return fail(400, { code, success: false, msg: "Code darf nicht leer sein." });
        }
        if (code.length !== 12) {
            return fail(400, { code, success: false, msg: "Ungültiger Code." });
        }

        const res = await sql`
            UPDATE auth_user SET group_id = ${code} WHERE id = ${session.user.userId};
        `;
    },
    create_group: async ({ locals, request }) => {
        const session = await locals.auth.validate();
        if (!session) throw redirect(302, '/');

        const form = await request.formData();
        const groupname = form.get('groupname');
        const groupdesc = form.get('groupdesc');

        if (groupname.length === 0) {
            return fail(400, { groupname, groupdesc, empty: true });
        }

        let res = { rowCount: 0 };
        let key = '';
        do {
            key = crypto.randomBytes(6).toString('hex');
            logger.info(`Generated key: ${key}`);
            res = await sql`
                INSERT INTO groups (group_id, name, description, owner_id)
                VALUES (${key}, ${groupname}, ${groupdesc}, ${session.user.userId})
                ON CONFLICT (group_id) DO NOTHING;
            `;
        } while (res.rowCount === 0);

        await sql`
            UPDATE auth_user SET group_id = ${key} WHERE id = ${session.user.userId};
        `;

    },
    leave_group: async ({ locals, request }) => {
        const session = await locals.auth.validate();
        if (!session) throw redirect(302, '/');

        await sql`
            UPDATE auth_user SET group_id = NULL WHERE id = ${session.user.userId};
        `;
    },
    create_beer: async ({ locals, request }) => {
        const session = await locals.auth.validate();
        if (!session) throw redirect(302, '/');

        const form = await request.formData();
        const formData = {
            beername: form.get('beername'),
            beerstyle: form.get('beerstyle'),
            beerabv: form.get('beerabv'),
            beergravity: form.get('beergravity'),
            beeribu: form.get('beeribu'),
            beerdesc: form.get('beerdesc'),
            beerrecipe: form.get('beerrecipe'),
            beeruntappd: form.get('beeruntappd'),
        };
        if (formData.beername.length === 0) {
            return fail(400, { ...formData, success: false, msg: "Name darf nicht leer sein." });
        }
        if (formData.beername.length > 70) {
            return fail(400, { ...formData, success: false, msg: "Name darf nicht länger als 70 Zeichen sein." });
        }
        if (formData.beerstyle.length === 0) {
            return fail(400, { ...formData, success: false, msg: "Bierstil darf nicht leer sein." });
        }
        if (formData.beerabv.length === 0) {
            return fail(400, { ...formData, success: false, msg: "ABV darf nicht leer sein." });
        }
        if (formData.beergravity.length === 0) {
            return fail(400, { ...formData, success: false, msg: "Stammwürze darf nicht leer sein." });
        }
        if ((formData.beerdesc?.length ?? 0) > 500) {
            return fail(400, { ...formData, success: false, msg: "Beschreibung darf nicht länger als 500 Zeichen sein." });
        }
        const beer = {
            "userid": session.user.userId,
            "name": form.get('beername'),
            "style": form.get('beerstyle'),
            "abv": form.get('beerabv'),
            "gravity": form.get('beergravity'),
            "ibu": form.get('beeribu'),
            "description": form.get('beerdesc'),
            "recipe": form.get('beerrecipe'),
            "untappd": form.get('beeruntappd'),
        };
        const res = await sql`
            INSERT INTO beers (user_id, name, style, abv, gravity, ibu, description, recipe, untappd)
            VALUES (${beer.userid}, ${beer.name}, ${beer.style}, ${beer.abv}, ${beer.gravity}, ${beer.ibu}, ${beer.description}, ${beer.recipe}, ${beer.untappd})
        `;

        if (res.rowCount === 0) {
            console.log("error", "create");
            console.log(res);
            return fail(500, { ...formData, success: false, msg: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut." });
        } else {
            return { success: true };
        }
    },
    edit_beer: async ({ locals, request }) => {
        const session = await locals.auth.validate();
        if (!session) throw redirect(302, '/');

        const form = await request.formData();
        const formData = {
            beername: form.get('beername'),
            beerstyle: form.get('beerstyle'),
            beerabv: form.get('beerabv'),
            beergravity: form.get('beergravity'),
            beeribu: form.get('beeribu'),
            beerdesc: form.get('beerdesc'),
            beerrecipe: form.get('beerrecipe'),
            beeruntappd: form.get('beeruntappd'),
        };
        if (formData.beername.length === 0) {
            return fail(400, { ...formData, success: false, msg: "Name darf nicht leer sein." });
        }
        if (formData.beername.length > 70) {
            return fail(400, { ...formData, success: false, msg: "Name darf nicht länger als 70 Zeichen sein." });
        }
        if (formData.beerstyle.length === 0) {
            return fail(400, { ...formData, success: false, msg: "Bierstil darf nicht leer sein." });
        }
        if (formData.beerabv.length === 0) {
            return fail(400, { ...formData, success: false, msg: "ABV darf nicht leer sein." });
        }
        if (formData.beergravity.length === 0) {
            return fail(400, { ...formData, success: false, msg: "Stammwürze darf nicht leer sein." });
        }
        if ((formData.beerdesc?.length ?? 0) > 500) {
            return fail(400, { ...formData, success: false, msg: "Beschreibung darf nicht länger als 500 Zeichen sein." });
        }
        const beer = {
            "userid": session.user.userId,
            "name": form.get('beername'),
            "style": form.get('beerstyle'),
            "abv": form.get('beerabv'),
            "gravity": form.get('beergravity'),
            "ibu": form.get('beeribu'),
            "description": form.get('beerdesc'),
            "recipe": form.get('beerrecipe'),
            "untappd": form.get('beeruntappd'),
        };
        const res = await sql`
            UPDATE beers SET
                name = ${beer.name},
                style = ${beer.style},
                abv = ${beer.abv},
                gravity = ${beer.gravity},
                ibu = ${beer.ibu},
                description = ${beer.description},
                recipe = ${beer.recipe},
                untappd = ${beer.untappd}
            WHERE id = ${form.get('beer_id')} AND user_id = ${session.user.userId};
        `;

        if (res.rowCount === 0) {
            console.log("error", "edit");
            console.log(res);
            return fail(500, { ...formData, success: false, msg: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut." });
        } else {
            return { success: true };
        }
    },
    delete_beer: async ({ locals, request }) => {
        const session = await locals.auth.validate();
        if (!session) throw redirect(302, '/');

        const form = await request.formData();
        const beer_id = form.get('beer_id');
        const res = await sql`
            DELETE FROM beers WHERE id = ${beer_id} AND user_id = ${session.user.userId};
        `;
    }
};
