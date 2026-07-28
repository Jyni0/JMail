import { Outlet } from "react-router-dom";

export function ContentLayout() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-216">
        <Outlet />
      </div>
    </div>
  );
}
