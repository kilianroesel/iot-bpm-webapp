import mongoose from "mongoose";

export const objectModelSchema = new mongoose.Schema(
    {
        objectModelName: {
            type: String,
            required: true,
        },
        machineModel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MachineModel",
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
