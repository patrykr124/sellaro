// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "sellaro-cdb9f.firebaseapp.com",
  projectId: "sellaro-cdb9f",
  storageBucket: "sellaro-cdb9f.firebasestorage.app",
  messagingSenderId: "1081071958486",
  appId: "1:1081071958486:web:a8ed3f6dac8a600b984c77",
  measurementId: "G-VXG0W126LP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
