import { auth, db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

alert("New deposit.js loaded");
document.getElementById("depositBtn").addEventListener("click", async () => {

    try {

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

        const docRef = await addDoc(collection(db, "depositRequests"), {
    userId: user.uid,
    email: user.email,
    amount: amount,
    method: method,
    status: "Pending",
    createdAt: new Date().toISOString()
});

alert("Deposit saved! Document ID: " + docRef.id);

document.getElementById("status").innerText =
    "✅ Deposit request submitted successfully!";

    } catch (error) {
        alert(error.message);
        console.log(error);
    }

});
