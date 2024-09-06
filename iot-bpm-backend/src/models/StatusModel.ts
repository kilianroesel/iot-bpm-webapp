import mongoose from "mongoose";
import BaseModel from "./BaseModel";

export const statusModelSchema = new mongoose.Schema(
    {
        statusName: {
            type: String,
            required: true,
        },
        field: {
            type: String,
            required: true,
        }
    }
);

// const StatusModel = BaseModel.discriminator("StatusModel", statusModelSchema);
// export default StatusModel;
