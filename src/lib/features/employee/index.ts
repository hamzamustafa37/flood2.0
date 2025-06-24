import { db } from "@firebase";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

export const getEmployeesForBooking = async (
  zipCode: any,
  services: string[]
) => {
  try {
    console.log(services, "services in getEmployeesForBooking");
    const teamCollection = collection(db, "ft_employees");
    let teamQuery = query(
      collection(db, "ft_employees"),
      where("zipCodes", "array-contains", zipCode),
      where("available", "==", true),
      where("isDisable", "==", false),
      orderBy("priority")
    );

    services.forEach((service: any) => {
      teamQuery = query(teamQuery, where(service, "==", true));
    });

    const querySnapshot = await getDocs(teamQuery);
    const teamMembers: any = [];

    querySnapshot.forEach((doc) => {
      teamMembers.push({ ...doc.data(), id: doc.id });
    });

    return teamMembers;
  } catch (error: any) {
    console.error("Error getting documents: ", error);
    throw new Error("Error fetching team members by zipcode: " + error.message);
  }
};
export const getBookingsForEmployeesOnDate = async (
  employeeIds: any,
  date: any
) => {
  try {
    const collectionRef = collection(db, "appBookings");

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const startTimestamp = Timestamp.fromDate(startOfDay);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const endTimestamp = Timestamp.fromDate(endOfDay);

    const bookingsQuery = query(
      collectionRef,
      where("empId", "in", employeeIds),
      where("schedule.date", ">=", startTimestamp),
      where("schedule.date", "<=", endTimestamp)
    );

    const querySnapshot = await getDocs(bookingsQuery);

    const bookings: any = [];
    querySnapshot.forEach((doc) => {
      bookings.push(doc.data());
    });

    return bookings;
  } catch (e) {
    console.error("Error fetching bookings:", e);
    return [];
  }
};
export const updateEmployeePriority = async (id: any) => {
  try {
    // Step 1: Query for the document with the highest priority
    // (assuming higher priority means higher number)
    const teamCollection = collection(db, "ft_employees");

    const teamQuery = query(
      teamCollection,
      orderBy("priority", "desc"), // Sort in descending order
      limit(1) // Limit to just the highest priority
    );

    const querySnapshot = await getDocs(teamQuery);

    // Step 2: Determine the new priority
    let newPriority;

    if (querySnapshot.empty) {
      // If no documents are found, set priority to 1
      newPriority = 1;
    } else {
      // If documents are found, get the highest priority and add 1
      const highestPriorityDoc = querySnapshot.docs[0];
      const highestPriority = highestPriorityDoc.data().priority;
      newPriority = highestPriority + 1;
    }

    // Step 3: Update the document with the input id to the new priority
    const docRef = doc(db, "ft_employees", id);
    await updateDoc(docRef, {
      priority: newPriority,
    });
  } catch (error: any) {
    console.error("Error updating priority: ", error);
    throw new Error("Error updating priority: " + error.message);
  }
};
