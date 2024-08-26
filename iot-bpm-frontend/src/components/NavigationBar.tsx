import { NavLink } from "react-router-dom";

export default function App() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="">
          <div className="flex space-x-4">
            <NavLink
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              to={"/"}
            >
              Overview
            </NavLink>
            <NavLink
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              to={"/event-explorer"}
            >
              Event Explorer
            </NavLink>
            <NavLink
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              to={"/domain-models"}
            >
              Domain Models
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
