import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { equipmentDescriptionQuery, machineDescriptionQuery } from "../../iotBpmBackend/api";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.id) throw new Error("No machine description Id provided");
    if (!params["*"]) return (await queryClient.ensureQueryData(machineDescriptionQuery(params.id))).equipment;
    const id = params["*"].split("/").filter(Boolean).pop() || "";
    // If sub then retrieve equipment by equipmentId
    const equipment = await queryClient.ensureQueryData(equipmentDescriptionQuery(id));
    if (!equipment) throw new Error("Equipment not found");
    return equipment;
  };

export default function EquipmentDetail() {
  const equipment = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;
  console.log(equipment);

  return (
    <div className="bg-red-100">
      <div className="font-medium">{equipment.name}</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-md bg-blue-700 p-4">
          <div className="font-medium">Status Fields</div>
          {equipment.statusFields.map((statusField) => (
            <div>{statusField}</div>
          ))}
        </div>
        <div className="rounded-md bg-blue-700 p-4">
          <div className="font-medium">Events</div>
          {equipment.events.map((event) => (
            <div>{event}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
