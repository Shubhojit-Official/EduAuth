import app from "./app.js";
import { env } from "./config/env.js";
import "./config/db.js"

app.listen(env.PORT, () => {
    console.log(`Server is running on: http://localhost:${env.PORT}`)
})