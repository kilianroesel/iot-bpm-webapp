import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import SideBar from "../components/SideBar";

export default function Root() {
  return (
    <div>
      <NavigationBar />
      <div className="flex">
        <SideBar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
