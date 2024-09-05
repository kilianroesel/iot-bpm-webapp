import { useRef } from "react";
import EventDescriptionDelete from "./EventDescriptionDelete";
import EventDescriptionCreate from "./EventDesciptionCreate";
import EventDescriptionEdit from "./EventDescriptionEdit";
import { IconAddButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { HiExclamationCircle } from "react-icons/hi2";
import { GetPopulatedEquipmentDescription } from "../../../modelApi/equipmentModelApi";
import { GetRangeTriggerEventDescription, GetScalarTriggerEventDescription } from "../../../modelApi/eventModelApi";

export function EventDescriptions({ equipment }: { equipment: GetPopulatedEquipmentDescription }) {
  const createDialogRef = useRef<HTMLDialogElement>(null);
  const startCreate = () => {
    if (createDialogRef.current) {
      createDialogRef.current.showModal();
    }
  };

  return (
    <div className="space-y-4 rounded-md bg-slate-900 p-4">
      <div className="flex">
        <h3 className="flex-grow font-medium">Event Descriptions Fields</h3>
        <div>
          <IconAddButton onClick={startCreate} />
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
      <div className="flex items-center">
        <div className="grid grid-cols-7 flex-grow">
          <div className="col-span-3 truncate">
            <div className="flex items-center space-x-2">
              {<HiExclamationCircle className="text-blue-500" size="24" />}
              <span>{eventDescription.name}</span>
            </div>
          </div>
          <div className="col-span-4 truncate">{eventDescription.field}</div>
        </div>
        <div className="flex space-x-4 items-center">
          <IconEditButton onClick={() => startEdit()} />
          <IconDeleteButton onClick={() => startDelete()} />
        </div>
      </div>
      <EventDescriptionEdit dialogRef={editDialogRef} eventDescription={eventDescription} />
      <EventDescriptionDelete dialogRef={deleteDialogRef} eventDescription={eventDescription} />
    </>
  );
}
