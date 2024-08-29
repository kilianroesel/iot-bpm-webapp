interface EventDescription {
    field: string;
    trigger: SimpleTrigger;
}

export interface SubEquipment {
    name: string;
    statusFields?: {
        [key: string]: string;
    };
    events?: {
        [key: string]: EventDescription;
    };
    subEquipment?: {
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

export interface UpsertMachineDescription extends SubEquipment {
    scope: {
        machineName: string;
        versionCsiStd: string;
        versionCsiSpecific: string;
        machineSoftwareVersion: string;
        machineMasterSoftwareVersion: string;
    };
}

export interface GetMachineDescription {
    scope: {
        machineName: string;
        versionCsiStd: string;
        versionCsiSpecific: string;
        machineSoftwareVersion: string;
        machineMasterSoftwareVersion: string;
    };
    statusFields: {
        [key: string]: string;
    };
    events: {
        [key: string]: EventDescription;
    };
    subEquipment: {
        [key: string]: SubEquipment;
    };
    _id: string
}