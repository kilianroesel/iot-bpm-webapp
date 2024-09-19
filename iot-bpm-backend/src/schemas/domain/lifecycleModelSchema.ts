import { JSONSchemaType } from "ajv";

interface CreateLifecycleModel {
    lifecycleName: string
}

export const createLifecycleModel: JSONSchemaType<CreateLifecycleModel> = {
    type: "object",
    properties: {
        lifecycleName: { type: "string" },
    },
    required: ["lifecycleName"],
    additionalProperties: false,
};

interface UpdateLifecycleModel extends CreateLifecycleModel {
    _id: string;
}

export const updateLifecycleModel: JSONSchemaType<UpdateLifecycleModel> = {
    type: "object",
    properties: {
        _id: { type: "string" },
        lifecycleName: { type: "string" },
    },
    required: ["_id", "lifecycleName"],
    additionalProperties: false,
};
