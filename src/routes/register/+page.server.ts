import { auth } from '$lib/server/lucia';
import logger from '$lib/server/winston';

import crypto from 'crypto';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { sql } from "@vercel/postgres";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (session) throw redirect(302, '/');
    return {};
};

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await request.formData();
        const email = form.get('email');
        const password = form.get('password');
        const password2 = form.get('password-repeat');

        if (password !== password2) {
            logger.info("Passwords do not match");
            return fail(400, { email, mismatch: true });
        }

        try {
            const user = await auth.createUser({
                key: {
                    providerId: "username",
                    providerUserId: email,
                    password: password,
                },
                attributes: {
                    name: "",
                    email: email,
                    verified: false,
                } 
            });

            let res = { rowCount: 0 };
            do {
                const key = crypto.randomBytes(16).toString('hex');
                logger.info(`Generated key: ${key}`);
                res = await sql`
                    INSERT INTO user_verify_requests (key, user_id)
                    VALUES (${key}, ${user.userId})
                    ON CONFLICT (key) DO NOTHING;
                `;
            } while (res.rowCount === 0);
        } catch (error) {
            if (error.code === '23505') {
                logger.info("E-Mail already exists", email);
                return fail(400, { email, exists: true });
            } else {
                logger.error(error);
                return fail(400, { email, unknown: true });
            }
        }

        throw redirect(302, '/register/verify');
    }
};
