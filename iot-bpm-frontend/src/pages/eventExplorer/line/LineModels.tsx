import { useSuspenseQuery } from "@tanstack/react-query";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { heuristicNetsByLineQuery } from "../../../bpmApi/lineApi";

export default function LineModels() {
  const params = useParams();
  if (!params.lineId) throw new Error("No Line ID provided");
  const { data: objectViews } = useSuspenseQuery(heuristicNetsByLineQuery(params.lineId));

  const map = ["OptiScan", "Portion", "OptiScan-MachineState", "PowerPak-MachineState", "Checkweigher", "OptiSlicer", "Checkweigher-MachineState", "Product", "PowerPak", "Packaging", "Line"]

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1 space-y-4 rounded-md border border-black p-4">
        <div className="font-bold">Discovered Models</div>
        {objectViews.map((objectView, index) => (
          <div key={objectView}>
            <NavLink
              to={"heuristicNets/" + objectView}
              key={objectView}
              className={({ isActive }) =>
                `${isActive ? "outline outline-cyan-500" : "outline-blue-500 hover:bg-slate-50 hover:outline"} group relative flex items-center space-x-4 rounded-md bg-slate-200 p-2 shadow-lg transition-all duration-100 ease-linear`
              }
            >
                {map[index]}
            </NavLink>
          </div>
        ))}
      </div>
      <div className="col-span-3 space-y-4 rounded-md border border-black p-4">
        <Outlet />
      </div>
    </div>
  );
}
