import { JSONSchemaType } from "ajv";

interface CreateMachineDescription {
    machineName: string;
    versionCsiStd: string;
    versionCsiSpecific: string;
    machineSoftwareVersion: string;
    machineMasterSoftwareVersion: string;
}

export const createMachineDescription: JSONSchemaType<CreateMachineDescription> = {
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

interface UpdateMachineDescription extends CreateMachineDescription {
    equipment: string;
    _id: string;
    __v: number
}

export const updateMachineDescription: JSONSchemaType<UpdateMachineDescription> = {
    type: "object",
    properties: {
        machineName: { type: "string" },
        versionCsiStd: { type: "string" },
        versionCsiSpecific: { type: "string" },
        machineSoftwareVersion: { type: "string" },
        machineMasterSoftwareVersion: { type: "string" },
        equipment: { type: "string" },
        _id: {type: "string"},
        __v: {type: "number"}
    },
    required: [
        "machineName",
        "versionCsiStd",
        "versionCsiSpecific",
        "machineSoftwareVersion",
        "machineMasterSoftwareVersion",
        "equipment",
        "_id",
        "__v"
    ],
    additionalProperties: false,
};
