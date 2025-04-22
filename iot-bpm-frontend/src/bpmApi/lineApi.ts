import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { apiInstance, wssInstance } from "../config/modelApiConfig";
import { GetMachineModel } from "../modelApi/machineModel";
import { useEffect } from "react";
import { HeuristicNet } from "../components/hnet/hnet";

export interface GetLine {
  name: string;
}

interface OcelRelationship {
  objectId: string;
  qualifier: string;
}

interface OcelAttribute {
  name: string;
  time: string;
  value: string | number | boolean;
}

export interface OcelEvent {
  id: string;
  type: string;
  time: string;
  attributes: OcelAttribute[];
  relationships: OcelRelationship[];
}

export const linesQuery = () =>
  queryOptions({
    queryKey: ["bpm", "lines"],
    queryFn: async () => {
      const response = await apiInstance.get<GetLine[]>("/bpm/lines");
      return response.data;
    },
  });

export const lineMachineQuery = (lineId: string) =>
  queryOptions({
    queryKey: ["bpm", "lines", lineId, "machines"],
    queryFn: async () => {
      const response = await apiInstance.get<GetMachineModel[]>(`/bpm/lines/${lineId}/machines`);
      return response.data;
    },
  });

export const lineOcelEventQuery = (lineId: string) =>
  queryOptions({
    queryKey: ["bpm", "lines", lineId, "events"],
    queryFn: async () => {
      const response = await apiInstance.get<OcelEvent[]>(`/bpm/lines/${lineId}/events`);
      return response.data;
    },
  });

export const lineOcelEventSubscription = (lineId: string) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const websocket = new WebSocket(`${wssInstance}/bpm/lines/${lineId}/events`);
    websocket.onmessage = (event) => {
      const ocelEvent = JSON.parse(event.data) as OcelEvent;
      const queryKey = ["bpm", "lines", lineId, "events"];

      queryClient.setQueryData<OcelEvent[]>(queryKey, (oldData) => {
        if (oldData) {
          return [ocelEvent, ...oldData].slice(0, 10);
        }
        return [ocelEvent];
      });
    };
    return () => {
      websocket.close();
    };
  }, [queryClient, lineId]);
};

export const heuristicNetsByLineQuery = (lineId: string) =>
  queryOptions({
    queryKey: ["bpm", "lines", lineId, "heuristicNets"],
    queryFn: async () => {
      const response = await apiInstance.get<string[]>(`/bpm/lines/${lineId}/heuristicNets`);
      return response.data;
    },
  });

export const heuristicNetQuery = (lineId: string, modelId: string) =>
  queryOptions({
    queryKey: ["bpm", "lines", lineId, "heuristicNets", modelId],
    queryFn: async () => {
      const response = await apiInstance.get<HeuristicNet>(`/bpm/lines/${lineId}/heuristicNets/${modelId}`);
      return response.data;
    },
  });
