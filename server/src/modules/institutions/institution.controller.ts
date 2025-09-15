import type { Request, Response } from "express";
import { institutionService } from "./institution.services.js";
import jwt from "jsonwebtoken"
import { env } from "../../config/env.js";
import bcrypt from "bcrypt"

export const instituteController = {
    async signUp(req: Request, res: Response) {
        try {
            const institution = await institutionService.createInstitution(req.body)

            const token = jwt.sign(
                {
                    institutionId: institution.id
                },
                env.INSTITUTION_JWT_SECRET as string
            )

            return res.status(201).json({
                message: "Institution created successfully",
                institution,
                token,
                success: true
            });
        } catch (err: any) {
            return res.status(409).json({
                message: "Institution already exists",
                code: 409,
                success: false,
                error: err.message
            })
        }
    },

    async logIn(req: Request, res: Response) {
        try {
            const { institutionName, password } = req.body
            const institution = await institutionService.findInstitutionByName(institutionName)

            if (!institution) {
                return res.status(401).json({
                    message: "Invalid username or password",
                    code: 401,
                    success: false
                })
            }

            const isMatched = await bcrypt.compare(password, institution.hashedpassword)
            if (!isMatched) {
                return res.status(401).json({
                    message: "Invalid username or password",
                    code: 401,
                    success: false
                })
            }

            const token = jwt.sign(
                {
                    institutionId: institution.id
                },
                env.INSTITUTION_JWT_SECRET as string
            )

            return res.status(200).json({
                success: true,
                message: "Login successful",
                institution,
                token
            })
        } catch (err: any) {
            return res.status(500).json({
                message: "Something went wrong!",
                code: 500,
                success: false,
                error: err.message
            })
        }
    }
}