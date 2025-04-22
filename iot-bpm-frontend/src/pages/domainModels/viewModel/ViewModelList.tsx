import { useState } from "react";
import { IconAddButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { GetEquipmentModel } from "../../../modelApi/equipmentModelApi";
import { GetViewModel } from "../../../modelApi/viewModelApi";
import ViewModelEdit from "./ViewModelEdit";
import ViewModelCreate from "./ViewModelCreate";
import ViewModelDelete from "./ViewModelDelete";
import { HiChevronDown } from "react-icons/hi2";
import { EventModelList } from "./eventModel/EventModelList";
import { StatusModelList } from "./statusModel/StatusModelList";

export default function ViewModelList({ equipmentModel }: { equipmentModel: GetEquipmentModel }) {
  const [isCreatingOpen, setIsCreatingOpen] = useState(false);

  return (
    <div className="space-y-4 rounded-md border border-black p-4">
      <div className="flex">
        <h3 className="flex-grow font-medium">View Models</h3>
        <div>
          <IconAddButton onClick={() => setIsCreatingOpen(true)} />
        </div>
      </div>
      <div>
        <ul className="divide-y divide-slate-700">
          {equipmentModel.viewModels.map((viewModel) => (
            <li key={viewModel._id}>
              <ViewModel equipmentModelId={equipmentModel._id} viewModel={viewModel} />
            </li>
          ))}
        </ul>
        {isCreatingOpen && <ViewModelCreate equipmentModelId={equipmentModel._id} setIsOpen={setIsCreatingOpen} />}
      </div>
    </div>
  );
}

function ViewModel({ viewModel, equipmentModelId }: { viewModel: GetViewModel; equipmentModelId: string }) {
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
      <details className="group" name="viewModel">
        <summary className="flex cursor-pointer items-center space-x-4">
          <HiChevronDown className="group-open:rotate-180" size="16" />
          <span className="grow font-medium">{viewModel.viewName}</span>
          <IconEditButton onClick={startEdit} />
          <IconDeleteButton onClick={startDelete} />
        </summary>
        <div className="ml-6 space-y-2">
          <span className="font-light">View Events</span>
          <div>
            <EventModelList
              eventModels={viewModel.eventModels}
              equipmentModelId={equipmentModelId}
              viewModelId={viewModel._id}
            />
          </div>
          <span className="font-light">View Status</span>
          <div>
            <StatusModelList
              statusModels={viewModel.statusModels}
              equipmentModelId={equipmentModelId}
              viewModelId={viewModel._id}
            />
          </div>
        </div>
      </details>
      {isEditOpen && <ViewModelEdit equipmentModelId={equipmentModelId} viewModel={viewModel} setIsOpen={setIsEditOpen} />}
      {isDeleteOpen && (
        <ViewModelDelete equipmentModelId={equipmentModelId} viewModel={viewModel} setIsOpen={setIsDeleteOpen} />
      )}
    </>
  );
}
