import mongoose from "mongoose";{}
export interface EventModelRawDocType {
    eventName: string;
    field: string;
    triggerType: string;
    triggerCategory: string;
    value?: string;
    from?: string;
    to?: string;
    relations: {
        resourceModel: mongoose.Types.ObjectId;
        interactionType: string;
    }[];
}

export type EventModelHydratedDocumentType = mongoose.HydratedDocument<EventModelRawDocType, {
    eventName: string;
    field: string;
    triggerType: string;
    triggerCategory: string;
    value?: string;
    from?: string;
    to?: string;
    relations: mongoose.Types.DocumentArray<{
        resourceModel: mongoose.Types.ObjectId;
        interactionType: string;
        quantity: number;
        lifespan: number;
        referenceModel: mongoose.Types.ObjectId
    }>;
}>;

type EventModelType = mongoose.Model<
    EventModelRawDocType,
    {},
    {},
    {},
    EventModelHydratedDocumentType
>;

export const eventModelSchema = new mongoose.Schema<
    EventModelRawDocType,
    EventModelType,
    {},
    {},
    {},
    {},
    mongoose.DefaultSchemaOptions,
    EventModelHydratedDocumentType,
    EventModelHydratedDocumentType
>(
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
        relations: [{
            resourceModel: {
                type: mongoose.Types.ObjectId,
                ref: "ResourceModel",
                required: true,
            },
            interactionType: {
                // CREATE, PROVIDE, CONSUME, USE, REFERENCE, REUSE
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true
            },
            lifespan: {
                type: Number,
                optional: true
            },
            referenceModel: {
                type: mongoose.Types.ObjectId,
                ref: "ResourceModel",
                required: false,
            }
        }],
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
            rule.eventName !== this.eventName ||
            rule.field !== this.field ||
            rule.triggerCategory !== this.triggerCategory ||
            rule.triggerType !== this.triggerType ||
            rule.value !== this.value ||
            rule.from !== this.from ||
            rule.to !== this.to ||
            rule.relations.length !== this.relations.length
        ) {
            return "UPDATED";
        }

        for (let i = 0; i < rule.relations.length; i++) {
            if (
                rule.relations[i].resourceModelId !== this.relations[i].resourceModel.toString() ||
                rule.relations[i].interactionType !== this.relations[i].interactionType ||
                rule.relations[i].quantity !== this.relations[i].quantity ||
                rule.relations[i].lifespan !== this.relations[i].lifespan ||
                rule.relations[i].referenceModelId !== this.relations[i].referenceModel?.toString()
            ) {
                return "UPDATED";
            }
        }
        return "ACTIVE";
    });
