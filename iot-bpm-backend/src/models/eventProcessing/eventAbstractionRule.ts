import mongoose from "mongoose";

const eventAbstractionRuleSchema = new mongoose.Schema({
    ruleId: {
        type: String,
        required: true,
        unique: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    field: {
        type: String,
        required: true,
    },
});

const EventAbstractionRule = mongoose.model(
    "EventAbstractionRule",
    eventAbstractionRuleSchema,
    "event_abstraction_rules"
);

export default EventAbstractionRule;
