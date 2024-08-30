import { QueryClient } from "@tanstack/react-query";
import { machineDescriptionQuery } from "../../iotBpmBackend/api";
import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.id) {
      throw new Error("No domain model ID provided");
    }
    const domainModel = await queryClient.ensureQueryData(machineDescriptionQuery(params.id));
    return domainModel;
  };

export default function DomainModelDetailBase() {
  const domainModel = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-md bg-blue-700 p-4">
          <div className="text-lg">Scope</div>
          <div>{domainModel.machineName}</div>
          <div>{domainModel.versionCsiStd}</div>
          <div>{domainModel.versionCsiSpecific}</div>
          <div>{domainModel.machineSoftwareVersion}</div>
          <div>{domainModel.machineMasterSoftwareVersion}</div>
        </div>
        <div className="col-span-2 rounded-md bg-blue-700 p-4">
          <div className="text-lg">Topology</div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}