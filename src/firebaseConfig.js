// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKoV_L3003Qb4xZ8wuDmlekRu2AJ6R9uc",
  authDomain: "journal-d6be2.firebaseapp.com",
  projectId: "journal-d6be2",
  storageBucket: "journal-d6be2.appspot.com",
  messagingSenderId: "765367997104",
  appId: "1:765367997104:web:0c4918d45aa183457e6175",
  measurementId: "G-0R784573WG",
  databaseURL:
    "https://journal-d6be2-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
