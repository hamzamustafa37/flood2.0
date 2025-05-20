import { db } from "@firebase";
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
const getLastVisibleDoc = async (currentPage: number, pageSize: number) => {
  const collectionRef = collection(db, "ft_employees");
  const teamQuery = query(
    collectionRef,
    orderBy("name"),
    limit(pageSize * (currentPage - 1))
  );
  const querySnapshot = await getDocs(teamQuery);
  return querySnapshot.docs[querySnapshot.docs.length - 1];
};

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
export const getTeamsPagination = async (currentPage: number) => {
  const pageSize = 10;
  try {
    const collectionRef = collection(db, "ft_employees");

    const snapshot = await getCountFromServer(collectionRef);
    const totalDocs = snapshot.data().count;
    const totalPages = Math.ceil(totalDocs / pageSize);

    let teamQuery = query(collectionRef, orderBy("name"), limit(pageSize));

    if (currentPage > 1) {
      const lastVisibleDoc = await getLastVisibleDoc(currentPage, pageSize);
      teamQuery = query(
        collectionRef,
        orderBy("name"),
        startAfter(lastVisibleDoc),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(teamQuery);

    const teams: any = [];
    querySnapshot.forEach((doc) => {
      teams.push({ ...doc.data(), id: doc.id });
    });

    return { teams, totalPages, currentPage };
  } catch (error) {
    console.error("Error fetching paginated teams:", error);
    throw new Error("Error fetching paginated teams");
  }
};
