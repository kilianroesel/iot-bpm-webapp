import mongoose from "mongoose";
import { eventModelSchema, EventModelRawDocType, EventModelHydratedDocumentType } from "./eventModelSchema";
import { StatusModelHydratedDocumentType, StatusModelRawDocType, statusModelSchema } from "./statusModelSchema";

export interface ViewModelRawDocType {
    viewName: string;
    eventModels: EventModelRawDocType[];
    statusModels: StatusModelRawDocType[];
}

export type ViewModelHydratedDocumentType = {
    viewName: string;
    eventModels: mongoose.Types.DocumentArray<EventModelHydratedDocumentType>,
    statusModels: mongoose.Types.DocumentArray<StatusModelHydratedDocumentType>
}

export const viewModelSchema = new mongoose.Schema<ViewModelRawDocType, {}, {}, {}, {}, {}, {}, ViewModelRawDocType, ViewModelHydratedDocumentType>(
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