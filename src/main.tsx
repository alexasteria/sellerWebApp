import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store"; // Import the Redux store
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
    <Provider store={store}> {/* Wrap with Redux Provider */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
