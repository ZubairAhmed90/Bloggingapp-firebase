import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBeIKypdo8AT6eFC1iIsC6ALuo0BDw2PIo",
  authDomain: "blogging-app-230cf.firebaseapp.com",
  projectId: "blogging-app-230cf",
  storageBucket: "blogging-app-230cf.appspot.com",
  messagingSenderId: "568619264711",
  appId: "1:568619264711:web:b0dfac3bf45ad1923d6ce2",
  measurementId: "G-MD9W74VG7H"
};
 
const app= initializeApp(firebaseConfig)

export default app