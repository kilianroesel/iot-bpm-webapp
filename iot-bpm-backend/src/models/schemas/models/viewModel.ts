import mongoose from "mongoose";
import { eventModelSchema } from "./eventModelSchema";
import { statusModelSchema } from "./statusModelSchema";

export const viewModelSchema = new mongoose.Schema(
    {
        viewName: {
            type: String,
            required: true,
        },
        eventModels: [eventModelSchema],
        statusModels: [statusModelSchema],
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);