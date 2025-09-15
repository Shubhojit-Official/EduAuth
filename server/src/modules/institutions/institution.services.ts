import type { Institution } from "./institution.types.js";
import { pool } from "../../config/db.js";
import bcrypt from "bcrypt"

export const institutionService = {
    async createInstitution(data: Institution) {
      const { institutionName, email, phoneNumber, address, password } = data
      const hashedPassword = await bcrypt.hash(password, 10)

      const query = `
      INSERT INTO institutions (institutionName, email, phoneNumber, address, hashedPassword)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, institutionName, email, phoneNumber, address 
      `;

      const values = [institutionName, email, phoneNumber, address, hashedPassword]
      const result = await pool.query(query, values)

      return result.rows[0]
    },

    async findInstitutionByName(institutionName: string) {
        const query = `
        SELECT id, institutionName, email, phoneNumber, address, hashedPassword
        FROM institutions
        WHERE institutionName = $1
        LIMIT 1
        `;

        const result = await pool.query(query, [institutionName])

        return result.rows[0] || null
    }
}