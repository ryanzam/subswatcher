import express from "express"

import { PORT } from './config/env.js'

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import subsRouter from "./routes/subs.route.js";
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subs", subsRouter)

app.use(errorMiddleware)

app.get("/", (req, res) => {
    res.send("This is Sub Watcher API!")
})

app.listen(PORT, async () => {
    console.log(`API running on http://localhost:${PORT}`)

    await connectDB()

})

export default app