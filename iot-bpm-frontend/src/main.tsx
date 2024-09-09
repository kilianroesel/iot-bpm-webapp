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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainLayout />}>
            <Route index element={<div>Overview</div>} />
            <Route path={"event-explorer"} element={<div>Eventexplorer</div>} />
            <Route path={"domain-models"} element={<Outlet/>}>
              <Route index element={<MachineDescriptionsList />} />
              <Route path={":equipmentModelId/*"} element={<div className="p-4 space-y-4"><MachineModelBase /><RecursiveEquipmentRouter queryClient={queryClient} /></div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
