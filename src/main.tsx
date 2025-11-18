import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "@/App";
import MenuPage from "@/pages/MenuPage/MenuPage";
import DeliveryPage from "@/pages/DeliveryPage/DeliveryPage";
import "@/styles.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MenuPage />,
      },
      {
        path: "delivery",
        element: <DeliveryPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
