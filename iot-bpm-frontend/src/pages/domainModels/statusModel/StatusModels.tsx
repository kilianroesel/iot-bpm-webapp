import { useRef } from "react";
import StatusCreate from "./StatusCreate";
import StatusDelete from "./StatusNodelDelete";
import StatusEdit from "./StatusEdit";
import { IconAddButton, IconButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { GetPopulatedEquipmentModel } from "../../../modelApi/equipmentModelApi";
import { GetPopulatedStatusModel, GetStatusModel, statusModelQuery, useDispatchStatusModel } from "../../../modelApi/statusModelApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { HiDocumentCheck, HiDocumentMinus, HiDocumentPlus, HiRocketLaunch } from "react-icons/hi2";

export function StatusModels({ equipmentModel }: { equipmentModel: GetPopulatedEquipmentModel }) {
  const createDialogRef = useRef<HTMLDialogElement>(null);

  const startCreate = () => {
    if (createDialogRef.current) {
      createDialogRef.current.showModal();
    }
  };

  return (
    <div className="space-y-4 rounded-md bg-slate-900 p-4">
      <div className="flex">
        <h3 className="flex-grow font-medium">Status Fields</h3>
        <div className="justify-self-center">
          <IconAddButton onClick={startCreate} />
        </div>
        <StatusCreate dialogRef={createDialogRef} equipmentId={equipmentModel._id} />
      </div>
      <div>
        <ul>
          {equipmentModel.statusModels.map((statusModel) => (
            <li key={statusModel._id}>
              <StatusModel statusModel={statusModel}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatusModel({ statusModel }: { statusModel: GetStatusModel | GetPopulatedStatusModel }) {
  const { data: populatedStatusField } = useSuspenseQuery(statusModelQuery(statusModel._id));
  const dispatchStatusFieldMutation = useDispatchStatusModel(statusModel._id);
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  const startEditStatus = () => {
    if (editDialogRef.current) {
      editDialogRef.current.showModal();
    }
  };

  const startDeletingStatus = () => {
    if (deleteDialogRef.current) {
      deleteDialogRef.current.showModal();
    }
  };

  const dispatchStatusField = () => {
    dispatchStatusFieldMutation.mutate();
  };

  return (
    <>
      <div className="grid grid-cols-8">
        <div className="col-span-3 flex items-center space-x-2">
            {!populatedStatusField.isDispatched && !populatedStatusField.isDispatched && (
              <span>
                <HiDocumentPlus className="text-blue-500" size="22" />
              </span>
            )}
            {populatedStatusField.isDispatched && populatedStatusField.isActive && (
              <span>
                <HiDocumentCheck className="text-green-500" size="22" />
              </span>
            )}
            {!populatedStatusField.isActive && populatedStatusField.isDispatched && (
              <span>
                <HiDocumentMinus className="text-orange-500" size="22" />
              </span>
            )}
            <span>{statusModel.statusName}</span>
        </div>
        <div className="col-span-4 truncate">{statusModel.field}</div>
        <div className="col-span-1 flex items-center space-x-4 justify-end">
          {!populatedStatusField.isActive && (
            <IconButton
              onClick={dispatchStatusField}
              className="inline-block h-full text-fuchsia-600 hover:text-fuchsia-500"
            >
              <HiRocketLaunch size="22" />
            </IconButton>
          )}
          <IconEditButton onClick={() => startEditStatus()} />
          <IconDeleteButton onClick={() => startDeletingStatus()} />
        </div>
      </div>
      <StatusEdit dialogRef={editDialogRef} statusModel={statusModel} />
      <StatusDelete dialogRef={deleteDialogRef} statusModel={statusModel} />
    </>
  );
}
