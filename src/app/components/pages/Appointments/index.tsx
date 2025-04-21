"use client";
import React, { useState, useEffect } from "react";

interface WeekDay {
  day: string;
  date: number;
  month: string;
}

export default function AppointmentWeek() {
  const today = new Date();
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const [startDate, setStartDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000)
  );
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    setEndDate(new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000));
  }, [startDate]);

  const formatDate = (date: Date): string =>
    `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;

  const getWeekDays = (start: Date): Array<WeekDay> => {
    return Array.from({ length: 7 }, (_, i) => {
      let date = new Date(start);
      date.setDate(start.getDate() + i);
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.getDate(),
        month: date.toLocaleString("en-US", { month: "short" }),
      };
    });
  };

  const getHours = (): Array<string> => {
    return Array.from({ length: 17 }, (_, i) => `${i + 6}:00 AM`).map(
      (hour, i) => (i + 6 >= 12 ? hour.replace("AM", "PM") : hour)
    );
  };

  const [weekDays, setWeekDays] = useState<Array<WeekDay>>(
    getWeekDays(startDate)
  );
  const hours = getHours();

  const nextWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() + 7);
    setStartDate(newStart);
    setWeekDays(getWeekDays(newStart));
  };

  const prevWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(newStart.getDate() - 7);
    setStartDate(newStart);
    setWeekDays(getWeekDays(newStart));
  };

  const resetToday = () => {
    const newStart = new Date(today.getFullYear(), today.getMonth(), 1);
    setStartDate(newStart);
  };

  const addNote = (dayIndex: string, hourIndex: string, isHalfHour = false) => {
    const noteText = prompt("Enter your note:");
    if (noteText) {
      const key = isHalfHour
        ? `${dayIndex}-${hourIndex}-half`
        : `${dayIndex}-${hourIndex}`;
      setNotes((prevNotes) => ({
        ...prevNotes,
        [key]: noteText,
      }));
    }
  };

  return (
    <>
      <div id="heading-container">
        <div className="date-box">
          <h1>{date.toLocaleDateString("en-US", { weekday: "long" })}</h1>
        </div>
        <div className="date-box">
          <h1>
            {day} {month}, {year}
          </h1>
        </div>
      </div>
      <div className="calender-container">
        <div className="calendar-title">
          <div>
            <button onClick={resetToday}>Today</button>
          </div>
          <div className="week-nav">
            <button onClick={prevWeek}>{"<"}</button>
            <h2>
              {formatDate(startDate)} - {formatDate(endDate)}
            </h2>
            <button onClick={nextWeek}>{">"}</button>
          </div>
          <div>
            <button onClick={resetToday}>Weekly</button>
            <button onClick={resetToday}>Monthly</button>
          </div>
        </div>

        <div className="calender-body">
          <table className="calender-table">
            <thead>
              <tr>
                <th>Time</th>
                {weekDays.map((day, index) => (
                  <th key={index}>
                    <div>
                      {day.date} {day.month}
                    </div>
                    <div>{day.day}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, hourIndex) => (
                <React.Fragment key={hourIndex}>
                  <tr>
                    <td>{hour}</td>
                    {weekDays.map((day, dayIndex) => {
                      const fullDate = `${today.getFullYear()}-${day.month}-${String(day.date).padStart(2, "0")}`;
                      return (
                        <td
                          key={dayIndex}
                          className="schedule-cell"
                          onClick={() => addNote(fullDate, String(hourIndex))}
                        >
                          {notes[`${fullDate}-${hourIndex}`] && (
                            <span className="note">
                              {notes[`${fullDate}-${hourIndex}`]}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="half-hour">
                    <td></td>
                    {weekDays.map((day, dayIndex) => {
                      const fullDate = `${today.getFullYear()}-${day.month}-${String(day.date).padStart(2, "0")}`;
                      return (
                        <td
                          key={dayIndex}
                          className="schedule-cell half-hour-cell"
                          onClick={() =>
                            addNote(fullDate, String(hourIndex), true)
                          }
                        >
                          {notes[`${fullDate}-${hourIndex}-half`] && (
                            <span className="note">
                              {notes[`${fullDate}-${hourIndex}-half`]}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
