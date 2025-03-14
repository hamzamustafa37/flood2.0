"use client";
import React from "react";
import { Sidebar } from "../Sidebar";
import { PrivateHeader } from "./header";

interface IAuthLayout {
  readonly children: React.ReactNode;
}

export const AuthLayout = ({ children }: IAuthLayout): React.ReactElement => {
  return (
    <main className="bg-[var(--color-background)] min-h-screen">
      <PrivateHeader />
      <Sidebar isToggled={false} />
      <section className="flex-1 pb-6 px-4 md:px-6 md:pl-[290px] pt-[70px] overflow-y-scroll bg-[var(--color-background)] h-screen">
        {children}
      </section>
    </main>
  );
};
