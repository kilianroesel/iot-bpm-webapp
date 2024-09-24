import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../config/queryClientConfig";
import { apiInstance } from "../config/modelApiConfig";

const triggerCategories = ["SCALAR_TRIGGER", "RANGE_TRIGGER"] as const;
type TriggerCategories = (typeof triggerCategories)[number];
const scalarTriggerTypes = [
  "CHANGES_TO",
  "CHANGES_FROM",
  "INCREASES_BY",
  "DECREASES_BY",
  "ABSOLUTE_CHANGE_IS_EQUAL",
  "ABSOLUTE_CHANGE_IS_GREATER_EQUAL",
  "CHANGE_IS_GREATER_EQUAL",
] as const;
type ScalarTriggerTypes = (typeof scalarTriggerTypes)[number];

const rangeTriggerTypes = ["ENTERS_RANGE_FROM_TO", "LEAVES_RANGE_FROM_TO"] as const;
type RangeTriggerTypes = (typeof rangeTriggerTypes)[number];

export interface CreateEventModelBase {
  eventName: string;
  field: string;
  triggerCategory: TriggerCategories;
}

export interface GetEventModelBase {
  _id: string;
  __t: string;
  eventName: string;
  field: string;
  triggerCategory: TriggerCategories;
  ruleStatus: string;
  updatedAt: String;
  createdAt: String;
}

export interface BaseUpdateEventModel {
  _id: string;
  __t: string;
  eventName: string;
  field: string;
  triggerCategory: TriggerCategories;
}

export interface GetScalarTriggerEventModel extends ScalarTriggerEventExtension, Omit<GetEventModelBase, "triggerCategory"> {}
export interface GetRangeTriggerEventModel extends RangeTriggerEventExtension, Omit<GetEventModelBase, "triggerCategory"> {}

export interface CreateScalarTriggerEventModel extends ScalarTriggerEventExtension, Omit<CreateEventModelBase, "triggerCategory"> {}
export interface CreateRangeTriggerEventModel extends RangeTriggerEventExtension, Omit<CreateEventModelBase, "triggerCategory"> {}

export interface UpdateScalarTriggerEventModel extends ScalarTriggerEventExtension, Omit<BaseUpdateEventModel, "triggerCategory"> {}
export interface UpdateRangeTriggerEventModel extends RangeTriggerEventExtension, Omit<BaseUpdateEventModel, "triggerCategory"> {}

export interface ScalarTriggerEventExtensionForm extends Omit<ScalarTriggerEventExtension, "value"> {
  value: string;
}
export interface RangeTriggerEventExtensionForm extends Omit<RangeTriggerEventExtension, "from" | "to"> {
  from: string;
  to: string;
}

export interface ScalarTriggerEventExtension {
  triggerCategory: "SCALAR_TRIGGER";
  triggerType: ScalarTriggerTypes;
  value: number;
}
export interface RangeTriggerEventExtension {
  triggerCategory: "RANGE_TRIGGER";
  triggerType: RangeTriggerTypes;
  from: number;
  to: number;
}

export const useCreateEventModel = (equipmentModelId: string, lifecycleModelId: string) =>
  useMutation({
    mutationFn: async (payload: CreateScalarTriggerEventModel | CreateRangeTriggerEventModel) => {
      const response = await apiInstance.post(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}/eventModels`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] }),
  });

export const useUpdateEventModel = (equipmentModelId: string, lifecycleModelId: string, eventModelId: string) =>
  useMutation({
    mutationFn: async (payload: UpdateScalarTriggerEventModel | UpdateRangeTriggerEventModel) => {
      const response = await apiInstance.post(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}/eventModels/${eventModelId}/`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] }),
  });

export const useDeleteEventModel = (equipmentModelId: string, lifecycleModelId: string, eventModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}/eventModels/${eventModelId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] });
      queryClient.invalidateQueries({ queryKey: ["domain"] });
    },
  });

export const useCreateEventAbstractionRule = (equipmentModelId: string, lifecycleModelId: string, eventModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.post(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}/eventModels/${eventModelId}/rule`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] }),
  });

export const useDeleteEventAbstractionRule = (equipmentModelId: string, lifecycleModelId: string, eventModelId: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/equipmentModels/${equipmentModelId}/lifecycleModels/${lifecycleModelId}/eventModels/${eventModelId}/rule`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain", "equipmentModels", equipmentModelId] }),
  });
