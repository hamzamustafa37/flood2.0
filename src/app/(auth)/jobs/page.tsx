import React from "react";
import type { Metadata, NextPage } from "next";
import { AllJobs } from "@/app/components/pages/AllJobs";

const Jobs: NextPage = () => <AllJobs />;

export const metadata: Metadata = {
  title: "Flood - Jobs",
};

export default Jobs;
