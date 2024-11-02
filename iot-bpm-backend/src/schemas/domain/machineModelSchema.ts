import { JSONSchemaType } from "ajv";

interface CreateMachineModel {
    machineName: string;
    versionCsiStd: string;
    versionCsiSpecific: string;
}

export const createMachineModel: JSONSchemaType<CreateMachineModel> = {
    type: "object",
    properties: {
        machineName: { type: "string" },
        versionCsiStd: { type: "string" },
        versionCsiSpecific: { type: "string" },
    },
    required: [
        "machineName",
        "versionCsiStd",
        "versionCsiSpecific",
    ],
    additionalProperties: false,
};

interface UpdateMachineModel extends CreateMachineModel {
    _id: string;
}

export const updateMachineModel: JSONSchemaType<UpdateMachineModel> = {
    type: "object",
    properties: {
        _id: { type: "string" },
        machineName: { type: "string" },
        versionCsiStd: { type: "string" },
        versionCsiSpecific: { type: "string" },
    },
    required: [
        "machineName",
        "versionCsiStd",
        "versionCsiSpecific",
    ],
    additionalProperties: false,
};
