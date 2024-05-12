import { auth } from '$lib/server/lucia';
import logger from '$lib/server/winston';
import { sql } from "@vercel/postgres";

async function resetDatabase() {
    logger.info("resetting database");
    await sql`
        DROP TABLE IF EXISTS user_key; 
        DROP TABLE IF EXISTS user_session;
        DROP TABLE IF EXISTS user_verify_requests;
        DROP TABLE IF EXISTS groups;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS beers;
        DROP TABLE IF EXISTS auth_user;

        CREATE TABLE IF NOT EXISTS auth_user (
            id TEXT NOT NULL PRIMARY KEY,
            name TEXT DEFAULT '',
            email TEXT UNIQUE NOT NULL,
            verified BOOLEAN NOT NULL,
            admin BOOLEAN NOT NULL,
            group_id TEXT NULL
        );

        CREATE TABLE IF NOT EXISTS groups (
            group_id TEXT NOT NULL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL DEFAULT '',
            owner_id TEXT NOT NULL REFERENCES auth_user(id)
        );

        CREATE TABLE IF NOT EXISTS user_key (
            id TEXT NOT NULL PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES auth_user(id),
            hashed_password TEXT
        );

        CREATE TABLE IF NOT EXISTS user_session (
            id TEXT NOT NULL PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES auth_user(id),
            active_expires BIGINT NOT NULL,
            idle_expires BIGINT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS user_verify_requests (
            key TEXT NOT NULL PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES auth_user(id)
        );

        CREATE TABLE IF NOT EXISTS beers (
            id TEXT NOT NULL PRIMARY KEY,
            user_id TEXT NOT NULL REFERENCES auth_user(id),
            name TEXT NOT NULL,
            style TEXT NOT NULL,
            abv TEXT NOT NULL,
            gravity TEXT NOT NULL,
            ibu TEXT NOT NULL,
            description TEXT NOT NULL,
            recipe TEXT NOT NULL DEFAULT '',
            untappd TEXT NOT NULL DEFAULT ''
        );
    `;

    // const email = "dude@example.com";
    // const user = await auth.createUser({
    //     key: {
    //         providerId: "username",
    //         providerUserId: email,
    //         password: "foobar",
    //     },
    //     attributes: {
    //         name: "",
    //         email: email,
    //         group_id: "",
    //         verified: true,
    //     } 
    // })
}

export const dev = {
    resetDatabase,
};
