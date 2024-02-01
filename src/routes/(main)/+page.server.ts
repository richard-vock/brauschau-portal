import logger from '$lib/server/winston';
import { auth } from '$lib/server/lucia';
// import { sveltekit } from "lucia/middleware";
import { fail, redirect } from '@sveltejs/kit';


export const actions: Actions = {
    login: async ({ request, locals }) => {
        const form = await request.formData();
        const email = form.get('email');
        const password = form.get('password');

        try {
            const key = await auth.useKey(
                "username",
                email.toLowerCase(),
                password
            );
            const session = await auth.createSession({
                userId: key.userId,
                attributes: {}
            });
            locals.auth.setSession(session);
        } catch (error) {
            if (
                error instanceof LuciaError &&
                (error.message === "AUTH_INVALID_KEY_ID" ||
                 error.message === "AUTH_INVALID_PASSWORD")
            ) {
                logger.info(`Invalid login attempt with email: ${email}`);
                return fail(400, { form: { email, invalid: true } });
            }
            logger.error(error);
            return fail(400, { form: { email, unknown: true } });
        }

        throw redirect(302, '/');
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