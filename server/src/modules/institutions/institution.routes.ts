import { Router } from "express";
import { instituteController } from "./institution.controller.js";

const instituteRouter = Router()

instituteRouter.post("/signup", instituteController.signUp)
instituteRouter.post("/login", instituteController.logIn)

export default instituteRouter