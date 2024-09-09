import { useState } from "react";
import StatusCreate from "./StatusCreate";
import StatusDelete from "./StatusModelDelete";
import StatusEdit from "./StatusEdit";
import { IconAddButton, IconButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { GetPopulatedEquipmentModel } from "../../../modelApi/equipmentModelApi";
import { GetPopulatedStatusModel, useCreateEventEnrichmentRule } from "../../../modelApi/statusModelApi";
import { HiDocumentCheck, HiDocumentMinus, HiDocumentPlus, HiRocketLaunch } from "react-icons/hi2";

export function StatusModels({ equipmentModel }: { equipmentModel: GetPopulatedEquipmentModel }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const startCreate = () => {
    setIsCreateOpen(true);
  };

  return (
    <div className="space-y-4 rounded-md bg-slate-900 p-4">
      <div className="flex">
        <h3 className="flex-grow font-medium">Status Fields</h3>
        <div className="justify-self-center">
          <IconAddButton onClick={startCreate} />
        </div>
        {isCreateOpen && <StatusCreate setIsOpen={setIsCreateOpen} equipmentModelId={equipmentModel._id} />}
      </div>
      <div>
        <ul>
          {equipmentModel.statusModels.map((statusModel) => (
            <li key={statusModel._id}>
              <StatusModel statusModel={statusModel} equipmentModelId={equipmentModel._id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatusModel({ statusModel, equipmentModelId }: { statusModel: GetPopulatedStatusModel, equipmentModelId: string }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const createEventEnrichmentRule = useCreateEventEnrichmentRule(equipmentModelId, statusModel._id);

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
        <div className="col-span-1 flex items-center space-x-4 justify-end">
          {(statusModel.ruleStatus == "NOT_RELEASED" || statusModel.ruleStatus == "UPDATED") && (
            <IconButton
              onClick={() => createEventEnrichmentRule.mutate()}
              className="inline-block h-full text-fuchsia-600 hover:text-fuchsia-500"
            >
              <HiRocketLaunch size="22" />
            </IconButton>
           )}
          <IconEditButton onClick={() => startEditStatus()} />
          <IconDeleteButton onClick={() => startDeletingStatus()} />
        </div>
      </div>
      {isEditOpen && <StatusEdit  statusModel={statusModel} equipmentModelId={equipmentModelId} setIsOpen={setIsEditOpen}/>}
      {isDeleteOpen && <StatusDelete statusModel={statusModel} equipmentModelId={equipmentModelId} setIsOpen={setIsDeleteOpen}/>}
    </>
  );
}
