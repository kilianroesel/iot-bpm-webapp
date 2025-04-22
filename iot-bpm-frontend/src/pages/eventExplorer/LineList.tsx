import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { linesQuery } from "../../bpmApi/lineApi";

export default function MachineModelsList() {
  const { data: lines } = useSuspenseQuery(linesQuery());

  return (
    <div className="p-4">
      <div className="overflow-hidden rounded-md border border-black">
        <table className="min-w-full table-fixed divide-y divide-blue-400">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Line Id</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-300 divide-black text-sm font-medium">
            {lines.map((line) => (
              <tr key={line.name}>
                <td className="group flex items-center whitespace-nowrap px-6 py-4">
                  <Link to={line.name}>
                    <div className="flex items-center space-x-4 group-hover:text-slate-700">
                      <div>{line.name}</div>
                      <HiArrowTopRightOnSquare className="text-blue-600 group-hover:text-blue-500" size="18" />
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
