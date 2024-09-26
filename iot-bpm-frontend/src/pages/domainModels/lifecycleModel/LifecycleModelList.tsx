import { useState } from "react";
import { IconAddButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { GetEquipmentModel } from "../../../modelApi/equipmentModelApi";
import { GetLifecycleModel } from "../../../modelApi/lifecycleModelApi";
import LifecycleModelEdit from "./LifecycleModelEdit";
import LifecycleModelCreate from "./LifecycleModelCreate";
import LifecycleModelDelete from "./LifecycleModelDelete";
import { HiChevronDown } from "react-icons/hi2";
import { EventModelList } from "./eventModel/EventModelList";
import { StatusModelList } from "./statusModel/StatusModelList";

export function LifecycleModelList({ equipmentModel }: { equipmentModel: GetEquipmentModel }) {
  const [isCreatingOpen, setIsCreatingOpen] = useState(false);

  return (
    <div className="space-y-4 rounded-md bg-slate-900 p-4">
      <div className="flex">
        <h3 className="flex-grow font-medium">Lifecycle Models</h3>
        <div>
          <IconAddButton onClick={() => setIsCreatingOpen(true)} />
        </div>
      </div>
      <div>
        <ul className="divide-y divide-slate-700">
          {equipmentModel.lifecycleModels.map((lifecycleModel) => (
            <li key={lifecycleModel._id}>
              <LifecycleModel equipmentModelId={equipmentModel._id} lifecycleModel={lifecycleModel} />
            </li>
          ))}
        </ul>
        {isCreatingOpen && <LifecycleModelCreate equipmentModelId={equipmentModel._id} setIsOpen={setIsCreatingOpen} />}
      </div>
    </div>
  );
}

function LifecycleModel({ lifecycleModel, equipmentModelId }: { lifecycleModel: GetLifecycleModel; equipmentModelId: string }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const startEdit = () => {
    setIsEditOpen(true);
  };

  const startDelete = () => {
    setIsDeleteOpen(true);
  };

  return (
    <>
      <details className="group" name="lifecycleModel">
        <summary className="flex cursor-pointer items-center space-x-4">
          <HiChevronDown className="group-open:rotate-180" size="16" />
          <span className="grow font-medium">{lifecycleModel.lifecycleName}</span>
          <IconEditButton onClick={startEdit} />
          <IconDeleteButton onClick={startDelete} />
        </summary>
        <div className="ml-6 space-y-2">
          <span className="font-light">Lifecycle Events</span>
          <div>
            <EventModelList
              eventModels={lifecycleModel.eventModels}
              equipmentModelId={equipmentModelId}
              lifecycleModelId={lifecycleModel._id}
            />
          </div>
          <span className="font-light">Lifecycle Status</span>
          <div>
            <StatusModelList
              statusModels={lifecycleModel.statusModels}
              equipmentModelId={equipmentModelId}
              lifecycleModelId={lifecycleModel._id}
            />
          </div>
        </div>
      </details>
      {isEditOpen && <LifecycleModelEdit equipmentModelId={equipmentModelId} lifecycleModel={lifecycleModel} setIsOpen={setIsEditOpen} />}
      {isDeleteOpen && (
        <LifecycleModelDelete equipmentModelId={equipmentModelId} lifecycleModel={lifecycleModel} setIsOpen={setIsDeleteOpen} />
      )}
    </>
  );
}
