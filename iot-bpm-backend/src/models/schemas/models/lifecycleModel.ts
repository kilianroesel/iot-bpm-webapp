import mongoose from "mongoose";
import { eventModelSchema } from "./eventModelSchema";
import { statusModelSchema } from "./statusModelSchema";

export const lifecycleModelSchema = new mongoose.Schema(
    {
        lifecycleName: {
            type: String,
            required: true,
        },
        eventModels: [eventModelSchema],
        statusModels: [statusModelSchema],
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);