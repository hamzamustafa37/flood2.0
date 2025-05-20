import { db } from "@firebase";
import { collection, getDocs } from "firebase/firestore";
const collectionName = "adminServices";

export const getServices = async () => {
  try {
    const servicesCollection = collection(db, collectionName);
    const querySnapshot = await getDocs(servicesCollection);

    const services: any = [];
    querySnapshot.forEach((doc) => {
      services.push({ ...doc.data(), id: doc.id });
    });

    return services;
  } catch (error: any) {
    console.error("Error getting services: ", error);
    throw new Error("Error fetching services: " + error.message);
  }
};
