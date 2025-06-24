import React, { useEffect, useState } from "react";
import { Button, Typography, Row, Col, Space, Tag, Calendar } from "antd";
import { StepHeader } from "./common/stepHeader";
import { Timestamp } from "firebase/firestore";
import {
  fetchWorkingDays,
  formatDate,
  generateTimeSlots,
  getDayNumber,
} from "@/lib/features/time";
import { getBookingsForEmployeesOnDate } from "@/lib/features/employee";
import { doIntervalsOverlap, formatTo12Hour } from "@/utils/time-date";
import dayjs from "dayjs";
import { getAllLeaveDays } from "@/lib/features/leave";

const { Title } = Typography;

interface StepFourBProps {
  formData: Partial<IFormData>;
  setFormData: (data: Partial<IFormData>) => void;
  onPrev: () => void;
  onNext: () => void;
  employees?: { id: string }[];
  duration?: number;
  bufferTime?: number;
}

const StepFourB: React.FC<StepFourBProps> = ({
  formData,
  setFormData,
  onPrev,
  onNext,
  employees = [],
  duration = 60,
  bufferTime = 30,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [offDays, setOffDays] = useState<number[]>([]);
  const [holidays, setHolidays] = useState<string[]>([]);
  const [workingHours, setWorkingHours] = useState<any[]>([]);
  const [employeeBookings, setEmployeeBookings] = useState<any>({});
  const [timeSlots, setTimeSlots] = useState<any[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await fetchWorkingDays();
      const off: number[] = [];
      const hours: any[] = [];

      settings.forEach((item: any) => {
        if (!item.start || !item.end) {
          off.push(getDayNumber(item.day));
        } else {
          hours.push({
            day: getDayNumber(item.day),
            start: item.start,
            end: item.end,
          });
        }
      });

      setOffDays(off);
      setWorkingHours(hours);
    };

    const fetchHolidaysList = async () => {
      const holidaysData = await getAllLeaveDays();
      setHolidays(holidaysData.map((item: any) => item.date));
    };

    fetchSettings();
    fetchHolidaysList();
  }, []);

  useEffect(() => {
    const generateSlots = async () => {
      console.log("true", selectedDate);
      console.log("true", employees);

      if (!selectedDate || !employees || employees.length === 0) return;
      console.log(
        "Selected date or working hours changed, generating slots..."
      );

      const day = selectedDate.getDay();
      const hours = workingHours.find((item) => item.day === day);
      if (!hours) return;
      console.log(hours, "Working ");
      console.log(day, "Working ");

      const slots = generateTimeSlots(
        selectedDate,
        duration,
        bufferTime,
        hours.start,
        hours.end
      );
      console.log(slots, "Available time slots");

      const empIds = employees.map((e) => e.id);
      const bookings = await getBookingsForEmployeesOnDate(
        empIds,
        selectedDate
      );

      const empBookings = bookings.reduce((acc: any, item: any) => {
        if (!acc[item.empId]) acc[item.empId] = [];
        acc[item.empId].push(item.schedule);
        return acc;
      }, {});

      setEmployeeBookings(empBookings);

      const availableSlots = slots.map((slot: any) => {
        const availableEmployees = employees.filter((emp) => {
          const bookings = empBookings[emp.id] || [];
          const hasOverlap = bookings.some((b: any) =>
            doIntervalsOverlap(
              {
                start: Timestamp.fromDate(new Date(slot.start)),
                end: Timestamp.fromDate(new Date(slot.end)),
              },
              b.slot
            )
          );
          return !hasOverlap;
        });

        return { ...slot, employees: availableEmployees.map((e) => e.id) };
      });

      setTimeSlots(availableSlots);
    };

    generateSlots();
  }, [selectedDate, workingHours, employees]);

  console.log(selectedDate, "Available time slots for the selected date");
  const handleSubmit = () => {
    if (!selectedDate || !selectedSlot) return;
    const empId = selectedSlot.employees[0];
    setFormData({
      schedule: {
        date: selectedDate.toISOString(),
        slot: {
          start: selectedSlot.start,
          end: selectedSlot.end,
        },
      },
      empId,
    });
    onNext();
  };

  const isDisabledDate = (date: Date) => {
    const day = date.getDay();
    const formatted = formatDate(date);
    return offDays.includes(day) || holidays.includes(formatted);
  };

  return (
    <div style={{ padding: 24 }}>
      <StepHeader
        label="Understanding the cause helps us prepare better."
        heading="Pick Your Schedule"
      />

      <div
        style={{
          background: "#fff",
        }}
      >
        <Calendar
          fullscreen={false}
          value={selectedDate ? dayjs(selectedDate) : undefined}
          onSelect={(date) => setSelectedDate(date.toDate())}
          disabledDate={(date) => isDisabledDate(date.toDate())}
        />

        {selectedDate && (
          <>
            <Title level={5} style={{ marginTop: 24 }}>
              Select Your Preferred Time Slot
            </Title>

            <Row gutter={[16, 16]}>
              {timeSlots.map((slot) => (
                <Col xs={24} sm={12} md={8} key={slot.start}>
                  <Tag.CheckableTag
                    checked={selectedSlot === slot}
                    onChange={() => setSelectedSlot(slot)}
                    style={{
                      padding: "10px 16px",
                      borderRadius: 6,
                      cursor:
                        slot.employees.length > 0 ? "pointer" : "not-allowed",
                      background: selectedSlot === slot ? "#e6f7ff" : "#fafafa",
                      border: "1px solid #d9d9d9",
                      opacity: slot.employees.length > 0 ? 1 : 0.5,
                    }}
                  >
                    {formatTo12Hour(slot.start)} to {formatTo12Hour(slot.end)}
                  </Tag.CheckableTag>
                </Col>
              ))}
            </Row>
          </>
        )}

        <Space
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button size="large" type="primary" danger onClick={onPrev}>
            Previous
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={handleSubmit}
            disabled={!selectedSlot}
          >
            Next
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default StepFourB;
