import mongoose from "mongoose";
import { ocelAttributeTypeSchema } from "./ocelAttributeType";

const ocelEventTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    attributes: [ocelAttributeTypeSchema],
});

const OcelEventType = mongoose.model(
    "OcelEventType",
    ocelEventTypeSchema,
    "ocel_event_types"
);

export default OcelEventType;
