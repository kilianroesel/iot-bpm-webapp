import ELK, { ElkLabel, ElkLayoutArguments, ElkNode } from "elkjs/lib/elk.bundled.js";
import { HeuristicNetEdgeType, HeuristicNetNodeType } from "../HeuristicNetContext";

const layoutOptions: ElkLayoutArguments = {
  layoutOptions: {
    "org.eclipse.elk.algorithm": "org.eclipse.elk.layered",
    "org.eclipse.elk.direction": "DOWN",
    "org.eclipse.elk.edgeRouting": "SPLINES",

    "org.eclipse.elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
    "org.eclipse.elk.layered.spacing.nodeNodeBetweenLayers": "10",
    "org.eclipse.elk.layered.spacing.edgeEdgeBetweenLayers": "10",
    "org.eclipse.elk.layered.spacing.edgeNodeBetweenLayers": "10",

    "org.eclipse.elk.edgeLabels.placement": "CENTER",

    "org.eclipse.elk.spacing.edgeEdge": "10",
    "org.eclipse.elk.spacing.nodeSelfLoop": "10",
  },
};

const elk = new ELK();

export const getLayoutedGraph = async (nodes: HeuristicNetNodeType[], edges: HeuristicNetEdgeType[]) => {
  const graph: ElkNode = {
    id: "root",
    children: nodes.map((n) => {
      const targetLoopPorts = n.data.targetLoopHandles.map((t) => ({
        id: t.id,
        properties: {
          side: "NORTH",
        },
      }));

      const sourceLoopPorts = n.data.sourceLoopHandles.map((t) => ({
        id: t.id,
        properties: {
          side: "SOUTH",
        },
      }));

      const targetPorts = n.data.targetHandles.map((t) => ({
        id: t.id,
        properties: {
          side: "NORTH",
        },
      }));

      const sourcePorts = n.data.sourceHandles.map((s) => ({
        id: s.id,
        properties: {
          side: "SOUTH",
        },
      }));

      const elkNode: ElkNode = {
        id: n.id,
        width: 128,
        height: 48,
        ports: [...targetLoopPorts, ...sourceLoopPorts, ...targetPorts, ...sourcePorts],
      };
      return elkNode;
    }),
    edges: edges.map((e) => {
      const labels: ElkLabel[] = [];
      if (e.data) {
        const duration = formatDuration(e.data.duration);
        // const duration = e.data.dfgValue.toString();
        labels.push({
          width: getTextWidth(duration),
          height: 15,
          text: duration
        });
      }

      return {
        id: e.id,
        labels: labels,
        sources: [e.sourceHandle || e.source],
        targets: [e.targetHandle || e.target],
        sourcePort: [e.sourceHandle],
        targetPort: [e.targetHandle],
      };
    }),
  };

  const layoutedGraph = await elk.layout(graph, layoutOptions);

  const layoutedNodes: HeuristicNetNodeType[] = nodes.map((node) => {
    const layoutedNode = layoutedGraph.children?.find((lgNode) => lgNode.id === node.id);

    return {
      ...node,
      position: {
        x: layoutedNode?.x ?? 0,
        y: layoutedNode?.y ?? 0,
      },
    };
  });

  const layoutedEdges: HeuristicNetEdgeType[] = edges.map((edge) => {
    const layoutedEdge = layoutedGraph.edges?.find((lgEdge) => lgEdge.id === edge.id);
    return {
      ...edge,
      pathOptions: {
        sections: layoutedEdge?.sections,
        labels: layoutedEdge?.labels
      }
    };
  });

  return { layoutedNodes: layoutedNodes, layoutedEdges: layoutedEdges };
};

function formatDuration(seconds: number) {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Number((seconds % 60).toFixed(2));

  let result = "";

  if (days > 0) result += days + "d ";
  if (hours > 0) result += hours + "h ";
  if (minutes > 0) result += minutes + "m ";
  if (remainingSeconds > 0 || result === "") result += remainingSeconds + "s"; // Include seconds if no larger units

  return result;
}

const getTextWidth = (text: string, font: string = "12px Arial"): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas context not supported");
  }
  context.font = font;
  console.log(text + context.measureText(text).width);
  return context.measureText(text).width;
};
