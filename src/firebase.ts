import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDMIhuvsYlKS1hV-3g0Y3HacaC_It1V7ps",
    authDomain: "chat-app-414c5.firebaseapp.com",
    projectId: "chat-app-414c5",
    storageBucket: "chat-app-414c5.appspot.com",
    messagingSenderId: "74331792298",
    appId: "1:74331792298:web:29f7dbc4f4d6cf358a01d3",
    measurementId: "G-85HYKP5LHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
