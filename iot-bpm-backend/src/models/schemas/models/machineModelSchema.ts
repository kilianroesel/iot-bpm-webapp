import mongoose from "mongoose";


interface MachineModel {
    machineName: string;
    versionCsiStd: string;
    versionCsiSpecific: string;
    machineSoftwareVersion: string;
    machineMasterSoftwareVersion: string;
}

export const machineModelSchema = new mongoose.Schema<MachineModel>(
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
        }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

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
