import mongoose from "mongoose";
import { IEquipmentModel } from "./equipmentModelSchema";

export interface IMachineModel extends IEquipmentModel {
    versionCsiStd: string;
    versionCsiSpecific: string;
    machineSoftwareVersion: string;
    machineMasterSoftwareVersion: string;
}

export const machineModelSchema = new mongoose.Schema<IMachineModel>(
    {
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
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true }}
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
            rule.versionCsiSpecific == this.versionCsiSpecific &&
            rule.machineSoftwareVersion == this.machineSoftwareVersion &&
            rule.machineMasterSoftwareVersion == this.machineMasterSoftwareVersion
        )
            return "ACTIVE";
        return "UPDATED";
    });

machineModelSchema.pre("findOne", function () {
    this.populate({ path: "ruleStatus" });
    this.populate({ path: "equipmentModels", model: "EquipmentModel" });
    this.populate({ path: "viewModels.eventModels.ruleStatus"});
    this.populate({ path: "viewModels.statusModels.ruleStatus"});
});

machineModelSchema.pre("find", function () {
    this.populate({ path: "ruleStatus" });
    this.populate({ path: "equipmentModels", model: "EquipmentModel" });
    this.populate({ path: "viewModels.eventModels.ruleStatus"});
    this.populate({ path: "viewModels.statusModels.ruleStatus"});
});