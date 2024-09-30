import mongoose from "mongoose";
import { MachineModel } from "./machineModelSchema";
import { lifecycleModelSchema } from "./lifecycleModel";

export interface EquipmentModel {
    equipmentName: string;
    lifecycleModels: any;
    objectModels: any;
    equipmentModels: EquipmentModel[];
    machineModel: MachineModel;
    parentEquipmentModel?: MachineModel;
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
        equipmentPath: {
            type: String,
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

equipmentModelSchema.pre("findOne", function () {
    this.populate({ path: "equipmentModels", model: "EquipmentModel" });
    this.populate({ path: "lifecycleModels.eventModels.ruleStatus"});
    this.populate({ path: "lifecycleModels.statusModels.ruleStatus"});
});

equipmentModelSchema.pre("findOne", function () {
    this.populate({ path: "equipmentModels", model: "EquipmentModel" });
    this.populate({ path: "lifecycleModels.eventModels.ruleStatus"});
    this.populate({ path: "lifecycleModels.statusModels.ruleStatus"});
});
