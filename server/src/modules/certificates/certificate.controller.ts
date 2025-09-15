import type { Request, Response } from "express";
import { pool } from "../../config/db.js";

export const certificateController = {
    async uploadCertificate(req: Request, res: Response) {
        try {
            const { cert_name } = req.body;
            const userId = (req as any).userId;
            console.log(userId)

            if (!cert_name) {
                return res.status(400).json({
                    success: false,
                    message: "cert_name is required",
                });
            }

            if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "No files uploaded",
                });
            }

            // Map over files to get URLs
            const certUrls = (req.files as Express.Multer.File[]).map(file => file.path);

            // If you want to save all in DB
            const insertPromises = certUrls.map(cert_url =>
                pool.query(
                    `INSERT INTO institution_certificates (institution_id, cert_name, cert_url) VALUES ($1, $2, $3) RETURNING id, cert_name, cert_url`,
                    [userId, cert_name, cert_url]
                )
            );

            const results = await Promise.all(insertPromises);

            return res.status(201).json({
                success: true,
                message: "Certificates uploaded successfully",
                certificates: results.map(r => r.rows[0]),
            });

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Error uploading certificate",
                error: error.message,
            });
        }
    },
};