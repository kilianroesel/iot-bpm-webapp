import { useState } from "react";
import { IconAddButton, IconButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { GetObjectModel } from "../../../modelApi/objectModelApi";
import { HiDocumentCheck, HiDocumentMinus, HiDocumentPlus, HiRocketLaunch } from "react-icons/hi2";
import ObjectModelEdit from "./ObjectModelEdit";
import ObjectModelCreate from "./ObjectModelCreate";
import ObjectModelDelete from "./ObjectModelDelete";

export function ObjectModels({ objectModels, machineModelId }: { objectModels: GetObjectModel[], machineModelId: string }) {
  const [isCreatingOpen, setIsCreatingOpen] = useState(false);

  return (
    <div className="space-y-4 rounded-md bg-slate-900 p-4">
      <div className="flex">
        <h3 className="flex-grow font-medium">Object Models</h3>
        <div>
          <IconAddButton onClick={() => setIsCreatingOpen(true)} />
        </div>
        {isCreatingOpen && <ObjectModelCreate setIsOpen={setIsCreatingOpen} machineModelId={machineModelId} />}
      </div>
      <div>
        <ul>
          {objectModels.map((objectModel) => (
            <li key={objectModel._id}>
              <ObjectModel machineModelId={machineModelId} objectModel={objectModel} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ObjectModel({
  objectModel,
  machineModelId,
}: {
  objectModel: GetObjectModel;
  machineModelId: string;
}) {
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
      <div className="flex">
        <div className="flex-grow flex items-center space-x-2">
          {objectModel.ruleStatus == "NOT_RELEASED" && (
            <span>
              <HiDocumentPlus className="text-blue-500" size="22" />
            </span>
          )}
          {objectModel.ruleStatus == "ACTIVE" && (
            <span>
              <HiDocumentCheck className="text-green-500" size="22" />
            </span>
          )}
          {objectModel.ruleStatus == "UPDATED" && (
            <span>
              <HiDocumentMinus className="text-orange-500" size="22" />
            </span>
          )}
          <span>{objectModel.objectModelName}</span>
        </div>
        <div className="flex items-center justify-end space-x-4">
          {(objectModel.ruleStatus == "NOT_RELEASED" || objectModel.ruleStatus == "UPDATED") && (
            <IconButton
              onClick={() => console.log("click")}
              className="inline-block h-full text-fuchsia-600 hover:text-fuchsia-500"
            >
              <HiRocketLaunch size="22" />
            </IconButton>
          )}
          <IconEditButton onClick={startEdit} />
          <IconDeleteButton onClick={startDelete} />
        </div>
      </div>
      {isEditOpen && <ObjectModelEdit machineModelId={machineModelId} objectModel={objectModel} setIsOpen={setIsEditOpen} />}
      {isDeleteOpen && <ObjectModelDelete machineModelId={machineModelId} objectModel={objectModel} setIsOpen={setIsDeleteOpen} />}
    </>
  );
}