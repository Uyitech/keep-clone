// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDlAftYb1wi4JjrdGnpP7RDejZTYH4mXvk",
    authDomain: "keep-573d7.firebaseapp.com",
    projectId: "keep-573d7",
    storageBucket: "keep-573d7.appspot.com",
    messagingSenderId: "922426457200",
    appId: "1:922426457200:web:81b9622f6474d6d5a648b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Firebase storage reference
export const storage = getStorage(app);