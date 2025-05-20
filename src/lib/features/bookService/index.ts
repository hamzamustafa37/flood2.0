import { db, firebaseConfig } from "@firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  findEmployeeAndSentMessage,
  sendEmailAgainstEmergencyNonScheduleOnScheduling,
  sentEmailAgainstBooking,
  sentEmailAgainstConfirmation,
  sentMailAgainstNonscheduleBooking,
} from "../messageService";
import axios from "axios";
import {
  getBookingsForEmployeesOnDate,
  getEmployeesForBooking,
  updateEmployeePriority,
} from "../employee";
import { doIntervalsOverlap } from "@/utils/time-date";
import {
  ICustomerBooking,
  INonScheduledBooking,
} from "@/utils/types/customerBooking.types";

type Coordinates = {
  lat: number;
  lng: number;
};

type LocationResponse = {
  locality: string;
  pinCode: string;
};
// const role = window.localStorage.getItem("role");
const role = "";

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
export const getUserLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error: GeolocationPositionError) => {
          reject(error.message);
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

export const fetchLocalityAndPinCodeFromCoordinates = async (
  lat: number,
  lng: number
): Promise<LocationResponse> => {
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${firebaseConfig.apiKey}`;

  try {
    const response = await axios.get(geocodingUrl);
    if (response.data.status === "OK") {
      const addressComponents = response.data.results[0].address_components;
      let pinCode: string | null = null;
      let locality: string | null = null;
      let neighborhood: string | null = null;
      let administrative_area_level_2: string | null = null;
      let administrative_area_level_1: string | null = null;

      addressComponents.forEach((component: any) => {
        if (component.types.includes("postal_code")) {
          pinCode = component.long_name;
        }
        if (component.types.includes("locality")) {
          locality = component.long_name;
        }
        if (component.types.includes("neighborhood")) {
          neighborhood = component.long_name;
        }
        if (component.types.includes("administrative_area_level_2")) {
          administrative_area_level_2 = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
          administrative_area_level_1 = component.long_name;
        }
      });

      if (!locality) {
        if (neighborhood) {
          locality = neighborhood;
        } else if (administrative_area_level_2) {
          locality = administrative_area_level_2;
        } else if (administrative_area_level_1) {
          locality = administrative_area_level_1;
        }
      }

      if (locality && pinCode) {
        return { locality, pinCode };
      } else {
        throw new Error("Locality or pinCode not found.");
      }
    } else {
      throw new Error("Error fetching locality and pinCode.");
    }
  } catch (error) {
    throw new Error("Error fetching locality and pinCode.");
  }
};

export const getBookingsBetweenDates = async (startDate: any, endDate: any) => {
  try {
    if (!startDate || !endDate) {
      console.error("Both startDate and endDate are required.");
      return { success: false, message: "Start and end dates are required." };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const bookingsRef = collection(db, "appBookings");
    const bookingsQuery = query(
      bookingsRef,
      where("schedule.date", ">=", start),
      where("schedule.date", "<", end)
    );

    const querySnapshot = await getDocs(bookingsQuery);

    const bookings: any = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return { success: false, message: "Error fetching bookings", error };
  }
};

export const getEmergencyBookingById = async (
  id: string
): Promise<ICustomerBooking> => {
  try {
    const bookingDoc = doc(db, "ft-emergencyBookings", id);
    const docSnapshot = await getDoc(bookingDoc);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      return { ...data, id: docSnapshot.id } as ICustomerBooking;
    } else {
      throw new Error(`No booking found with id: ${id}`);
    }
  } catch (error: any) {
    console.error("Error getting booking by id: ", error);
    throw new Error("Error fetching booking: " + error.message);
  }
};

export const getNonScheduledBookingById = async (
  bookingId: string
): Promise<INonScheduledBooking> => {
  try {
    const bookingDocRef = doc(db, "ft-nonScheduledBookings", bookingId);
    const bookingDoc = await getDoc(bookingDocRef);

    if (bookingDoc.exists()) {
      return {
        id: bookingDoc.id,
        ...bookingDoc.data(),
        status: "success",
      } as INonScheduledBooking;
    } else {
      console.error("No such booking found!");
      throw new Error(`No booking found with the given ID`);
    }
  } catch (error: any) {
    console.error("Error fetching non-scheduled booking: ", error);
    throw new Error("Error fetching non-scheduled booking: " + error.message);
  }
};

export const deleteBooking = async (bookingId: any) => {
  try {
    // Check if bookingId is provided
    if (!bookingId) {
      console.error("Booking ID is required to delete the booking.");
      return { success: false, message: "Booking ID is required." };
    }

    // Get a reference to the booking document
    const docRef = doc(db, "appBookings", bookingId);

    // Delete the document
    await deleteDoc(docRef);

    return {
      success: true,
      message: `Booking with ID ${bookingId} successfully deleted.`,
    };
  } catch (error) {
    console.error("Error deleting booking:", error);
    return { success: false, message: "Error deleting booking", error };
  }
};

export const updateBookingStatus = async (
  id: any,
  status: any,
  booking: any,
  empId: any,
  role: any,
  slot: any
) => {
  if (!id || !status) {
    console.error("Invalid ID or Status");
    return;
  }

  try {
    const docRef = doc(db, "appBookings", id);
    await updateDoc(docRef, {
      bookingStatus: status,
    });
    sentEmailAgainstConfirmation(empId, booking, role, slot);
  } catch (error) {
    console.error("Error updating booking status:", error);
  }
};

export const declineBooking = async (bookingId: any) => {
  try {
    const docRef = doc(db, "appBookings", bookingId);
    const bookingDoc = await getDoc(docRef);
    if (bookingDoc.exists()) {
      const bookingData: any = bookingDoc.data();
      const zipCode =
        bookingData.customerDetails?.zipCode || bookingData.zipCode;
      let chosedServices = [];
      if (bookingData?.service === "Water Damage") {
        chosedServices.push("waterDamage");
      }
      if (bookingData?.service === "Plumbing Repair") {
        chosedServices.push("plumbing");
      }
      if (bookingData?.service === "Both") {
        chosedServices.push("waterDamage");
        chosedServices.push("plumbing");
      }
      const bookingDate = bookingData.schedule.date.toDate();
      const bookingslot = bookingData.schedule.slot;
      let excludedEmployees = bookingData.rejectedEmployees
        ? [...bookingData.rejectedEmployees, bookingData.empId]
        : [bookingData.empId];
      const employees = await getEmployeesForBooking(zipCode, chosedServices);

      let newEmpId = null;
      for (const employee of employees) {
        if (excludedEmployees.includes(employee.id)) {
          continue;
        }
        let isBusy = false;
        const bookings = await getBookingsForEmployeesOnDate(
          [employee.id],
          bookingDate
        );
        bookings.forEach((booking: any) => {
          let isOverlap = doIntervalsOverlap(
            bookingslot,
            booking.schedule.slot
          );

          if (isOverlap) {
            isBusy = true;
          }
        });
        if (isBusy) {
          continue;
        }

        newEmpId = employee.id;
        break;
      }

      if (newEmpId) {
        await updateDoc(docRef, {
          rejectedEmployees: arrayUnion(bookingData.empId),
          empId: newEmpId,
        });
        updateEmployeePriority(newEmpId);

        findEmployeeAndSentMessage(
          newEmpId,
          bookingId,
          bookingData.customerDetails.name,
          bookingData?.causeOfDamage?.causeOfDamage || null,
          bookingData?.plumbingIssue?.plumbingIssue || null,
          bookingData.customerDetails.address,
          bookingData.customerDetails.city,
          bookingData.customerDetails.zipCode,
          "normal",
          ""
        );
      } else {
        delete bookingData.id;
        await saveNonScheduledBooking(bookingData);
        await deleteBooking(bookingId);
        return null;
      }
    } else {
      throw new Error(`No booking found with id: ${bookingId}`);
    }
  } catch (error: any) {
    console.error("Error getting booking by id: ", error);
    throw new Error("Error fetching booking: " + error.message);
  }
};

export const saveBooking = async (
  formData: any,
  type = "normal",
  bookingStatus = "pending"
) => {
  try {
    const updatedFormData = {
      ...formData,
      schedule: {
        date: Timestamp.fromDate(new Date(formData.schedule.date)),
        slot: {
          start: Timestamp.fromDate(new Date(formData.schedule.slot.start)),
          end: Timestamp.fromDate(new Date(formData.schedule.slot.end)),
        },
      },
    };
    updatedFormData.bookingStatus = bookingStatus;
    const collectioRef = collection(db, "appBookings");
    const docRef = await addDoc(collectioRef, updatedFormData);
    updateEmployeePriority(formData.empId);

    //TODO: Need to move this to another service

    if (type !== "normal") {
      console.log("this working anno");
      sendEmailAgainstEmergencyNonScheduleOnScheduling(formData, role);
    } else {
      sentEmailAgainstBooking(formData, docRef.id, type);
    }

    return {
      success: true,
      message: "Document successfully added!",
      id: docRef.id,
    };
  } catch (e) {
    console.log(e, "err in allocation");
    return { success: false, message: "Error adding document", error: e };
  }
};

export const deleteNonScheduledBookingById = async (bookingId: any) => {
  try {
    const bookingDocRef = doc(db, "ft-nonScheduledBookings", bookingId);
    await deleteDoc(bookingDocRef);
    return true;
  } catch (error: any) {
    console.error("Error deleting non-scheduled booking: ", error);
    return { status: "error", message: error.message };
  }
};

export const deleteEmergencyBookingById = async (id: any) => {
  try {
    const bookingDoc = doc(db, "ft-emergencyBookings", id);
    await deleteDoc(bookingDoc);

    // console.log(`Booking with id: ${id} has been deleted.`);
    return true;
  } catch (error: any) {
    console.error("Error deleting booking by id: ", error);
    throw new Error("Error deleting booking: " + error.message);
  }
};
export const getBookingById = async (id: any): Promise<ICustomerBooking> => {
  try {
    const docRef = doc(db, "appBookings", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<ICustomerBooking, "id"> &
        Partial<{ id: string }>;
      const { id: _ignore, ...rest } = data;
      return { id: docSnap.id, ...rest };
    } else {
      throw new Error(`Booking with ID ${id} not found`);
    }
  } catch (error: any) {
    throw new Error(`Failed to fetch booking: ${error.message || error}`);
  }
};
