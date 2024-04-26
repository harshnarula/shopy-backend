import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { Cart } from "./cart.mjs";

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    contactNo: {
        type: mongoose.Schema.Types.Number,
        unique: true,
        required: true
    },
    carts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }],
  
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};



export const User = mongoose.model("User", userSchema);