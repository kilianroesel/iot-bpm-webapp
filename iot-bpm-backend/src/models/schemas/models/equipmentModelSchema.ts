import mongoose from "mongoose";
import { MachineModel } from "./machineModelSchema";
import { lifecycleModelSchema } from "./lifecycleModel";

export interface EquipmentModel {
    equipmentName: string;
    lifecycleModels: any;
    objectModels: any;
    equipmentModels: EquipmentModel[];
    machineModel: MachineModel;
    parentEquipmentModel?: MachineModel,
    equipmentPath: string;
}

export const equipmentModelSchema = new mongoose.Schema<EquipmentModel>(
    {
        equipmentName: {
            type: String,
            required: true,
        },
        lifecycleModels: [lifecycleModelSchema],
        equipmentModels: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "EquipmentModel",
            },
        ],
        machineModel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MachineModel",
        },
        parentEquipmentModel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MachineModel",
        },
        equipmentPath: {
            type: String,
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

equipmentModelSchema.pre("find", function () {
    this.populate("equipmentModels");
});
equipmentModelSchema.pre("findOne", function () {
    this.populate("equipmentModels");
});

equipmentModelSchema.pre("find", function () {
    this.populate({
        path: "lifecycleModels.statusModels.ruleStatus",
        model: "EventEnrichmentRule"
    });
});
equipmentModelSchema.pre("findOne", function () {
    this.populate({
        path: "lifecycleModels.statusModels.ruleStatus",
        model: "EventEnrichmentRule"
    });
});

equipmentModelSchema.pre("find", function () {
    this.populate({
        path: "lifecycleModels.eventModels.ruleStatus",
        model: "EventAbstractionRule"
    });
});
equipmentModelSchema.pre("findOne", function () {
    this.populate({
        path: "lifecycleModels.eventModels.ruleStatus",
        model: "EventAbstractionRule"
    });
});
