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
  ruleStatus: string
}

export const useCreateStatusModel = (equipmentModelId: string) =>
  useMutation({
    mutationFn: async (payload: CreateStatusModel) => {
      const response = await apiInstance.post<GetStatusModel>(
        `/domain/equipmentModels/${equipmentModelId}/statusModels`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useUpdateStatusModel = (equipmentModelId: string, statusModelId: string) =>
  useMutation({
    mutationFn: async (payload: UpdateStatusModel) => {
      const response = await apiInstance.post<GetStatusModel>(
        `/domain/equipmentModels/${equipmentModelId}/statusModels/${statusModelId}`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useDeleteStatusModel = (equipmentModelId: string, statusModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(
        `/domain/equipmentModels/${equipmentModelId}/statusModels/${statusModelId}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels"] });
      queryClient.removeQueries({ queryKey: ["domain", "equipmentModels"], exact: true });
    },
  });

export const useCreateEventEnrichmentRule = (equipmentModelId: string, statusModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.post( `/domain/equipmentModels/${equipmentModelId}/statusModels/${statusModelId}/rule`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });
