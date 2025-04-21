"use client";
import React from "react";
import { useSelector } from "react-redux";
import { allJobsData } from "@/lib/features/job";
import JobDetailWrapper from "@/app/components/wrapper/jobDetailwrapper";

interface JobDetailsProps {
  params: {
    id: string;
  };
}

const JobDetails = ({ params }: JobDetailsProps) => {
  const _allJobs = useSelector(allJobsData);

  // Ensure allJobsData is an array and filter the job using id
  const jobData = Array.isArray(_allJobs)
    ? _allJobs.find((job: any) => job.id === params.id)
    : null;

  // Debugging log for checking the fetched data
  console.log("Job Data:", jobData);

  if (!jobData) {
    return <div>Job not found or loading...</div>;
  }

  const {
    manager,
    customer,
    location,
    address,
    curbshot,
    progressPercent,
    status,
  } = jobData;

  return (
    <>
      <div className="p-4 max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Job Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Status</h2>
            <p className="capitalize text-blue-600">{status || "No Status"}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${progressPercent || 0}%` }}
              />
            </div>
            <p className="text-right mt-1 text-sm text-gray-600">
              {progressPercent || 0}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Customer</h2>
            <div className="flex items-center space-x-4">
              <img
                src={customer?.photo || "/default-customer.jpg"}
                alt="Customer"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p>{customer?.name || "N/A"}</p>
                <p className="text-sm text-gray-500">
                  {customer?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Manager</h2>
            <div className="flex items-center space-x-4">
              <img
                src={manager?.photo || "/default-manager.jpg"}
                alt="Manager"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p>{manager?.name || "N/A"}</p>
                <p className="text-sm text-gray-500">
                  {manager?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Location Info</h2>
          <p className="font-medium">{location?.name || "N/A"}</p>
          <p className="text-sm">{location?.address?.full || "N/A"}</p>
          <p className="text-sm text-gray-600 mt-1">
            Email: {location?.email || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            Phone: {location?.phone || "N/A"}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Service Address</h2>
          <p>{address?.full || "N/A"}</p>
          <p className="text-sm text-gray-600">
            {address?.city}, {address?.state}, {address?.zip}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {address?.lat && address?.lng && (
            <iframe
              src={`https://www.google.com/maps?q=${address.lat},${address.lng}&z=14&output=embed`}
              className="w-full h-64 rounded-lg"
              loading="lazy"
              allowFullScreen
            />
          )}

          {curbshot && (
            <img
              src={curbshot}
              alt="Curbshot"
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default JobDetails;
