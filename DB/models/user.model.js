import { Schema, model } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['female', 'male'],
        default: 'male'
    },
    age: Number,

    phone: String,
    isDeleted: { type: Boolean, default: false },

}, { timestamps: true })


const User = model('User', userSchema)

export default User
