"use client";
import React, { useState } from "react";
import { TimePicker, Button } from "antd";
import { EditOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type TimeRange = {
  start: string | null;
  end: string | null;
};

const defaultHours: Record<string, TimeRange> = weekdays.reduce(
  (acc, day) => {
    acc[day] = { start: "09:00", end: "21:00" };
    return acc;
  },
  {} as Record<string, TimeRange>
);

const WeeklyHours: React.FC = () => {
  const [hours, setHours] = useState(defaultHours);
  const [editDay, setEditDay] = useState<string | null>(null);
  const [tempTimes, setTempTimes] = useState<
    Partial<Record<string, TimeRange>>
  >({});

  const onSave = (day: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: tempTimes[day] || prev[day],
    }));
    setEditDay(null);
  };

  const onDelete = (day: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { start: null, end: null },
    }));
    setEditDay(null);
  };

  const renderTime = (value: string | null) =>
    value ? (
      <div className="px-4 py-2 rounded border text-sm bg-gray-100">
        {dayjs(value, "HH:mm").format("hh:mm A")}
      </div>
    ) : (
      <div className="px-4 py-2 rounded border text-sm bg-gray-100 text-gray-400">
        --:-- --
      </div>
    );

  return (
    <div className="space-y-4">
      {weekdays.map((day) => {
        const isEditing = editDay === day;
        const current = hours[day];
        const temp = tempTimes[day] || {
          start: current.start,
          end: current.end,
        };

        return (
          <div key={day} className="flex items-center space-x-4">
            <div className="w-24 font-medium">{day}</div>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <TimePicker
                    value={temp.start ? dayjs(temp.start, "HH:mm") : null}
                    format="hh:mm A"
                    onChange={(value) =>
                      setTempTimes((prev) => ({
                        ...prev,
                        [day]: {
                          ...temp,
                          start: value ? value.format("HH:mm") : null,
                        },
                      }))
                    }
                  />
                  <span>-</span>
                  <TimePicker
                    value={temp.end ? dayjs(temp.end, "HH:mm") : null}
                    format="hh:mm A"
                    onChange={(value) =>
                      setTempTimes((prev) => ({
                        ...prev,
                        [day]: {
                          ...temp,
                          end: value ? value.format("HH:mm") : null,
                        },
                      }))
                    }
                  />
                </>
              ) : (
                <>
                  {renderTime(current.start)}
                  <span>-</span>
                  {renderTime(current.end)}
                </>
              )}
            </div>

            <div className="ml-auto flex items-center space-x-3">
              {isEditing ? (
                <Button
                  type="text"
                  icon={<CheckOutlined />}
                  onClick={() => onSave(day)}
                />
              ) : (
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setEditDay(day);
                    setTempTimes((prev) => ({
                      ...prev,
                      [day]: { start: current.start, end: current.end },
                    }));
                  }}
                />
              )}
              <Button
                type="text"
                icon={<DeleteOutlined style={{ color: "red" }} />}
                onClick={() => onDelete(day)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyHours;
