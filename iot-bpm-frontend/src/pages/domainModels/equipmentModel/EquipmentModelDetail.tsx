import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { StatusModels } from "../statusModel/StatusModels";
import { EventModels } from "../eventModel/EventModels";
import { useRef } from "react";
import EquipmentModelCreate from "./EquipmentModelCreate";
import { BreadCrumbLink } from "../../../components/links/BreadCrumb";
import { HiOutlineChevronDoubleRight } from "react-icons/hi2";
import EquipmentModelDelete from "./EquipmentModelDelete";
import { equipmentModelQuery } from "../../../modelApi/equipmentModelApi";
import { IconAddButton, IconDeleteButton } from "../../../components/links/IconButtons";
import { GetPopulatedEquipmentModel } from "../../../modelApi/equipmentModelApi";

export default function EquipmentModelDetail() {
  const params = useParams();
  if (!params.equipmentModelId) throw new Error("No equipment Id provided");
  const { data: equipmentModel } = useSuspenseQuery(equipmentModelQuery(params.equipmentModelId));

  return (
    <>
      <RecursiveEquipmentBreadCrumbs />
      <div className="grid grid-cols-2 gap-4">
        <EquipmentOverview equipmentModel={equipmentModel} />
        <StatusModels equipmentModel={equipmentModel} />
      </div>
      <div>
        <EventModels equipmentModel={equipmentModel} />
      </div>
    </>
  );
}

function EquipmentOverview({ equipmentModel }: { equipmentModel: GetPopulatedEquipmentModel }) {
  const createDialogRef = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  const startCreate = () => {
    if (createDialogRef.current) {
      createDialogRef.current.showModal();
    }
  };

  const startDelete = () => {
    if (deleteDialogRef.current) {
      deleteDialogRef.current.showModal();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 rounded-md bg-slate-900 p-4">
        <div className="flex">
          <h3 className="flex-grow font-medium">Summary</h3>
          <div className="justify-self-center">
            <IconDeleteButton onClick={startDelete} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-cyan-500">
            <span className="font-medium">{equipmentModel.statusModels.length}</span>
            <span>Statusfields</span>
          </div>
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-yellow-500">
            <span className="font-medium">{equipmentModel.eventModels.length}</span>
            <span>Events</span>
          </div>
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-green-500">
            <span className="font-medium">{equipmentModel.equipmentModels.length}</span>
            <span>Sub Equipment</span>
          </div>
          <EquipmentModelDelete dialogRef={deleteDialogRef} equipmentModel={equipmentModel} />
          <EquipmentModelCreate dialogRef={createDialogRef} equipmentModel={equipmentModel} />
        </div>
      </div>

      <div className="space-y-4 rounded-md bg-slate-900 p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
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
    </div>
  );
}

function RecursiveEquipmentBreadCrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((segment) => segment);
  const curPathSegment = pathSegments.splice(0, 2);

  var curPathname = "/" + curPathSegment.join("/");
  return (
    <ol className="flex items-center">
      <li className="flex items-center">
        <BreadCrumbLink to={curPathname} end>
          Overview
        </BreadCrumbLink>
        <HiOutlineChevronDoubleRight size="20" className="mx-1 text-gray-500" />
      </li>
      {pathSegments.map((equipmentModelId, index) => {
        curPathname = curPathname + "/" + equipmentModelId;
        return (
          <li key={equipmentModelId} className="flex items-center">
            <BreadCrumb equipmentModelId={equipmentModelId} pathname={curPathname} />
            {index < pathSegments.length - 1 && (
              <HiOutlineChevronDoubleRight size="20" className="mx-1 text-gray-500" />
            )}
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
