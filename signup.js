import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

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
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
        window.location.href = "login.html";
    } catch (error) {
        alert(error.message);
    }
});
