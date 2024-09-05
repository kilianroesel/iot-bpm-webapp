import { queryOptions, useMutation } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";
import { queryClient } from "../config/queryClientConfig";

export interface CreateStatusField {
  name: string;
  field: string;
}
export interface GetStatusField extends CreateStatusField {
  id: string;
  name: string;
  field: string;
  equipmentId: string;
  updatedAt: String;
  createdAt: String;
}
export interface UpdateStatusField {
  id: string;
  name: string;
  field: string;
  equipmentId: string;
}

export interface GetPopulatedStatusField extends GetStatusField {
  eventEnrichmentRule?: EventEnrichmentRule;
}

export interface EventEnrichmentRule {
  id: string;
  name: string;
  field: string;
  equipmentId: string;
}

export const statusModelFieldQuery = (statusFieldId: string) =>
  queryOptions({
    queryKey: ["domain", "statusFields", statusFieldId],
    queryFn: async () => {
      const response = await apiInstance.get<GetPopulatedStatusField>(`/domain/statusFields/${statusFieldId}`);
      return response.data;
    },
  });

export const useCreateStatusField = (equipmentId: string) =>
  useMutation({
    mutationFn: async (payload: CreateStatusField) => {
      const response = await apiInstance.post<GetStatusField>(
        `/domain/equipmentDescriptions/${equipmentId}/createStatusField`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useUpdateStatusField = (id: string) =>
  useMutation({
    mutationFn: async (payload: UpdateStatusField) => {
      const response = await apiInstance.post<GetStatusField>(`/domain/statusFields/${id}`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useDeleteStatusField = (id: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/statusFields/${id}`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });
