"use client";
import React from "react";
import { Sidebar } from "../Sidebar";
import { PrivateHeader } from "./header";

interface IAuthLayout {
  readonly children: React.ReactNode;
}

export const AuthLayout = ({ children }: IAuthLayout): React.ReactElement => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const handleToggle = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  return (
    <main className="bg-[var(--color-background)] min-h-screen flex flex-col overflow-hidden">
      <PrivateHeader
        onToggle={handleToggle}
        onMobileToggle={() => setMobileSidebarOpen((prev) => !prev)}
      />
      <div className="flex flex-1 overflow-hidden pt-[79px]">
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
        {/* Content */}
        <section
          className={`
            flex-1 
            pb-6 
            bg-[var(--color-background)] 
            h-screen 
            transition-[padding,background-color,transform,margin] 
            duration-700 
            ease-[cubic-bezier(0.4,0,0.2,1)] 
            scroll-smooth
          `}
        >
          {children}
        </section>
      </div>
    </main>
  );
};
