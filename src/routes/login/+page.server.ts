import logger from '$lib/server/winston';
import { LuciaError } from "lucia";
import { auth } from '$lib/server/lucia';
// import { sveltekit } from "lucia/middleware";
import { fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const full_session = await locals.auth.validate();
    let session = null;
    if (full_session) {
        session = {
            user: {
                name: full_session.user.name,
                email: full_session.user.email,
            },
        };
    }

    return {
        session,
    };
}

export const actions: Actions = {
    login: async ({ request, locals }) => {
        const form = await request.formData();
        const email = form.get('email');
        const emailLower = email.toLowerCase();
        const password = form.get('password');

        try {
            const key = await auth.useKey(
                "username",
                emailLower,
                password
            );
            const session = await auth.createSession({
                userId: key.userId,
                attributes: {}
            });
            locals.auth.setSession(session);
        } catch (err) {
            if (
                err instanceof LuciaError &&
                (err.message === "AUTH_INVALID_KEY_ID" ||
                 err.message === "AUTH_INVALID_PASSWORD")
            ) {
                logger.info(`Invalid login attempt with email: ${email}`);
                return fail(400, { form: { email, invalid: true } });
            }
            logger.error(err);
            return fail(400, { form: { email, unknown: true } });
        }

        throw redirect(302, '/profil');
    },
    logout: async (event) => {
        const session = await event.locals.auth.validate();
        if (!session) return fail(401);

        if (session) {
            await auth.invalidateSession(session.sessionId);
            event.locals.auth.setSession(null);
        }
        throw redirect(302, '/');
    }
};
