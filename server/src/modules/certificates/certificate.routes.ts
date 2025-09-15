import { Router } from "express";
import { certificateController } from "./certificate.controller.js";
import { instAuthMiddleware } from "../../middlewares/institutionAuth.middleware.js";
import { upload } from "../../utils/multer.js";

const certificateRouter = Router()

certificateRouter.post("/upload", instAuthMiddleware, upload.array("certificates", 30) ,certificateController.uploadCertificate)

export default certificateRouter