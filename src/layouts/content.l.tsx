import { Outlet } from "react-router-dom";

export function ContentLayout() {
  return (
    <div className="max-h-screen size-full flex justify-center overflow-y-auto">
      <div className="w-full max-w-216">
        <Outlet />
      </div>
    </div>
  );
}
