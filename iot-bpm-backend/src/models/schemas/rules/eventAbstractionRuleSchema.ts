import mongoose from "mongoose";

export const eventAbstractionRuleSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
        },
        scopeId: {
            type: String,
            required: true,
        },
        equipmentId: {
            type: String,
            required: true,
        },
        viewId: {
            type: String,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
        triggerCategory: {
            type: String,
            required: true,
        },
        triggerType: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
        },
        from: {
            type: Number,
        },
        to: {
            type: Number,
        },
        relations: [
            {
                resourceModelId: {
                    type: String,
                    required: true,
                },
                interactionType: {
                    type: String,
                    required: true,
                },
                qualifier: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);
