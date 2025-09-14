import { env } from "./env.js";
import { Pool } from "pg";

export const pool = new Pool({
    connectionString: env.NEONDB_PGSQL_URL,
})

pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Error connecting to PostgreSQL:", err));