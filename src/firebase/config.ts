// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnz3oAPvl4DFOvhs8RtLOtdioSutmfy-o",
  authDomain: "react-journal-app-4e33c.firebaseapp.com",
  projectId: "react-journal-app-4e33c",
  storageBucket: "react-journal-app-4e33c.appspot.com",
  messagingSenderId: "682636152059",
  appId: "1:682636152059:web:eb243bbfcc312f0703745e"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);