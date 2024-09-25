import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import EquipmentModelCreate from "./EquipmentModelCreate";
import { BreadCrumbLink } from "../../../components/links/BreadCrumb";
import { HiOutlineChevronDoubleRight } from "react-icons/hi2";
import EquipmentModelDelete from "./EquipmentModelDelete";
import { equipmentModelQuery } from "../../../modelApi/equipmentModelApi";
import { IconAddButton, IconDeleteButton, IconEditButton } from "../../../components/links/IconButtons";
import { GetEquipmentModel } from "../../../modelApi/equipmentModelApi";
import { LifecycleModelList } from "../lifecycleModel/LifecycleModelList";
import EquipmentModelEdit from "./EquipmentModelEdit";

export default function EquipmentModelDetail() {
  const params = useParams();
  if (!params.equipmentModelId) throw new Error("No Equipment model Id provided");
  const { data: equipmentModel } = useSuspenseQuery(equipmentModelQuery(params.equipmentModelId));

  return (
    <div className="space-y-4">
      <RecursiveEquipmentBreadCrumbs />
      <div className="grid grid-cols-2 gap-4">
        <EquipmentOverview equipmentModel={equipmentModel} />
        <ChildEquipment equipmentModel={equipmentModel} />
      </div>
      <div>
        <LifecycleModelList equipmentModel={equipmentModel} />
      </div>
    </div>
  );
}

function EquipmentOverview({ equipmentModel }: { equipmentModel: GetEquipmentModel }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const startEdit = () => {
    setIsEditOpen(true);
  };

  const startDelete = () => {
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 rounded-md bg-slate-900 p-4">
        <div className="flex">
          <h3 className="flex-grow font-medium">Summary</h3>
          <div className="space-x-2 justify-self-center">
            <IconEditButton onClick={startEdit} />
            <IconDeleteButton onClick={startDelete} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-yellow-500">
            <span className="font-medium">{equipmentModel.lifecycleModels.length}</span>
            <span>Lifecycles</span>
          </div>
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-green-500">
            <span className="font-medium">{equipmentModel.equipmentModels.length}</span>
            <span>Sub Equipment</span>
          </div>
          {isEditOpen && <EquipmentModelEdit setIsOpen={setIsEditOpen} equipmentModel={equipmentModel} />}
          {isDeleteOpen && <EquipmentModelDelete setIsOpen={setIsDeleteOpen} equipmentModel={equipmentModel} />}
        </div>
      </div>
    </div>
  );
}

function ChildEquipment({equipmentModel}: {equipmentModel: GetEquipmentModel}) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const startCreate = () => {
    setIsCreateOpen(true);
  };

  return (
    <>
      <div className="space-y-4 rounded-md bg-slate-900 p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h3 className="flex-grow font-medium">Child Equipment</h3>
            <IconAddButton onClick={startCreate} />
          </div>
          <ul className="flex items-center gap-4">
            {equipmentModel.equipmentModels.map((equipmentModel) => (
              <li key={equipmentModel._id} className="flex items-center">
                <BreadCrumbLink to={equipmentModel._id}>{equipmentModel.equipmentName}</BreadCrumbLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isCreateOpen && <EquipmentModelCreate setIsOpen={setIsCreateOpen} equipmentModel={equipmentModel} />}
    </>
  );
}

function RecursiveEquipmentBreadCrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((segment) => segment);
  const curPathSegment = pathSegments.splice(0, 1);

  var curPathname = "/" + curPathSegment.join("/");
  return (
    <ol className="flex items-center">
      {pathSegments.map((equipmentModelId, index) => {
        curPathname = curPathname + "/" + equipmentModelId;
        return (
          <li key={equipmentModelId} className="flex items-center">
            <BreadCrumb equipmentModelId={equipmentModelId} pathname={curPathname} />
            {index < pathSegments.length - 1 && <HiOutlineChevronDoubleRight size="20" className="mx-1 text-gray-500" />}
          </li>
        );
      })}
    </ol>
  );
}

function BreadCrumb({ equipmentModelId, pathname }: { equipmentModelId: string; pathname: string }) {
  const { data: equipmentModel } = useSuspenseQuery(equipmentModelQuery(equipmentModelId));

  return (
    <BreadCrumbLink to={pathname} end>
      {equipmentModel.equipmentName}
    </BreadCrumbLink>
  );
}
