import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./schedules.css"; // Import your plain CSS here

import { Timestamp } from "firebase/firestore";
import { getTeams } from "@/lib/features/team";
import { getBookingsForEmployeesOnDate } from "@/lib/features/employee";
import { doIntervalsOverlap } from "@/utils/time-date";
import {
  deleteEmergencyBookingById,
  deleteNonScheduledBookingById,
  saveBooking,
} from "@/lib/features/bookService";
import { Button as AntButton, Select, TimePicker, message, Spin } from "antd";
import { useAuth } from "@/lib/features/AuthProvider/useAuth";

const { Option } = Select;

interface SchedulerPopupProps {
  onClose: () => void;
  bookingData: any;
  onParentClose: () => void;
  type: string;
}

const SchedulerPopup: React.FC<SchedulerPopupProps> = ({
  onClose,
  bookingData,
  onParentClose,
  type,
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [employees, setEmployees] = useState<Array<any>>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dateError, setDateError] = useState<string>("");
  const [startError, setStartError] = useState<string>("");
  const [endError, setEndError] = useState<string>("");
  const [employeeError, setEmployeeError] = useState<string>("");
  const { role } = useAuth();
  const empId = "";
  useEffect(() => {
    const fetchData = async () => {
      const res = await getTeams();
      const availableEmployees = res.filter(
        (item: any) => item.available === true && item.isDisable !== true
      );
      setEmployees(availableEmployees);
      if (role === "admin" && availableEmployees.length > 0) {
        setSelectedEmployee(availableEmployees[0].id);
      }
    };

    fetchData();
  }, [role]);

  useEffect(() => {
    if (role === "employee" && empId) {
      setSelectedEmployee(empId);
    }
  }, [role, empId]);

  const getISODateTime = (date: Date | null, time: string): string | null => {
    if (!date || !time) return null;
    const [hours, minutes] = time.split(":").map(Number);
    const updatedDate = new Date(date);
    updatedDate.setHours(hours, minutes, 0, 0);
    return updatedDate.toISOString();
  };

  const handleSubmit = async () => {
    setDateError("");
    setStartError("");
    setEndError("");
    setEmployeeError("");
    let isValid = true;

    if (!date) {
      setDateError("Please select a date.");
      isValid = false;
    }
    if (!start) {
      setStartError("Start time is required.");
      isValid = false;
    }
    if (!end) {
      setEndError("End time is required.");
      isValid = false;
    }
    if (!selectedEmployee) {
      setEmployeeError("Please select an employee.");
      isValid = false;
    }

    if (!isValid || !date) return;

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const startTime = new Date(`${formattedDate}T${start}`);
    const endTime = new Date(`${formattedDate}T${end}`);
    const currentTime = new Date();

    if (startTime >= endTime) {
      setStartError("Start time must be earlier than end time.");
      setEndError("End time must be later than start time.");
      isValid = false;
    }

    if (startTime < currentTime) {
      setStartError("Cannot add booking in the past.");
      isValid = false;
    }

    if (!isValid) return;

    const bookings = await getBookingsForEmployeesOnDate(
      [selectedEmployee],
      date
    );

    const hasConflict = bookings.some((booking: any) =>
      doIntervalsOverlap(
        {
          start: Timestamp.fromDate(new Date(getISODateTime(date, start)!)),
          end: Timestamp.fromDate(new Date(getISODateTime(date, end)!)),
        },
        booking.schedule.slot
      )
    );

    if (hasConflict) {
      message.error("A booking exists at the selected time.");
      return;
    }

    const schedule = {
      date: getISODateTime(date, "00:00"),
      slot: {
        start: getISODateTime(date, start),
        end: getISODateTime(date, end),
      },
    };

    try {
      setLoading(true);
      const updatedData = { ...bookingData, schedule, empId: selectedEmployee };
      delete updatedData.id;

      const res = await saveBooking(updatedData, type, "approved");

      if (res.success) {
        let deleteRes;
        if (type === "nonSchedule") {
          deleteRes = await deleteNonScheduledBookingById(bookingData?.id);
        } else if (type === "emergency") {
          deleteRes = await deleteEmergencyBookingById(bookingData?.id);
        }

        if (deleteRes) {
          message.success("Booking successfully scheduled.");
          onClose();
          onParentClose();
        }
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      message.error("Failed to save booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <h3 className="heading">Schedule Your Bookings</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="datePickerWrapper">
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={date}
              onChange={(selectedDate: Date | null) => setDate(selectedDate)}
              inline
              minDate={new Date()}
            />
            {dateError && <p className="error">{dateError}</p>}
          </div>

          <div className="timeRow">
            <TimePicker
              format="HH:mm"
              onChange={(time) => setStart(time ? time.format("HH:mm") : "")}
              className="timePicker"
              placeholder="Start Time"
            />
            <span className="separator">-</span>
            <TimePicker
              format="HH:mm"
              onChange={(time) => setEnd(time ? time.format("HH:mm") : "")}
              className="timePicker"
              placeholder="End Time"
            />
          </div>
          {startError && <p className="error">{startError}</p>}
          {endError && <p className="error">{endError}</p>}

          {role === "admin" && (
            <div className="container">
              <Select
                className="select"
                onChange={(value) => setSelectedEmployee(value)}
                value={selectedEmployee}
                style={{ width: "100%" }}
                placeholder="Select Employee"
              >
                {employees.map((employee: any) => (
                  <Option key={employee.id} value={employee.id}>
                    {employee.name}
                  </Option>
                ))}
              </Select>
              {employeeError && <p className="error">{employeeError}</p>}
            </div>
          )}

          <div className="button">
            <AntButton type="primary" htmlType="submit" block>
              Submit
            </AntButton>
          </div>
        </form>
      </div>
      {loading && (
        <div className="loaderOverlay">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default SchedulerPopup;
