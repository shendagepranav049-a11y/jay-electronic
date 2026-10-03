import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTitCfH3GNO0wN6fsNzRzovL9eTkdHEtw",
  authDomain: "jay-electronics-f5c42.firebaseapp.com",
  projectId: "jay-electronics-f5c42",
  storageBucket: "jay-electronics-f5c42.firebasestorage.app",
  messagingSenderId: "135772918249",
  appId: "1:135772918249:web:dff25debb425dc1a1cfb78",
  measurementId: "G-XRZFL3VKMT"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;