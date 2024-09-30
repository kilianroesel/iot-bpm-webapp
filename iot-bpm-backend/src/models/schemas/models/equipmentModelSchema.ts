import mongoose from "mongoose";
import { MachineModel } from "./machineModelSchema";
import { viewModelSchema } from "./viewModel";

export interface EquipmentModel {
    equipmentName: string;
    viewModels: any;
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
        viewModels: [viewModelSchema],
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
    this.populate({ path: "viewModels.eventModels.ruleStatus"});
    this.populate({ path: "viewModels.statusModels.ruleStatus"});
});

equipmentModelSchema.pre("findOne", function () {
    this.populate({ path: "equipmentModels", model: "EquipmentModel" });
    this.populate({ path: "viewModels.eventModels.ruleStatus"});
    this.populate({ path: "viewModels.statusModels.ruleStatus"});
});
