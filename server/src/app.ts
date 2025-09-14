import express from "express"
import cors from "cors"
import { errorHandler } from "./middlewares/error.middleware.js"
import userRouter from "./modules/users/user.routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/user", userRouter)

app.get("/test", (req, res) => {
    res.json({
        message: "successful"
    })
})

app.use(errorHandler)

export default app