import { JSONSchemaType } from "ajv";

interface CreateStatusField {
    name: string
    field: string;
}

export const createStatusField: JSONSchemaType<CreateStatusField> = {
    type: "object",
    properties: {
        name: { type: "string" },
        field: { type: "string" },
    },
    required: ["name", "field"],
    additionalProperties: false,
};

interface UpdateStatusField extends CreateStatusField {
    id: string;
    equipmentId: string;
}

export const updateStatusField: JSONSchemaType<UpdateStatusField> = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        field: { type: "string" },
        equipmentId: { type: "string" },
    },
    required: ["id", "name", "field", "equipmentId"],
    additionalProperties: false,
};
