import axios from "axios";
import { PopulatedGetMachineDescription, PopulatedGetEquipmentDescription } from "./interfaces";
import { queryOptions } from "@tanstack/react-query";

const baseUrl = import.meta.env.VITE_IOT_BPM_BACKEND;

const apiInstance = axios.create({
  baseURL: baseUrl,
});

export const machineDescriptionsQuery = () =>
  queryOptions({
    queryKey: ["domain", "machineDescriptions"],
    queryFn: async () => {
      const response = await apiInstance.get<PopulatedGetMachineDescription[]>(
        "/domain/machineDescriptions",
      );
      return response.data;
    },
  });

export const machineDescriptionQuery = (id: string) =>
  queryOptions({
    queryKey: ["domain", "machineDescription", id],
    queryFn: async () => {
      const response = await apiInstance.get<PopulatedGetMachineDescription>(
        `/domain/machineDescriptions/${id}`,
      );
      return response.data;
    },
  });

  export const equipmentDescriptionQuery = (id: string) =>
    queryOptions({
      queryKey: ["domain", "equipmentDescription", id],
      queryFn: async () => {
        const response = await apiInstance.get<PopulatedGetEquipmentDescription>(
          `/domain/equipmentDescriptions/${id}`,
        );
        return response.data;
      },
    });
