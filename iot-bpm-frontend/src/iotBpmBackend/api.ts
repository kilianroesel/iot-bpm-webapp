import axios from "axios";
import { GetMachineDescription, UpsertMachineDescription } from "./interfaces";
import { queryOptions } from "@tanstack/react-query";

const baseUrl = import.meta.env.VITE_IOT_BPM_BACKEND;

const apiInstance = axios.create({
  baseURL: baseUrl,
});

export const domainModelsQuery = () =>
  queryOptions({
    queryKey: ["domain", "domainModels"],
    queryFn: async () => {
      const response = await apiInstance.get<GetMachineDescription[]>(
        "/domain/machineDescriptions",
      );
      return response.data;
    },
  });

export const domainModelQuery = (id: string) =>
  queryOptions({
    queryKey: ["domain", "domainModel", id],
    queryFn: async () => {
      const response = await apiInstance.get<UpsertMachineDescription>(
        `/domain/machineDescriptions/${id}`,
      );
      return response.data;
    },
  });
