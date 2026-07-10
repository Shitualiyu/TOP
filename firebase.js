// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfM6uKfmBdrmAni3I5GJuSMCTboUqFjbE",
  authDomain: "top-a7b20.firebaseapp.com",
  projectId: "top-a7b20",
  storageBucket: "top-a7b20.firebasestorage.app",
  messagingSenderId: "807644261231",
  appId: "1:807644261231:web:6d2ab94c831b87370b169a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
