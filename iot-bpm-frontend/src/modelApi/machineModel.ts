import { queryOptions, useMutation } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { GetPopulatedEquipmentDescription } from "./equipmentModelApi";
import { queryClient } from "../config/queryClientConfig";

export interface CreateMachineDescription {
  machineName: string;
  versionCsiStd: string;
  versionCsiSpecific: string;
  machineSoftwareVersion: string;
  machineMasterSoftwareVersion: string;
}
export interface GetMachineDescription extends CreateMachineDescription {
  id: string;
  updatedAt: String;
  createdAt: String;
}
export interface GetPopulatedMachineDescription extends GetMachineDescription {
  mainEquipment: GetPopulatedEquipmentDescription;
  eventScopingRule?: EventScopingRule;
}
export interface UpdateMachineDescription extends GetMachineDescription {}

export interface EventScopingRule {
  id: String;
  machineName: String;
  versionCsiStd: String;
  versionCsiSpecific: String;
  machineSoftwareVersion: String;
  machineMasterSoftwareVersion: String;
}

export const useCreateMachineDescription = () =>
  useMutation({
    mutationFn: async (payload: CreateMachineDescription) => {
      const response = await apiInstance.post(`/domain/machineDescriptions`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const machineDescriptionsQuery = () =>
  queryOptions({
    queryKey: ["domain", "machineDescriptions"],
    queryFn: async () => {
      const response = await apiInstance.get<GetPopulatedMachineDescription[]>("/domain/machineDescriptions");
      return response.data;
    },
  });

export const machineDescriptionQuery = (id: string) =>
  queryOptions({
    queryKey: ["domain", "machineDescription", id],
    queryFn: async () => {
      const response = await apiInstance.get<GetPopulatedMachineDescription>(`/domain/machineDescriptions/${id}`);
      return response.data;
    },
  });

export const equipmentDescriptionQuery = (id: string) =>
  queryOptions({
    queryKey: ["domain", "equipmentDescription", id],
    queryFn: async () => {
      const response = await apiInstance.get<GetPopulatedEquipmentDescription>(`/domain/equipmentDescriptions/${id}`);
      return response.data;
    },
  });
