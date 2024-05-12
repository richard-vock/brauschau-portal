import { dev } from '$lib/server/dev';


export async function load({ locals }) {
    // await dev.resetDatabase();

    const full_session = await locals.auth.validate();
    let session = null;
    if (full_session) {
        session = {
            user: {
                name: full_session.user.name,
                email: full_session.user.email,
                admin: full_session.user.admin,
                verified: full_session.user.verified,
                group: full_session.user.group,
            },
        };
    }

    return {
        session,
    };
}
