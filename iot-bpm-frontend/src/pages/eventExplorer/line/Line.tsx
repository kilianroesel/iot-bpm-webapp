import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { lineMachineQuery } from "../../../bpmApi/lineApi";
import React from "react";
import LineEvents from "./LineEvents";

export default function Line() {
  const params = useParams();
  if (!params.lineId) throw new Error("No Line ID provided");
  const { data: machineModels } = useSuspenseQuery(lineMachineQuery(params.lineId));

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-4 rounded-md bg-slate-900 p-4">
          <div className="flex items-center space-x-4">
            <h3 className="grow text-3xl font-medium">Line Id: {params.lineId}</h3>
          </div>
          <div>
            <div className="grid grid-cols-3">
              <div className="font-semibold">Machine Name</div>
              <div className="font-semibold">Version Csi Standard</div>
              <div className="font-semibold">Version Csi Specific</div>
              {machineModels.map((machineModel) => (
                <React.Fragment key={machineModel._id}>
                  <div>{machineModel.machineName}</div>
                  <div>{machineModel.versionCsiStd}</div>
                  <div>{machineModel.versionCsiSpecific}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <LineEvents />
      </div>
    </>
  );
}