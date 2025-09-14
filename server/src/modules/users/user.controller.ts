import type { Request, Response } from "express";
import { userService } from "./user.services.js";
import { env } from "../../config/env.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const userController = {
    async signUp(req: Request, res: Response) {
        try {
            //const { username, email, phoneNumber, institutionName, password } = req.body
            const user = await userService.createUser(req.body)
            const token = jwt.sign(
                {
                    userId: user.id
                },
                env.USER_JWT_SECRET as string,
                {
                    expiresIn: "30d"
                }
            )

            return res.status(201).json({
                message: "User created successfully",
                user: user,
                token,
                success: true
            });
        } catch (err: any) {
            return res.status(409).json({
                message: "User already exists",
                code: 409,
                success: false,
                error: err.message
            })
        }
    },

    async logIn(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user = await userService.findUserByEmail(email)
            if (!user) {
                return res.status(401).json({
                    message: "Invalid Email or Password",
                    code: 401,
                    success: false
                })
            }
            
            const isMatched = await bcrypt.compare(password, user.hashedpassword)
            if (!isMatched) {
                return res.status(401).json({
                    message: "Invalid Email or Password",
                    code: 401,
                    success: false
                })
            }

            const token = jwt.sign(
                {
                    userId: user.id
                },
                env.USER_JWT_SECRET as string,
                {
                    expiresIn: "30d"
                }
            );

            res.json({
                message: "Login successful",
                user,
                token,
                success: true,
            });
        } catch (err: any) {
            return res.status(500).json({
                message: "Something Went Wrong!",
                code: 500,
                error: err.message,
                success: false
            })
        }
    }
}