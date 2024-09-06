import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import EquipmentDetail from "../pages/domainModels/equipmentModel/EquipmentModelDetail";

export function RecursiveEquipmentRouter({ queryClient }: { queryClient: QueryClient }) {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback="Loading">
              <EquipmentDetail />
            </Suspense>
          }
        />
        <Route path={":equipmentModelId/*"} element={<RecursiveEquipmentRouter queryClient={queryClient} />} />
      </Routes>
    </>
  );
}
