import { queryOptions, useMutation } from "@tanstack/react-query";
import { queryClient } from "../config/queryClientConfig";
import { apiInstance } from "../config/modelApiConfig";

export interface CreateEventModelBase {
  eventName: string;
  field: string;
}

export interface GetEventModelBase {
  _id: string;
  __t: string;
  eventName: string;
  field: string;
  updatedAt: String;
  createdAt: String;
}

export interface BaseUpdateEventModel {
  _id: string;
  __t: string;
  eventName: string;
  field: string;
}

export interface GetScalarTriggerEventModel extends ScalarTriggerEventExtension, GetEventModelBase {}
export interface GetRangeTriggerEventModel extends RangeTriggerEventExtension, GetEventModelBase {}

export interface CreateScalarTriggerEventModel extends ScalarTriggerEventExtension, CreateEventModelBase {}
export interface CreateRangeTriggerEventModel extends RangeTriggerEventExtension, CreateEventModelBase {}

export interface UpdateScalarTriggerEventModel extends ScalarTriggerEventExtension, BaseUpdateEventModel {}
export interface UpdateRangeTriggerEventModel extends RangeTriggerEventExtension, BaseUpdateEventModel {}

export interface ScalarTriggerEventExtension {
  triggerCategory: "SCALAR_TRIGGER";
  triggerType:
    | "CHANGES_TO"
    | "CHANGES_FROM"
    | "INCREASES_BY"
    | "DECREASES_BY"
    | "ABSOLUTE_CHANGE_IS_EQUAL"
    | "ABSOLUTE_CHANGE_IS_GREATER_EQUAL"
    | "CHANGE_IS_GREATER_EQUAL";
  value: number;
}
export interface RangeTriggerEventExtension {
  triggerCategory: "RANGE_TRIGGER";
  triggerType: "ENTERS_RANGE_FROM_TO" | "LEAVES_RANGE_FROM_TO";
  from: number;
  to: number;
}

export const eventModelQuery = (eventModelId: string) =>
  queryOptions({
    queryKey: ["domain", "eventModels", eventModelId],
    queryFn: async () => {
      const response = await apiInstance.get<GetScalarTriggerEventModel | GetRangeTriggerEventModel>(
        `/domain/eventModels/${eventModelId}`,
      );
      return response.data;
    },
  });

export const useCreateEventModel = (equipmentModelId: string) =>
  useMutation({
    mutationFn: async (payload: CreateScalarTriggerEventModel | UpdateRangeTriggerEventModel) => {
      const response = await apiInstance.post(
        `/domain/equipmentModels/${equipmentModelId}/eventModels`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useUpdateEventModel = (eventModelId: string) =>
  useMutation({
    mutationFn: async (payload: UpdateScalarTriggerEventModel | UpdateRangeTriggerEventModel) => {
      const response = await apiInstance.post(`/domain/eventModels/${eventModelId}`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useDeleteEventModel = (eventModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/eventModels/${eventModelId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["domain", "eventModels", eventModelId], exact: true });
      queryClient.invalidateQueries({ queryKey: ["domain"] });
    },
  });

export const useDispatchEventModel = (eventModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.post(`/domain/eventModels/${eventModelId}/dispatch`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });
