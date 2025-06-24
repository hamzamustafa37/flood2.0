import { db } from "@firebase";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { getUserById } from "../users";
import { setPriorityQueue } from "../priority";
import { emailAgainstEmployeeAdded } from "../messageService";
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

export const updateStaffById = async (id: string, updatedData: any) => {
  try {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, updatedData);
    return {
      success: true,
      message: "Document successfully updated!",
    };
  } catch (e) {
    return { success: false, message: "Error updating document", error: e };
  }
};
export const saveStaffToUserCollection = async (data: any) => {
  const [firstName, ...lastName] = data.name.split(" ");
  const updatedData = {
    email: data.email,
    firstName: firstName,
    lastName: lastName.join(" ") || "",
    phone: data.mobileNumber,
    type: "staff",
    createdAt: serverTimestamp(),
  };
  console.log(updatedData, "updateee");
  try {
    const collectioRef = collection(db, "users");
    const docRef = await addDoc(collectioRef, updatedData);
    return {
      success: true,
      message: "Document successfully added!",
      id: docRef.id,
    };
  } catch (e) {
    return { success: false, message: "Error adding document", error: e };
  }
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
export const addTeam = async (data: any) => {
  try {
    const prio = await setPriorityQueue();
    console.log(prio, "priorityyyyy");
    console.log(data, "the data????");
    const resp: any = await saveStaffToUserCollection(data);
    // console.log(resp, "resss");
    // getUserById(resp.id);
    // getUserById("0G4Ajl0cZOTEnz)
    const updatedData = {
      ...data,
      isDisable: false,
      priority: prio,
      // staffId: resp.id,
    };
    const docRef = collection(db, "ft_employees");
    const res = await addDoc(docRef, updatedData);
    emailAgainstEmployeeAdded(data.email);
    return res;
  } catch (error: any) {
    console.error("Error adding document: ", error);
    throw new Error("Error adding team: " + error.message);
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

export const updateTeam = async (id: string, updatedData: any) => {
  console.log("first");
  try {
    const docRef = doc(db, "ft_employees", id);
    await updateDoc(docRef, updatedData);
    const [firstName, ...lastName] = updatedData.name.split(" ");
    console.log(updatedData, "updateddd");
    const data = {
      email: updatedData.email,
      firstName: firstName,
      lastName: lastName.join(" ") || null,
      phone: updatedData.mobileNumber,
    };
    const res = await updateStaffById(updatedData.staffId, data);
    console.log(res, "updated in user collectio");
    getUserById(updatedData.staffId);
    return { success: true, id };
  } catch (error: any) {
    console.error("Error updating document: ", error);
    throw new Error("Error updating team: " + error.message);
  }
};
