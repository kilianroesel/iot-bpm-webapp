import { BaseEdge, EdgeProps } from "@xyflow/react";
import { HeuristicNetEdgeType } from "../HeuristicNetContext";

export default function HeuristicNetEdge(props: EdgeProps<HeuristicNetEdgeType>) {
  const section = props.pathOptions.sections[0];
  const label = props.pathOptions.labels[0];
  var bendPoints = section.bendPoints;
  if (!bendPoints) {
    bendPoints = [];
  }
  bendPoints.unshift({ x: section.startPoint.x, y: section.startPoint.y });
  bendPoints.push({ x: section.endPoint.x, y: section.endPoint.y });

  const edgePath = generateBezierPathWithDeCasteljau(bendPoints, 100);

  return (
    <g>
      <BaseEdge path={edgePath} markerEnd={props.markerEnd} labelX={label.x}/>
      <text
        x={label.x}
        y={label.y}
        fill="black"
        fontSize="12"
        textAnchor="start"
      >
        {label.text}
      </text>
    </g>
  );
}

function deCasteljau(points: { x: number; y: number }[], t: number): { x: number; y: number } {
  if (points.length === 1) return points[0];

  const newPoints: { x: number; y: number }[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const x = (1 - t) * points[i].x + t * points[i + 1].x;
    const y = (1 - t) * points[i].y + t * points[i + 1].y;
    newPoints.push({ x, y });
  }

  return deCasteljau(newPoints, t);
}

function generateBezierPathWithDeCasteljau(controlPoints: { x: number; y: number }[], steps: number = 100): string {
  if (controlPoints.length < 2) return "";

  const pathPoints: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pathPoints.push(deCasteljau(controlPoints, t));
  }

  return (
    `M ${pathPoints[0].x},${pathPoints[0].y} ` +
    pathPoints
      .slice(1)
      .map((p) => `L ${p.x},${p.y}`)
      .join(" ")
  );
}
