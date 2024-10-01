import mongoose from "mongoose";
import { eventModelSchema, IEventModel } from "./eventModelSchema";
import { IStatusModel, statusModelSchema } from "./statusModelSchema";

export interface IViewModel {
    viewName: string;
    eventModels: IEventModel[];
    statusModels: IStatusModel[];
}

export type THydratedViewModelDocument = {
    viewName: string;
    eventModels: mongoose.Types.DocumentArray<IEventModel>,
    statusModels: mongoose.Types.DocumentArray<IStatusModel>
}

export const viewModelSchema = new mongoose.Schema<IViewModel, {}, {}, {}, {}, {}, {}, THydratedViewModelDocument>(
    {
        viewName: {
            type: String,
            required: true,
        },
        eventModels: [eventModelSchema],
        statusModels: [statusModelSchema],
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);