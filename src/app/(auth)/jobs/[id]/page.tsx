import React from "react";
import JobDetailsPage from "@/app/components/pages/JobDetails";
import { _getJobDetails, allJobsData } from "@/lib/features/job";
import { useSelector } from "react-redux";

interface JobDetailsProps {
  params: {
    id: string;
  };
}

const JobDetails = ({ params }: JobDetailsProps) => {
  return <JobDetailsPage id={params.id} />;
};

export default JobDetails;
