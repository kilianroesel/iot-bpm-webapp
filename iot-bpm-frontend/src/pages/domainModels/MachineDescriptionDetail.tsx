import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { machineDescriptionQuery } from "../../iotBpmBackend/api";
import { BreadCrumbLink } from "../../components/links/BreadCrumb";

export default function MachineDescriptionDetail() {
  const params = useParams();
  if (!params.machineDescriptionId) throw new Error("No machine description ID provided");
  const { data: machineDescription } = useSuspenseQuery(machineDescriptionQuery(params.machineDescriptionId));

  return (
    <>
      <BreadCrumbLink to={machineDescription.mainEquipment.id}>Machines and Components</BreadCrumbLink>
      <div className="bg-blue-900 p-4">TODO</div>
    </>
  );
}
