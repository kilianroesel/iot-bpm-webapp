import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DomainModelsList, { loader as domainModelsLoader } from "./pages/domainModels/DomainModelsList";
import DomainModelDetailBase, { loader as domainModelLoader } from "./pages/domainModels/DomainModelDetailBase";
import EquipmentDetail, { loader as equipmentLoader } from "./pages/domainModels/EquipmentDetail";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <div>Overview</div>,
      },
      {
        path: "event-explorer",
        element: <>Eventexplorer</>,
      },
      {
        path: "domain-models",
        element: <Outlet />,
        // errorElement: <>Error</>,
        children: [
          {
            index: true,
            element: <DomainModelsList />,
            loader: domainModelsLoader(queryClient),
            handle: {
              crumb: () => <div>Hallo</div>
            }
          },
          {
            path: ":id",
            element: <DomainModelDetailBase />,
            loader: domainModelLoader(queryClient),
            children: [
              {
                path: "*",
                index: true,
                element: <EquipmentDetail />,
                loader: equipmentLoader(queryClient),
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
