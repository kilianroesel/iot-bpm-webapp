import mongoose from "mongoose";

export const eventModelSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
        triggerType: {
            type: String,
            required: true,
        },
        triggerCategory: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        },
        from: {
            type: Number,
        },
        to: {
            type: Number,
        },
        creates: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ObjectModel"
        }],
        consumes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ObjectModel"
        }]
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

eventModelSchema
    .virtual("ruleStatus", {
        ref: "EventAbstractionRule",
        localField: "_id",
        foreignField: "_id",
        justOne: true,
    })
    .get(function (rule) {
        if (!rule) return "NOT_RELEASED";
        if (
            rule.eventName == this.eventName &&
            rule.field == this.field &&
            rule.triggerCategory == this.triggerCategory &&
            rule.triggerType == this.triggerType &&
            rule.value == this.value &&
            rule.from == this.from &&
            rule.to == this.to
        ) {
            return "ACTIVE";
        }
        return "UPDATED";
    });
