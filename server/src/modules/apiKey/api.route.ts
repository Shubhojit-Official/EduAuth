import { Router } from "express";
import { apiKeyController } from "./api.controller.js";
import { instAuthMiddleware } from "../../middlewares/institutionAuth.middleware.js";

const apiKeyRouter = Router()

apiKeyRouter.post("/generate", instAuthMiddleware ,apiKeyController.generateApiKey)

export default apiKeyRouter