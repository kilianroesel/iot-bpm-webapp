import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { StatusFields } from "../statusField/StatusFields";
import { EventDescriptions } from "../eventDescription/EventDescriptions";
import { useRef } from "react";
import EquipmentDescriptionCreate from "./EquipmentDescriptionCreate";
import { BreadCrumbLink } from "../../../components/links/BreadCrumb";
import { HiOutlineChevronDoubleRight } from "react-icons/hi2";
import EquipmentDescriptionDelete from "./EquipmentDescriptionDelete";
import { equipmentDescriptionQuery } from "../../../modelApi/machineModel";
import { IconAddButton, IconDeleteButton } from "../../../components/links/IconButtons";
import { GetPopulatedEquipmentDescription } from "../../../modelApi/equipmentModelApi";

export default function EquipmentDescriptionDetail() {
  const params = useParams();
  if (!params.equipmentId) throw new Error("No equipment Id provided");
  const { data: equipment } = useSuspenseQuery({ ...equipmentDescriptionQuery(params.equipmentId) });

  return (
    <>
      <RecursiveEquipmentBreadCrumbs />
      <div className="grid grid-cols-2 gap-4">
        <EquipmentOverview equipment={equipment} />
        <StatusFields equipment={equipment} />
      </div>
      <div>
        <EventDescriptions equipment={equipment} />
      </div>
    </>
  );
}

function EquipmentOverview({ equipment }: { equipment: GetPopulatedEquipmentDescription }) {
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
            <span className="font-medium">{equipment.statusFields.length}</span>
            <span>Statusfields</span>
          </div>
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-yellow-500">
            <span className="font-medium">{equipment.events.length}</span>
            <span>Events</span>
          </div>
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-green-500">
            <span className="font-medium">{equipment.childEquipment.length}</span>
            <span>Sub Equipment</span>
          </div>
          <EquipmentDescriptionDelete dialogRef={deleteDialogRef} equipmentDescription={equipment} />
          <EquipmentDescriptionCreate dialogRef={createDialogRef} equipment={equipment} />
        </div>
      </div>

      <div className="space-y-4 rounded-md bg-slate-900 p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <h3 className="flex-grow font-medium">Child Equipment</h3>
            <IconAddButton onClick={startCreate} />
          </div>
          <ul className="flex items-center gap-4">
            {equipment.childEquipment.map((childEquipment) => (
              <li key={childEquipment.id} className="flex items-center">
                <BreadCrumbLink to={childEquipment.id}>{childEquipment.name}</BreadCrumbLink>
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
      {pathSegments.map((equipmentId, index) => {
        curPathname = curPathname + "/" + equipmentId;
        return (
          <li key={equipmentId} className="flex items-center">
            <BreadCrumb equipmentId={equipmentId} pathname={curPathname} />
            {index < pathSegments.length - 1 && (
              <HiOutlineChevronDoubleRight size="20" className="mx-1 text-gray-500" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function BreadCrumb({ equipmentId, pathname }: { equipmentId: string; pathname: string }) {
  const { data: equipment } = useSuspenseQuery({ ...equipmentDescriptionQuery(equipmentId) });

  return (
    <BreadCrumbLink to={pathname} end>
      {equipment.name}
    </BreadCrumbLink>
  );
}
