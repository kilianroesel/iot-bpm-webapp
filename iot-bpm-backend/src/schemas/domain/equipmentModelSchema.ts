import { JSONSchemaType } from "ajv";

interface CreateEquipmentModel {
    equipmentName: string;
}

export const createEquipmentModel: JSONSchemaType<CreateEquipmentModel> = {
    type: "object",
    properties: {
        equipmentName: { type: "string" },
    },
    required: ["equipmentName"],
    additionalProperties: false,
};

interface UpdateEquipmentModel extends CreateEquipmentModel {
    _id: string;
}

export const updateEquipmentModel: JSONSchemaType<UpdateEquipmentModel> = {
    type: "object",
    properties: {
        _id: { type: "string" },
        equipmentName: { type: "string" }
    },
    required: ["_id", "equipmentName"],
    additionalProperties: false,
};
