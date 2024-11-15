import { useState } from "react";
import { IconAddButton, IconButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { GetResourceModel, useCreateResourceNameRule, useDeleteResourceNameRule } from "../../../modelApi/resourceModelApi";
import { HiDocumentCheck, HiDocumentMinus, HiDocumentPlus, HiOutlineDocumentArrowDown, HiOutlineDocumentArrowUp } from "react-icons/hi2";
import ResourceModelCreate from "./ResourceModelCreate";
import ResourceModelEdit from "./ResourceModelEdit";
import ResourceModelDelete from "./ResourceModelDelete";

export function ResourceModelList({ resourceModels, machineModelId }: { resourceModels: GetResourceModel[]; machineModelId: string }) {
  const [isCreatingOpen, setIsCreatingOpen] = useState(false);

  return (
    <div className="space-y-4 rounded-md bg-slate-900 p-4">
      <div className="flex">
        <h3 className="flex-grow font-medium">Recource Models</h3>
        <div>
          <IconAddButton onClick={() => setIsCreatingOpen(true)} />
        </div>
        {isCreatingOpen && <ResourceModelCreate setIsOpen={setIsCreatingOpen} machineModelId={machineModelId} />}
      </div>
      <div>
        <ul>
          {resourceModels.map((resourceModel) => (
            <li key={resourceModel._id}>
              <ResourceModel machineModelId={machineModelId} resourceModel={resourceModel} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ResourceModel({ resourceModel, machineModelId }: { resourceModel: GetResourceModel; machineModelId: string }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const createEventEnrichmentRule = useCreateResourceNameRule(machineModelId, resourceModel._id);
  const deleteEventEnrichmentRule = useDeleteResourceNameRule(machineModelId, resourceModel._id);

  const startEdit = () => {
    setIsEditOpen(true);
  };

  const startDelete = () => {
    setIsDeleteOpen(true);
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-grow items-center space-x-4">
          {resourceModel.ruleStatus == "NOT_RELEASED" && (
            <span>
              <HiDocumentPlus className="text-blue-500" size="22" />
            </span>
          )}
          {resourceModel.ruleStatus == "ACTIVE" && (
            <span>
              <HiDocumentCheck className="text-green-500" size="22" />
            </span>
          )}
          {resourceModel.ruleStatus == "UPDATED" && (
            <span>
              <HiDocumentMinus className="text-orange-500" size="22" />
            </span>
          )}
          <span>{resourceModel.resourceModelName}</span>
        </div>
        <div className="flex items-center justify-end space-x-4">
          {(resourceModel.ruleStatus == "NOT_RELEASED" || resourceModel.ruleStatus == "UPDATED") && (
            <IconButton onClick={() => createEventEnrichmentRule.mutate()} className="inline-block h-full text-emerald-600 hover:text-emerald-500">
              <HiOutlineDocumentArrowUp size="22" />
            </IconButton>
          )}
          {(resourceModel.ruleStatus == "ACTIVE" || resourceModel.ruleStatus == "UPDATED") && (
            <IconButton onClick={() => deleteEventEnrichmentRule.mutate()} className="inline-block h-full text-amber-600 hover:text-amber-500">
              <HiOutlineDocumentArrowDown size="22" />
            </IconButton>
          )}
          <IconEditButton onClick={startEdit} />
          <IconDeleteButton onClick={startDelete} />
        </div>
      </div>
      {isEditOpen && <ResourceModelEdit machineModelId={machineModelId} resourceModel={resourceModel} setIsOpen={setIsEditOpen} />}
      {isDeleteOpen && <ResourceModelDelete machineModelId={machineModelId} resourceModel={resourceModel} setIsOpen={setIsDeleteOpen} />}
    </>
  );
}
