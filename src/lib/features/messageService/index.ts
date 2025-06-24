import { adminEmails } from "@/lib/configs/adminInfo";
import { emailTemplate, EmployeeTemplate } from "@/utils/helpers/emailTempalte";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getTeamById } from "../team";
import { FaWaveSquare } from "react-icons/fa";
import { url } from "@/lib/configs/url";
import { formatTo12Hour } from "@/utils/time-date";

// Interfaces
interface IEmailPayload {
  to: string;
  message: any;
}

interface ISmsResponse {
  success?: boolean;
  message: string;
  error?: unknown;
}

export const sendEmail = async ({
  to,
  message,
}: IEmailPayload): Promise<void> => {
  const sendGridFn = httpsCallable(getFunctions(), "sendGrid");

  try {
    const data = { to, message };
    const res = await sendGridFn(data);
    console.log("Email sent to:", to, "Response:", res);
  } catch (error) {
    console.error("Email Error:", error);
  }
};

// Send SMS
export const sendSms = async (
  to: string,
  message: string
): Promise<ISmsResponse> => {
  const smsFn = httpsCallable(getFunctions(), "sendSms");

  try {
    const result = await smsFn({ to, message });
    const response = result.data as ISmsResponse;
    return response;
  } catch (error) {
    return {
      success: false,
      message: "Failed to send SMS",
      error,
    };
  }
};

export const sentMailAgainstNonscheduleBooking = async (
  name: string,
  email: string,
  phone: string
): Promise<void> => {
  const customerTemplate = emailTemplate(
    "Booking completed successfully",
    `We are pleased to inform you that your booking 
     has been successfully completed. 
     Thank you for choosing our services. 
     If you have any questions or need further assistance, 
     feel free to contact us.`,
    {},
    false,
    "",
    "",
    true
  );

  await sendEmail({ to: email, message: customerTemplate });

  const smsMessage = `"Booking Successful!"
    Your booking is confirmed. Thank you for choosing us! Need help? Contact us anytime.`;

  await sendSms(phone, smsMessage);

  const adminTemplate = emailTemplate(
    "Non-schedule booking has been created",
    `A non-schedule booking has been created by 
     ${name}. Please log in to the application 
     and assign an employee manually.`,
    {},
    false,
    "",
    "",
    false
  );

  for (const adminEmail of adminEmails) {
    await sendEmail({ to: adminEmail, message: adminTemplate });
  }
};

export const sentEmailAgainstConfirmation = async (
  empId: any,
  booking: any,
  role: any,
  slot: any
) => {
  const res: any = await getTeamById(empId);
  const template = emailTemplate(
    "Booking scheduled successfully",
    `We are pleased to inform you that an employee 
    ${res?.name} has been assigned to your booking. 
    Please feel free to contact them at ${res?.mobileNumber}.
    Appointment Time:${slot}`,
    {},
    false,
    "",
    "",
    true
  );

  await sendEmail({ to: booking?.email, message: template });
  console.log(booking, "booking");
  const smsMessageUser = `"Booking Scheduled Successfully ✅
 We are pleased to inform you that our employee ${res?.name} has been assigned to your booking.
 For any queries or assistance, you may contact them at ${res?.mobileNumber}.
 
 📅 Appointment Time: ${slot}
 
 Thank you for choosing our services!"`;
  await sendSms(booking?.phone, smsMessageUser);
  let employeeTemplate;
  // eslint-disable-next-line
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${booking?.address}, ${booking?.zipCode}`)}`;

  if (role === "admin") {
    employeeTemplate = emailTemplate(
      "You've been assigned to a new job Booking",
      `We are pleased to inform you that the admin has approved your 
      assignment to the booking made by ${booking.name}. Please proceed 
      with the necessary actions as per the booking details.
      Appointment Time:${slot}`,
      {},
      true,
      mapsUrl,
      "Location"
    );
  } else {
    employeeTemplate = emailTemplate(
      "You've been assigned to a new job Booking",
      `This is to inform you that a new booking 
      has been assigned to you by ${booking.name} . 
      Please review the details:
       Appointment Time:${slot}`,
      {},
      true,
      mapsUrl,
      "Location"
    );
  }
  // eslint-disable-next-line
  const smsMessage = `This is to inform you that a new booking has been assigned to you. Please review the details:
 Appointment Time:${slot} 
 Location:${mapsUrl}`;
  await sendSms(res.mobileNumber, smsMessage);

  await sendEmail({ to: booking?.email, message: template });
  let adminTemplate = emailTemplate(
    `Employee has been assigned to a new job booking.`,
    ` ${res?.name} has been assigned to the 
    booking made by ${booking.name}.
     Please review the details`,
    booking
  );
  if (role !== "admin") {
    let admins = adminEmails;
    for (let admin of admins) {
      await sendEmail({ to: booking?.email, message: adminTemplate });
    }
  }
};
export const findEmployeeAndSentMessage = async (
  empId: any,
  id: any,
  name: any,
  causeOfDamage: any,
  plumbingIssue: any,
  address: any,
  city: any,
  zipCode: any,
  type: any,
  slot: any
) => {
  console.log("empid in findEmployees", empId);
  const res: any = await getTeamById(empId);
  console.log(res, "slot");

  let employeeTemplate;

  let message = `${FaWaveSquare}/employee?id=${id}`;
  // eslint-disable-next-line
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${zipCode}`)}`;

  if (type === "normal") {
    employeeTemplate = EmployeeTemplate(
      name,
      causeOfDamage,
      plumbingIssue,
      address,
      city,
      zipCode,
      message,
      type
    );
  } else {
    employeeTemplate = emailTemplate(
      "You've been assigned to a new job Booking",
      `We are pleased to inform you that the admin has approved your 
      assignment to the booking made by ${name}. Please proceed 
      with the necessary actions as per the booking details.
      Appointment Time:${slot}`,
      {},
      true,
      mapsUrl,
      "Location"
    );
  }

  await sendEmail({ to: res.email, message: employeeTemplate });

  // eslint-disable-next-line
  const smsMessage = `A new booking just came in. Please check the details and either approve or reject it: ${url}/employee?id=${id}`;

  const resp = await sendSms(res.mobileNumber, smsMessage);
  console.log(resp, "sms res");
};

// eslint-disable-next-line
export const sendEmailAgainstEmergencyNonScheduleOnScheduling = async (
  formData: any,
  role: any
) => {
  console.log(formData, "this using mauplte data");
  try {
    const res: any = await getTeamById(formData?.empId);

    if (!res) {
      console.error("Error: Employee not found.");
      return;
    }
    const formattedDate = new Date(formData.schedule.date).toLocaleDateString();
    const formattedStart = formatTo12Hour(
      new Date(formData.schedule.slot.start)
    );
    const formattedEnd = formatTo12Hour(new Date(formData.schedule.slot.end));
    // eslint-disable-next-line
    const formattedSlot = `${formattedDate}--${formattedStart}-${formattedEnd}`;
    const userTemplate = emailTemplate(
      "Booking scheduled successfully",
      `We are pleased to inform you that an employee 
      ${res?.name} has been assigned to your booking. 
      Please feel free to contact them at ${res?.mobileNumber}.
      Appointment Time:${formattedSlot}`,
      {},
      false,
      "",
      "",
      true
    );

    await sendEmail({
      to: formData?.customerDetails?.email,
      message: userTemplate,
    });
    const smsMessageUser = `"Booking Scheduled Successfully ✅
 We are pleased to inform you that our employee ${res?.name} has been assigned to your booking.
 For any queries or assistance, you may contact them at ${res?.mobileNumber}.
 
 📅 Appointment Time: ${formattedSlot}
 
 Thank you for choosing our services!"`;
    await sendSms(formData?.customerDetails?.phone, smsMessageUser);
    console.log(
      "Email sent successfully to:",
      formData?.customerDetails?.email
    );
    // eslint-disable-next-line
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${formData?.customerDetails?.address}, ${formData?.customerDetails?.zipCode}`)}`;
    let employeeTemplate;
    if (role === "admin") {
      employeeTemplate = emailTemplate(
        "You've been assigned to a new job Booking",
        `We are pleased to inform you that the admin has approved your 
        assignment to the booking made by ${formData?.customerDetails?.name}.Please proceed 
        with the necessary actions as per the booking details.
        Appointment Time:${formattedSlot}`,
        {},
        true,
        mapsUrl,
        "Location"
      );
    } else {
      employeeTemplate = emailTemplate(
        "You've been assigned to a new job Booking",
        `This is to inform you that a new booking 
          has been assigned to you by ${formData?.customerDetails?.name} . 
          Please review the details:
          Appointment Time:${formattedSlot}`,
        {},
        true,
        mapsUrl,
        "Location"
      );
    }
    await sendEmail({ to: res.email, message: employeeTemplate });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sentEmailAgainstBooking = async (
  formData: any,
  id: string,
  type: string
): Promise<void> => {
  console.log("Form Data:", formData);

  const formattedDate = new Date(formData.schedule.date).toLocaleDateString();
  const formattedStart = formatTo12Hour(new Date(formData.schedule.slot.start));
  const formattedEnd = formatTo12Hour(new Date(formData.schedule.slot.end));

  const formattedSlot = `${formattedDate} -- ${formattedStart} - ${formattedEnd}`;

  await findEmployeeAndSentMessage(
    formData.empId,
    id,
    formData.customerDetails.name,
    formData.causeOfDamage.causeOfDamage,
    formData.plumbingIssue.plumbingIssue,
    formData.customerDetails.address,
    formData.customerDetails.city,
    formData.customerDetails.zipCode,
    type,
    formattedSlot
  );

  const customerTemplate = emailTemplate(
    "Booking completed successfully",
    `We are pleased to inform you that your booking 
      has been successfully completed. 
      Thank you for choosing our services. 
      If you have any questions or need further assistance, 
      feel free to contact us.`,
    {},
    false,
    "",
    "",
    true
  );

  await sendEmail({
    to: formData.customerDetails.email,
    message: customerTemplate,
  });

  const smsMessage = `"Booking Successful!"
  Your booking is confirmed. Thank you for choosing us! Need help? Contact us anytime.`;

  await sendSms(formData.customerDetails.phone, smsMessage);

  const adminTemplate = emailTemplate(
    "Booking completed successfully",
    `A new booking has been successfully
      made by ${formData.customerDetails.name}. Please review the details.`,
    {}
  );

  if (type === "normal") {
    for (let admin of adminEmails) {
      await sendEmail({ to: admin, message: adminTemplate });
    }
  }
};
export const emailAgainstEmployeeAdded = async (email: string) => {
  let employeeTemplate = emailTemplate(
    "Account Activation Required",
    "You have been added as an employee by the administrator. Please log in:",
    {},
    false,
    "",
    "",
    false
  );
  await sendEmail({ to: email, message: employeeTemplate });
};
