import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` })

export const {
    PORT, NODE_ENV, DB_URI, SERVER_URL,
    JWT_SECRET, JWT_EXPIRES,
    ARCJET_ENV, ARCJET_API_KEY,
    QSTASH_TOKEN, QSTASH_URL,
} = process.env