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
    id: string;
    parentId?: string;
}

export const updateEquipmentDescription: JSONSchemaType<UpdateEquipmentDescription> = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        parentId: { type: "string", nullable: true }
    },
    required: ["id", "name"],
    additionalProperties: false,
};
