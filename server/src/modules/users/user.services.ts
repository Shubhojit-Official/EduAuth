import type { User } from "./user.types.js";
import { pool } from "../../config/db.js";
import bcrypt from "bcrypt"

export const userService = {
    async createUser(data: User) {
        const { username, email, phoneNumber, institutionName, password } = data
        const hashedPassword = await bcrypt.hash(password, 10)

        const query = `
        INSERT INTO users (username, email, phoneNumber, institutionName, hashedPassword)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, email, phoneNumber, institutionName
        `;

        const values = [username, email, phoneNumber, institutionName, hashedPassword];
        const result = await pool.query(query, values);

        return result.rows[0]

    }
}