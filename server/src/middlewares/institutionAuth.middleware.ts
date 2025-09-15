import jwt from "jsonwebtoken"
import { env } from "../config/env.js"
import type { NextFunction, Request, Response } from "express"

export const instAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.token

    const decoded = jwt.verify(token as string, env.INSTITUTION_JWT_SECRET as string)

    if (decoded) {
        //@ts-ignore
        req.userId = decoded.institutionId;
        next()
    } else {
        res.status(401).json({
            message: "You are not signed in",
            code: 401
        })
    }
}