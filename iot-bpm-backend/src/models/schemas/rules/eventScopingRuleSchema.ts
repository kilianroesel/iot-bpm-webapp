import mongoose from "mongoose";

export const eventScopingRuleSchema = new mongoose.Schema(
    {
        resourceModelName: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);
