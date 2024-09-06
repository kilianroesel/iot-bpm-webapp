import { JSONSchemaType } from "ajv";

interface CreateStatusModel {
    statusName: string
    field: string;
}

export const createStatusModel: JSONSchemaType<CreateStatusModel> = {
    type: "object",
    properties: {
        statusName: { type: "string" },
        field: { type: "string" },
    },
    required: ["statusName", "field"],
    additionalProperties: true,
};

interface UpdateStatusModel extends CreateStatusModel {
    _id: string;
}

export const updateStatusModel: JSONSchemaType<UpdateStatusModel> = {
    type: "object",
    properties: {
        _id: { type: "string" },
        statusName: { type: "string" },
        field: { type: "string" }
    },
    required: ["_id", "statusName", "field"],
    additionalProperties: true,
};
