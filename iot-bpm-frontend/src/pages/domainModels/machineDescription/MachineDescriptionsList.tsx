import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { machineDescriptionsQuery } from "../../../modelApi/machineModel";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { IconAddButton } from "../../../components/links/IconButtons";
import { useRef } from "react";
import MachineDescriptionCreate from "./MachineDescriptionCreate";

export default function MachineDescriptionsList() {
  const { data: machineDescriptions } = useSuspenseQuery(machineDescriptionsQuery());
  const createDialogRef = useRef<HTMLDialogElement>(null);

  const startCreate = () => {
    if (createDialogRef.current) {
      createDialogRef.current.showModal();
    }
  };

  // rounded-md bg-slate-900 p-4 space-y-4
  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-md bg-slate-900">
      <MachineDescriptionCreate dialogRef={createDialogRef} />
        <table className="min-w-full table-fixed divide-y divide-blue-400">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Machine Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Version Csi Std</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Version Csi Specific</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Machine Software Version
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                <div className="flex items-center space-x-4">
                  <span className="flex-grow">Machine Master Software Version</span>
                  <IconAddButton onClick={startCreate}/>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-300 divide-cyan-200 text-sm font-medium">
            {machineDescriptions.map((machineDescription) => (
              <tr key={machineDescription.id}>
                <td className="group flex items-center whitespace-nowrap px-6 py-4">
                  <Link to={machineDescription.id}>
                    <div className="flex items-center space-x-2 group-hover:text-white">
                      <div>{machineDescription.machineName}</div>
                      <HiArrowTopRightOnSquare className="text-blue-600 group-hover:text-blue-500" size="18" />
                    </div>
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{machineDescription.versionCsiStd}</td>
                <td className="whitespace-nowrap px-6 py-4">{machineDescription.versionCsiSpecific}</td>
                <td className="whitespace-nowrap px-6 py-4">{machineDescription.machineSoftwareVersion}</td>
                <td className="whitespace-nowrap px-6 py-4">{machineDescription.machineMasterSoftwareVersion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
