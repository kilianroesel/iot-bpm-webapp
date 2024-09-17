import mongoose from "mongoose";

export const eventEnrichmentRuleSchema = new mongoose.Schema(
    {
        statusName: {
            type: String,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
        equipmentId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
