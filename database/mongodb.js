import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js"

if (!DB_URI) {
    throw new Error("MongoDB Uri environment variable is not defined")
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI)
        console.log(`Connected to db in ${NODE_ENV} mode`)
    } catch (error) {
        console.error("Error connecting to db: ", error)
        process.exit(1)
    }
}

export default connectDB