// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFXlrDfoZgneFKaUkMErcbaPcCT6a35UI",
  authDomain: "mahlzeit-6e10d.firebaseapp.com",
  projectId: "mahlzeit-6e10d",
  storageBucket: "mahlzeit-6e10d.firebasestorage.app",
  messagingSenderId: "413099769654",
  appId: "1:413099769654:web:c84daae81d678693bc3d97",
};

// Initialize Firebase
export const app = getFirestore(initializeApp(firebaseConfig));
