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
            name: data.name,
            email: data.email,
            verified: data.verified,
            group: data.group_id,
        };
    },
    csrfProtection: process.env.NODE_ENV === 'production',
    debugMode: process.env.NODE_ENV !== 'production',
});


export type Auth = typeof auth;
