import { useMutation } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { queryClient } from "../config/queryClientConfig";

export interface CreateStatusModel {
  statusName: string;
  field: string;
}
export interface GetStatusModelBase extends CreateStatusModel {
  _id: string;
  __t: string;
  updatedAt: String;
  createdAt: String;
}
export interface UpdateStatusModel extends CreateStatusModel {
  _id: string;
  __t: string;
}
export interface GetStatusModel extends GetStatusModelBase {}

export interface GetPopulatedStatusModel extends GetStatusModelBase {
  ruleStatus: string;
}

export const useCreateStatusModel = (equipmentModelId: string, lifecycleModelId: string) =>
  useMutation({
    mutationFn: async (payload: CreateStatusModel) => {
      const response = await apiInstance.post<GetStatusModel>(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}/statusModels`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] }),
  });

export const useUpdateStatusModel = (equipmentModelId: string, lifecycleModelId: string, statusModelId: string) =>
  useMutation({
    mutationFn: async (payload: UpdateStatusModel) => {
      const response = await apiInstance.post<GetStatusModel>(
        `/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}/statusModels/${statusModelId}`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useDeleteStatusModel = (equipmentModelId: string, lifecycleModelId: string, statusModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}/statusModels/${statusModelId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] });
    },
  });

export const useCreateEventEnrichmentRule = (equipmentModelId: string, lifecycleModelId: string, statusModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.post(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}/statusModels/${statusModelId}/rule`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] }),
  });

export const useDeleteEventEnrichmentRule = (equipmentModelId: string, lifecycleModelId: string, statusModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}/statusModels/${statusModelId}/rule`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] }),
  });
