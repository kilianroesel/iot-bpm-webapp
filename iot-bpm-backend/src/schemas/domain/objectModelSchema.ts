import { JSONSchemaType } from "ajv";

interface CreateObjectModel {
    objectModelName: string
}

export const createObjectModel: JSONSchemaType<CreateObjectModel> = {
    type: "object",
    properties: {
        objectModelName: { type: "string" },
    },
    required: ["objectModelName"],
    additionalProperties: false,
};

interface UpdateObjectModel extends CreateObjectModel {
    _id: string;
}

export const updateObjectModel: JSONSchemaType<UpdateObjectModel> = {
    type: "object",
    properties: {
        _id: { type: "string" },
        objectModelName: { type: "string" },
    },
    required: ["objectModelName"],
    additionalProperties: false,
};
