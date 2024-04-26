import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    admin : {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password : {
        type: mongoose.Schema.Types.String,
        required: true,
    }
});

export const Admin = mongoose.model("Admin", adminSchema);