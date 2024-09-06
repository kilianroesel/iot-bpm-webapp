import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router-dom";
import { machineModelQuery } from "../../../modelApi/machineModel";

export default function MachineModelBase() {
  const params = useParams();
  if (!params.machineModelId) throw new Error("No machine description ID provided");
  const { data: machineModel } = useSuspenseQuery(machineModelQuery(params.machineModelId));

  return (
    <>
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-md bg-slate-900 p-4 space-y-4">
            <h3 className="font-medium text-3xl">Scope</h3>
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
          <h3 className="font-medium text-3xl">Topology</h3>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
