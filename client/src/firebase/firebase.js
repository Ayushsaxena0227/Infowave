import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsQj4yxGgT1pokkE4p1aipw5mfSeL0eWo",
  authDomain: "infowave-530fb.firebaseapp.com",
  projectId: "infowave-530fb",
  storageBucket: "infowave-530fb.firebasestorage.app",
  messagingSenderId: "275828394029",
  appId: "1:275828394029:web:93d94cc49970f7630950a4",
  measurementId: "G-2VL9DXCECM",
};

const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
