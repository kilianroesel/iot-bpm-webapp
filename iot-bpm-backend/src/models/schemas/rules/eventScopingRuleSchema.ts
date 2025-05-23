import mongoose from "mongoose";

export const eventScopingRuleSchema = new mongoose.Schema(
    {
        machineName: {
            type: String,
            required: true,
        },
        versionCsiStd: {
            type: String,
            required: true,
        },
        versionCsiSpecific: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
