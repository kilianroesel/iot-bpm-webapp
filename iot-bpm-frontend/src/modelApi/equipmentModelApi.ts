import { queryOptions, useMutation } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { queryClient } from "../config/queryClientConfig";
import { GetViewModel } from "./viewModelApi";

export interface CreateEquipmentModel {
  equipmentName: string;
}

export interface UpdateEquipmentModel extends CreateEquipmentModel {
  _id: string;
}

export interface GetEquipmentModel extends CreateEquipmentModel {
  _id: string;
  equipmentModels: GetEquipmentModel[];
  viewModels: GetViewModel[];
}

export const equipmentModelQuery = (equipmentModelId: string) =>
  queryOptions({
    queryKey: ["domain", "equipmentModel", equipmentModelId],
    queryFn: async () => {
      const response = await apiInstance.get<any>(`/domain/equipmentModels/${equipmentModelId}`);
      return response.data;
    },
  });

export const useCreateEquipment = (equipmentModelId: string) =>
  useMutation({
    mutationFn: async (payload: CreateEquipmentModel) => {
      const response = await apiInstance.post<GetEquipmentModel>(
        `/domain/equipmentModels/${equipmentModelId}/equipmentModels`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModel", equipmentModelId] }),
  });

  export const useUpdateEquipment = (equipmentModelId: string) =>
    useMutation({
      mutationFn: async (payload: UpdateEquipmentModel) => {
        const response = await apiInstance.post<GetEquipmentModel>(
          `/domain/equipmentModels/${equipmentModelId}`,
          payload,
        );
        return response.data;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModel", equipmentModelId] }),
    });

export const useDeleteEquipment = (equipmentModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/equipmentModels/${equipmentModelId}`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });
