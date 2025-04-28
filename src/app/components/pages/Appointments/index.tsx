"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  _getAllAppointments,
  allAppointment,
} from "@/lib/features/appointments";

interface WeekDay {
  day: string;
  date: number;
  month: string;
  fullDate: string;
}

interface Appointment {
  startAt: string;
  url: string;
}

export default function AppointmentWeek() {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(allAppointment);
  const today = new Date();
  const [startDate, setStartDate] = useState(getStartOfWeek(today));
  const [weekDays, setWeekDays] = useState<Array<WeekDay>>([]);
  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [eventAlert, setEventAlert] = useState<Appointment | null>(null);

  useEffect(() => {
    const start = getStartOfWeek(new Date(selectedDate));
    setStartDate(start);
    setWeekDays(getWeekDays(start));
    dispatch(_getAllAppointments(formatDate(new Date(selectedDate))));
  }, [selectedDate]);

  function getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return start;
  }

  function formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  function getWeekDays(start: Date): Array<WeekDay> {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.getDate(),
        month: date.toLocaleString("en-US", { month: "short" }),
        fullDate: formatDate(date),
      };
    });
  }

  const getHours = (): string[] => [
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
  ];

  const nextWeek = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(formatDate(newDate));
  };

  const prevWeek = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(formatDate(newDate));
  };

  const resetToday = () => {
    setSelectedDate(formatDate(today));
  };

  const hours = getHours();

  const getAppointmentsForCell = (day: string, hour: string) => {
    const targetHour = parseInt(hour.split(":")[0]);
    return appointments?.filter((appointment) => {
      const start = new Date(appointment.startAt);
      const appointmentDate = formatDate(start);
      const appointmentHour = start.getHours();
      return appointmentDate === day && appointmentHour === targetHour;
    });
  };

  const handleTimeSlotClick = (day: string, time: string) => {
    const appointment = getAppointmentsForCell(day, time);
    if (appointment.length > 0) {
      setEventAlert(appointment[0]); // Assuming single event per slot
    } else {
      setEventAlert(null);
    }
    setSelectedTimeSlot(time);
  };

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Top Navigation */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
        </div>
        <div className="flex gap-2">
          <button onClick={prevWeek} className="btn">
            ←
          </button>
          <button onClick={resetToday} className="btn">
            Today
          </button>
          <button onClick={nextWeek} className="btn">
            →
          </button>
        </div>
      </div>

      {/* Weekly Event Calendar Table */}
      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-24 border p-2 text-left text-sm font-medium">
                Time
              </th>
              {weekDays.map((day, idx) => (
                <th key={idx} className="border p-2 text-sm text-center">
                  <div>{day.day}</div>
                  <div>
                    {day.date} {day.month}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hourLabel, hIdx) => (
              <tr key={hIdx} className="hover:bg-gray-50 transition">
                <td className="border p-2 text-xs text-gray-600">
                  <button
                    onClick={() => handleTimeSlotClick(selectedDate, hourLabel)}
                    className="w-full text-left p-1 hover:bg-blue-100"
                  >
                    {hourLabel}
                  </button>
                </td>
                {weekDays.map((day, dIdx) => {
                  const slotAppointments = getAppointmentsForCell(
                    day.fullDate,
                    hourLabel.split(":")[0]
                  );
                  return (
                    <td
                      key={dIdx}
                      className="border p-1 h-16 align-top text-xs"
                    >
                      {slotAppointments?.map((appt, aIdx) => (
                        <a
                          key={aIdx}
                          href={appt.url}
                          target="_blank"
                          className="block bg-blue-100 hover:bg-blue-200 rounded p-1 mb-1 text-blue-700 truncate"
                        >
                          {new Date(appt.startAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </a>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Event Alert UI */}
      {eventAlert && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded shadow-md">
          <h3 className="font-semibold">Event Alert</h3>
          <p>Event at {selectedTimeSlot}:</p>
          <a
            href={eventAlert.url}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            View Event Details
          </a>
        </div>
      )}
    </div>
  );
}
