import { queryOptions, useMutation } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { queryClient } from "../config/queryClientConfig";
import { GetEquipmentModel } from "./equipmentModelApi";
import { GetResourceModel } from "./resourceModelApi";

export interface UpsertMachineModel {
  machineName: string;
  versionCsiStd: string;
  versionCsiSpecific: string;
}

export interface GetMachineModel extends UpsertMachineModel, GetEquipmentModel {
  _id: string;
  __t: string;
  createdAt: string;
  updatedAt: string;
  ruleStatus: string;
  resourceModels: GetResourceModel[];
}

export const machineModelsQuery = () =>
  queryOptions({
    queryKey: ["domain", "machineModels"],
    queryFn: async () => {
      const response = await apiInstance.get<GetMachineModel[]>("/domain/machineModels");
      return response.data;
    },
  });

export const useCreateMachineModel = () =>
  useMutation({
    mutationFn: async (payload: UpsertMachineModel) => {
      const response = await apiInstance.post(`/domain/machineModels`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "machineModels"] }),
  });

export const machineModelQuery = (machineModelId: string) =>
  queryOptions({
    queryKey: ["domain", "machineModel", machineModelId],
    queryFn: async () => {
      const response = await apiInstance.get<GetMachineModel>(`/domain/machineModels/${machineModelId}`);
      return response.data;
    },
  });

export const useUpdateMachineModel = (machineModelId: string) =>
  useMutation({
    mutationFn: async (payload: UpsertMachineModel) => {
      const response = await apiInstance.post(`/domain/machineModels/${machineModelId}`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "machineModel", machineModelId] }),
  });

export const useCreateEventScopingeRule = (machineModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.post(`/domain/machineModels/${machineModelId}/rule`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "machineModel", machineModelId] }),
  });

  export const useDeleteEventScopingeRule = (machineModelId: string) =>
    useMutation({
      mutationFn: async () => {
        const response = await apiInstance.delete(`/domain/machineModels/${machineModelId}/rule`);
        return response.data;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "machineModel", machineModelId] }),
    });
