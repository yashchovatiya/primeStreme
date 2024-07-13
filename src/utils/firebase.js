// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDThuAdr-0WzfxN8hXC8S3AuEEIZkAQs-s",
  authDomain: "netflixgpt-ea330.firebaseapp.com",
  projectId: "netflixgpt-ea330",
  storageBucket: "netflixgpt-ea330.appspot.com",
  messagingSenderId: "318466000310",
  appId: "1:318466000310:web:453054724aeb79acb22d17",
  measurementId: "G-5WG8JRVDMV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();
