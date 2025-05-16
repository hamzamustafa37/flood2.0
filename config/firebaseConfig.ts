import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyD5dzUNlXR1b7oFj523utB_eZymWX3X0wY",
  authDomain: "ftms-ca85b.firebaseapp.com",
  databaseURL: "https://ftms-ca85b.firebaseio.com",
  projectId: "ftms-ca85b",
  storageBucket: "ftms-ca85b.appspot.com",
  messagingSenderId: "26422956124",
  appId: "1:26422956124:web:5102d14c30573ff2",
  measurementId: "G-P8F4K1W4RZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);

const db = getFirestore(app);
export const storage = getStorage(app);

const functions = getFunctions(app);

export { auth, db, functions };
