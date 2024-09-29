import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBm5INsEXijo9_ON1Mg_IUxZwHdsa4NIJ8",
  authDomain: "bloggingapp-73641.firebaseapp.com",
  projectId: "bloggingapp-73641",
  storageBucket: "bloggingapp-73641.appspot.com",
  messagingSenderId: "649560771206",
  appId: "1:649560771206:web:a342347303ce2d54101f07",
  measurementId: "G-3S032MYBZT"
};
 
const app= initializeApp(firebaseConfig)

export default app