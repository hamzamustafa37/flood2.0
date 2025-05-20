"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Button as AntButton,
  Image,
  Spin,
  Typography,
  message,
  Tabs,
  TabsProps,
  Descriptions,
  Row,
  Col,
} from "antd";

import {
  declineBooking,
  getBookingById,
  getEmergencyBookingById,
  getNonScheduledBookingById,
  updateBookingStatus,
} from "@/lib/features/bookService";
import { formatTo12Hour } from "@/utils/time-date";
import SchedulerPopup from "../../common/ScheduleModal";
import {
  ICustomerBooking,
  INonScheduledBooking,
} from "@/utils/types/customerBooking.types";
import { Timestamp } from "firebase/firestore";

const { Title, Text } = Typography;

interface BookingDetailsProps {
  type: "emergency" | "nonSchedule" | "normal";
  id: string;
  onClose: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  type,
  id,
  onClose,
}) => {
  const [imgPreviewVisible, setImgPreviewVisible] = useState(false);
  const [bookingData, setBookingData] = useState<
    ICustomerBooking | INonScheduledBooking
  >();
  const [loading, setLoading] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(type, "The type");
      setLoading(true);
      try {
        let response: ICustomerBooking | INonScheduledBooking;
        if (type === "emergency") {
          response = await getEmergencyBookingById(id);
        } else if (type === "nonSchedule") {
          response = await getNonScheduledBookingById(id);
        } else {
          response = await getBookingById(id);
        }
        console.log(response, "the response");
        setBookingData(response);
      } catch (error) {
        message.error("This booking is not available now.");
        console.error(error);
        onClose();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, type, onClose]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!id || !bookingData) return;
    setLoading(true);
    try {
      const start =
        bookingData.schedule?.slot?.start instanceof Timestamp
          ? bookingData.schedule.slot.start.toDate()
          : null;

      const end =
        bookingData.schedule?.slot?.end instanceof Timestamp
          ? bookingData.schedule.slot.end.toDate()
          : null;

      const date =
        bookingData.schedule?.date instanceof Timestamp
          ? bookingData.schedule.date.toDate()
          : null;

      const scheduleString = date
        ? `${date.toLocaleDateString()} -- ${formatTo12Hour(start)} - ${formatTo12Hour(end)}`
        : "";

      await updateBookingStatus(
        id,
        newStatus,
        bookingData.customerDetails,
        bookingData.empId,
        role,
        scheduleString
      );
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async () => {
    setLoading(true);
    try {
      await declineBooking(id);
      onClose();
    } catch (error) {
      console.error("Error declining:", error);
    } finally {
      setLoading(false);
    }
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Basic Info",
      children: (
        <Descriptions
          column={2}
          labelStyle={{ fontWeight: 600 }}
          contentStyle={{ color: "#555" }}
        >
          <Descriptions.Item>
            <Text strong>Name: </Text>
            <span className="mx-2">
              {" "}
              {bookingData?.customerDetails?.name || "N/A"}
            </span>
          </Descriptions.Item>
          <Descriptions.Item>
            <Text strong>Address: </Text>
            <span className="mx-2">
              {bookingData?.customerDetails?.address || "N/A"}
            </span>
          </Descriptions.Item>
          <Descriptions.Item>
            <Text strong>Zip Code: </Text>
            <span className="mx-2">
              {bookingData?.customerDetails?.zipCode ||
                bookingData?.zipCode ||
                "N/A"}
            </span>
          </Descriptions.Item>
          <Descriptions.Item>
            <Text strong>Phone No: </Text>
            <span className="mx-2">
              {bookingData?.customerDetails?.phone || "N/A"}
            </span>
          </Descriptions.Item>
          <Descriptions.Item>
            <Text strong>Email: </Text>
            <span className="mx-2">
              {bookingData?.customerDetails?.email || "N/A"}
            </span>
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: "2",
      label: "Schedule & Actions",
      children: (
        <div>
          <Title level={4}>Booking Information</Title>

          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Text strong>Service:</Text> {bookingData?.service || "N/A"}
            </Col>
            <Col span={12}>
              {bookingData?.schedule && (
                <>
                  <Text strong>Schedule:</Text>{" "}
                  {type === "emergency"
                    ? "Emergency"
                    : bookingData?.schedule?.date instanceof Timestamp &&
                        bookingData?.schedule?.slot?.start instanceof
                          Timestamp &&
                        bookingData?.schedule?.slot?.end instanceof Timestamp
                      ? `${bookingData.schedule.date.toDate().toLocaleDateString()} -- ${formatTo12Hour(
                          bookingData.schedule.slot.start.toDate()
                        )} - ${formatTo12Hour(bookingData.schedule.slot.end.toDate())}`
                      : "N/A"}
                </>
              )}
            </Col>
            {typeof bookingData?.plumbingIssue?.plumbingIssue === "string" &&
              bookingData.plumbingIssue.plumbingIssue.trim() !== "" && (
                <Col span={12}>
                  <Text strong>Plumbing Issue:</Text>{" "}
                  {bookingData.plumbingIssue.plumbingIssue}
                </Col>
              )}
          </Row>

          {(type === "nonSchedule" || type === "emergency") && (
            <div style={{ marginTop: 20 }}>
              <AntButton
                type="primary"
                danger
                onClick={() => setIsSchedule(true)}
              >
                Schedule Booking
              </AntButton>
            </div>
          )}

          {bookingData?.bookingStatus === "pending" &&
          type !== "nonSchedule" ? (
            <div style={{ marginTop: 20 }}>
              <AntButton
                danger
                onClick={handleDecline}
                style={{ marginRight: 10 }}
              >
                Decline
              </AntButton>
              <AntButton
                type="primary"
                onClick={() => handleStatusUpdate("approved")}
              >
                Approve
              </AntButton>
            </div>
          ) : (
            <div style={{ marginTop: 20 }}>
              <Text strong>Status: </Text>
              <Text type="secondary">{bookingData?.bookingStatus}</Text>
            </div>
          )}
          <div className="">
            <Text strong>Images:</Text>

            {bookingData &&
              bookingData?.causeOfDamage?.fileURLs?.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <Image.PreviewGroup
                    preview={{
                      visible: imgPreviewVisible,
                      onVisibleChange: setImgPreviewVisible,
                    }}
                  >
                    {bookingData.causeOfDamage.fileURLs.map((url, index) => (
                      <Image
                        key={index}
                        width={300}
                        height={200}
                        src={url}
                        alt={`img-${index}`}
                      />
                    ))}
                  </Image.PreviewGroup>
                </div>
              )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        open
        onCancel={onClose}
        title="Booking Details"
        footer={null}
        width={700}
      >
        {loading || !bookingData ? (
          <div className="flex justify-center items-center">
            <Spin spinning={true} />
          </div>
        ) : (
          <Tabs items={tabItems} />
        )}
      </Modal>

      {isSchedule && bookingData && (
        <SchedulerPopup
          onClose={() => setIsSchedule(false)}
          type={type}
          onParentClose={onClose}
          bookingData={bookingData}
        />
      )}
    </>
  );
};

export default BookingDetails;
