import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../config/queryClientConfig";
import { apiInstance } from "../config/modelApiConfig";

export interface BaseGetEventDescription {
  id: string;
  name: string;
  field: string;
  updatedAt: String;
  createdAt: String;
  eventAbstractionRule?: EventAbstractionRule
}

export interface BaseCreateEventDescription {
  name: string;
  field: string;
}

export interface BaseUpdateEventDescription {
  id: string;
  name: string;
  field: string;
}

export interface GetScalarTriggerEventDescription extends ScalarTriggerEventExtension, BaseGetEventDescription {}
export interface GetRangeTriggerEventDescription extends RangeTriggerEventExtension, BaseGetEventDescription {}

export interface CreateScalarTriggerEventDescription extends ScalarTriggerEventExtension, BaseCreateEventDescription {}
export interface CreateRangeTriggerEventDescription extends RangeTriggerEventExtension, BaseCreateEventDescription {}

export interface UpdateScalarTriggerEventDescription extends ScalarTriggerEventExtension, BaseUpdateEventDescription {}
export interface UpdateRangeTriggerEventDescription extends RangeTriggerEventExtension, BaseUpdateEventDescription {}

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

export interface EventAbstractionRule {

}

export const useCreateEventDescription = (equipmentId: string) =>
  useMutation({
    mutationFn: async (payload: CreateScalarTriggerEventDescription | CreateRangeTriggerEventDescription) => {
      const response = await apiInstance.post(
        `/domain/equipmentDescriptions/${equipmentId}/createEventDescription`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useUpdateEventDescription = (eventDescriptionId: string) =>
  useMutation({
    mutationFn: async (payload: UpdateScalarTriggerEventDescription | CreateRangeTriggerEventDescription) => {
      const response = await apiInstance.post(`/domain/eventDescriptions/${eventDescriptionId}`, payload);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });

export const useDeleteEventDescription = (id: string) =>
  useMutation({
    mutationFn: async () => {
      const response = await apiInstance.delete(`/domain/eventDescriptions/${id}`);
      return response.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["domain"] }),
  });
