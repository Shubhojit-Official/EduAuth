import dotenv from "dotenv"
dotenv.config()

export const env = ({
    PORT: process.env.PORT || 3000,
    NEONDB_PGSQL_URL: process.env.NEONDB_PGSQL_URL,
    USER_JWT_SECRET: process.env.USER_JWT_SECRET,
    INSTITUTION_JWT_SECRET: process.env.INSTITUTION_JWT_SECRET
})