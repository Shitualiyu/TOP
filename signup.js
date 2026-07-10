import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
  
const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    if (password !== confirm) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const userCredential =
await createUserWithEmailAndPassword(auth, email, password);

await setDoc(doc(db, "users", userCredential.user.uid), {
    fullname: document.getElementById("fullname").value.trim(),
    email: email,
    balance: 0,
    referralBonus: 0,
    createdAt: new Date().toISOString()
});

alert("Account created successfully!");

window.location.href = "login.html";
    } catch (error) {
        alert(error.message);
    }
});
