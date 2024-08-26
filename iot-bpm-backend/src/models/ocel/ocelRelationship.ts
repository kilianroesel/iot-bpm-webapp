import mongoose from "mongoose";

export const ocelRelationshipSchema = new mongoose.Schema({
    objectId: {
        type: String,
        required: true
    },
    qualifier: {
        type: String,
        required: true
    }
});