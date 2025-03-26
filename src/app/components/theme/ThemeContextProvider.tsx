"use client";
import { companyThemes } from "@/utils/helpers/sampletheme";
import { useEffect, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<string>("companyA");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "companyA";
    setThemeName(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const applyTheme = (companyName: string) => {
    const theme = companyThemes[companyName as keyof typeof companyThemes];
    if (!theme) return;

    document.documentElement.style.setProperty(
      "--color-primary",
      theme.primary
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      theme.secondary
    );
    document.documentElement.style.setProperty(
      "--color-background",
      theme.background
    );
    document.documentElement.style.setProperty("--color-border", theme.border);
    document.documentElement.style.setProperty(
      "--color-bgComponent",
      theme.componentBackground
    );
    document.documentElement.style.setProperty(
      "--color-tilesColor",
      theme.tilesColor
    );
    document.documentElement.style.setProperty("--color-text", theme.text);
    document.documentElement.style.setProperty("--font-body", theme.fontFamily);
  };

  return <>{children}</>;
}
