import mongoose from "mongoose";

export const ruleSchema = new mongoose.Schema({
    control: {
        type: String,
        required: true
    }
}, { timestamps: true });