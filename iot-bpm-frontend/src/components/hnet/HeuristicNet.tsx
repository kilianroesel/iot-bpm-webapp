import { ReactFlow } from "@xyflow/react";
import { useContext } from "react";
import { HeuristicNetContext } from "./HeuristicNetContext";

import "@xyflow/react/dist/style.css";

export default function HeuristicNet() {
  const { nodes, edges, nodeTypes, edgeTypes } = useContext(HeuristicNetContext);

  return <ReactFlow nodes={nodes} edges={edges} fitView nodeTypes={nodeTypes} edgeTypes={edgeTypes}></ReactFlow>;
}
