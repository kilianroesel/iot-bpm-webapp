import { Handle, Position } from "@xyflow/react";

export default function HNetEndNode() {
  return (
    <div className="bg-slate-50 border border-fuchsia-500 p-1 rounded-md min-w-28">
      <div className="text-center">
        <div className="text-sm truncate">End</div>
      </div>

      <Handle type="target" position={Position.Top} />
    </div>
  );
}
