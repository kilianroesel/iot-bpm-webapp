import { useRef } from "react";
import { GetStatusField, PopulatedGetEquipmentDescription } from "../../../iotBpmBackend/interfaces";
import StatusCreate from "./StatusCreate";
import StatusDelete from "./StatusDelete";
import StatusEdit from "./StatusEdit";
import { IconButton } from "../../../components/forms/Buttons";
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi2";

export function StatusFields({ equipment }: { equipment: PopulatedGetEquipmentDescription }) {
  const createDialogRef = useRef<HTMLDialogElement>(null);

  const startCreate = () => {
    if (createDialogRef.current) {
      createDialogRef.current.showModal();
    }
  };

  return (
    <div className="space-y-4 rounded-md bg-blue-200 p-4">
      <div className="grid grid-cols-12">
        <h3 className="col-span-11 font-medium">Status Fields</h3>
        <div className="justify-self-center">
          <IconButton onClick={startCreate}>
            <HiPlus size="18" />
          </IconButton>
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
      <div className="grid grid-cols-12">
        <div className="col-span-3 truncate">{statusField.name}</div>
        <div className="col-span-7 truncate">{statusField.field}</div>
        <div className="col-span-1 justify-self-center">
          <IconButton onClick={() => startEditStatus()}>
            <HiOutlinePencil size="18" />
          </IconButton>
        </div>
        <div className="col-span-1 justify-self-center">
          <IconButton onClick={() => startDeletingStatus()}>
            <HiOutlineTrash size="18" />
          </IconButton>
        </div>
      </div>
      <StatusEdit dialogRef={editDialogRef} statusField={statusField} />
      <StatusDelete dialogRef={deleteDialogRef} statusField={statusField} />
    </>
  );
}
