import { HiOutlineChartPie, HiOutlineDocumentChartBar, HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="w-18 h-full shrink-0 flex-col space-y-4 bg-slate-900 p-4 shadow-lg lg:w-64">
      <SideBarElement to={"/"} icon={<HiOutlineChartPie className="text-orange-400" size="26" />} text="Overview" />
      <SideBarElement
        to={"/lines"}
        icon={<HiOutlineSquare3Stack3D className="text-lime-500" size="26" />}
        text="Lines"
      />
      <SideBarElement
        to={"/domain-models"}
        icon={<HiOutlineDocumentChartBar className="text-sky-400" size="26" />}
        text="Domain Models"
      />
    </div>
  );
}

function SideBarElement({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isActive ? "outline outline-cyan-500" : "outline-blue-500 hover:bg-slate-700 hover:outline"} group relative flex items-center space-x-4 rounded-md bg-slate-800 p-2 shadow-lg transition-all duration-100 ease-linear`
      }
    >
      <div>{icon}</div>
      <div className="hidden lg:block">{text}</div>
      <span className="absolute left-12 m-2 w-auto min-w-max origin-left scale-0 rounded-md bg-gray-900 p-2 text-xs font-bold text-white shadow-md transition-all duration-100 group-hover:scale-100 lg:hidden">
        {text}
      </span>
    </NavLink>
  );
}
