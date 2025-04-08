"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function NProgressWrapper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleStart = () => NProgress.start();
    const handleDone = () => NProgress.done();

    handleStart();
    const timer = setTimeout(handleDone, 500);

    return () => {
      clearTimeout(timer);
      handleDone();
    };
  }, [pathname, searchParams]);

  return null;
}
