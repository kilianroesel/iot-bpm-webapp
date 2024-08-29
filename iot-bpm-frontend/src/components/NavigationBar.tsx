import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="bg-blue-950 p-4">
      <div className="px-2">
        <NavLink to={"/"} className="text-white font-medium">BPM - IoT Event Processing</NavLink>
      </div>
    </nav>
  );
}
