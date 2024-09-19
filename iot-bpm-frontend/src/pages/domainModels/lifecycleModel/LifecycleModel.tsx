import { useState } from "react";
import { IconAddButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { GetPopulatedEquipmentModel } from "../../../modelApi/equipmentModelApi";
import { GetLifecycleModel } from "../../../modelApi/lifecycleModelApi";
import LifecycleModelEdit from "./LifecycleModelEdit";
import LifecycleModelCreate from "./LifecycleModelCreate";
import LifecycleModelDelete from "./LifecycleModelDelete";
import { HiChevronDown } from "react-icons/hi2";
import { EventModels } from "./eventModel/EventModels";

export function LifecycleModels({ equipmentModel }: { equipmentModel: GetPopulatedEquipmentModel }) {
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
        <summary className="flex items-center space-x-2 cursor-pointer">
          <HiChevronDown className="group-open:rotate-180" size="16"/>
          <div className="grow">
            {lifecycleModel.lifecycleName}
          </div>
          <div className="flex items-center justify-end space-x-4">
            <IconEditButton onClick={startEdit} />
            <IconDeleteButton onClick={startDelete} />
          </div>
        </summary>
        <div className="ml-6">
          <EventModels eventModels={lifecycleModel.eventModels} equipmentModelId={equipmentModelId} lifecycleModelId={lifecycleModel._id}/>
        </div>
      </details>
      {isEditOpen && <LifecycleModelEdit equipmentModelId={equipmentModelId} lifecycleModel={lifecycleModel} setIsOpen={setIsEditOpen} />}
      {isDeleteOpen && (
        <LifecycleModelDelete equipmentModelId={equipmentModelId} lifecycleModel={lifecycleModel} setIsOpen={setIsDeleteOpen} />
      )}
    </>
  );
}
