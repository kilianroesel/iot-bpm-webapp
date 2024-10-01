import mongoose from "mongoose";
import { IViewModel, THydratedViewModelDocument, viewModelSchema } from "./viewModel";

export interface IEquipmentModel {
    equipmentName: string;
    viewModels: IViewModel[];
    equipmentModels: IEquipmentModel[];
    equipmentPath: string;
}

export type THydratedEquipmentModelDocument = {
    equipmentName: string;
    viewModels: mongoose.Types.DocumentArray<THydratedViewModelDocument>,
    equipmentModels: mongoose.Types.DocumentArray<THydratedEquipmentModelDocument>
    equipmentPath: string;
}

export const equipmentModelSchema = new mongoose.Schema<IEquipmentModel, {}, {}, {}, {}, {}, {}, THydratedEquipmentModelDocument>(
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
