import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        minLength: 5,
        match: [/\S+@\S+\.\S+/, "Enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 5
    },
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

export default User