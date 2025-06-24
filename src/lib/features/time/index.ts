import { db } from "@firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const collectionName = "ft-workingDays";
const collectionRef = collection(db, collectionName);

export const fetchWorkingDays = async () => {
  const snapshot = await getDocs(collectionRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateWorkingDay = async (id: any, updatedData: any) => {
  const dayDoc = doc(db, collectionName, id);
  return await updateDoc(dayDoc, updatedData);
};

export const deleteWorkingDay = async (id: any) => {
  const dayDoc = doc(db, collectionName, id);
  return await deleteDoc(dayDoc);
};
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getDayNumber = (dayName: any) => {
  return dayNames.indexOf(dayName);
};

export const formatDate = (d: any) => {
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const generateTimeSlots = (
  date: any,
  duration: any,
  bufferTime: any,
  startTime = "09:00",
  endTime = "17:00"
) => {
  const timeSlots = [];

  // Convert start and end time from "HH:mm" format to minutes
  const convertToMinutes = (timeString: any) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Convert provided startTime and endTime to minutes
  const startHour = convertToMinutes(startTime);
  const endHour = convertToMinutes(endTime);

  const currentDate = new Date(date);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = currentDate.setHours(0, 0, 0, 0) === today.getTime();

  let currentTimeInMinutes = isToday
    ? new Date().getHours() * 60 + new Date().getMinutes()
    : startHour;

  if (isToday) {
    currentTimeInMinutes = Math.max(currentTimeInMinutes + 60, startHour);
  }

  let currentSlotStartTime = currentTimeInMinutes;

  const roundedMinutes = Math.ceil(currentSlotStartTime / 30) * 30;
  currentSlotStartTime = Math.max(roundedMinutes, startHour);

  while (currentSlotStartTime + duration <= endHour) {
    const currentSlotEndTime = currentSlotStartTime + duration;

    const startDateTime = new Date(currentDate);
    startDateTime.setHours(
      Math.floor(currentSlotStartTime / 60),
      currentSlotStartTime % 60,
      0,
      0
    );

    const endDateTime = new Date(currentDate);
    endDateTime.setHours(
      Math.floor(currentSlotEndTime / 60),
      currentSlotEndTime % 60,
      0,
      0
    );

    timeSlots.push({
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      employees: [],
    });

    currentSlotStartTime = currentSlotEndTime + bufferTime;
  }

  return timeSlots;
};
