import mongoose from "mongoose";
import { ocelAttributeSchema } from "./ocelAttribute";
import { ocelRelationshipSchema } from "./ocelRelationship";

const ocelEventSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    attributes: [ocelAttributeSchema],
    relationships: [ocelRelationshipSchema],
});

const OcelEvent = mongoose.model(
    "OcelEvent",
    ocelEventSchema,
    "ocel_events"
);

export default OcelEvent;
