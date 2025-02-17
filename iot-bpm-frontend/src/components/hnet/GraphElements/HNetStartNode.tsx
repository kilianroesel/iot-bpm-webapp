import { Handle, Position } from "@xyflow/react";

export default function HNetStartNode() {
  return (
    <div className="bg-slate-900 border border-fuchsia-500 p-1 rounded-md min-w-28">
      <div className="text-center">
        <div className="text-sm truncate">Start</div>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
