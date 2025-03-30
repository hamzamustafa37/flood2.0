"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

const RouteProgress = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-blue-600 transition-all ease-in-out duration-500"
        id="progress-bar"
      />
    </div>
  );
};

export default RouteProgress;
