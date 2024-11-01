import mongoose from "mongoose";
import {
    ViewModelRawDocType,
    ViewModelHydratedDocumentType,
    viewModelSchema,
} from "./viewModel";

export interface EquipmentModelRawDocType {
    equipmentName: string;
    viewModels: ViewModelRawDocType[];
    equipmentModels: mongoose.Types.ObjectId[];
    equipmentPath: string;
}

export type EquipmentModelHydratedDocumentType = mongoose.HydratedDocument<
    EquipmentModelRawDocType,
    {
        equipmentName: string;
        viewModels: mongoose.Types.DocumentArray<ViewModelHydratedDocumentType>;
        equipmentModels: mongoose.Types.ObjectId[];
        equipmentPath: string;
    }
>;

type EquipmentModelType = mongoose.Model<
    EquipmentModelRawDocType,
    {},
    {},
    {},
    EquipmentModelHydratedDocumentType
>;

export const equipmentModelSchema = new mongoose.Schema<
    EquipmentModelRawDocType,
    EquipmentModelType,
    {},
    {},
    {},
    {},
    mongoose.DefaultSchemaOptions,
    EquipmentModelHydratedDocumentType,
    EquipmentModelHydratedDocumentType
>(
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
    this.populate({ path: "viewModels.eventModels.ruleStatus" });
    this.populate({ path: "viewModels.statusModels.ruleStatus" });
});

equipmentModelSchema.pre("findOne", function () {
    this.populate({ path: "equipmentModels", model: "EquipmentModel" });
    this.populate({ path: "viewModels.eventModels.ruleStatus" });
    this.populate({ path: "viewModels.statusModels.ruleStatus" });
});
