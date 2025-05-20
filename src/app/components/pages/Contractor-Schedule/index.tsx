"use client";

import React, { useRef, useEffect, useMemo, useState } from "react";
import { Eventcalendar, setOptions } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
// import { useSearchParams } from "next/navigation";

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
  const isPageLoaded = useRef(false);

  // const searchParams = useSearchParams();
  // const bookingId = searchParams.get("id");

  // Load Teams as Resources
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

  // useEffect(() => {
  //   if (bookingId) {
  //     setSelectedId(bookingId);
  //     setIsPopupOpen(true);
  //   }
  // }, [bookingId]);

  // // Fetch Bookings Between Dates
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
              title: `${customerDetails?.name} ${formatTo12Hour(start.toDate())}-${formatTo12Hour(end.toDate())}`,
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
        columnWidth: "large",
      },
    }),
    []
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
      />

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
