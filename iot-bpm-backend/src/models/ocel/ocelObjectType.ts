import mongoose from "mongoose";
import { ocelAttributeTypeSchema } from "./ocelAttributeType";

const ocelObjectTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    attributes: [ocelAttributeTypeSchema]
});

const OcelObjectType = mongoose.model('User', ocelObjectTypeSchema);

export default OcelObjectType;