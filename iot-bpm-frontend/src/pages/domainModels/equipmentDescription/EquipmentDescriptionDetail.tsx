import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { equipmentDescriptionQuery } from "../../../iotBpmBackend/api";
import { StatusFields } from "../statusField/StatusFields";
import { EventDescriptions } from "../eventDescription/EventDescriptions";
import { useRef } from "react";
import EquipmentDescriptionCreate from "./EquipmentDescriptionCreate";
import { BreadCrumbButton, BreadCrumbLink } from "../../../components/links/BreadCrumb";
import { HiOutlineChevronDoubleRight, HiOutlinePlusCircle, HiBars2, HiOutlineTrash } from "react-icons/hi2";
import { PopulatedGetEquipmentDescription } from "../../../iotBpmBackend/interfaces";
import { IconButton } from "../../../components/forms/Buttons";
import EquipmentDescriptionDelete from "./EquipmentDescriptionDelete";

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

function EquipmentOverview({ equipment }: { equipment: PopulatedGetEquipmentDescription }) {
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
    <div className="space-y-4 rounded-md bg-blue-200 p-4">
      <div className="grid grid-cols-12">
        <h3 className="col-span-11 font-medium">Summary</h3>
        <div className="justify-self-center">
          <IconButton onClick={startDelete}>
            <HiOutlineTrash size="18" />
          </IconButton>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border">
          <span className="font-medium">{equipment.statusFields.length}</span>
          <span>Statusfields</span>
        </div>
        <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border">
          <span className="font-medium">{equipment.events.length}</span>
          <span>Events</span>
        </div>
        <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border">
          <span className="font-medium">{equipment.childEquipment.length}</span>
          <span>Sub Equipment</span>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="col-span-11 font-medium">Child Equipment</h3>
        <ul className="flex items-center gap-4">
          {equipment.childEquipment.map((childEquipment) => (
            <li key={childEquipment.id} className="flex items-center">
              <BreadCrumbLink to={childEquipment.id}>{childEquipment.name}</BreadCrumbLink>
            </li>
          ))}
          <BreadCrumbButton onClick={startCreate}>
            <HiOutlinePlusCircle size="24" />
          </BreadCrumbButton>
        </ul>
      </div>
      <EquipmentDescriptionCreate dialogRef={createDialogRef} equipment={equipment} />
      <EquipmentDescriptionDelete dialogRef={deleteDialogRef} equipmentDescription={equipment} />
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
        <HiOutlineChevronDoubleRight size="20" className="mx-1" />
      </li>
      {pathSegments.map((equipmentId, index) => {
        curPathname = curPathname + "/" + equipmentId;
        return (
          <li key={equipmentId} className="flex items-center">
            <BreadCrumb equipmentId={equipmentId} pathname={curPathname} />
            {index < pathSegments.length - 1 && <HiOutlineChevronDoubleRight size="20" className="mx-1" />}
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
