import mongoose from "mongoose";
import BaseModel from "./BaseModel";
import { statusModelSchema } from "./StatusModel";
import { eventModelSchema } from "./EventModel";

interface EquipmentModel {
    _id: string;
    equipmentName: string;
    statusModels: [mongoose.Types.ObjectId];
    eventModels: [mongoose.Types.ObjectId];
    equipmentModels: [mongoose.Types.ObjectId];
    machineModel?: mongoose.Types.ObjectId;
    parentEquipmentModel?: mongoose.Types.ObjectId;
    equipmentPath?: String;
}

const equipmentModelSchema = new mongoose.Schema<EquipmentModel>({
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
        ref: "MachineModel"
    },
    parentEquipmentModel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MachineModel",
    },
    equipmentPath: {
        type: String
    },
});

equipmentModelSchema.pre("find", function () {
    this.populate("equipmentModels");
});
equipmentModelSchema.pre("findOne", function () {
    this.populate("equipmentModels");
});

const EquipmentModel = BaseModel.discriminator("EquipmentModel", equipmentModelSchema);
export default EquipmentModel;
