// Import the functions you need from the SDKs you need
//import { initializeApp } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhEStmipR6R_XaBWMHMvwiMbfAm3FoWAM",
  authDomain: "plantspotter-f4687.firebaseapp.com",
  projectId: "plantspotter-f4687",
  storageBucket: "plantspotter-f4687.appspot.com",
  messagingSenderId: "603129080160",
  appId: "1:603129080160:web:df280459be3834ecd51605"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = { auth };