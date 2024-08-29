import mongoose, { Schema } from "mongoose";

const statusFieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    field: {
        type: String,
        required: true,
    }
});

const StatusField = mongoose.model("StatusField", statusFieldSchema, "status_fields");

export default StatusField;
