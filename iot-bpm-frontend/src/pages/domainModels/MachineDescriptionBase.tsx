import { useSuspenseQuery } from "@tanstack/react-query";
import { machineDescriptionQuery } from "../../iotBpmBackend/api";
import { Outlet, useParams } from "react-router-dom";

export default function MachineDescriptionBase() {
  const params = useParams();
  if (!params.machineDescriptionId) throw new Error("No machine description ID provided");
  const { data: machineDescription } = useSuspenseQuery(machineDescriptionQuery(params.machineDescriptionId));

  return (
    <>
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-md bg-blue-700 p-4">
            <h3 className="font-medium">Scope</h3>
            <div className="grid grid-cols-2">
              <div>Machine Name</div>
              <div>{machineDescription.machineName}</div>
              <div>Version Csi Standard</div>
              <div>{machineDescription.versionCsiStd}</div>
              <div>Version Csi Specific</div>
              <div>{machineDescription.versionCsiSpecific}</div>
              <div>Machine Software Version</div>
              <div>{machineDescription.machineSoftwareVersion}</div>
              <div>Machine Master Software Version</div>
              <div>{machineDescription.machineMasterSoftwareVersion}</div>
            </div>
          </div>
          <div className="col-span-2 rounded-md bg-blue-700 p-4">
            <h3 className="font-medium">Topology</h3>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
