import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, useParams } from "react-router-dom";
import { heuristicNetsByLineQuery } from "../../../bpmApi/lineApi";

export default function LineModels() {
  const params = useParams();
  if (!params.lineId) throw new Error("No Line ID provided");
  if (!params.modelId) throw new Error("No Model ID provided");
  const { data: objectViews } = useSuspenseQuery(heuristicNetsByLineQuery(params.lineId));

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1 space-y-4 rounded-md border border-black p-4">
        <div className="font-bold">Discovered Models</div>
        {objectViews.map((objectView) => (
          <div key={objectView}>{objectView}</div>
        ))}
      </div>
      <div className="col-span-3 space-y-4 rounded-md border border-black p-4">
        <Outlet/>
      </div>
    </div>
  );
}
