import { useState, useEffect, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { SaathiBot } from "../bot";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out lg:static lg:translate-x-0",
          // Mobile behavior
          "lg:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Desktop collapse behavior
          sidebarCollapsed ? "lg:w-16" : "lg:w-64",
          "w-64",
        )}
      >
        <Sidebar
          onClose={isMobile ? () => setSidebarOpen(false) : undefined}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />
        <main className="flex-1 overflow-auto bg-background p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Saathi Bot - Global AI Assistant */}
      <SaathiBot />
    </div>
  );
}
