import { JSONSchemaType } from "ajv";

interface CreateEquipmentDescription {
    name: string;
}

export const createEquipmentDescription: JSONSchemaType<CreateEquipmentDescription> = {
    type: "object",
    properties: {
        name: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
};

interface UpdateEquipmentDescription extends CreateEquipmentDescription {
    statusFields: string[];
    events: string[];
    subEquipment: string[];
    _id: string;
    __v: number;
}

export const updateEquipmentDescription: JSONSchemaType<UpdateEquipmentDescription> = {
    type: "object",
    properties: {
        name: { type: "string" },
        statusFields: { type: "array", items: { type: "string" } },
        events: { type: "array", items: { type: "string" } },
        subEquipment: { type: "array", items: { type: "string" } },
        _id: { type: "string" },
        __v: { type: "number" },
    },
    required: ["name", "statusFields", "events", "subEquipment", "_id", "__v"],
    additionalProperties: false,
};
