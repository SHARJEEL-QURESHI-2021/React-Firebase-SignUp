import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyARRgMVvyXEIW-3V4FL23MG4t5L9GeYViI",
    authDomain: "react-b5f86.firebaseapp.com",
    projectId: "react-b5f86",
    storageBucket: "react-b5f86.appspot.com",
    messagingSenderId: "77198986100",
    appId: "1:77198986100:web:6ba38c69af69adaf163a21",
    measurementId: "G-02FX2M83WQ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, db, app, createUserWithEmailAndPassword, signInWithEmailAndPassword}