import { Outlet, useLocation } from "react-router";
import { AppNavbar } from "./AppNavbar";
import { clsx } from "clsx";
export function AppLayout() {
  const location = useLocation();

  return (
    <div
      className={clsx(
        "min-h-full",
        // location.pathname == "/search" &&
        //   "bg-gradient-to-r from-primary-50 to-primary-100",
        location.pathname == "/search" && "",
      )}
    >
      <AppNavbar></AppNavbar>
      <div className="flex justify-center my-8">
        <div className="container max-w-[1024px] px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
