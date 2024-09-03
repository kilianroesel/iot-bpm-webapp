import { useRef } from "react";
import {
  GetRangeTriggerEventDescription,
  GetScalarTriggerEventDescription,
  PopulatedGetEquipmentDescription,
} from "../../../iotBpmBackend/interfaces";
import EventDescriptionDelete from "./EventDescriptionDelete";
import EventDescriptionCreate from "./EventDesciptionCreate";
import EventDescriptionEdit from "./EventDescriptionEdit";
import { IconButton } from "../../../components/forms/Buttons";
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from "react-icons/hi2";

export function EventDescriptions({ equipment }: { equipment: PopulatedGetEquipmentDescription }) {
  const createDialogRef = useRef<HTMLDialogElement>(null);
  const startCreate = () => {
    if (createDialogRef.current) {
      createDialogRef.current.showModal();
    }
  };

  return (
    <div className="space-y-4 rounded-md bg-blue-200 p-4">
      <div className="grid grid-cols-12">
        <h3 className="col-span-11 font-medium">Event Descriptions Fields</h3>
        <div className="justify-self-center">
          <IconButton onClick={startCreate}>
            <HiPlus size="18" />
          </IconButton>
        </div>
        <EventDescriptionCreate dialogRef={createDialogRef} equipmentId={equipment.id} />
      </div>
      <div>
        <ul>
          {equipment.events.map((eventDescription) => (
            <li key={eventDescription.id}>
              <EventDescription eventDescription={eventDescription} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EventDescription({
  eventDescription,
}: {
  eventDescription: GetRangeTriggerEventDescription | GetScalarTriggerEventDescription;
}) {
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  const startEdit = () => {
    if (editDialogRef.current) {
      editDialogRef.current.showModal();
    }
  };

  const startDelete = () => {
    if (deleteDialogRef.current) {
      deleteDialogRef.current.showModal();
    }
  };
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3 truncate">{eventDescription.name}</div>
        <div className="col-span-7 truncate">{eventDescription.field}</div>
        <div className="col-span-1 justify-self-center">
          <IconButton onClick={() => startEdit()}>
            <HiOutlinePencil size="18" />
          </IconButton>
        </div>
        <div className="col-span-1 justify-self-center">
          <IconButton onClick={() => startDelete()}>
            <HiOutlineTrash size="18" />
          </IconButton>
        </div>
      </div>
      <EventDescriptionEdit dialogRef={editDialogRef} eventDescription={eventDescription} />
      <EventDescriptionDelete dialogRef={deleteDialogRef} eventDescription={eventDescription} />
    </>
  );
}
