// app/layout.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./StoreProvider";
import { poppins } from "./styles/font";
import "./styles/globals.css";
import "antd/dist/reset.css";
import ThemeProvider from "./components/theme/ThemeContextProvider";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <SessionProvider>
        <ThemeProvider>
          <html lang="en">
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
            <body className={`${poppins.className} ${poppins.variable}`}>
              <main>
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
