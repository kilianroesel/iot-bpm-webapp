import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="bg-slate-900 p-4 shadow-sm shadow-cyan-500 z-10">
      <div className="px-2">
        <NavLink to={"/"} className="font-medium">BPM - IoT Event Processing</NavLink>
      </div>
    </nav>
  );
}
