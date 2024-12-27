

import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: [25,"Name cannot  be greater then 25 chars"]
    },
    email: {type: String, unique: true, required: true, match: [/.*@.*\..*/, "Please enter a valid email"]},
    password: {
        type: String
    },
    type: {type: String, enum: ['Customer','Seller']}
})

