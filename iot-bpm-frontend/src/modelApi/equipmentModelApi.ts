import { queryOptions, useMutation } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { queryClient } from "../config/queryClientConfig";
import { GetStatusField } from "./statusModelApi";
import { GetRangeTriggerEventDescription, GetScalarTriggerEventDescription } from "./eventModelApi";

export interface CreateEquipmentDescription {
  name: string;
}
export interface UpdateEquipmentModel {
  id: string;
  name: string;
}

export interface GetEquipmentDescription {
  id: string;
  name: string;
  parentId: string | null;
  updatedAt: String;
  createdAt: String;
}
export interface GetPopulatedEquipmentDescription extends GetEquipmentDescription {
  statusFields: GetStatusField[];
  events: (GetScalarTriggerEventDescription | GetRangeTriggerEventDescription)[];
  childEquipment: GetEquipmentDescription[];
}

export const equipmentDescriptionQuery = (id: string) =>
  queryOptions({
    queryKey: ["domain", "equipmentDescription", id],
    queryFn: async () => {
      const response = await apiInstance.get<GetPopulatedEquipmentDescription>(`/domain/equipmentDescriptions/${id}`);
      return response.data;
    },
  });

export const useCreateEquipment = (equipmentId: string) =>
  useMutation({
    mutationFn: async (payload: CreateEquipmentDescription) => {
      const response = await apiInstance.post<GetPopulatedEquipmentDescription>(
        `/domain/equipmentDescriptions/${equipmentId}/createChildEquipment`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useDeleteEquipment = (id: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/equipmentDescriptions/${id}`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });
