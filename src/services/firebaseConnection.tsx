import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB04yovINS3jd3SOZi4weoT5Dc3Qx4q_t0",
  authDomain: "financeiro-2ecbe.firebaseapp.com",
  projectId: "financeiro-2ecbe",
  storageBucket: "financeiro-2ecbe.appspot.com",
  messagingSenderId: "612155586131",
  appId: "1:612155586131:web:26bd9c964293303eb178a6",
  measurementId: "G-YEQFPJBBS4",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
