import React from "react";
import { Header } from "@/app/components/pages";
import { Footer } from "../../pages/Footer";

interface IGlobalLayout {
  readonly children: React.ReactNode;
}

export const GlobalLayout = ({
  children,
}: IGlobalLayout): React.ReactElement => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow mb-5">{children}</main>
    <Footer />
  </div>
);
