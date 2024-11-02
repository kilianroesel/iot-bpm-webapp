import mongoose from "mongoose";
import { EquipmentModelRawDocType, EquipmentModelHydratedDocumentType } from "./equipmentModelSchema";

export interface MachineModelRawDocType extends EquipmentModelRawDocType {
    versionCsiStd: string;
    versionCsiSpecific: string;
}

export type HydratedMachineModelDocument = EquipmentModelHydratedDocumentType & {
    machineName: string;
    versionCsiStd: string;
    versionCsiSpecific: string;
};

type MachineModelType = mongoose.Model<
  MachineModelRawDocType,
  {},
  {},
  MachineModelVirtuals,
  HydratedMachineModelDocument // THydratedDocumentType
>;

interface MachineModelVirtuals {
    machineName: string;
}

export const machineModelSchema = new mongoose.Schema<
    MachineModelRawDocType,
    MachineModelType,
    {},
    {},
    MachineModelVirtuals,
    {},
    mongoose.DefaultSchemaOptions,
    MachineModelRawDocType,
    HydratedMachineModelDocument
>(
    {
        versionCsiStd: {
            type: String,
            required: true,
        },
        versionCsiSpecific: {
            type: String,
            required: true,
        }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

machineModelSchema
    .virtual("machineName")
    .get(function (this) {
        return this.equipmentName;
    })
    .set(function (v) {
        this.set({ equipmentName: v });
    });

machineModelSchema.virtual("resourceModels", {
    ref: "ResourceModel",
    localField: "_id",
    foreignField: "machineModel",
    justOne: false,
});

machineModelSchema
    .virtual("ruleStatus", {
        ref: "EventScopingRule",
        localField: "_id",
        foreignField: "_id",
        justOne: true,
    })
    .get(function (rule) {
        if (!rule) return "NOT_RELEASED";
        if (
            rule.machineName == this.equipmentName &&
            rule.versionCsiStd == this.versionCsiStd &&
            rule.versionCsiSpecific == this.versionCsiSpecific
        )
            return "ACTIVE";
        return "UPDATED";
    });

machineModelSchema.pre("findOne", function () {
    this.populate({ path: "ruleStatus" });
    this.populate({ path: "equipmentModels", model: "EquipmentModel" });
    this.populate({ path: "viewModels.eventModels.ruleStatus" });
    this.populate({ path: "viewModels.statusModels.ruleStatus" });
});

machineModelSchema.pre("find", function () {
    this.populate({ path: "ruleStatus" });
    this.populate({ path: "equipmentModels", model: "EquipmentModel" });
    this.populate({ path: "viewModels.eventModels.ruleStatus" });
    this.populate({ path: "viewModels.statusModels.ruleStatus" });
});
