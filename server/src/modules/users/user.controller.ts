import type { Request, Response } from "express";
import { userService } from "./user.services.js";
import { env } from "../../config/env.js";
import jwt from "jsonwebtoken"

export const userController = {
    async signUp(req: Request, res: Response) {
        try {
            //const { username, email, phoneNumber, institutionName, password } = req.body
            const user = await userService.createUser(req.body)
            const token = jwt.sign(
                {
                    userId: user.id
                }, 
                //@ts-ignore
                env.USER_JWT_SECRET,
                {
                    expiresIn: "30d"
                }
            )

            res.status(201).json({
                message: "User created successfully",
                user: user,
                token,
                success: true
            });
        } catch (err) {
            return res.status(409).json({
                message: "User already exists",
                code: 409,
                success: false,
                //@ts-ignore
                error: err.message
            })
        }
    },

    async logIn(req: Request, res: Response) {

    }
}