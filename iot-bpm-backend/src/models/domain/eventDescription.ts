import mongoose, { Schema } from 'mongoose';

// const triggerSchema = new mongoose.Schema({
//     triggerCategory: {
//         type: String,
//         required: true,
//         enum: ["SCALAR_TRIGGER", "RANGE_TRIGGER"]
//     }
// }, { discriminatorKey: "triggerCategory" });

const eventDescriptionSchema = new mongoose.Schema({
    name: {
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
        enum: ["SCALAR_TRIGGER", "RANGE_TRIGGER"]
    }
}, { discriminatorKey: "triggerCategory" });

const scalarTriggerSchema = new mongoose.Schema({
    triggerType: {
        type: String,
        required: true,
        enum: [
            "CHANGES_TO",
            "CHANGES_FROM",
            "INCREASES_BY",
            "DECREASES_BY",
            "ABSOLUTE_CHANGE_IS_EQUAL",
            "ABSOLUTE_CHANGE_IS_GREATER_EQUAL",
            "CHANGE_IS_GREATER_EQUAL",
        ],
    },
    value: {
        type: Number,
        required: true,
    },
});

const rangeTriggerSchema = new mongoose.Schema({
    triggerType: {
        type: String,
        required: true,
        enum: ["ENTERS_RANGE_FROM_TO", "LEAVES_RANGE_FROM_TO"],
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

eventDescriptionSchema.discriminator("SCALAR_TRIGGER", scalarTriggerSchema);
eventDescriptionSchema.discriminator("RANGE_TRIGGER", rangeTriggerSchema);

const EventDescription = mongoose.model("EventDescription", eventDescriptionSchema, "event_descriptions");

export default EventDescription;