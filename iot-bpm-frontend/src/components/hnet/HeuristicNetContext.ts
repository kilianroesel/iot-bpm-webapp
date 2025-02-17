import { Edge, EdgeTypes, NodeTypes, type Node } from "@xyflow/react";
import { createContext } from "react";


export type HeuristicNetNodeData = {
  activity: string;
  occurences: number;
  sourceLoopHandles: { id: string }[];
  targetLoopHandles: { id: string }[];
  sourceHandles: { id: string }[];
  targetHandles: { id: string }[];
};
export type HeuristicNetNodeType = Node<HeuristicNetNodeData, 'hNetNode'>;

export type HNetEdgeData = {
  dfgValue: number;
  duration: number;
}
export type HeuristicNetEdgeType = Edge<HNetEdgeData, 'hNetEdge'>

export interface HeuristicNetContextType {
  nodes: HeuristicNetNodeType[] | undefined;
  edges: HeuristicNetEdgeType[] | undefined;
  nodeTypes: NodeTypes;
  edgeTypes: EdgeTypes;
}

export const HeuristicNetContext = createContext({} as HeuristicNetContextType);
