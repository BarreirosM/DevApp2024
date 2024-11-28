import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDGwldl-P1hKXN3DrDNCY3dhaJKdPdHePE",
  authDomain: "my-expo-app-ad.firebaseapp.com",
  projectId: "my-expo-app-ad",
  storageBucket: "my-expo-app-ad.firebasestorage.app",
  messagingSenderId: "1095731359782",
  appId: "1:1095731359782:web:f3b19626422f593a05b6e7"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
