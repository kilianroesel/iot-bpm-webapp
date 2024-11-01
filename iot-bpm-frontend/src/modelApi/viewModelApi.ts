import { useMutation } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { queryClient } from "../config/queryClientConfig";
import { GetRangeTriggerEventModel, GetScalarTriggerEventModel } from "./eventModelApi";
import { GetStatusModel } from "./statusModelApi";

export interface CreateViewModel {
  viewName: string;
}
export interface GetViewModel extends CreateViewModel {
  _id: string;
  __t: string;
  eventModels: (GetScalarTriggerEventModel | GetRangeTriggerEventModel)[];
  statusModels: GetStatusModel[];
  updatedAt: string;
  createdAt: string;
}
export interface UpdateViewModel extends CreateViewModel {
  _id: string;
  __t: string;
}
export interface GetPopulatedViewModel extends GetViewModel {
  ruleStatus: string;
}

export const useCreateViewModel = (equipmentModelId: string) =>
  useMutation({
    mutationFn: async (payload: CreateViewModel) => {
      const response = await apiInstance.post<GetViewModel>(`/domain/equipmentModels/${equipmentModelId}/viewModels`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] }),
  });

export const useUpdateViewModel = (equipmentModelId: string, viewModelId: string) =>
  useMutation({
    mutationFn: async (payload: UpdateViewModel) => {
      const response = await apiInstance.post<GetViewModel>(
        `/domain/equipmentModels/${equipmentModelId}/viewModels/${viewModelId}`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] }),
  });

export const useDeleteViewModel = (equipmentModelId: string, viewModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/equipmentModels/${equipmentModelId}/viewModels/${viewModelId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels"] });
    },
  });

// export const useCreateEventEnrichmentRule = (equipmentModelId: string, statusModelId: string) =>
//   useMutation({
//     mutationFn: async () => {
//       const response = await apiInstance.post(`/domain/equipmentModels/${equipmentModelId}/viewModels/${statusModelId}/rule`);
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
