"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreProvider } from "./StoreProvider";
import { poppins } from "./styles/font";
import "./styles/globals.css";
import "antd/dist/reset.css";
import ThemeProvider from "./components/theme/ThemeContextProvider";
import Script from "next/script";

const GA_MEASUREMENT_ID = "GTM-NRDQGBC8";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <SessionProvider>
        <ThemeProvider>
          <html lang="en">
            <head>
              {/* Fonts */}
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

              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
              />
              <Script id="gtag-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){ dataLayer.push(arguments); }
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `}
              </Script>
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
