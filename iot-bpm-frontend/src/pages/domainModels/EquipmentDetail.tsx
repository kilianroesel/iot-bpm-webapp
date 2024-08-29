import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { domainModelQuery } from "../../iotBpmBackend/api";
import { SubEquipment } from "../../iotBpmBackend/interfaces";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.id)
      throw new Error("No domain model ID provided");   
    const equipment: any = await queryClient.ensureQueryData(domainModelQuery(params.id));
    if (!params["*"])
      return equipment;
    const subEquipment: SubEquipment = params["*"]
      .split("/")
      .flatMap((subEquipment) => ["subEquipment", subEquipment])
      .reduce((acc, path) => acc && acc[path], equipment);
    if (!subEquipment)
      throw new Error("Not found 404");
    return subEquipment;
  };

export default function EquipmentDetail() {
  const equipment: SubEquipment = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;
  return (
    <div className="bg-red-100">
      <div className="font-medium">{equipment.name}</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-md bg-blue-700 p-4">
          <div className="font-medium">Status Fields</div>
          <ul>
            {equipment.statusFields
              ? Object.entries(equipment.statusFields).map(([key, status]) => (
                  <li key={key} className="flex gap-4">
                    <div>{key}</div>
                    <div>{status}</div>
                  </li>
                ))
              : "No status defined for this equipment."}
          </ul>
        </div>
        <div className="rounded-md bg-blue-700 p-4">
          <div className="font-medium">Events</div>
          <ul>
            {equipment.events
              ? Object.entries(equipment.events).map(([key, event]) => (
                  <li key={key} className="flex gap-4">
                    <div>{key}</div>
                    <div>{event.field}</div>
                  </li>
                ))
              : "No events defined for this equipment."}
          </ul>
        </div>
      </div>
    </div>
  );
}
