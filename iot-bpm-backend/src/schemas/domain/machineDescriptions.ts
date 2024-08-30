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
    id: string;
    equipmentId: string;
}

export const updateMachineDescription: JSONSchemaType<UpdateMachineDescription> = {
    type: "object",
    properties: {
        id: { type: "string" },
        machineName: { type: "string" },
        versionCsiStd: { type: "string" },
        versionCsiSpecific: { type: "string" },
        machineSoftwareVersion: { type: "string" },
        machineMasterSoftwareVersion: { type: "string" },
        equipmentId: { type: "string" }
    },
    required: [
        "id",
        "machineName",
        "versionCsiStd",
        "versionCsiSpecific",
        "machineSoftwareVersion",
        "machineMasterSoftwareVersion",
        "equipmentId"
    ],
    additionalProperties: true,
};
