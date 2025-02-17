import { useState } from "react";
import EventModelDelete from "./EventModelDelete";
import EventDescriptionCreate from "./EventModelCreate";
import EventModelEdit from "./EventModelEdit";
import { IconAddButton, IconButton, IconDeleteButton, IconEditButton } from "../../../../components/links/IconButtons";
import {
  GetRangeTriggerEventModel,
  GetScalarTriggerEventModel,
  useCreateEventAbstractionRule,
  useDeleteEventAbstractionRule,
} from "../../../../modelApi/eventModelApi";
import { HiDocumentCheck, HiDocumentMinus, HiDocumentPlus, HiOutlineDocumentArrowDown, HiOutlineDocumentArrowUp } from "react-icons/hi2";

export function EventModelList({
  eventModels,
  equipmentModelId,
  viewModelId,
}: {
  eventModels: (GetScalarTriggerEventModel | GetRangeTriggerEventModel)[];
  equipmentModelId: string;
  viewModelId: string;
}) {
  const [isCreatingOpen, setIsCreatingOpen] = useState(false);

  return (
    <div className="space-y-2 border-t border-slate-800">
      <ul>
        {eventModels.map((eventModel) => (
          <li key={eventModel._id}>
            <EventModel equipmentModelId={equipmentModelId} viewModelId={viewModelId} eventModel={eventModel} />
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        {isCreatingOpen && (
          <EventDescriptionCreate equipmentModelId={equipmentModelId} viewModelId={viewModelId} setIsOpen={setIsCreatingOpen} />
        )}
        <IconAddButton onClick={() => setIsCreatingOpen(true)} />
      </div>
    </div>
  );
}

function EventModel({
  eventModel,
  equipmentModelId,
  viewModelId,
}: {
  eventModel: GetRangeTriggerEventModel | GetScalarTriggerEventModel;
  equipmentModelId: string;
  viewModelId: string;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const createEventAbstractionRule = useCreateEventAbstractionRule(equipmentModelId, viewModelId, eventModel._id);
  const deleteEventAbstractionRule = useDeleteEventAbstractionRule(equipmentModelId, viewModelId, eventModel._id);

  const startEdit = () => {
    setIsEditOpen(true);
  };

  const startDelete = () => {
    setIsDeleteOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-2 flex items-center space-x-4">
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
        <div className="col-span-1 truncate">
          {eventModel.triggerCategory === "SCALAR_TRIGGER" && <span>{eventModel.value}</span>}
          {eventModel.triggerCategory === "RANGE_TRIGGER" && (
            <span>
              {eventModel.from} to {eventModel.to}
            </span>
          )}
        </div>
        <div className="col-span-1 flex items-center justify-end space-x-4">
          {(eventModel.ruleStatus == "NOT_RELEASED" || eventModel.ruleStatus == "UPDATED") && (
            <IconButton
              onClick={() => createEventAbstractionRule.mutate()}
              className="inline-block h-full text-emerald-600 hover:text-emerald-500"
            >
              <HiOutlineDocumentArrowUp size="22" />
            </IconButton>
          )}
          {(eventModel.ruleStatus == "ACTIVE" || eventModel.ruleStatus == "UPDATED") && (
            <IconButton
              onClick={() => deleteEventAbstractionRule.mutate()}
              className="inline-block h-full text-amber-600 hover:text-amber-500"
            >
              <HiOutlineDocumentArrowDown size="22" />
            </IconButton>
          )}
          <IconEditButton onClick={startEdit} />
          <IconDeleteButton onClick={startDelete} />
        </div>
      </div>
      {isEditOpen && (
        <EventModelEdit equipmentModelId={equipmentModelId} viewModelId={viewModelId} eventModel={eventModel} setIsOpen={setIsEditOpen} />
      )}
      {isDeleteOpen && (
        <EventModelDelete
          equipmentModelId={equipmentModelId}
          viewModelId={viewModelId}
          eventModel={eventModel}
          setIsOpen={setIsDeleteOpen}
        />
      )}
    </>
  );
}