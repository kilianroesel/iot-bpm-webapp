import axios from "axios";
import {
  PopulatedGetMachineDescription,
  PopulatedGetEquipmentDescription,
  UpdateStatusField,
  GetStatusField,
  CreateStatusField,
  CreateScalarTriggerEventDescription,
  CreateRangeTriggerEventDescription,
  UpdateScalarTriggerEventDescription,
  CreateEquipmentDescription
} from "./interfaces";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { queryClient } from "../config/queryConfig";

const baseUrl = import.meta.env.VITE_IOT_BPM_BACKEND;

const apiInstance = axios.create({
  baseURL: baseUrl,
});

export const machineDescriptionsQuery = () =>
  queryOptions({
    queryKey: ["domain", "machineDescriptions"],
    queryFn: async () => {
      const response = await apiInstance.get<PopulatedGetMachineDescription[]>("/domain/machineDescriptions");
      return response.data;
    },
  });

export const machineDescriptionQuery = (id: string) =>
  queryOptions({
    queryKey: ["domain", "machineDescription", id],
    queryFn: async () => {
      const response = await apiInstance.get<PopulatedGetMachineDescription>(`/domain/machineDescriptions/${id}`);
      return response.data;
    },
  });

export const equipmentDescriptionQuery = (id: string) =>
  queryOptions({
    queryKey: ["domain", "equipmentDescription", id],
    queryFn: async () => {
      const response = await apiInstance.get<PopulatedGetEquipmentDescription>(`/domain/equipmentDescriptions/${id}`);
      return response.data;
    },
  });
export const useCreateEquipment = (equipmentId: string) => useMutation({
  mutationFn: async (payload: CreateEquipmentDescription) => {
    const response = await apiInstance.post<PopulatedGetEquipmentDescription>(`/domain/equipmentDescriptions/${equipmentId}/createChildEquipment`, payload);
    return response.data;
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
});

export const useDeleteEquipment = (id: string) => useMutation({
  mutationFn: async () => {
    const response = await apiInstance.delete(`/domain/equipmentDescriptions/${id}`);
    return response.data;
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
});


export const useCreateStatusField = (equipmentId: string) => useMutation({
  mutationFn: async (payload: CreateStatusField) => {
    const response = await apiInstance.post<GetStatusField>(`/domain/equipmentDescriptions/${equipmentId}/createStatusField`, payload);
    return response.data;
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
});


export const useUpdateStatusField = (id: string) => useMutation({
  mutationFn: async (payload: UpdateStatusField) => {
    const response = await apiInstance.post<GetStatusField>(`/domain/statusFields/${id}`, payload);
    return response.data;
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
});

export const useDeleteStatusField = (id: string) => useMutation({
  mutationFn: async () => {
    const response = await apiInstance.delete(`/domain/statusFields/${id}`);
    return response.data;
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
});

export const useCreateEventDescription = (equipmentId: string) => useMutation({
  mutationFn: async (payload: CreateScalarTriggerEventDescription | CreateRangeTriggerEventDescription) => {
    const response = await apiInstance.post<GetStatusField>(`/domain/equipmentDescriptions/${equipmentId}/createEventDescription`, payload);
    return response.data;
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
});

export const useUpdateEventDescription = (eventDescriptionId: string) => useMutation({
  mutationFn: async (payload: UpdateScalarTriggerEventDescription | CreateRangeTriggerEventDescription) => {
    const response = await apiInstance.post<GetStatusField>(`/domain/eventDescriptions/${eventDescriptionId}`, payload);
    return response.data;
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
});

export const useDeleteEventDescription = (id: string) => useMutation({
  mutationFn: async () => {
    const response = await apiInstance.delete(`/domain/eventDescriptions/${id}`);
    return response.data;
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
});
