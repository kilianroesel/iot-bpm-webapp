import { JSONSchemaType } from "ajv";

interface EventDescription {
    field: string;
    trigger: SimpleTrigger;
}

interface SubEquipment {
    name: string;
    statusFields: {
        [key: string]: string;
    };
    events: {
        [key: string]: EventDescription;
    };
    subEquipment: {
        [key: string]: SubEquipment;
    };
}

interface SimpleTrigger {
    type:
        | "CHANGES_TO"
        | "CHANGES_FROM"
        | "INCREASES_BY"
        | "DECREASES_BY"
        | "ABSOLUTE_CHANGE_IS_EQUAL"
        | "ABSOLUTE_CHANGE_IS_GREATER_EQUAL"
        | "CHANGE_IS_GREATER_EQUAL";
    value: number;
}

// export const upsertMachineDescription: JSONSchemaType<UpsertMachineDescription> = {
//     definitions: {
//         EventDescription: {
//             type: "object",
//             properties: {
//                 field: { type: "string" },
//                 trigger: {
//                     type: "object",
//                     oneOf: [
//                         {
//                             type: "object",
//                             properties: {
//                                 triggerCategory: {
//                                     type: "string",
//                                     const: "SCALAR_TRIGGER",
//                                 },
//                                 triggerType: {
//                                     type: "string",
//                                     enum: [
//                                         "CHANGES_TO",
//                                         "CHANGES_FROM",
//                                         "INCREASES_BY",
//                                         "DECREASES_BY",
//                                         "ABSOLUTE_CHANGE_IS_EQUAL",
//                                         "ABSOLUTE_CHANGE_IS_GREATER_EQUAL",
//                                         "CHANGE_IS_GREATER_EQUAL",
//                                     ],
//                                 },
//                                 value: { type: "number" },
//                                 _id: { type: "string" },
//                             },
//                             required: ["triggerCategory", "triggerType", "value"],
//                             additionalProperties: false,
//                         },
//                         {
//                             type: "object",
//                             properties: {
//                                 triggerCategory: {
//                                     type: "string",
//                                     const: "RANGE_TRIGGER",
//                                 },
//                                 triggerType: {
//                                     type: "string",
//                                     enum: ["ENTERS_RANGE_FROM_TO", "LEAVES_RANGE_FROM_TO"],
//                                 },
//                                 from: { type: "number" },
//                                 to: { type: "number" },
//                                 _id: { type: "string" },
//                             },
//                             required: ["triggerCategory", "triggerType", "from", "to"],
//                             additionalProperties: false,
//                         },
//                     ],
//                     required: ["triggerCategory"],
//                 },
//                 _id: { type: "string" },
//             },
//             additionalProperties: false,
//             required: ["field", "trigger"],
//         },
//         SubEquipment: {
//             type: "object",
//             properties: {
//                 name: {
//                     type: "string",
//                 },
//                 statusFields: {
//                     type: "object",
//                     additionalProperties: {
//                         type: "string",
//                     },
//                     required: [],
//                 },
//                 events: {
//                     type: "object",
//                     additionalProperties: {
//                         type: "object",
//                         $ref: "#/definitions/EventDescription",
//                         required: ["field", "trigger"],
//                     },
//                     required: [],
//                 },
//                 subEquipment: {
//                     type: "object",
//                     additionalProperties: {
//                         type: "object",
//                         $ref: "#/definitions/SubEquipment",
//                         required: [],
//                     },
//                     required: [],
//                 },
//                 _id: {
//                     type: "string",
//                 },
//             },
//             required: ["name"],
//             additionalProperties: false,
//         },
//     },
//     type: "object",
//     properties: {
//         scope: {
//             type: "object",
//             properties: {
//                 machineName: { type: "string" },
//                 versionCsiStd: { type: "string" },
//                 versionCsiSpecific: { type: "string" },
//                 machineSoftwareVersion: { type: "string" },
//                 machineMasterSoftwareVersion: { type: "string" },
//                 _id: { type: "string" },
//             },
//             required: [
//                 "machineName",
//                 "versionCsiStd",
//                 "versionCsiSpecific",
//                 "machineSoftwareVersion",
//                 "machineMasterSoftwareVersion",
//             ],
//             additionalProperties: false,
//         },
//         name: {
//             type: "string",
//         },
//         statusFields: {
//             type: "object",
//             additionalProperties: {
//                 type: "string",
//             },
//             required: [],
//         },
//         events: {
//             type: "object",
//             additionalProperties: {
//                 type: "object",
//                 $ref: "#/definitions/EventDescription",
//                 required: ["field", "trigger"],
//             },
//             required: [],
//         },
//         subEquipment: {
//             type: "object",
//             additionalProperties: {
//                 type: "object",
//                 $ref: "#/definitions/SubEquipment",
//                 required: [],
//             },
//             required: [],
//         },
//         _id: {
//             type: "string",
//         },
//         __v: {
//             type: "number",
//         },
//     },
//     required: ["name", "scope"],
//     additionalProperties: false,
// };

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
