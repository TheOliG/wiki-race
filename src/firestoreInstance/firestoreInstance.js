// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVO8JMg8WH9-2Wm6zdLk91uU78MjGVXZc",
  authDomain: "wiki-run-87d45.firebaseapp.com",
  projectId: "wiki-run-87d45",
  storageBucket: "wiki-run-87d45.appspot.com",
  messagingSenderId: "326560581968",
  appId: "1:326560581968:web:93ab3f1fcba8deb5348455",
  measurementId: "G-5R09QYDMF3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialise the authentication instance
export const auth = getAuth(app);