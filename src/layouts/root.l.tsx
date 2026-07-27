import { Outlet } from "react-router-dom";

// ? Components
import { Sidebar } from "@/components/sidebar.c"
import { Navbar } from "@/components/navbar.c"

export function RootLayout() {
  return (
    <div className="h-screen w-full flex flex-row">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}
