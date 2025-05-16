import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Button as AntButton,
  Image,
  Spin,
  Typography,
  message,
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

const { Title, Text } = Typography;

const BookingDetails = ({
  type,
  id,
  onClose,
}: {
  type: any;
  id: any;
  onClose: any;
}) => {
  const [imgPreviewVisible, setImgPreviewVisible] = useState(false);
  const [bookingData, setBookingData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (type === "emergency") {
          response = await getEmergencyBookingById(id);
        } else if (type === "nonSchedule") {
          response = await getNonScheduledBookingById(id);
        } else {
          response = await getBookingById(id);
        }
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

  const handleStatusUpdate = async (newStatus: any) => {
    if (!id) return;
    setLoading(true);
    try {
      await updateBookingStatus(
        id,
        newStatus,
        bookingData?.customerDetails,
        bookingData?.empId,
        role,
        `${bookingData?.schedule?.date.toDate().toLocaleDateString()} -- ${formatTo12Hour(
          bookingData?.schedule?.slot.start.toDate()
        )} - ${formatTo12Hour(bookingData?.schedule?.slot.end.toDate())}`
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

  if (!bookingData) {
    return (
      <Modal open centered footer={null} onCancel={onClose}>
        <Spin spinning={true} />
      </Modal>
    );
  }

  return (
    <>
      <Modal
        open
        onCancel={onClose}
        title="Booking Details"
        footer={null}
        width={700}
      >
        <Title level={4}>Basic Information</Title>
        <Text strong>Name: </Text> {bookingData?.customerDetails?.name}
        <br />
        <Text strong>Address: </Text>
        <div>
          {bookingData?.customerDetails?.address}
          <br />
          {bookingData?.customerDetails?.zipCode}
          <br />
          {bookingData?.customerDetails?.phone}
          <br />
          {bookingData?.customerDetails?.email}
        </div>
        <br />
        <Title level={4}>Booking Information</Title>
        <div>
          <Text strong>Service:</Text> {bookingData?.service}
        </div>
        {bookingData?.schedule && (
          <div>
            <Text strong>Schedule: </Text>
            {type === "emergency" ? (
              "Emergency"
            ) : (
              <>
                {bookingData?.schedule?.date.toDate().toLocaleDateString()} --
                {formatTo12Hour(
                  bookingData?.schedule?.slot.start.toDate()
                )} - {formatTo12Hour(bookingData?.schedule?.slot.end.toDate())}
              </>
            )}
          </div>
        )}
        {bookingData?.plumbingIssue?.plumbingIssue && (
          <div>
            <Text strong>Plumbing Issue:</Text>{" "}
            {bookingData?.plumbingIssue?.plumbingIssue}
          </div>
        )}
        {bookingData?.causeOfDamage?.fileURLs?.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <Text strong>Images:</Text>
            <Image.PreviewGroup
              preview={{
                visible: imgPreviewVisible,
                onVisibleChange: (vis) => setImgPreviewVisible(vis),
              }}
            >
              {bookingData?.causeOfDamage?.fileURLs.map(
                (url: any, index: any) => (
                  <Image
                    key={index}
                    width={100}
                    height={100}
                    src={url}
                    style={{ marginRight: 8 }}
                    alt={`img-${index}`}
                  />
                )
              )}
            </Image.PreviewGroup>
          </div>
        )}
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
        {bookingData?.bookingStatus === "pending" && type !== "nonSchedule" ? (
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
      </Modal>

      {isSchedule && (
        <SchedulerPopup
          onClose={() => setIsSchedule(false)}
          type={type}
          onParentClose={onClose}
          bookingData={bookingData}
        />
      )}

      {loading && (
        <Modal open centered footer={null} closable={false}>
          <Spin spinning={true} />
        </Modal>
      )}
    </>
  );
};

BookingDetails.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookingDetails;
