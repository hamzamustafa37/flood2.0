import { adminEmails } from "@/lib/configs/adminInfo";
import { emailTemplate } from "@/utils/helpers/emailTempalte";
import { getFunctions, httpsCallable } from "firebase/functions";

// Interfaces
interface IEmailPayload {
  to: string;
  message: string;
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
    console.log("SMS sent to:", to, "Response:", response);
    return response;
  } catch (error) {
    console.error("SMS Error:", error);
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
