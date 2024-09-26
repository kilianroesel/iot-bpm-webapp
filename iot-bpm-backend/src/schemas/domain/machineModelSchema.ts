import { JSONSchemaType } from "ajv";

interface CreateMachineModel {
    machineName: string;
    versionCsiStd: string;
    versionCsiSpecific: string;
    machineSoftwareVersion: string;
    machineMasterSoftwareVersion: string;
}

export const createMachineModel: JSONSchemaType<CreateMachineModel> = {
    type: "object",
    properties: {
        machineName: { type: "string" },
        versionCsiStd: { type: "string" },
        versionCsiSpecific: { type: "string" },
        machineSoftwareVersion: { type: "string" },
        machineMasterSoftwareVersion: { type: "string" },
    },
    required: [
        "machineName",
        "versionCsiStd",
        "versionCsiSpecific",
        "machineSoftwareVersion",
        "machineMasterSoftwareVersion",
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
        machineSoftwareVersion: { type: "string" },
        machineMasterSoftwareVersion: { type: "string" },
    },
    required: [
        "machineName",
        "versionCsiStd",
        "versionCsiSpecific",
        "machineSoftwareVersion",
        "machineMasterSoftwareVersion",
    ],
    additionalProperties: false,
};
