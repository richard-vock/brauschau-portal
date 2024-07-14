import { auth } from '$lib/server/lucia';
import logger from '$lib/server/winston';

import crypto from 'crypto';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { sql } from "@vercel/postgres";

import nodemailer from 'nodemailer';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (session) throw redirect(302, '/');

    try {
        const count_res = await sql`
            SELECT COUNT(id) FROM auth_user;
        `;
        const user_count = parseInt(count_res.rows[0]["count"]);
        const threshold = import.meta.env.VITE_BREWER_CONTINGENT;
        if (user_count >= threshold) {
            return { success: false, limited: true };
        }
    } catch (error) {
        throw redirect(302, '/');
    }
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
                    admin: false,
                } 
            });

            let res = { rowCount: 0 };
            let key = "testkey";
            do {
                key = crypto.randomBytes(16).toString('hex');
                console.log(`[log] Generated key: ${key}`);
                logger.info(`Generated key: ${key}`);
                res = await sql`
                    INSERT INTO user_verify_requests (key, user_id)
                    VALUES (${key}, ${user.userId})
                    ON CONFLICT (key) DO NOTHING;
                `;
            } while (res.rowCount === 0);

            const transporter = nodemailer.createTransport({
                host: "smtp.fastmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: import.meta.env.VITE_EMAIL_USER,
                    pass: import.meta.env.VITE_EMAIL_PASSWORD,
                },
            });
            const info = await transporter.sendMail({
                from: '"Bonner Brauschau" <info@bonner-brauschau.de>',
                to: email,
                subject: "E-Mail-Adresse bestätigen",
                text: `Bitte bestätige deine E-Mail-Adresse, indem du auf folgenden Link klickst: https://bonner-brauschau.de/register/verify?key=${key}`,
                html: `Bitte bestätige deine E-Mail-Adresse, indem du auf folgenden Link klickst: <a href="https://bonner-brauschau.de/register/verify?key=${key}">E-Mail-Adresse bestätigen</a>`,
            });

            console.log(`[log] E-Mail sent: ${info.messageId}`);
            logger.info(`E-Mail sent: ${info.messageId}`);
        } catch (error) {
            if (error.code === '23505') {
                logger.info("E-Mail already exists", email);
                console.log("[log] E-Mail already exists", email);
                return fail(400, { email, exists: true });
            } else {
                logger.error(error);
                console.log(error);
                return fail(400, { email, unknown: true });
            }
        }

        throw redirect(302, '/register/verify?email=' + email);
    }
};
