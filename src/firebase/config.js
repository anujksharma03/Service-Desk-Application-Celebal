import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZtFrSgAtdw2z2MnLDOtokrLh11deq-Xg",
  authDomain: "service-desk-app-44a65.firebaseapp.com",
  projectId: "service-desk-app-44a65",
  storageBucket: "service-desk-app-44a65.firebasestorage.app",
  messagingSenderId: "665534924095",
  appId: "1:665534924095:web:7e44ed3511212e7976ff8a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
