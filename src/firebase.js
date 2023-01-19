import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBm51rUGpLh2ofOc3-_0kyvf2EL1ydqmCs",
  authDomain: "menu-app-6ed8a.firebaseapp.com",
  projectId: "menu-app-6ed8a",
  storageBucket: "menu-app-6ed8a.appspot.com",
  messagingSenderId: "778412648368",
  appId: "1:778412648368:web:e195ef98b3d207f7c81875"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();