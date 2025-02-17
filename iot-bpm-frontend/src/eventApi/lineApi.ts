import { queryOptions } from "@tanstack/react-query";
import { apiInstance } from "../config/modelApiConfig";

export interface GetLine {
  name: string;
}

export const linesQuery = () =>
  queryOptions({
    queryKey: ["events", "lines"],
    queryFn: async () => {
      const response = await apiInstance.get<GetLine[]>("/events/lines");
      return response.data;
    },
  });
