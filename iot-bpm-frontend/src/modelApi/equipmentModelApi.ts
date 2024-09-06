import { queryOptions, useMutation } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { queryClient } from "../config/queryClientConfig";
import { GetStatusModel } from "./statusModelApi";
import { GetRangeTriggerEventModel, GetScalarTriggerEventModel } from "./eventModelApi";

export interface CreateEquipmentModel {
  equipmentName: string;
}

interface GetEquipmentModelBase extends CreateEquipmentModel {
  _id: string;
  __t: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateEquipmentModel extends CreateEquipmentModel, GetEquipmentModelBase {}

export interface GetEquipmentModel extends GetEquipmentModelBase {
  _id: string;
  __t: string;
  statusModels: string[];
  eventModels: string[];
  equipmentModels: string[];
}
export interface GetPopulatedEquipmentModel extends GetEquipmentModelBase {
  statusModels: GetStatusModel[];
  eventModels: (GetScalarTriggerEventModel | GetRangeTriggerEventModel)[];
  equipmentModels: GetEquipmentModel[];
}


export const equipmentModelQuery = (equipmentModelId: string) =>
  queryOptions({
    queryKey: ["domain", "equipmentModel", equipmentModelId],
    queryFn: async () => {
      const response = await apiInstance.get<GetPopulatedEquipmentModel>(`/domain/equipmentModels/${equipmentModelId}`);
      return response.data;
    },
  });

export const useCreateEquipment = (equipmentId: string) =>
  useMutation({
    mutationFn: async (payload: CreateEquipmentModel) => {
      const response = await apiInstance.post<GetPopulatedEquipmentModel>(
        `/domain/equipmentModels/${equipmentId}/equipmentModels`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useDeleteEquipment = (equipmentModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/equipmentModels/${equipmentModelId}`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });
