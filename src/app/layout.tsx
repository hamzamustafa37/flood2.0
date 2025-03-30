"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./StoreProvider";
import { poppins } from "./styles/font";
import "./styles/globals.css";
import "antd/dist/reset.css";
import { Header } from "./components/pages";
import ThemeProvider from "./components/theme/ThemeContextProvider";
import RouteProgress from "./components/common/RouteProgess";
// import { type Session } from 'next-auth';

function RootLayout({ children }: { children: any }): React.ReactElement {
  return (
    <StoreProvider>
      <SessionProvider>
        <ThemeProvider>
          <html>
            <head>
              <link
                href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
                rel="stylesheet"
              />
            </head>
            <body className={`${poppins.className} ${poppins.variable} bg-`}>
              <RouteProgress />
              <main className="">
                <ToastContainer />
                {children}
              </main>
            </body>
          </html>
        </ThemeProvider>
      </SessionProvider>
    </StoreProvider>
  );
}

export default RootLayout;
