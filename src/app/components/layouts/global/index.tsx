import React from "react";
import { Header } from "@/app/components/pages";
import { Footer } from "../../pages/Footer";
import { Nunito_Sans } from "next/font/google";

interface IGlobalLayout {
  readonly children: React.ReactNode;
}

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata = {
  title: "Book a Service",
};

export const GlobalLayout = ({
  children,
}: IGlobalLayout): React.ReactElement => (
  <div
    className={`${nunitoSans.variable} font-nunito public_Layout flex flex-col h-screen overflow-y-scroll`}
  >
    <Header />
    <main className="flex-grow overflow-auto px-4">{children}</main>
    <Footer />
  </div>
);
