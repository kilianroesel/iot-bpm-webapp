import {
  HiOutlineChartPie,
  HiOutlineDocumentChartBar,
  HiOutlineSquare3Stack3D,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="flex h-screen w-16 shrink-0 flex-col space-y-4 bg-blue-900 p-2 text-white shadow-lg lg:w-64">
      <SideBarElement
        to={"/"}
        icon={<HiOutlineChartPie size="26" />}
        text="Overview"
      />
      <SideBarElement
        to={"/event-explorer"}
        icon={<HiOutlineSquare3Stack3D size="26" />}
        text="Event Explorer"
      />
      <SideBarElement
        to={"/domain-models"}
        icon={<HiOutlineDocumentChartBar size="26" />}
        text="Domain Models"
      />
    </div>
  );
}

function SideBarElement({
  to,
  icon,
  text,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <NavLink
      to={to}
      className="group relative flex items-center space-x-2 rounded-md p-2 text-gray-100 shadow-lg transition-all duration-300 ease-linear hover:bg-gray-500 hover:text-white"
    >
      <div>{icon}</div>
      <div className="hidden lg:block">{text}</div>
      <span className="absolute left-14 m-2 w-auto min-w-max origin-left scale-0 rounded-md bg-gray-900 p-2 text-xs font-bold text-white shadow-md transition-all duration-100 group-hover:scale-100 lg:hidden">
        {text}
      </span>
    </NavLink>
  );
}
