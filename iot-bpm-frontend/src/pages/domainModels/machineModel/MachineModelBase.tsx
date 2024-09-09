import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { machineModelQuery } from "../../../modelApi/machineModel";

export default function MachineModelBase() {
  const params = useParams();
  if (!params.equipmentModelId) throw new Error("No Equipment Model ID provided");
  const { data: machineModel } = useSuspenseQuery(machineModelQuery(params.equipmentModelId));

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-4 rounded-md bg-slate-900 p-4">
        <h3 className="text-3xl font-medium">Scope</h3>
        <div className="grid grid-cols-2">
          <div className="">Machine Name</div>
          <div>{machineModel.machineName}</div>
          <div>Version Csi Standard</div>
          <div>{machineModel.versionCsiStd}</div>
          <div>Version Csi Specific</div>
          <div>{machineModel.versionCsiSpecific}</div>
          <div>Machine Software Version</div>
          <div>{machineModel.machineSoftwareVersion}</div>
          <div>Machine Master Software Version</div>
          <div>{machineModel.machineMasterSoftwareVersion}</div>
        </div>
      </div>
      <div className="col-span-2 rounded-md bg-slate-900 p-4">
        <h3 className="text-3xl font-medium">Topology</h3>
      </div>
    </div>
  );
}
