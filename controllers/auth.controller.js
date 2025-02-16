import mongoose from "mongoose"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { JWT_EXPIRES, JWT_SECRET } from "../config/env.js"

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { username, email, password } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            const error = new Error("User already exists")
            error.statusCode = 409
            throw error
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        const newUser = await User.create([{ username, email, password: hashedPass }], { session })

        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES })

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: "User created.",
            data: {
                token, user: newUser[0]
            }
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        next(error)
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)

        if (!isCorrectPassword) {
            const error = new Error("Incorrect password")
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES })

        res.status(200).json({
            success: true,
            message: "User signed in successfully.",
            data: {
                token, user
            }
        })

    } catch (error) {
        next(error)
    }
}

export const signOut = (req, res, next) => {

}