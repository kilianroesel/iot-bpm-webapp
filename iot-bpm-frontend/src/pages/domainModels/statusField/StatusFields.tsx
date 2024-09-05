import { useRef } from "react";
import StatusCreate from "./StatusCreate";
import StatusDelete from "./StatusDelete";
import StatusEdit from "./StatusEdit";
import { IconAddButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { GetPopulatedEquipmentDescription } from "../../../modelApi/equipmentModelApi";
import { GetStatusField, statusModelFieldQuery } from "../../../modelApi/statusModelApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import { HiExclamationCircle } from "react-icons/hi2";

export function StatusFields({ equipment }: { equipment: GetPopulatedEquipmentDescription }) {
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
        <StatusCreate dialogRef={createDialogRef} equipmentId={equipment.id} />
      </div>
      <div>
        <ul>
          {equipment.statusFields.map((statusField) => (
            <li key={statusField.id}>
              <StatusField statusField={statusField} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StatusField({ statusField }: { statusField: GetStatusField }) {
  const { data: populatedStatusField } = useSuspenseQuery(statusModelFieldQuery(statusField.id));
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

  return (
    <>
      <div className="flex">
        <div className="flex-grow">
          <div className="grid grid-cols-5">
            <div className="col-span-2">
              {populatedStatusField.eventEnrichmentRule && (
                <span>
                  <HiExclamationCircle className="text-blue-500" size="24" />
                </span>
              )}
              <span>{statusField.name}</span>
            </div>
            <div className="col-span-3 truncate">{statusField.field}</div>
          </div>
        </div>
        <div className="col-span-1 space-x-4 items-center">
          <IconEditButton onClick={() => startEditStatus()} />
          <IconDeleteButton onClick={() => startDeletingStatus()} />
        </div>
      </div>
      <StatusEdit dialogRef={editDialogRef} statusField={statusField} />
      <StatusDelete dialogRef={deleteDialogRef} statusField={statusField} />
    </>
  );
}
