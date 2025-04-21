import { auth } from '$lib/server/lucia';
// import logger from '$lib/server/winston';

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { sql } from "@vercel/postgres";

import nodemailer from 'nodemailer';

export const load: PageServerLoad = async ({ url, locals }) => {
    const session = await locals.auth.validate();
    if (session) throw redirect(302, '/');

    const key = url.searchParams.get("key");
    if (key != null) {
        const res = await sql`
            SELECT user_id, invite FROM user_verify_requests WHERE key = ${key};
        `;
        if (res.rowCount === 0) {
            return {success: false, error: "Link ist ungültig oder abgelaufen"};
        }

        const user = res.rows[0]["user_id"];
        const invite = res.rows[0]["invite"];

        await sql`
            DELETE FROM user_verify_requests WHERE key = ${key};
        `;

        console.log(`Verifying user ${user} with invite ${invite}`);

        if (invite) {
            await sql`
                DELETE FROM invites WHERE key = ${invite};
            `;
        }

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
            from: '"Bonner Brauschau" <aussteller@bonner-brauschau.de>',
            to: session.user.email,
            subject: "Anmeldebestätigung zur Bonner Brauschau 2025",
            text: `Liebe/r Brauer/in,

wir freuen uns sehr über deine Anmeldung zur Teilnahme an der sechsten Bonner Brauschau. Hier hast du die Möglichkeit deine Bierkreationen mit uns und der Öffentlichkeit zu teilen.

Veranstaltung: 6. Bonner Brauschau
Datum: 08. November 2025
Ort: Gustav Stresemann Institut (GSI), Langer Grabenweg 68, 53175 Bonn

In den kommenden Wochen und Monaten erhältst du weitere Informationen zur Veranstaltung, einschließlich des genauen Ablaufs und weiterer organisatorischer Hinweise.

Für externe Aussteller schnüren wir wieder ein attraktives Übernachtungspaket im GSI zusammen. Auch hierzu melden wir uns nochmal separat.

Falls du Fragen hast oder weitere Informationen benötigst, kontaktier uns gerne unter aussteller@bonner-brauschau.de.

Mit freundlichen Grüßen,

David Melching
Organisationsteam Aussteller der Bonner Brauschau
Bonner Heimbrauer e.V.
            `,
            html: `Liebe/r Brauer/in,<br /><br />\n\n

wir freuen uns sehr über deine Anmeldung zur Teilnahme an der sechsten Bonner Brauschau. Hier hast du die Möglichkeit deine Bierkreationen mit uns und der Öffentlichkeit zu teilen.<br /><br />\n\n

Veranstaltung: 6. Bonner Brauschau<br />\n
Datum: 08. November 2025<br />\n
Ort: Gustav Stresemann Institut (GSI), Langer Grabenweg 68, 53175 Bonn<br />\n\n

In den kommenden Wochen und Monaten erhältst du weitere Informationen zur Veranstaltung, einschließlich des genauen Ablaufs und weiterer organisatorischer Hinweise.<br /><br />\n\n

Für externe Aussteller schnüren wir wieder ein attraktives Übernachtungspaket im GSI zusammen. Auch hierzu melden wir uns nochmal separat.<br /><br />\n\n

Falls du Fragen hast oder weitere Informationen benötigst, kontaktier uns gerne unter <a href="mailto:aussteller@bonner-brauschau.de">aussteller@bonner-brauschau.de</a>.<br /><br />\n\n

Mit freundlichen Grüßen,<br /><br />\n\n

David Melching<br />\n
Organisationsteam Aussteller der Bonner Brauschau<br />\n
Bonner Heimbrauer e.V.
            `,
        });

        throw redirect(302, '/profil');
    }

    const email = url.searchParams.get("email");
    return {email};
};
