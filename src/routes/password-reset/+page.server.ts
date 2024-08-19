import { auth } from '$lib/server/lucia';
// import logger from '$lib/server/winston';

import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { sql } from "@vercel/postgres";

import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const load: PageServerLoad = async ({ url, locals }) => {
    const session = await locals.auth.validate();
    if (session) throw redirect(302, '/');

    const key = url.searchParams.get("key");
    const user = url.searchParams.get("user");
    if (key != null && user != null) {
        const res = await sql`
            SELECT user_id FROM password_reset_requests WHERE key = ${key} AND user_id = ${user};
        `;
        if (res.rowCount === 0) {
            return { success: false, msg: "Link ist ungültig oder abgelaufen" };
        }
        return { success: true, key, user };
    }
};

export const actions: Actions = {
    reset: async ({ request, locals }) => {
        const form = await request.formData();
        const email = form.get('email');

        let res = await sql`
            SELECT id FROM auth_user WHERE email = ${email};
        `;

        if (res.rowCount === 0) {
            return fail(400, { email, msg: "E-Mail-Adresse nicht gefunden. Hast du dich vielleicht vertippt oder eine andere Adresse benutzt? Im Notfall schreib uns an info@bonner-brauschau.de, dann gucken wir nach." });
        }

        const user = res.rows[0]["id"];
        let key = "testkey";
        do {
            key = crypto.randomBytes(16).toString('hex');
            res = await sql`
                INSERT INTO password_reset_requests (key, user_id)
                VALUES (${key}, ${user})
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
            subject: "Passwort zurücksetzen",
            text: `Um Dein Passwort für die Bonner Brauschau zurückzusetzen, klicke bitte auf folgenden Link: https://bonner-brauschau.de/password-reset?key=${key}&user=${user}`,
            html: `Um Dein Passwort für die Bonner Brauschau zurückzusetzen, klicke bitte auf folgenden Link: <a href="https://bonner-brauschau.de/password-reset?key=${key}&user=${user}">Zurücksetzen</a>`,
        });

        console.log(`[log] E-Mail sent: ${info.messageId}`);

        return { success: true, msg: "E-Mail wurde versendet"};
    },
    update: async ({ request, locals }) => {
        const form = await request.formData();
        const key = form.get('key');
        const user = form.get('user');
        const password = form.get('password');
        const password2 = form.get('password-repeat');

        if (password !== password2) {
            return fail(400, { key, user, success: false, msg: "Passwörter stimmen nicht überein" });
        }

        const res = await sql`
            SELECT user_id FROM password_reset_requests WHERE key = ${key} AND user_id = ${user};
        `;

        if (res.rowCount === 0) {
            return fail(400, { success: false, msg: "Link ist ungültig oder abgelaufen" });
        }

        const emailRes = await sql`
            SELECT email FROM auth_user WHERE id = ${user};
        `;
        const email = emailRes.rows[0]["email"];

        await auth.updateKeyPassword(
            "username",
            email,
            password
        );

        await sql`
            DELETE FROM password_reset_requests WHERE key = ${key};
        `;

        return { success: true, msg: "Passwort wurde geändert. Bitte versuche Dich erneut einzuloggen."};
    },
};
