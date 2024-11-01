import mongoose from "mongoose";

export interface StatusModelRawDocType {
    statusName: string;
    field: string;
}

export interface StatusModelHydratedDocumentType {
    statusName: string;
    field: string;
}

export const statusModelSchema = new mongoose.Schema<StatusModelRawDocType>(
    {
        statusName: {
            type: String,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

statusModelSchema
    .virtual("ruleStatus", {
        ref: "EventEnrichmentRule",
        localField: "_id",
        foreignField: "_id",
        justOne: true,
    })
    .get(function (rule) {
        if (!rule) return "NOT_RELEASED";
        if (rule.field == this.field && rule.statusName == this.statusName) return "ACTIVE";
        return "UPDATED";
    });
