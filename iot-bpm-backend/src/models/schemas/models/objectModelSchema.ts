import mongoose from "mongoose";
import { statusModelSchema } from "./statusModelSchema";

export const objectModelSchema = new mongoose.Schema(
    {
        objectType: {
            type: String,
            required: true,
        },
        statusModels: [statusModelSchema],
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

objectModelSchema
    .virtual("ruleStatus", {
        ref: "EventCorrelationRule",
        localField: "_id",
        foreignField: "_id",
        justOne: true,
    })
    .get(function (rule) {
        if (!rule)
            return "NOT_RELEASED";
        if (rule.objectType == this.objectType)
            return "ACTIVE";
        return "UPDATED"
    });
