"use client";
import React from "react";
import { Sidebar } from "../Sidebar";
import { PrivateHeader } from "./header";

interface IAuthLayout {
  readonly children: React.ReactNode;
}

export const AuthLayout = ({ children }: IAuthLayout): React.ReactElement => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <main className="bg-[var(--color-background)] min-h-screen flex flex-col">
      <PrivateHeader />
      <div className="flex flex-1">
        <Sidebar
          isToggled={true}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <section
          className={`flex-1 pb-6 px-4 md:px-6 pt-[100px] overflow-y-scroll bg-[var(--color-background)] h-screen transition-all duration-300 ${
            collapsed ? "md:pl-[100px]" : "md:pl-[290px]"
          }`}
        >
          {children}
        </section>
      </div>
    </main>
  );
};
