import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3NfuWMAdOkBXg1GcTk1i9TKEZapvrmQs",
  authDomain: "portfolio-a15aa.firebaseapp.com",
  projectId: "portfolio-a15aa",
  storageBucket: "portfolio-a15aa.appspot.com",
  messagingSenderId: "752479373719",
  appId: "1:752479373719:web:6c26c25460bf297755dcd2"
};

 
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);