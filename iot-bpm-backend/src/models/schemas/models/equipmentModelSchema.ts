import mongoose from "mongoose";
import { statusModelSchema } from "./statusModelSchema";
import { eventModelSchema } from "./eventModelSchema";

export const equipmentModelSchema = new mongoose.Schema(
    {
        equipmentName: {
            type: String,
            required: true,
        },
        statusModels: [statusModelSchema],
        eventModels: [eventModelSchema],
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
        path: "statusModels.ruleStatus",
        model: "EventEnrichmentRule"
    });
});

equipmentModelSchema.pre("findOne", function () {
    this.populate({
        path: "statusModels.ruleStatus",
        model: "EventEnrichmentRule"
    });
});

equipmentModelSchema.pre("find", function () {
    this.populate({
        path: "eventModels.ruleStatus",
        model: "EventAbstractionRule"
    });
});

equipmentModelSchema.pre("findOne", function () {
    this.populate({
        path: "eventModels.ruleStatus",
        model: "EventAbstractionRule"
    });
});
