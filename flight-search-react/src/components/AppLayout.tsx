import { Outlet } from "react-router";
import { AppNavbar } from "./AppNavbar";

export function AppLayout() {
  return (
    <>
      <AppNavbar></AppNavbar>
      <div className="flex justify-center my-8">
        <div className="container max-w-[1024px] px-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
