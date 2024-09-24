import { useState } from "react";
import StatusCreate from "./StatusCreate";
import StatusDelete from "./StatusModelDelete";
import StatusEdit from "./StatusEdit";
import { IconAddButton, IconButton, IconDeleteButton, IconEditButton } from "../../../../components/links/IconButtons";
import { GetPopulatedStatusModel, useCreateEventEnrichmentRule, useDeleteEventEnrichmentRule } from "../../../../modelApi/statusModelApi";
import { HiDocumentCheck, HiDocumentMinus, HiDocumentPlus, HiOutlineDocumentArrowDown, HiOutlineDocumentArrowUp } from "react-icons/hi2";

export function StatusModels({
  statusModels,
  equipmentModelId,
  lifecycleModelId,
}: {
  statusModels: GetPopulatedStatusModel[];
  equipmentModelId: string;
  lifecycleModelId: string;
}) {
  const [isCreatingOpen, setIsCreatingOpen] = useState(false);

  return (
    <div className="space-y-4 border-t border-slate-800">
      <ul>
        {statusModels.map((statusModel) => (
          <li key={statusModel._id}>
            <StatusModel statusModel={statusModel} equipmentModelId={equipmentModelId} lifecycleModelId={lifecycleModelId} />
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <IconAddButton onClick={() => setIsCreatingOpen(true)} />
        {isCreatingOpen && (
          <StatusCreate setIsOpen={setIsCreatingOpen} equipmentModelId={equipmentModelId} lifecycleModelId={lifecycleModelId} />
        )}
      </div>
    </div>
  );
}

function StatusModel({
  statusModel,
  equipmentModelId,
  lifecycleModelId,
}: {
  statusModel: GetPopulatedStatusModel;
  equipmentModelId: string;
  lifecycleModelId: string;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const createEventEnrichmentRule = useCreateEventEnrichmentRule(equipmentModelId, lifecycleModelId, statusModel._id);
  const deleteEventEnrichmentRule = useDeleteEventEnrichmentRule(equipmentModelId, lifecycleModelId, statusModel._id);

  const startEditStatus = () => {
    setIsEditOpen(true);
  };

  const startDeletingStatus = () => {
    setIsDeleteOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-8">
        <div className="col-span-3 flex items-center space-x-2">
          {statusModel.ruleStatus == "NOT_RELEASED" && (
            <span>
              <HiDocumentPlus className="text-blue-500" size="22" />
            </span>
          )}
          {statusModel.ruleStatus == "ACTIVE" && (
            <span>
              <HiDocumentCheck className="text-green-500" size="22" />
            </span>
          )}
          {statusModel.ruleStatus == "UPDATED" && (
            <span>
              <HiDocumentMinus className="text-orange-500" size="22" />
            </span>
          )}
          <span>{statusModel.statusName}</span>
        </div>
        <div className="col-span-4 truncate">{statusModel.field}</div>
        <div className="col-span-1 flex items-center justify-end space-x-2">
          {(statusModel.ruleStatus == "NOT_RELEASED" || statusModel.ruleStatus == "UPDATED") && (
            <IconButton
              onClick={() => createEventEnrichmentRule.mutate()}
              className="inline-block h-full text-emerald-600 hover:text-emerald-500"
            >
              <HiOutlineDocumentArrowUp size="22" />
            </IconButton>
          )}
          {(statusModel.ruleStatus == "ACTIVE" || statusModel.ruleStatus == "UPDATED") && (
            <IconButton
              onClick={() => deleteEventEnrichmentRule.mutate()}
              className="inline-block h-full text-amber-600 hover:text-amber-500"
            >
              <HiOutlineDocumentArrowDown size="22" />
            </IconButton>
          )}
          <IconEditButton onClick={() => startEditStatus()} />
          <IconDeleteButton onClick={() => startDeletingStatus()} />
        </div>
      </div>
      {isEditOpen && (
        <StatusEdit
          statusModel={statusModel}
          equipmentModelId={equipmentModelId}
          lifecycleModelId={lifecycleModelId}
          setIsOpen={setIsEditOpen}
        />
      )}
      {isDeleteOpen && (
        <StatusDelete
          statusModel={statusModel}
          equipmentModelId={equipmentModelId}
          lifecycleModelId={lifecycleModelId}
          setIsOpen={setIsDeleteOpen}
        />
      )}
    </>
  );
}
