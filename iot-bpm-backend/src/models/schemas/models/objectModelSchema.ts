import mongoose from "mongoose";
import { statusModelSchema } from "./statusModelSchema";

export const objectModelSchema = new mongoose.Schema(
    {
        equipmentId: {
            type: String,
            required: true,
        },
        objectType: {
            type: String,
            required: true,
        },
        statusModels: [statusModelSchema],
        consumable: {
            type: Boolean,
            default: false,
        },
        singleton: {
            type: Boolean,
            default: false,
        }
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
