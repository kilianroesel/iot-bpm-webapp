import { QueryClient } from "@tanstack/react-query";
import { machineDescriptionsQuery } from "../../iotBpmBackend/api";
import { Link, useLoaderData } from "react-router-dom";

export const loader = (queryClient: QueryClient) => async () => {
  const domaimModel = await queryClient.ensureQueryData(machineDescriptionsQuery());
  return domaimModel;
};

export default function DomainModelList() {
  const domainModels = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;

  return (
    <table className="min-w-full table-fixed divide-y divide-blue-400">
      <thead className="bg-blue-700">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
            Machine Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
            Version Csi Std
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
            Version Csi Specific
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
            Machine Software Version
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300">
            Machine Master Software Version
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-blue-300 divide-gray-200">
        {domainModels.map((domainModel) => (
          <tr key={domainModel.id} className="hover:bg-gray-100">
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
              <Link to={domainModel.id} className="after:content-['_↗']">
                {domainModel.machineName}
              </Link>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
              {domainModel.versionCsiStd}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
              {domainModel.versionCsiSpecific}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
              {domainModel.machineSoftwareVersion}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
              {domainModel.machineMasterSoftwareVersion}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
