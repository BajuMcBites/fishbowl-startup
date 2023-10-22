// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy5A5kEdilCaY5zQPefOGLQ1AqKLBLvQs",
  authDomain: "fishbowl-b1cf4.firebaseapp.com",
  projectId: "fishbowl-b1cf4",
  storageBucket: "fishbowl-b1cf4.appspot.com",
  messagingSenderId: "75060213403",
  appId: "1:75060213403:web:4800055789aa326805783e",
  measurementId: "G-L2T8VDGXE0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);