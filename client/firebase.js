// Import the functions you need from the SDKs you need
//import { initializeApp } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

//You can set up your own firebase config: https://firebase.google.com/
//This config below will be disabled to prevent users using it.
const firebaseConfig = {
  //ADD your own config here from FIREBASE
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false
})
const functions = getFunctions(app);

module.exports = { auth, db, functions };