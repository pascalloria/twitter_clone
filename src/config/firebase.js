// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfcAcJZGVneFKXwtylUX0Hk6SczwcQBLg",
  authDomain: "rettwit-19e6f.firebaseapp.com",
  projectId: "rettwit-19e6f",
  storageBucket: "rettwit-19e6f.appspot.com",
  messagingSenderId: "65686597456",
  appId: "1:65686597456:web:6850b6162c6f32eb9cc655"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app