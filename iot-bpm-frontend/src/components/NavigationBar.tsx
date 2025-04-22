import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="p-4 shadow-sm shadow-black z-10">
      <div className="px-2">
        <NavLink to={"/"} className="font-medium">BPM - IoT Event Processing</NavLink>
      </div>
    </nav>
  );
}
