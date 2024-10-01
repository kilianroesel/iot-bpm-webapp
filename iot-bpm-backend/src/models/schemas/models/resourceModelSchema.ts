import mongoose from "mongoose";
import { IMachineModel } from "./machineModelSchema";

export interface IResourceModel {
    resourceModelName: string;
    machineModel: IMachineModel;
}

export const resourceModelSchema = new mongoose.Schema<IResourceModel>(
    {
        resourceModelName: {
            type: String,
            required: true,
        },
        machineModel: {
            type: mongoose.Types.ObjectId,
            ref: "MachineModel",
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

