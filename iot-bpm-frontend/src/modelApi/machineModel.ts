import { queryOptions, useMutation } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { queryClient } from "../config/queryClientConfig";
import { GetEquipmentModel } from "./equipmentModelApi";

export interface CreateMachineModel {
  machineName: string;
  versionCsiStd: string;
  versionCsiSpecific: string;
  machineSoftwareVersion: string;
  machineMasterSoftwareVersion: string;
}

interface GetMachineModelBase extends CreateMachineModel {
  _id: string;
  __t: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetPopulatedMachineModel extends GetMachineModelBase {
  rootEquipmentModel: GetEquipmentModel;
}
export interface GetMachineModel extends GetMachineModelBase {
  rootEquipmentModel: string;
}

export interface UpdateMachineModel extends CreateMachineModel, GetMachineModelBase {}

export const useCreateMachineModel = () =>
  useMutation({
    mutationFn: async (payload: CreateMachineModel) => {
      const response = await apiInstance.post(`/domain/machineModels`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const machineModelsQuery = () =>
  queryOptions({
    queryKey: ["domain", "machineModels"],
    queryFn: async () => {
      const response = await apiInstance.get<GetMachineModel[]>("/domain/machineModels");
      return response.data;
    },
  });

export const machineModelQuery = (id: string) =>
  queryOptions({
    queryKey: ["domain", "machineModel", id],
    queryFn: async () => {
      const response = await apiInstance.get<GetMachineModel>(`/domain/machineModels/${id}`);
      return response.data;
    },
  });
