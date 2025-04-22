import { Handle, NodeProps, Position } from "@xyflow/react";
import { HeuristicNetNodeType } from "../HeuristicNetContext";

export default function HeuristicNetNode(props: NodeProps<HeuristicNetNodeType>) {
  return (
    <div className="h-12 w-32 rounded-md border border-black bg-slate-50 p-1">
      <div className="text-center">
        <div className="truncate text-sm">{props.data.activity}</div>
        <div className="truncate text-xs text-black">{props.data.occurences}</div>
      </div>
      
      {props.data.sourceLoopHandles.map((handle) => (
        <Handle key={handle.id} id={handle.id} type="source" position={Position.Bottom} isConnectable={false}/>
      ))}
      {props.data.targetLoopHandles.map((handle) => (
        <Handle key={handle.id} id={handle.id} type="target" position={Position.Top} isConnectable={false}/>
      ))}

      {props.data.sourceHandles.map((handle) => (
        <Handle key={handle.id} id={handle.id} type="source" position={Position.Bottom} isConnectable={false}/>
      ))}
      {props.data.targetHandles.map((handle) => (
        <Handle key={handle.id} id={handle.id} type="target" position={Position.Top} isConnectable={false}/>
      ))}
    </div>
  );
}
