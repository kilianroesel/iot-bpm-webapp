import mongoose from "mongoose";
import { EquipmentModel } from "./equipmentModelSchema";

export interface MachineModel {
    machineName: string;
    versionCsiStd: string;
    versionCsiSpecific: string;
    machineSoftwareVersion: string;
    machineMasterSoftwareVersion: string;
}

export const machineModelSchema = new mongoose.Schema<MachineModel>(
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
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

machineModelSchema
    .virtual("machineName")
    .get(function (this: EquipmentModel) {
        return this.equipmentName;
    })
    .set(function (v) {
        this.set({ equipmentName: v });
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
            rule.machineName == this.machineName &&
            rule.versionCsiStd == this.versionCsiStd &&
            rule.versionCsiSpecific == this.versionCsiSpecific &&
            rule.machineSoftwareVersion == this.machineSoftwareVersion &&
            rule.machineMasterSoftwareVersion == this.machineMasterSoftwareVersion
        )
            return "ACTIVE";
        return "UPDATED";
    });

    machineModelSchema.pre("find", function () {
        this.populate({
            path: "ruleStatus",
            model: "EventScopingRule"
        });
    });
    
    machineModelSchema.pre("findOne", function () {
        this.populate({
            path: "ruleStatus",
            model: "EventScopingRule"
        });
    });
