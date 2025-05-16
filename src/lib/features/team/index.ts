import { db } from "@firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getTeams = async () => {
  try {
    const docRef = collection(db, "ft_employees");
    const querySnapshot = await getDocs(docRef);
    const teams: any = [];
    querySnapshot.forEach((doc) => {
      teams.push({ ...doc.data(), id: doc.id });
    });
    return teams;
  } catch (error: any) {
    console.error("Error getting documents: ", error);
    throw new Error("Error fetching teams: " + error.message);
  }
};

export const getTeamById = async (id: string) => {
  try {
    const docRef = doc(db, "ft_employees", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      throw new Error("No such document!");
    }
  } catch (error: any) {
    console.error("Error getting document by ID: ", error);
    throw new Error("Error fetching team by ID: " + error.message);
  }
};
