"use client";
import React, { useEffect, useState } from "react";
import { TimePicker, Button, Spin, message } from "antd";
import { EditOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { fetchWorkingDays, updateWorkingDay } from "@/lib/features/time";

interface DaySchedule {
  id: string;
  start: string | null;
  end: string | null;
  day: string;
}

const WeeklyHours: React.FC = () => {
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>({});
  const [editDay, setEditDay] = useState<string | null>(null);
  const [tempTimes, setTempTimes] = useState<
    Partial<Record<string, { start: string | null; end: string | null }>>
  >({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        setLoading(true);
        const response = await fetchWorkingDays();
        const formatted = response.reduce(
          (acc: Record<string, DaySchedule>, curr: any) => {
            acc[curr.day] = {
              id: curr.id,
              start: curr.start || null,
              end: curr.end || null,
              day: curr.day,
            };
            return acc;
          },
          {}
        );
        setSchedule(formatted);
      } catch (err) {
        console.error("Failed to fetch schedule:", err);
        message.error("Could not load working hours.");
      } finally {
        setLoading(false);
      }
    };
    loadSchedule();
  }, []);

  const onSave = async (day: string) => {
    const temp = tempTimes[day];
    if (!temp) return;

    if (temp.start && temp.end && temp.start >= temp.end) {
      return message.warning("Start time must be before End time.");
    }

    try {
      await updateWorkingDay(schedule[day].id, {
        start: temp.start,
        end: temp.end,
      });

      setSchedule((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          start: temp.start,
          end: temp.end,
        },
      }));
      setEditDay(null);
      message.success(`${day} updated.`);
    } catch (err) {
      console.error(`Error saving ${day}:`, err);
      message.error(`Failed to save ${day}.`);
    }
  };

  const onDelete = async (day: string) => {
    try {
      await updateWorkingDay(schedule[day].id, {
        start: "",
        end: "",
      });

      setSchedule((prev) => ({
        ...prev,
        [day]: { ...prev[day], start: null, end: null },
      }));
      setEditDay(null);
      message.success(`${day} cleared.`);
    } catch (err) {
      console.error(`Error deleting ${day}:`, err);
      message.error(`Failed to clear ${day}.`);
    }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spin tip="Loading schedule..." size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.keys(schedule).map((day) => {
        const isEditing = editDay === day;
        const current = schedule[day];
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
                      [day]: {
                        start: current.start,
                        end: current.end,
                      },
                    }));
                  }}
                />
              )}
              {(current.start || current.end) && (
                <Button
                  type="text"
                  icon={<DeleteOutlined style={{ color: "red" }} />}
                  onClick={() => onDelete(day)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyHours;
