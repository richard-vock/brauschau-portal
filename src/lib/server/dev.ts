import logger from '$lib/server/winston';
import { sql } from "@vercel/postgres";

async function resetDatabase() {
    logger.info("resetting database");
    await sql`
        -- DROP TABLE IF EXISTS user_key; 
        -- DROP TABLE IF EXISTS user_session;
        -- DROP TABLE IF EXISTS user_verify_requests;
        -- DROP TABLE IF EXISTS auth_user;

        CREATE TABLE IF NOT EXISTS auth_user (
            id TEXT NOT NULL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            verified BOOLEAN NOT NULL
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
    `;
}

export const dev = {
    resetDatabase,
};
