import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import MachineDescriptionsList from "./pages/domainModels/machineModel/MachineModelList";
import MachineModelBase from "./pages/domainModels/machineModel/MachineModelBase";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./config/queryClientConfig";
import { RecursiveEquipmentRouter } from "./routes/RecursiveEquipmentRouter";
import HNetContextProvided from "./components/hnet/HeuristicNetContextProvided";
import LineList from "./pages/eventExplorer/LineList";
import { HiExclamationTriangle } from "react-icons/hi2";
import Line from "./pages/eventExplorer/line/Line";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainLayout />}>
            <Route index element={<div></div>} />
            {/* <Route path={"event-explorer"} element={<HNetContextProvided />} /> */}
            <Route path={"lines"} element={<Outlet />}>
              <Route index element={<LineList />} />
              <Route
                path={":lineId"}
                element={
                  <div className="space-y-4 p-4">
                    <Line />
                  </div>
                }
              />
            </Route>
            <Route path={"domain-models"} element={<Outlet />}>
              <Route index element={<MachineDescriptionsList />} />
              <Route
                path={":equipmentModelId/*"}
                element={
                  <div className="space-y-4 p-4">
                    <MachineModelBase />
                    <RecursiveEquipmentRouter queryClient={queryClient} />
                  </div>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <div className="flex items-center space-x-2 group-hover:text-white">
                  <HiExclamationTriangle size="18" />
                  <div>Page not found</div>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
