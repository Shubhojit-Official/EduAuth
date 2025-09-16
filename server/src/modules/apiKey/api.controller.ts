import type { Request, Response } from "express";
import crypto from "crypto"
import { pool } from "../../config/db.js";

export const apiKeyController = {
    async generateApiKey(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;

            function generateApiKey() {
                return crypto.randomBytes(12).toString('hex');
            }

            const newKey = generateApiKey()

            const query = `
            UPDATE institutions
            SET api_key = $1
            WHERE id = $2
            RETURNING api_key;
            `;

            const values = [newKey, userId]
            const result = await pool.query(query, values)

            return res.json({
                newKey
            })
        } catch (err: any) {
            return res.status(500).json({
                message: "Something went wrong",
                code: 500,
                success: false,
                error: err.message
            })
        }
    }
}
