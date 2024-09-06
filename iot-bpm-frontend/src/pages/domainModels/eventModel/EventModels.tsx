import { useRef } from "react";
import EventModelDelete from "./EventModelDelete";
import EventDescriptionCreate from "./EventModelCreate";
import EventModelEdit from "./EventModelEdit";
import { IconAddButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { GetPopulatedEquipmentModel } from "../../../modelApi/equipmentModelApi";
import {
  eventModelQuery,
  GetRangeTriggerEventModel,
  GetScalarTriggerEventModel,
  useDispatchEventModel,
} from "../../../modelApi/eventModelApi";
import { useSuspenseQuery } from "@tanstack/react-query";

export function EventModels({ equipmentModel }: { equipmentModel: GetPopulatedEquipmentModel }) {
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
        <EventDescriptionCreate dialogRef={createDialogRef} equipmentId={equipmentModel._id} />
      </div>
      <div>
        <ul>
          {equipmentModel.eventModels.map((eventModel) => (
            <li key={eventModel._id}>
              <EventModel eventModel={eventModel} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EventModel({
  eventModel,
}: {
  eventModel: GetRangeTriggerEventModel | GetScalarTriggerEventModel;
}) {
  const { data: populatedEventModel } = useSuspenseQuery(eventModelQuery(eventModel._id));
  const dispatchEventDescriptionMutation = useDispatchEventModel(eventModel._id);
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

  const dispatchEventDescription = () => {
    dispatchEventDescriptionMutation.mutate();
  };

  return (
    <>
      <div className="grid grid-cols-8">
        <div className="col-span-1 flex items-center space-x-2">
          {/* {!populatedEventDescription.isDispatched && !populatedEventDescription.isDispatched && (
            <span>
              <HiDocumentPlus className="text-blue-500" size="22" />
            </span>
          )}
          {populatedEventDescription.isDispatched && populatedEventDescription.isActive && (
            <span>
              <HiDocumentCheck className="text-green-500" size="22" />
            </span>
          )}
          {!populatedEventDescription.isActive && populatedEventDescription.isDispatched && (
            <span>
              <HiDocumentMinus className="text-orange-500" size="22" />
            </span>
          )} */}
          <span>{eventModel.eventName}</span>
        </div>
        <div className="col-span-4 truncate">{eventModel.field}</div>
        <div className="col-span-1 truncate">{eventModel.triggerCategory}</div>
        <div className="col-span-1 truncate">{eventModel.triggerType}</div>
        <div className="col-span-1 flex items-center space-x-4 justify-end">
        {/* {!populatedEventDescription.isActive && (
            <IconButton
              onClick={dispatchEventDescription}
              className="inline-block h-full text-fuchsia-600 hover:text-fuchsia-500"
            >
              <HiRocketLaunch size="22" />
            </IconButton>
          )} */}
          <IconEditButton onClick={() => startEdit()} />
          <IconDeleteButton onClick={() => startDelete()} />
        </div>
      </div>
      <EventModelEdit dialogRef={editDialogRef} eventModel={eventModel} />
      <EventModelDelete dialogRef={deleteDialogRef} eventModel={eventModel} />
    </>
  );
}
