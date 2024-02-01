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
