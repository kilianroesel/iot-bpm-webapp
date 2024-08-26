import mongoose from "mongoose";

export const ocelAttributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true
    }
});
