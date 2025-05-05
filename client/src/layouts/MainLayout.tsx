import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-screen h-screen bg-slate-100">
          <SidebarTrigger />
          <div className="px-8">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </SidebarProvider>
  );
};

export default MainLayout;
