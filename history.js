import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    // Deposit History
    const depositQuery = query(
        collection(db, "depositRequests"),
        where("userId", "==", user.uid)
    );

    const depositSnapshot = await getDocs(depositQuery);

    depositSnapshot.forEach((document) => {

        const data = document.data();

        historyList.innerHTML += `
        <div style="border:1px solid #ddd;padding:15px;margin-bottom:15px;border-radius:10px;">
            <h3>Deposit</h3>
            <p><strong>Amount:</strong> ₦${data.amount}</p>
            <p><strong>Status:</strong> ${data.status}</p>
            <p><strong>Date:</strong> ${data.createdAt}</p>
        </div>
        `;
    });

    // Withdrawal History
    const withdrawQuery = query(
        collection(db, "withdrawRequests"),
        where("userId", "==", user.uid)
    );

    const withdrawSnapshot = await getDocs(withdrawQuery);

    withdrawSnapshot.forEach((document) => {

        const data = document.data();

        historyList.innerHTML += `
        <div style="border:1px solid #ddd;padding:15px;margin-bottom:15px;border-radius:10px;">
            <h3>Withdrawal</h3>
            <p><strong>Amount:</strong> ₦${data.amount}</p>
            <p><strong>Status:</strong> ${data.status}</p>
            <p><strong>Date:</strong> ${data.createdAt}</p>
        </div>
        `;
    });

    if (
        depositSnapshot.empty &&
        withdrawSnapshot.empty
    ) {
        historyList.innerHTML = "<p>No transactions found.</p>";
    }

});
