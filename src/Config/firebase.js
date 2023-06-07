// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDS-W4-l2ad32Zbyc8aF-Qc0qCvrTQDJA",
  authDomain: "project-learning-c5f9e.firebaseapp.com",
  projectId: "project-learning-c5f9e",
  storageBucket: "project-learning-c5f9e.appspot.com",
  messagingSenderId: "907243377449",
  appId: "1:907243377449:web:c4e6990f5df8d049f0dd38",
  measurementId: "G-YYFENXMFHT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const db = getFirestore(app)
export const auth = getAuth(app)