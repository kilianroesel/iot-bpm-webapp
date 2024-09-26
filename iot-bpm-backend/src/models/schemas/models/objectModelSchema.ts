import mongoose from "mongoose";

export const objectModelSchema = new mongoose.Schema(
    {
        objectModelName: {
            type: String,
            required: true,
        },
        machineModel: {
            type: mongoose.Types.ObjectId,
            ref: "MachineModel",
        },
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// objectModelSchema.virtual("relations", {
//     ref: "EventModel",
//     localField: "_id",
//     foreignField: "relations.objectModel",
//     count: true
// });

// objectModelSchema.pre("find", function () {
//     this.populate({
//         path: "machineModel",
//         model: "MachineModel"
//     });
// });
// objectModelSchema.pre("findOne", function () {
//     this.populate({
//         path: "machineModel",
//         model: "MachineModel"
//     });
// });

