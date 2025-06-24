import { db } from "@firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const addLeaveDay = async (data: any) => {
  const docRef = collection(db, "ft-leavedays");
  await addDoc(docRef, data);
  return true;
};

export const getLeaveDayById = async (id: any) => {
  const docRef = doc(db, "ft-leavedays", id);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting leave day:", error);
    return null;
  }
};

export const deleteLeaveDay = async (id: any) => {
  const docRef = doc(db, "ft-leavedays", id);
  try {
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting leave day:", error);
  }
};

export const updateLeaveDay = async (id: any, updatedData: any) => {
  const docRef = doc(db, "ft-leavedays", id);
  try {
    await updateDoc(docRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating leave day:", error);
  }
};

export const getAllLeaveDays = async () => {
  const querySnapshot = await getDocs(collection(db, "ft-leavedays"));
  const leaveDays: any = [];
  querySnapshot.forEach((docSnap) => {
    leaveDays.push({ id: docSnap.id, ...docSnap.data() });
  });
  return leaveDays;
};
