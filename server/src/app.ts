import express from "express"
import cors from "cors"
import userRouter from "./modules/users/user.routes.js"
import instituteRouter from "./modules/institutions/institution.routes.js"
import certificateRouter from "./modules/certificates/certificate.routes.js"
import apiKeyRouter from "./modules/apiKey/api.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/institution", instituteRouter)
app.use("/api/v1/certificate", certificateRouter)
app.use("/api/v1/key", apiKeyRouter)

app.get("/test", (req, res) => {
    res.json({
        message: "successful"
    })
})

export default app