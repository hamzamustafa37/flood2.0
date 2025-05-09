"use client";
import { allJobsData } from "@/lib/features/job";
import { useAppSelector } from "@/lib/hooks";
import { Floor } from "@/utils";

import React from "react";
interface JobDetailsPageProps {
  id: string;
}

const JobDetailsPage: React.FC<JobDetailsPageProps> = ({ id }) => {
  const _allJobs = useAppSelector(allJobsData);

  const jobData: any = Array.isArray(_allJobs)
    ? _allJobs.find((job: any) => job.id === id)
    : null;

  // React.useEffect(() => {
  //   if (!jobData) {
  //     dispatch(_getJobDetails(params.id));
  //   }
  // }, [dispatch, jobData, params.id]);

  if (!jobData) {
    return (
      <div className="flex justify-center items-center p-5">
        Job not found or loading...
      </div>
    );
  }
  return (
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
              style={{ width: `${jobData.progressPercent || 0}%` }}
            />
          </div>
          <p className="text-right mt-1 text-sm text-gray-600">
            {jobData.progressPercent || 0}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Customer</h2>
          <div className="flex items-center space-x-4">
            <img
              src={jobData.customer?.photo || "/default-customer.jpg"}
              alt="Customer"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p>{jobData.customer?.name || "N/A"}</p>
              <p className="text-sm text-gray-500">
                {jobData.customer?.email || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Manager</h2>
          <div className="flex items-center space-x-4">
            <img
              src={jobData.manager?.photo || "/default-manager.jpg"}
              alt="Manager"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p>{jobData.manager?.name || "N/A"}</p>
              <p className="text-sm text-gray-500">
                {jobData.manager?.email || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Location Info</h2>
        <p className="font-medium">{jobData.location?.name || "N/A"}</p>
        <p className="text-sm">{jobData.location?.address?.full || "N/A"}</p>
        <p className="text-sm text-gray-600 mt-1">
          Email: {jobData.location?.email || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          Phone: {jobData.location?.phone || "N/A"}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Service Address</h2>
        <p>{jobData.address?.full || "N/A"}</p>
        <p className="text-sm text-gray-600">
          {jobData.address?.city}, {jobData.address?.state},{" "}
          {jobData.address?.zip}
        </p>
      </div>
      {jobData.floors && (
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Floor Details</h2>
          <div className="space-y-3">
            {(Object.entries(jobData.floors) as [string, Floor][]).map(
              ([key, floor], index) => (
                <div
                  key={key}
                  className="border border-gray-200 rounded-md p-3 bg-gray-50"
                >
                  <h3 className="font-semibold text-md mb-1">
                    Floor {floor.label || key}
                  </h3>
                  {floor.photo && (
                    <img
                      src={floor.photo}
                      alt={`Floor ${floor.label}`}
                      className="w-full h-auto rounded"
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobData.address?.lat && jobData.address?.lng && (
          <iframe
            src={`https://www.google.com/maps?q=${jobData.address.lat},${jobData.address.lng}&z=14&output=embed`}
            className="w-full h-64 rounded-lg"
            loading="lazy"
            allowFullScreen
          />
        )}
        <div className="w-full mb-4">
          {jobData.curbshot && (
            <img
              src={jobData.curbshot}
              alt="Curbshot-image"
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
