// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtOKct0kad2exfmG-aZ9AN90D96cTW6H8",
  authDomain: "mern-estate-c6b7b.firebaseapp.com",
  projectId: "mern-estate-c6b7b",
  storageBucket: "mern-estate-c6b7b.appspot.com",
  messagingSenderId: "80396773526",
  appId: "1:80396773526:web:9bf98f2bb7b83250573ab7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);