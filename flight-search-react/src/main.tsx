import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import { FlightSearch } from "./views/FlightSearch";
import { FlightDetail } from "./views/FlightDetail";
import { FlightOffers } from "./views/FlightOffers";
import { AppLayout } from "./components/AppLayout";
import { ErrorBoundary } from "./components/errors/ErrorBoundary";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: "/",
        Component: FlightSearch,
      },

      {
        path: "/detail",
        Component: FlightDetail,
      },
      {
        path: "/search",
        Component: FlightOffers,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <RouterProvider router={router}></RouterProvider>
    </HeroUIProvider>
  </StrictMode>,
);
