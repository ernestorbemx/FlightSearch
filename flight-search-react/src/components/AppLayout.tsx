import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className="flex justify-center px-4 py-8">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
