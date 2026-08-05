import { Outlet } from "react-router-dom";

// ? Components
import { Sidebar } from "@/components/navigation/sidebar/sidebar.c"
import { Navbar } from "@/components/navbar.c"

export function RootLayout() {
  return (
    <div className="size-full flex flex-row">
      <Sidebar />
      <div className="size-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
