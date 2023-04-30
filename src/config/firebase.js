import { initializeApp } from "firebase/app";



// information sur la basse de donnée 
const firebaseConfig = {
  apiKey: "AIzaSyBfcAcJZGVneFKXwtylUX0Hk6SczwcQBLg",
  authDomain: "rettwit-19e6f.firebaseapp.com",
  projectId: "rettwit-19e6f",
  storageBucket: "rettwit-19e6f.appspot.com",
  messagingSenderId: "65686597456",
  appId: "1:65686597456:web:6850b6162c6f32eb9cc655"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);


export default app