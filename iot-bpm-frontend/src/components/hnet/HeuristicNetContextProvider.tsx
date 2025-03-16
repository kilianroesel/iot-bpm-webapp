import { useEffect, useMemo, useState } from "react";
import { HeuristicNetContext, HeuristicNetEdgeType, HeuristicNetNodeType } from "./HeuristicNetContext";
import { MarkerType, ReactFlowProvider } from "@xyflow/react";
import { heuristicNet } from "./hnet";
import { getLayoutedGraph } from "./util/getLayoutedNodes";
import HeuristicNetNode from "./GraphElements/HeuristiceNetNode";
import HeuristicNetEdge from "./GraphElements/HeuristicNetEdge";

export default function HNetContextProvider({ children }: { children: React.ReactNode }) {
  const [layoutedNodes, setLayoutedNodes] = useState<HeuristicNetNodeType[]>();
  const [layoutedEdges, setLayoutedEdges] = useState<HeuristicNetEdgeType[]>();

  const edges: HeuristicNetEdgeType[] = useMemo(() => {
    return heuristicNet.edges.map((edge) => {
      return {
        id: `${edge.sourceNode}-${edge.targetNode}`,
        source: edge.sourceNode,
        sourceHandle: `${edge.sourceNode}-s-${edge.targetNode}`,
        target: edge.targetNode,
        targetHandle: `${edge.sourceNode}-t-${edge.targetNode}`,
        data: {
          duration: edge.duration,
          dfgValue: edge.dfgValue,
          dependencyValue: edge.dependencyValue
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
        type: "hNetEdge",
      };
    });
  }, [heuristicNet.edges]);

  const nodes: HeuristicNetNodeType[] = useMemo(() => {
    return heuristicNet.nodes.map((node) => {
      const sourceLoopHandles: { id: string }[] = [];
      const sourceHandles = node.outputBindings.reduce<{ id: string }[]>((acc, outputBinding) => {
        if (node.activity === outputBinding) {
          sourceLoopHandles.push({ id: `${node.activity}-s-${outputBinding}` });
        } else {
          acc.push({ id: `${node.activity}-s-${outputBinding}` });
        }
        return acc;
      }, []);

      const targetLoopHandles: { id: string }[] = [];
      const targetHandles = node.inputBindings.reduce<{ id: string }[]>((acc, inputBinding) => {
        if (node.activity === inputBinding) {
          targetLoopHandles.push({ id: `${inputBinding}-t-${node.activity}` });
        } else {
          acc.push({ id: `${inputBinding}-t-${node.activity}` });
        }
        return acc;
      }, []);

      return {
        id: node.activity,
        data: {
          activity: node.activity,
          occurences: node.occurences,
          sourceLoopHandles: sourceLoopHandles,
          targetLoopHandles: targetLoopHandles,
          sourceHandles: sourceHandles,
          targetHandles: targetHandles,
        },
        position: { x: 0, y: 0 },
        type: "hNetNode",
      };
    });
  }, [heuristicNet.nodes]);

  const nodeTypes = {
    hNetNode: HeuristicNetNode,
  };

  const edgeTypes = {
    hNetEdge: HeuristicNetEdge,
  };

  useEffect(() => {
    const layoutNodes = async () => {
      if (edges && nodes) {
        const layoutedGraph = await getLayoutedGraph(nodes, edges);
        setLayoutedNodes(layoutedGraph.layoutedNodes);
        setLayoutedEdges(layoutedGraph.layoutedEdges);
      }
    };
    layoutNodes();
  }, [edges, nodes]);

  return (
    <ReactFlowProvider>
      <HeuristicNetContext.Provider
        value={{
          edges: layoutedEdges,
          nodes: layoutedNodes,
          nodeTypes: nodeTypes,
          edgeTypes: edgeTypes,
        }}
      >
        {children}
      </HeuristicNetContext.Provider>
    </ReactFlowProvider>
  );
}
