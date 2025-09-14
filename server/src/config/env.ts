import dotenv from "dotenv"
dotenv.config()

export const env = ({
    PORT: process.env.PORT || 3000,
    NEONDB_PGSQL_URL: process.env.NEONDB_PGSQL_URL,
    JWT_SECRET: process.env.JWT_SECRET
})