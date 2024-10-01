import mongoose from "mongoose";
import { IResourceModel } from "./resourceModelSchema";

export interface IEventModel {
    eventName: string;
    field: string;
    triggerType: string;
    triggerCategory: string;
    value?: string;
    from?: string;
    to?: string;
    relations: {
        resourceModel: IResourceModel,
        resourceInteractionType: string;
        qualifier: string;
    }[]
}

export const eventModelSchema = new mongoose.Schema<IEventModel>(
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
        },
        from: {
            type: Number,
        },
        to: {
            type: Number,
        },
        relations: [
            {
                resourceModel: {
                    type: mongoose.Types.ObjectId,
                    ref: "ResourceModel",
                    required: true,
                },
                resourceInteractionType: {
                    // create, consume
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
