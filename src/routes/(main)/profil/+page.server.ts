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
    return {
        user: {
            name: session.user.name,
            group: session.user.group,
            email: session.user.email,
        },
        form: {
            groupname: group_name,
            groupdesc: group_desc,
        }
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
            return fail(400, { code, empty: true });
        }
        if (code.length !== 12) {
            return fail(400, { code, invalid: true });
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
};
