import { JSONSchemaType } from "ajv";

interface CreateViewModel {
    viewName: string
}

export const createViewModel: JSONSchemaType<CreateViewModel> = {
    type: "object",
    properties: {
        viewName: { type: "string" },
    },
    required: ["viewName"],
    additionalProperties: false,
};

interface UpdateViewModel extends CreateViewModel {
    _id: string;
}

export const updateViewModel: JSONSchemaType<UpdateViewModel> = {
    type: "object",
    properties: {
        _id: { type: "string" },
        viewName: { type: "string" },
    },
    required: ["viewName"],
    additionalProperties: false,
};
