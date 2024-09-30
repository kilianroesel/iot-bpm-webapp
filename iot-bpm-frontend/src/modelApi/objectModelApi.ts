import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { GetMachineModel } from "./machineModel";

export interface CreateObjectModel {
  objectModelName: string;
}
export interface GetObjectModel extends CreateObjectModel {
  _id: string;
  __t: string;
  updatedAt: string;
  createdAt: string;
  ruleStatus: string;
  machineModel?: GetMachineModel;
}

export interface UpdateObjectModel extends CreateObjectModel {}

export const objectModelsQuery = () =>
  queryOptions({
    queryKey: ["domain", "objectModels"],
    queryFn: async () => {
      const response = await apiInstance.get<GetObjectModel[]>(`/domain/objectModels`);
      return response.data;
    },
  });

export const useCreateObjectModel = (machineModelId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateObjectModel) => {
      const response = await apiInstance.post(`/domain/machineModels/${machineModelId}/objectModels`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "machineModels", machineModelId] }),
  });
};

export const useUpdateObjectModel = (machineModelId: string, objectModelId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateObjectModel) => {
      const response = await apiInstance.post(`/domain/machineModels/${machineModelId}/objectModels/${objectModelId}`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "machineModels", machineModelId] }),
  });
};

export const useDeleteObjectModel = (machineModelId: string, objectModelId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/machineModels/${machineModelId}/objectModels/${objectModelId}`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "machineModels", machineModelId] }),
  });
};