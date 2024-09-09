import mongoose from "mongoose";

export const eventAbstractionRuleSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    equipmentId: {
        type: String,
        required: true,
    },
    scopeId: {
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
        required: true,
    },
    from: {
        type: Number,
        required: true,
    },
    to: {
        type: Number,
        required: true,
    },
});
