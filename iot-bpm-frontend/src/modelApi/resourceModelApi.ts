import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { GetMachineModel } from "./machineModel";

export interface CreateResourceModel {
  resourceModelName: string;
}
export interface GetResourceModel extends CreateResourceModel {
  _id: string;
  __t: string;
  updatedAt: string;
  createdAt: string;
  ruleStatus: string;
  machineModel?: GetMachineModel;
}

export interface UpdateResourceModel extends CreateResourceModel {}

export const resourceModelsQuery = () =>
  queryOptions({
    queryKey: ["domain", "resourceModels"],
    queryFn: async () => {
      const response = await apiInstance.get<GetResourceModel[]>(`/domain/resourceModels`);
      return response.data;
    },
  });

export const useCreateResourceModel = (machineModelId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateResourceModel) => {
      const response = await apiInstance.post(`/domain/machineModels/${machineModelId}/resourceModels`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "machineModels", machineModelId] }),
  });
};

export const useUpdateResourceModel = (machineModelId: string, resourceModelId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateResourceModel) => {
      const response = await apiInstance.post(`/domain/machineModels/${machineModelId}/resourceModels/${resourceModelId}`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "machineModels", machineModelId] }),
  });
};

export const useDeleteResourceModel = (machineModelId: string, resourceModelId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/machineModels/${machineModelId}/resourceModels/${resourceModelId}`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "machineModels", machineModelId] }),
  });
};