export interface CreateStatusField {
  name: string;
  field: string;
}
export interface GetStatusField extends CreateStatusField {
  id: string;
  equipmentId: string
}
export interface UpdateStatusField extends GetStatusField { }


export interface CreateEquipmentDescription {
  name: string
}
export interface GetEquipmentDescription {
  id: string;
  name: string;
  parentId: string | null;
}
export interface PopulatedGetEquipmentDescription extends GetEquipmentDescription {
  statusFields: GetStatusField[];
  events: (GetScalarTriggerEventDescription | GetRangeTriggerEventDescription)[];
  childEquipment: GetEquipmentDescription[];
}

export interface BaseCreateEventDescription {
  name: string;
  field: string;
}
export interface CreateScalarTriggerEventDescription extends ScalarTriggerEventExtension, BaseCreateEventDescription {};
export interface CreateRangeTriggerEventDescription extends RangeTriggerEventExtension, BaseCreateEventDescription {};
export interface BaseGetEventDescription {
  id: string;
  name: string;
  field: string;
}
export interface GetScalarTriggerEventDescription extends ScalarTriggerEventExtension, BaseGetEventDescription {};
export interface GetRangeTriggerEventDescription extends RangeTriggerEventExtension, BaseGetEventDescription {};
export interface UpdateScalarTriggerEventDescription extends GetScalarTriggerEventDescription {};
export interface UpdateRangeTriggerEventDescription extends GetRangeTriggerEventDescription {};
export interface ScalarTriggerEventExtension {
  triggerCategory: "SCALAR_TRIGGER";
  triggerType:
      | "CHANGES_TO"
      | "CHANGES_FROM"
      | "INCREASES_BY"
      | "DECREASES_BY"
      | "ABSOLUTE_CHANGE_IS_EQUAL"
      | "ABSOLUTE_CHANGE_IS_GREATER_EQUAL"
      | "CHANGE_IS_GREATER_EQUAL";
  value: number;
}
export interface RangeTriggerEventExtension {
  triggerCategory: "RANGE_TRIGGER";
  triggerType: "ENTERS_RANGE_FROM_TO" | "LEAVES_RANGE_FROM_TO";
  from: number;
  to: number;
}


export interface CreateMachineDescription {
  machineName: string;
  versionCsiStd: string;
  versionCsiSpecific: string;
  machineSoftwareVersion: string;
  machineMasterSoftwareVersion: string;
}
export interface GetMachineDescription extends CreateMachineDescription {
  id: string;
}
export interface PopulatedGetMachineDescription extends GetMachineDescription {
  mainEquipment: PopulatedGetEquipmentDescription;
}
export interface UpdateMachineDescription extends GetMachineDescription {}
