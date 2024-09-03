import { useSuspenseQuery } from "@tanstack/react-query";
import { machineDescriptionsQuery } from "../../iotBpmBackend/api";
import { Link } from "react-router-dom";

export default function MachineDescriptionsList() {
  const { data: machineDescriptions } = useSuspenseQuery(machineDescriptionsQuery());

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
        {machineDescriptions.map((machineDescription) => (
          <tr key={machineDescription.id} className="hover:bg-gray-100">
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
              <Link to={machineDescription.id} className="after:content-['_↗']">
                {machineDescription.machineName}
              </Link>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
              {machineDescription.versionCsiStd}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
              {machineDescription.versionCsiSpecific}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
              {machineDescription.machineSoftwareVersion}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-black">
              {machineDescription.machineMasterSoftwareVersion}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
