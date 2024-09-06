import { queryOptions, useMutation } from "@tanstack/react-query";
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
  isDispatched?: Boolean;
  isActive?: Boolean;
}

export const statusModelQuery = (statusModelId: string) =>
  queryOptions({
    queryKey: ["domain", "statusModels", statusModelId],
    queryFn: async () => {
      const response = await apiInstance.get<GetPopulatedStatusModel>(`/domain/statusModels/${statusModelId}`);
      return response.data;
    },
  });

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

export const useUpdateStatusModel = (id: string) =>
  useMutation({
    mutationFn: async (payload: UpdateStatusModel) => {
      const response = await apiInstance.post<GetStatusModel>(`/domain/statusModels/${id}`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useDeleteStatusModel = (id: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/statusModels/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels"] });
      queryClient.removeQueries({ queryKey: ["domain", "statusModels", id], exact: true });
    },
  });

  export const useDispatchStatusModel = (id: string) =>
    useMutation({
      mutationFn: async () => {
        const response = await apiInstance.post(`/domain/statusModels/${id}/dispatch`);
        return response.data;
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
    });
