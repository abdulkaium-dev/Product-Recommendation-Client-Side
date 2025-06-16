// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfamMgI4u1Q1UqzVBySHSuUHG04c6tCgM",
  authDomain: "my-projects-a01e4.firebaseapp.com",
  projectId: "my-projects-a01e4",
  storageBucket: "my-projects-a01e4.firebasestorage.app",
  messagingSenderId: "998426616860",
  appId: "1:998426616860:web:378243350f77459c146bd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);