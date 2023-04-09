import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtisAiwpUm8hOGcv40fTuW4V5AVwo9gSs",
  authDomain: "polish-crossword.firebaseapp.com",
  projectId: "polish-crossword",
  storageBucket: "polish-crossword.appspot.com",
  messagingSenderId: "836732280320",
  appId: "1:836732280320:web:ed61668729bb41db7a42e5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }