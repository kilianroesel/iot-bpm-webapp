import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { machineModelsQuery } from "../../../modelApi/machineModel";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { IconAddButton } from "../../../components/links/IconButtons";
import { useState } from "react";
import MachineDescriptionCreate from "./MachineModelCreate";

export default function MachineModelsList() {
  const { data: machineModels } = useSuspenseQuery(machineModelsQuery());
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const startCreate = () => {
    setIsCreateOpen(true);
  };

  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-md border border-black">
        {isCreateOpen && <MachineDescriptionCreate setIsOpen={setIsCreateOpen} />}
        <table className="min-w-full table-fixed divide-y divide-black">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Machine Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Version Csi Std</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              <div className="flex items-center space-x-4">
                  <span className="flex-grow">Version Csi Specific</span>
                  <IconAddButton onClick={startCreate} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-300 divide-black text-sm font-medium">
            {machineModels.map((machineModel) => (
              <tr key={machineModel._id}>
                <td className="group flex items-center whitespace-nowrap px-6 py-4">
                  <Link to={machineModel._id}>
                    <div className="flex items-center space-x-4 group-hover:text-slate-700">
                      <div>{machineModel.machineName}</div>
                      <HiArrowTopRightOnSquare className="text-blue-600 group-hover:text-blue-500" size="18" />
                    </div>
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4">{machineModel.versionCsiStd}</td>
                <td className="whitespace-nowrap px-6 py-4">{machineModel.versionCsiSpecific}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
