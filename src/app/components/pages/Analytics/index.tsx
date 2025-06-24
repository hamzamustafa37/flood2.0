"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-LM7Z5MET8R";

export const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
};
