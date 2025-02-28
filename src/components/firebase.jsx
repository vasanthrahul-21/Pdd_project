// const firebaseConfig = {
//     apiKey: "AIzaSyCSrqYxrQ-Kp-n5LJKbRcbdx2XsC6ktdCc",
//     authDomain: "pd-project-76e38.firebaseapp.com",
//     projectId: "pd-project-76e38",
//     storageBucket: "pd-project-76e38.firebasestorage.app",
//     messagingSenderId: "301388914229",
//     appId: "1:301388914229:web:1d39197c652158c17a5b7c",
//     measurementId: "G-S02QL306QG"
//   };
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCSrqYxrQ-Kp-n5LJKbRcbdx2XsC6ktdCc",
        authDomain: "pd-project-76e38.firebaseapp.com",
        projectId: "pd-project-76e38",
        storageBucket: "pd-project-76e38.firebasestorage.app",
        messagingSenderId: "301388914229",
        appId: "1:301388914229:web:1d39197c652158c17a5b7c",
        measurementId: "G-S02QL306QG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
