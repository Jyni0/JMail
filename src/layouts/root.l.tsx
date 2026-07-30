import { Outlet } from "react-router-dom";

// ? Components
import { Sidebar } from "@/components/navigation/sidebar/sidebar.c"
import { Navbar } from "@/components/navbar.c"

export function RootLayout() {
  return (
    <div className="h-full w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
