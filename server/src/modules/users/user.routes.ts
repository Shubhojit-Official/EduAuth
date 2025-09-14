import { Router } from "express";
import { userController } from "./user.controller.js";

const userRouter = Router()

userRouter.post("/signup", userController.signUp)
userRouter.post("/login", userController.logIn)

export default userRouter