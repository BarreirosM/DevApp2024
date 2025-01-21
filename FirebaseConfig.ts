import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
//export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
