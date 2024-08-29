import mongoose, { Schema, Types } from "mongoose";
import StatusField from "./statusField";
import EventDescription from "./eventDescription";

interface EquipmentDescription {
    name: string;
    statusFields: Types.ObjectId[];
    events: Types.ObjectId[];
    subEquipment: Types.ObjectId[];
}

const equipmentSchema = new mongoose.Schema<EquipmentDescription>({
    name: {
        type: String,
        required: true,
    },
    // Defines which nodeIds represent the status of this equipment
    statusFields: [
        {
            type: Schema.Types.ObjectId,
            ref: "StatusField",
            required: true,
            default: [],
            validate: {
                validator: async function (value) {
                    const equipmentDescription = await StatusField.findById(value);
                    return !!equipmentDescription; // Return true if user exists, false otherwise
                },
                message: "Status Field does not exist",
            },
        },
    ],
    // Defines the events that occur on this equipment
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: "EventDescription",
            required: true,
            default: [],
            validate: {
                validator: async function (value) {
                    const equipmentDescription = await EventDescription.findById(value);
                    return !!equipmentDescription; // Return true if user exists, false otherwise
                },
                message: "Event does not exist",
            },
        },
    ],
    // Defines the subEquipment that this equipment has
    subEquipment: [
        {
            type: Schema.Types.ObjectId,
            ref: "EquipmentDescription",
            required: true,
            default: [],
            validate: {
                validator: async function (value) {
                    const equipmentDescription = await EquipmentDescription.findById(value);
                    return !!equipmentDescription; // Return true if user exists, false otherwise
                },
                message: "Equipment does not exist",
            },
        },
    ],
});

const EquipmentDescription = mongoose.model("EquipmentDescription", equipmentSchema, "equipment_descriptions");

export default EquipmentDescription;
