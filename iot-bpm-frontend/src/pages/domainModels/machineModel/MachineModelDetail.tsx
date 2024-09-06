import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BreadCrumbLink } from "../../../components/links/BreadCrumb";
import { machineModelQuery } from "../../../modelApi/machineModel";

export default function MachineModelDetail() {
  const params = useParams();
  if (!params.machineModelId) throw new Error("No machine model Id provided");
  const { data: machineModel } = useSuspenseQuery(machineModelQuery(params.machineModelId));

  return (
    <>
      <BreadCrumbLink to={machineModel.rootEquipmentModel}>Machines and Components</BreadCrumbLink>
      <div className="bg-slate-900 p-4">TODO</div>
    </>
  );
}
