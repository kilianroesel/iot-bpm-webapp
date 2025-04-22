import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import SideBar from "../components/SideBar";
import { Suspense } from "react";

export default function MainLayout() {
  return (
    <div className="flex h-dvh flex-col overflow-y-scroll text-black">
      <NavigationBar />
      <div className="flex grow">
        <SideBar />
        <div className="grow">
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center space-x-4 transition">
                <div className="h-4 w-4 animate-bounce rounded-full bg-cyan-500"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-cyan-500 delay-500"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-cyan-500 delay-1000"></div>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
