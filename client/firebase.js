// Import the functions you need from the SDKs you need
//import { initializeApp } from 'firebase/app';
import { initializeApp, FirebaseApp, getApps, getApp } from 'firebase/app';
import { getAuth , Auth, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//You can set up your own firebase config: https://firebase.google.com/
//This config below will be disabled to prevent users using it.
const firebaseConfig = {
  apiKey: "AIzaSyAhEStmipR6R_XaBWMHMvwiMbfAm3FoWAM",
  authDomain: "plantspotter-f4687.firebaseapp.com",
  projectId: "plantspotter-f4687",
  storageBucket: "plantspotter-f4687.appspot.com",
  messagingSenderId: "603129080160",
  appId: "1:603129080160:web:df280459be3834ecd51605"
};

// Initialize Firebase
//This setup is to use the AsyncStorage from @react-native-async-storage/async-storage
//otherwise there is a warning that AsyncStorage will be removed from 'react-native' in a later release.
//https://github.com/firebase/firebase-js-sdk/issues/1847

let app;
let auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

module.exports = { auth };