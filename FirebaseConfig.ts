import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//Isto é um teste de novo.

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH,
  projectId: process.env.EXPO_PUBLIC_PROJ_ID,
  storageBucket: process.env.EXPO_PUBLIC_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_SENDER,
  appId: process.env.EXPO_PUBLIC_APP_ID
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
