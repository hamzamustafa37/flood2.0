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
    console.log("toggle");
    setMobileSidebarOpen((prev) => !prev);
  };
  return (
    <main className="bg-[var(--color-background)] min-h-screen flex flex-col">
      <PrivateHeader
        onToggle={handleToggle}
        onMobileToggle={() => setMobileSidebarOpen((prev) => !prev)}
      />
      <div className="flex flex-1 pt-[100px]">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
        <section
          className={`flex-1 pb-6 px-4 md:px-6 overflow-y-scroll bg-[var(--color-background)] h-screen transition-all duration-300 ${
            collapsed ? "md:pl-[100px]" : "md:pl-[290px]"
          }`}
        >
          {children}
        </section>
      </div>
    </main>
  );
};
