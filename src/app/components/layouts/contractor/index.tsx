"use client";
import React from "react";
import { CHeader } from "./header";
import { CSidebar } from "./csidebar";

interface IContractorLayout {
  readonly children: React.ReactNode;
}

export const ContractorLayout = ({
  children,
}: IContractorLayout): React.ReactElement => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const handleToggle = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  return (
    <main className="bg-[var(--color-background)] min-h-screen flex flex-col overflow-hidden">
      <CHeader
        onToggle={handleToggle}
        onMobileToggle={() => setMobileSidebarOpen((prev) => !prev)}
      />
      <div className="flex flex-1 overflow-hidden pt-[79px] ">
        <CSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
        <section
          className={`
            overflow-y-scroll
            flex-1 
            bg-[var(--color-background)] 
            h-screen 
            transition-[padding,background-color,transform,margin] 
            duration-700 
            ease-[cubic-bezier(0.4,0,0.2,1)] 
            scroll-smooth
            mb-20
            pb-[60px]
            mt-[20px]
            md:mt-[0px]
          `}
        >
          {children}
        </section>
      </div>
    </main>
  );
};
