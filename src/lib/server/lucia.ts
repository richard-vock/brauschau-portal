import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { pg } from "@lucia-auth/adapter-postgresql";
import { createPool } from '@vercel/postgres';

const pool = createPool()

export const auth = lucia({
    adapter: pg(pool, {
        user: "auth_user",
        key: "user_key",
        session: "user_session"
    }),
    middleware: sveltekit(),
    getUserAttributes: (data) => {
        return {
            email: data.email,
            verified: data.verified,
        };
    },
    csrfProtection: process.env.NODE_ENV === 'production',
    debugMode: true,
});


export type Auth = typeof auth;
