import { auth, db } from "./firebase.js";

import { addDoc, collection } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

document.getElementById("depositBtn").addEventListener("click", async () => {

    const user = auth.currentUser;

    if (!user) {
        alert("Please login first.");
        return;
    }

    const amount = Number(document.getElementById("amount").value);
    const method = document.getElementById("method").value;

    if (!amount || amount <= 0) {
        alert("Enter a valid amount.");
        return;
    }

    await addDoc(collection(db, "depositRequests"), {
    userId: user.uid,
    email: user.email,
    amount: amount,
    method: method,
    status: "Pending",
    createdAt: new Date().toISOString()
});
    document.getElementById("status").innerText =
        "✅ Deposit request submitted successfully!";
});
