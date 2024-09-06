import mongoose from "mongoose";
import mongodb from "../config/mongoClient";
import BaseModel from "./BaseModel";

const machineModelSchema = new mongoose.Schema(
    {
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
        rootEquipmentModel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EquipmentModel",
            required: true
        }
    }
);

const MachineModel = BaseModel.discriminator("MachineModel", machineModelSchema);
export default MachineModel;
