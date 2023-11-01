import { dev } from '$lib/server/dev';


export async function load({ locals }) {
    await dev.resetDatabase();

    // const email = "dude@example.com";
    // const user = await auth.createUser({
    //     key: {
    //         providerId: "username",
    //         providerUserId: email,
    //         password: "foobar",
    //     },
    //     attributes: {
    //         email: email,
    //         verified: true,
    //     } 
    // })
    const full_session = await locals.auth.validate();
    let session = null;
    if (full_session) {
        session = {
            user: {
                email: full_session.user.email,
            },
        };
    }

    return {
        session,
    };
}
