import mongoose, { Schema, Types } from "mongoose";

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
    statusFields: [{ type: Schema.Types.ObjectId, ref: "StatusField", required: true, default: [] }],
    // Defines the events that occur on this equipment
    events: [{ type: Schema.Types.ObjectId, ref: "EventDescription", required: true, default: [] }],
    // Defines the subEquipment that this equipment has
    subEquipment: [{ type: Schema.Types.ObjectId, ref: "EquipmentDescription", required: true, default: [] }],
});

const EquipmentDescription = mongoose.model("EquipmentDescription", equipmentSchema, "equipment_descriptions");

export default EquipmentDescription;
