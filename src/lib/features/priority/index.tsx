import { db } from "@firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

export const setPriorityQueue = async () => {
  try {
    const docRef = collection(db, "ft_employees");

    const q = query(docRef, orderBy("priority", "desc"), limit(1));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const highestPriorityDoc = querySnapshot.docs[0];
      const currentPriority = highestPriorityDoc.data().priority;

      const newPriority = currentPriority + 1;
      return newPriority;
    } else {
      return 1;
    }
  } catch (error) {
    console.error("Error setting priority:", error);
  }
};
