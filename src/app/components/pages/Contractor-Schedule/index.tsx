"use client";

import React, { useRef, useEffect, useMemo, useState } from "react";
import { Eventcalendar, setOptions } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

import { getTeams } from "@/lib/features/team";
import { getBookingsBetweenDates } from "@/lib/features/bookService";
import { formatTo12Hour } from "@/utils/time-date";
import BookingDetails from "@/app/components/pages/BookingDetails";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

export default function CSchedules() {
  const [bookingData, setBookingData] = useState<any[]>([]);
  const [resourceData, setResourceData] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [columnWidth, setColumnWidth] = useState<"small" | "medium">("medium");
  const isPageLoaded = useRef(false);

  // Set initial columnWidth based on screen size
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setColumnWidth(window.innerWidth < 640 ? "small" : "medium");
      };

      handleResize(); // Set on mount
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      const res = await getTeams();
      const resources = res?.map((team: any) => ({
        id: team.id,
        name: team.name,
      }));
      setResourceData(resources);
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchBookings = async (
      firstDay: Date | null,
      lastDay: Date | null
    ) => {
      if (!firstDay || !lastDay) return;

      try {
        const response = await getBookingsBetweenDates(firstDay, lastDay);
        const bookings = response
          ?.filter((item: any) => item.schedule)
          .map((item: any) => {
            const { id, schedule, customerDetails, bookingStatus, empId } =
              item;
            const { start, end } = schedule.slot;
            const color =
              bookingStatus === "pending"
                ? "#f5b105"
                : bookingStatus === "declined"
                  ? "#f51505"
                  : bookingStatus === "approved"
                    ? "#29f505"
                    : "";

            return {
              id,
              title: `${customerDetails?.name} ${formatTo12Hour(
                start.toDate()
              )}-${formatTo12Hour(end.toDate())}`,
              resource: empId,
              start: start.toDate(),
              end: end.toDate(),
              color,
            };
          });

        setBookingData(bookings);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchBookings(startDate, endDate);
  }, [startDate, endDate, isPopupOpen]);

  const myView: any = useMemo(
    () => ({
      timeline: {
        type: "week",
        eventList: true,
        columnWidth,
        scroll: "none",
      },
    }),
    [columnWidth]
  );

  const handleEventClick = (event: any) => {
    setSelectedId(event.event.id);
    setIsPopupOpen(true);
  };

  const handlePageChange = (event: any) => {
    const { firstDay, lastDay } = event;
    setStartDate(firstDay);
    setEndDate(lastDay);
  };

  const handlePageLoaded = (event: any) => {
    if (isPageLoaded.current) return;
    isPageLoaded.current = true;
    const { firstDay, lastDay } = event;
    setStartDate(firstDay);
    setEndDate(lastDay);
  };

  return (
    <>
      <div className="schedule-wrapper px-2 sm:px-4 md:px-8 lg:px-16 py-4 max-w-screen-xl mx-auto overflow-auto">
        <div className="min-w-[800px]">
          <Eventcalendar
            clickToCreate={false}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={true}
            eventDelete={false}
            view={myView}
            data={bookingData}
            resources={resourceData}
            onEventClick={handleEventClick}
            onPageChange={handlePageChange}
            onPageLoaded={handlePageLoaded}
            cssClass="no-horizontal-scroll"
          />
        </div>
      </div>
      {isPopupOpen && (
        <BookingDetails
          id={selectedId}
          onClose={() => setIsPopupOpen(false)}
          type="normal"
        />
      )}
    </>
  );
}
