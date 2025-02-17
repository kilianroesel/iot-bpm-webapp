import { ReactFlowProvider } from "@xyflow/react";
import HNetContextProvider from "./HeuristicNetContextProvider";
import HeuristicNet from "./HeuristicNet";

export default function HNetContextProvided() {

  return (
    <ReactFlowProvider>
      <HNetContextProvider>
        <HeuristicNet />
      </HNetContextProvider>
    </ReactFlowProvider>
  );
}
