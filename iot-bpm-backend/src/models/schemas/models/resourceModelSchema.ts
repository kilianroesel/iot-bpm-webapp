import mongoose from "mongoose";
import { MachineModelRawDocType, HydratedMachineModelDocument } from "./machineModelSchema";

export interface ResourceModelRawDocType {
    resourceModelName: string;
    machineModel: MachineModelRawDocType;
}

export type ResourceModelHydratedDocumentType = {
    resourceModelName: string;
    machineModel: mongoose.Types.Subdocument<HydratedMachineModelDocument>;
};

type ResourceModelType = mongoose.Model<
    ResourceModelRawDocType,
    {},
    {},
    {},
    ResourceModelHydratedDocumentType
>;

export const resourceModelSchema = new mongoose.Schema<
    ResourceModelRawDocType,
    ResourceModelType,
    {},
    {},
    {},
    {},
    mongoose.DefaultSchemaOptions,
    ResourceModelRawDocType,
    ResourceModelHydratedDocumentType
>(
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
