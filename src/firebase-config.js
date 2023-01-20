// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhV4YwYfhH959r8nK32mOqukD34a5q9Hw",
  authDomain: "vandemishthan.firebaseapp.com",
  databaseURL:
    "https://vandemishthan-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vandemishthan",
  storageBucket: "vandemishthan.appspot.com",
  messagingSenderId: "71049876314",
  appId: "1:71049876314:web:e7b29ae8a1efab6e7a1963",
  measurementId: "G-KPR2W4SM2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
