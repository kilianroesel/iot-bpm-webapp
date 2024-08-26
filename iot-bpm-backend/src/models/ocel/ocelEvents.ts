import mongoose from "mongoose";
import { ocelAttributeSchema } from "./ocelAttribute";
import { ocelRelationshipSchema } from "./ocelRelationship";

const ocelEventSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    attributes: [ocelAttributeSchema],
    relationships: [ocelRelationshipSchema]
});

const OcelEventType = mongoose.model('User', ocelEventSchema);

export default OcelEventType;