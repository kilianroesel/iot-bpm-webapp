import { HiExclamationTriangle } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="flex items-center space-x-2 group-hover:text-slate-900">
      <HiExclamationTriangle size="18" />
      <div>Page not found</div>
    </div>
  );
}
