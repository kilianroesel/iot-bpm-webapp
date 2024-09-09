import { useState } from "react";
import EventModelDelete from "./EventModelDelete";
import EventDescriptionCreate from "./EventModelCreate";
import EventModelEdit from "./EventModelEdit";
import { IconAddButton, IconButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { GetPopulatedEquipmentModel } from "../../../modelApi/equipmentModelApi";
import { GetRangeTriggerEventModel, GetScalarTriggerEventModel, useCreateEventAbstractionRule } from "../../../modelApi/eventModelApi";
import { HiDocumentCheck, HiDocumentMinus, HiDocumentPlus, HiRocketLaunch } from "react-icons/hi2";

export function EventModels({ equipmentModel }: { equipmentModel: GetPopulatedEquipmentModel }) {
  const [isCreatingOpen, setIsCreatingOpen] = useState(false);

  return (
    <div className="space-y-4 rounded-md bg-slate-900 p-4">
      <div className="flex">
        <h3 className="flex-grow font-medium">Event Descriptions Fields</h3>
        <div>
          <IconAddButton onClick={() => setIsCreatingOpen(true)} />
        </div>
      </div>
      <div>
        <ul>
          {equipmentModel.eventModels.map((eventModel) => (
            <li key={eventModel._id}>
              <EventModel equipmentModelId={equipmentModel._id} eventModel={eventModel} />
            </li>
          ))}
        </ul>
        {isCreatingOpen && <EventDescriptionCreate equipmentModelId={equipmentModel._id} setIsOpen={setIsCreatingOpen} />}
      </div>
    </div>
  );
}

function EventModel({
  eventModel,
  equipmentModelId,
}: {
  eventModel: GetRangeTriggerEventModel | GetScalarTriggerEventModel;
  equipmentModelId: string;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const createEventAbstractionRule = useCreateEventAbstractionRule(equipmentModelId, eventModel._id);

  const startEdit = () => {
    setIsEditOpen(true);
  };

  const startDelete = () => {
    setIsDeleteOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-11">
        <div className="col-span-4 flex items-center space-x-2">
          {eventModel.ruleStatus == "NOT_RELEASED" && (
            <span>
              <HiDocumentPlus className="text-blue-500" size="22" />
            </span>
          )}
          {eventModel.ruleStatus == "ACTIVE" && (
            <span>
              <HiDocumentCheck className="text-green-500" size="22" />
            </span>
          )}
          {eventModel.ruleStatus == "UPDATED" && (
            <span>
              <HiDocumentMinus className="text-orange-500" size="22" />
            </span>
          )}
          <span>{eventModel.eventName}</span>
        </div>
        <div className="col-span-4 truncate">{eventModel.field}</div>
        <div className="col-span-1 truncate">{eventModel.triggerCategory}</div>
        <div className="col-span-1 truncate">{eventModel.triggerType}</div>
        <div className="col-span-1 flex items-center justify-end space-x-4">
          {(eventModel.ruleStatus == "NOT_RELEASED" || eventModel.ruleStatus == "UPDATED") && (
            <IconButton
              onClick={() => createEventAbstractionRule.mutate()}
              className="inline-block h-full text-fuchsia-600 hover:text-fuchsia-500"
            >
              <HiRocketLaunch size="22" />
            </IconButton>
          )}
          <IconEditButton onClick={startEdit} />
          <IconDeleteButton onClick={startDelete} />
        </div>
      </div>
      {isEditOpen && <EventModelEdit equipmentModelId={equipmentModelId} eventModel={eventModel} setIsOpen={setIsEditOpen} />}
      {isDeleteOpen && <EventModelDelete equipmentModelId={equipmentModelId} eventModel={eventModel} setIsOpen={setIsDeleteOpen} />}
    </>
  );
}
