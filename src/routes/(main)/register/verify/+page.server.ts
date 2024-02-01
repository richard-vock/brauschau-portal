import { auth } from '$lib/server/lucia';
// import logger from '$lib/server/winston';

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { sql } from "@vercel/postgres";

export const load: PageServerLoad = async ({ url, locals }) => {
    const session = await locals.auth.validate();
    if (session) throw redirect(302, '/');

    const key = url.searchParams.get("key");
    if (key != null) {
        const res = await sql`
        SELECT user_id FROM user_verify_requests WHERE key = ${key};
        `;
        if (res.rowCount === 0) {
            return {success: false, error: "Link ist ungültig oder abgelaufen"};
        }

        const user = res.rows[0]["user_id"];

        await sql`
        DELETE FROM user_verify_requests WHERE key = ${key};
        `;

        await auth.updateUserAttributes(
            user,
            {
                verified: true
            }
        );

        const session = await auth.createSession({
            userId: user,
            attributes: {}
        });
        locals.auth.setSession(session);

        throw redirect(302, '/');
    }
    return {};
};
