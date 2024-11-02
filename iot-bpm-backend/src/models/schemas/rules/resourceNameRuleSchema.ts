import mongoose from "mongoose";

export const resourceNameRuleSchema = new mongoose.Schema(
    {
        resourceModelName: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
