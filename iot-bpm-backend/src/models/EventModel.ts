import mongoose from "mongoose";
import mongodb from "../config/mongoClient";
import BaseModel from "./BaseModel";

export const eventModelSchema = new mongoose.Schema(
    {
        eventName: {
            type: String,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
        equipmentModel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EquipmentModel",
            required: true,
        },
        triggerCategory: {
            type: String,
            required: true,
        },
        triggerType: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
        },
        from: {
            type: Number,
        },
        to: {
            type: Number,
        },
    }
);

// const EventModel = BaseModel.discriminator('EventModel', eventModelSchema);
// export default EventModel;
