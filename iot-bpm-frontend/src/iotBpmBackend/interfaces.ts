export interface CreateEquipmentDescription {
  name: string
}

export interface GetEquipmentDescription {
  id: string;
  name: string;
  parentId: string | null;
}

export interface PopulatedGetEquipmentDescription extends GetEquipmentDescription {
  statusFields: any[];
  events: any[];
  childEquipment: any[];
}

export interface UpdateMachineDescription extends GetEquipmentDescription {}

export interface CreateMachineDescription {
  machineName: string;
  versionCsiStd: string;
  versionCsiSpecific: string;
  machineSoftwareVersion: string;
  machineMasterSoftwareVersion: string;
}

export interface GetMachineDescription extends CreateMachineDescription {
  id: string;
  equipmentId: string;
}

export interface PopulatedGetMachineDescription extends GetMachineDescription {
  equipment: PopulatedGetEquipmentDescription;
}

export interface UpdateMachineDescription extends GetMachineDescription {}
