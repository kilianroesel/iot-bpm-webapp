import { JSONSchemaType } from "ajv";

interface CreateResourceModel {
    resourceModelName: string
}

export const createResourceModel: JSONSchemaType<CreateResourceModel> = {
    type: "object",
    properties: {
        resourceModelName: { type: "string" },
    },
    required: ["resourceModelName"],
    additionalProperties: false,
};

interface UpdateResourceModel extends CreateResourceModel {
    _id: string;
}

export const updateResourceModel: JSONSchemaType<UpdateResourceModel> = {
    type: "object",
    properties: {
        _id: { type: "string" },
        resourceModelName: { type: "string" },
    },
    required: ["resourceModelName"],
    additionalProperties: false,
};
