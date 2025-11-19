// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf9K7-c0X_K3iYZ8_BThDQvgS4rUKW93k",
  authDomain: "film-art-62218.firebaseapp.com",
  projectId: "film-art-62218",
  storageBucket: "film-art-62218.firebasestorage.app",
  messagingSenderId: "477766253330",
  appId: "1:477766253330:web:0db7574bf0c7e121c311cb",
  measurementId: "G-SFESF7NX1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportar auth para usarlo en otros componentes
export const auth = getAuth(app);