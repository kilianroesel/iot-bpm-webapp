import mongoose from "mongoose";

export const ocelAttributeTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ["string", "time", "integer", "float", "boolean"]
    }
});
