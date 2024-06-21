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
            to: session.user.email,
            subject: "Anmeldebestätigung zur Bonner Brauschau 2024",
            text: `Liebe/r Brauer/in,

wir freuen uns sehr über deine Anmeldung zur Teilnahme an der fünften Bonner Brauschau. Hier hast du die Möglichkeit deine Bierkreationen mit uns und der Öffentlichkeit zu teilen.

Veranstaltung: 5. Bonner Brauschau
Datum: 28. September 2024
Ort: GSI

In den kommenden Wochen und Monaten erhältst du weitere Informationen zur Veranstaltung, einschließlich des genauen Ablaufs und weiterer organisatorischer Hinweise.

Solltest Du als Aussteller im GSI selber übernachten wollen gibt es für 2024 Sonderpreise:

Einzelzimmer inkl. Frühstück: 72€
Doppelzimmer inkl. Frühstück: 96€

Dafür musst Du direkt über die E-Mailadresse der Reservierungsabteilung des GSI

    info@gsi-bonn.de

buchen und das Stichwort

    Crew-Heimbrauer 2024

angeben.

Falls du Fragen hast oder weitere Informationen benötigst, kontaktier uns gerne unter info@bonner-brauschau.de.

Mit freundlichen Grüßen,

David Melching
Organisationsteam Aussteller der Bonner Brauschau
Bonner Heimbrauer e.V.
            `,
            html: `Liebe/r Brauer/in,<br /><br />\n\n

wir freuen uns sehr über deine Anmeldung zur Teilnahme an der fünften Bonner Brauschau. Hier hast du die Möglichkeit deine Bierkreationen mit uns und der Öffentlichkeit zu teilen.<br /><br />\n\n

Veranstaltung: 5. Bonner Brauschau<br />\n
Datum: 28. September 2024<br />\n
Ort: GSI<br /><br />\n\n

In den kommenden Wochen und Monaten erhältst du weitere Informationen zur Veranstaltung, einschließlich des genauen Ablaufs und weiterer organisatorischer Hinweise.<br /><br />\n\n

Solltest Du als Aussteller im GSI selber übernachten wollen gibt es für 2024 Sonderpreise:<br /><br />\n\n

Einzelzimmer inkl. Frühstück: 72€<br />\n
Doppelzimmer inkl. Frühstück: 96€<br /><br />\n\n

Dafür musst Du direkt über die E-Mailadresse der Reservierungsabteilung des GSI<br /><br />\n\n

    info@gsi-bonn.de<br /><br />\n\n

buchen und das Stichwort<br /><br />\n\n

    Crew-Heimbrauer 2024<br /><br />\n\n

angeben.<br /><br />\n\n

Falls du Fragen hast oder weitere Informationen benötigst, kontaktier uns gerne unter <a href="mailto:info@bonner-brauschau.de">info@bonner-brauschau.de</a>.<br /><br />\n\n

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
