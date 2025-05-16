"use client";

import React, { useRef, useEffect, useMemo, useState } from "react";
import { Eventcalendar, setOptions } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { useRouter, useSearchParams } from "next/navigation";
import { getTeams } from "@/lib/features/team";
import { getBookingsBetweenDates } from "@/lib/features/bookService";
import { formatTo12Hour } from "@/utils/time-date";
import BookingDetails from "@/app/components/pages/BookingDetails";

setOptions({
  theme: "ios",
  themeVariant: "light",
});

function App() {
  const [bookingData, setBookingData] = useState([]);
  const [resourceData, setResourceData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const isPageLoaded = useRef(false);

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTeams();
      const updatedResourceData = res?.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      setResourceData(updatedResourceData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (bookingId) {
      setId(bookingId);
      setIsPopupOpen(true);
    }
  }, [bookingId]);

  useEffect(() => {
    const fetchData = async (firstDay: any, lastDay: any) => {
      try {
        const response = await getBookingsBetweenDates(firstDay, lastDay);
        const updatedData = response
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
            const resource = empId;
            return {
              id,
              title: `${customerDetails?.name} ${formatTo12Hour(
                start.toDate()
              )}-${formatTo12Hour(end.toDate())}`,
              resource,
              start: start.toDate(),
              end: end.toDate(),
              color,
            };
          });
        setBookingData(updatedData);
      } catch (error) {
        console.log(error, "err");
      }
    };
    fetchData(startDate, endDate);
  }, [startDate, endDate, isPopupOpen]);

  const myView: any = useMemo(
    () => ({
      timeline: {
        eventList: true,
        type: "week",
        columnWidth: "large",
      },
    }),
    []
  );

  const myEvents = useMemo(() => bookingData, [bookingData]);
  const myResources = useMemo(() => resourceData, [resourceData]);

  const handleEventClick = (event: any) => {
    const eventId = event.event.id;
    setId(eventId);
    setIsPopupOpen(true);
  };

  const handlePageChange = async (event: any) => {
    const { firstDay, lastDay } = event;
    setStartDate(firstDay);
    setEndDate(lastDay);
  };

  const handlePageLoaded = async (event: any) => {
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
        data={myEvents}
        resources={myResources}
        onEventClick={handleEventClick}
        onPageChange={handlePageChange}
        onPageLoaded={handlePageLoaded}
      />
      {isPopupOpen && (
        <BookingDetails
          id={id}
          onClose={() => setIsPopupOpen(false)}
          type={""}
        />
      )}
    </>
  );
}

export default App;
