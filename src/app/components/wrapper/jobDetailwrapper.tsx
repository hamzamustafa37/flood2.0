"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { _getJobDetails } from "@/lib/features/job";

interface JobDetailWrapperProps {
  id: string;
  children: React.ReactNode;
}

const JobDetailWrapper = ({ id, children }: JobDetailWrapperProps) => {
  const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     if (id) {
  //       dispatch(_getJobDetails(id));
  //     }
  //   }, [dispatch, id]);

  return <>{children}</>;
};

export default JobDetailWrapper;
