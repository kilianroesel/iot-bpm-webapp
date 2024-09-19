import { useMutation } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { queryClient } from "../config/queryClientConfig";
import { GetRangeTriggerEventModel, GetScalarTriggerEventModel } from "./eventModelApi";

export interface CreateLifecycleModel {
  lifecycleName: string;
}
export interface GetLifecycleModelBase extends CreateLifecycleModel {
  _id: string;
  __t: string;
  eventModels: (GetScalarTriggerEventModel | GetRangeTriggerEventModel)[];
  updatedAt: String;
  createdAt: String;
}
export interface UpdateLifecycleModel extends CreateLifecycleModel {
  _id: string;
  __t: string;
}
export interface GetLifecycleModel extends GetLifecycleModelBase {}

export interface GetPopulatedLifecycleModel extends GetLifecycleModelBase {
  ruleStatus: string;
}

export const useCreateLifecycleModel = (equipmentModelId: string) =>
  useMutation({
    mutationFn: async (payload: CreateLifecycleModel) => {
      const response = await apiInstance.post<GetLifecycleModel>(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] }),
  });

export const useUpdateLifecycleModel = (equipmentModelId: string, lifecycleModelId: string) =>
  useMutation({
    mutationFn: async (payload: UpdateLifecycleModel) => {
      const response = await apiInstance.post<GetLifecycleModel>(
        `/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] }),
  });

export const useDeleteLifecycleModel = (equipmentModelId: string, lifecycleModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels"] });
      queryClient.removeQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] });
    },
  });

// export const useCreateEventEnrichmentRule = (equipmentModelId: string, statusModelId: string) =>
//   useMutation({
//     mutationFn: async () => {
//       const response = await apiInstance.post(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${statusModelId}/rule`);
//       return response.data;
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
//   });

// export const useDeleteEventEnrichmentRule = (equipmentModelId: string, statusModelId: string) =>
//   useMutation({
//     mutationFn: async () => {
//       const response = await apiInstance.delete(`/domain/equipmentModels/${equipmentModelId}/statusModels/${statusModelId}/rule`);
//       return response.data;
//     },
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
//   });
