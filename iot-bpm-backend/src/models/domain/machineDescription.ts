import mongoose, { Schema, Types } from "mongoose";
import EquipmentDescription from "./equipmentDescription";

interface MachineDescription {
    machineName: string;
    versionCsiStd: string;
    versionCsiSpecific: string;
    machineSoftwareVersion: string;
    machineMasterSoftwareVersion: string;
    equipment?: Types.ObjectId;
}

const machineDescriptionSchema = new mongoose.Schema<MachineDescription>({
    machineName: {
        type: String,
        required: true,
    },
    versionCsiStd: {
        type: String,
        required: true,
    },
    versionCsiSpecific: {
        type: String,
        required: true,
    },
    machineSoftwareVersion: {
        type: String,
        required: true,
    },
    machineMasterSoftwareVersion: {
        type: String,
        required: true,
    },
    equipment: {
        type: Schema.Types.ObjectId,
        ref: "EquipmentDescription",
        required: true,
        validate: {
            validator: async function(value) {
                const equipmentDescription = await EquipmentDescription.findById(value);
                return !!equipmentDescription; // Return true if user exists, false otherwise
              },
              message: 'Equipment Description does not exist'
        }
    },
});

machineDescriptionSchema.pre("validate", async function (next) {
    if (!this.equipment) {
        const equipment = await EquipmentDescription.create({
            name: this.machineName,
        });
        this.equipment = equipment._id;
    }
    next();
});

const MachineDescription = mongoose.model("MachineDescription", machineDescriptionSchema, "machine_descriptions");

export default MachineDescription;
