import { db } from "@firebase";
import { addDoc, collection } from "firebase/firestore";
import { sentMailAgainstNonscheduleBooking } from "../meessageService";

export const saveNonScheduledBooking = async (bookingData: IFormData) => {
  try {
    const bookingsCollection = collection(db, "ft-nonScheduledBookings");
    const docRef = await addDoc(bookingsCollection, {
      id: "12345678910",
      ...bookingData,
    });
    sentMailAgainstNonscheduleBooking(
      bookingData.name,
      bookingData.email,
      bookingData?.phone
    );

    return { id: docRef.id, status: "success" };
  } catch (error: any) {
    console.error("Error saving non-scheduled booking: ", error);
    throw new Error("Error saving non-scheduled booking: " + error.message);
  }
};
