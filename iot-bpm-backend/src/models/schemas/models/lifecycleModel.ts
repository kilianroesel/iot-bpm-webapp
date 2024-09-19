import mongoose from "mongoose";
import { eventModelSchema } from "./eventModelSchema";

export const lifecycleModelSchema = new mongoose.Schema(
    {
        lifecycleName: {
            type: String,
            required: true,
        },
        eventModels: [eventModelSchema],
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);