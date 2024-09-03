import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MainLayout from "./routes/MainLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import MachineDescriptionsList from "./pages/domainModels/MachineDescriptionsList";
import MachineDescriptionBase from "./pages/domainModels/MachineDescriptionBase";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MachineDescriptionDetail from "./pages/domainModels/MachineDescriptionDetail";
import { queryClient } from "./config/queryConfig";
import { RecursiveEquipmentRouter } from "./routes/RecursiveEquipmentRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainLayout />}>
            <Route index element={<div>Overview</div>} />
            <Route path={"event-explorer"} element={<div>Eventexplorer</div>} />
            <Route path={"domain-models"} element={<Outlet />}>
              <Route index element={<MachineDescriptionsList />} />
              <Route path={":machineDescriptionId"} element={<MachineDescriptionBase />}>
                <Route index element={<MachineDescriptionDetail />} />
                <Route
                  path={":equipmentId/*"}
                  element={<RecursiveEquipmentRouter queryClient={queryClient} />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
