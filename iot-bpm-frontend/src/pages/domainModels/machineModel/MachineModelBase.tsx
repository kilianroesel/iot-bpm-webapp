import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { machineModelQuery, useCreateEventScopingeRule, useDeleteEventScopingeRule } from "../../../modelApi/machineModel";
import { IconButton, IconEditButton } from "../../../components/links/IconButtons";
import { HiDocumentCheck, HiDocumentMinus, HiDocumentPlus, HiOutlineDocumentArrowDown, HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { useState } from "react";
import MachineModelEdit from "./MachineModelEdit";
import { ResourceModelList } from "../resourceModel/ResourceModelList";

export default function MachineModelBase() {
  const params = useParams();
  if (!params.equipmentModelId) throw new Error("No Equipment Model ID provided");
  const { data: machineModel } = useSuspenseQuery(machineModelQuery(params.equipmentModelId));

  const [isEditOpen, setIsEditOpen] = useState(false);

  const startEditStatus = () => {
    setIsEditOpen(true);
  };

  const createEventScopingRule = useCreateEventScopingeRule(params.equipmentModelId);
  const deleteEventScopingRule = useDeleteEventScopingeRule(params.equipmentModelId);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-4 col-span-3 rounded-md border border-black p-4">
          <div className="flex items-center space-x-4">
            {machineModel.ruleStatus == "NOT_RELEASED" && (
              <span>
                <HiDocumentPlus className="text-blue-500" size="28" />
              </span>
            )}
            {machineModel.ruleStatus == "ACTIVE" && (
              <span>
                <HiDocumentCheck className="text-green-500" size="28" />
              </span>
            )}
            {machineModel.ruleStatus == "UPDATED" && (
              <span>
                <HiDocumentMinus className="text-orange-500" size="28" />
              </span>
            )}
            <h3 className="grow text-3xl font-medium">Scope</h3>
            {(machineModel.ruleStatus == "NOT_RELEASED" || machineModel.ruleStatus == "UPDATED") && (
              <IconButton
                onClick={() => createEventScopingRule.mutate()}
                className="inline-block h-full text-emerald-600 hover:text-emerald-500"
              >
                <HiOutlineDocumentArrowUp size="22" />
              </IconButton>
            )}
            {(machineModel.ruleStatus == "ACTIVE" || machineModel.ruleStatus == "UPDATED") && (
              <IconButton
                onClick={() => deleteEventScopingRule.mutate()}
                className="inline-block h-full text-amber-600 hover:text-amber-500"
              >
                <HiOutlineDocumentArrowDown size="22" />
              </IconButton>
            )}
            <IconEditButton onClick={() => startEditStatus()} />
          </div>
          <div className="grid grid-cols-3">
            <div className="font-semibold">Machine Name</div>
            <div className="font-semibold">Version Csi Standard</div>
            <div className="font-semibold">Version Csi Specific</div>
            <div>{machineModel.machineName}</div>
            <div>{machineModel.versionCsiStd}</div>
            <div>{machineModel.versionCsiSpecific}</div>
          </div>
        </div>
        {isEditOpen && <MachineModelEdit machineModel={machineModel} setIsOpen={setIsEditOpen} />}
      </div>
      <div>
        <ResourceModelList resourceModels={machineModel.resourceModels} machineModelId={machineModel._id} />
      </div>
    </>
  );
}
