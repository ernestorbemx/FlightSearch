import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import { FlightSearch } from "./views/FlightSearch";
import { FlightDetail } from "./views/FlightDetail";
import { FlightOffers } from "./views/FlightOffers";

const router = createBrowserRouter([
  {
    path: "/",
    Component: FlightSearch,
  },
  {
    path: "/search",
    Component: FlightOffers,
  },
  {
    path: "/detail",
    Component: FlightDetail,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
