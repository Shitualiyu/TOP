import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    // Deposit History
    const depositSnapshot = await getDocs(collection(db, "depositRequests"));

    depositSnapshot.forEach((document) => {

        const data = document.data();

        if (data.userId === user.uid) {

            historyList.innerHTML += `
            <div style="border:1px solid #ddd;padding:15px;margin-bottom:15px;border-radius:10px;">
                <h3>Deposit</h3>
                <p><strong>Amount:</strong> ₦${data.amount}</p>
                <p><strong>Status:</strong> ${data.status}</p>
                <p><strong>Date:</strong> ${data.createdAt}</p>
            </div>
            `;
        }

    });

    // Withdrawal History
    const withdrawSnapshot = await getDocs(collection(db, "withdrawRequests"));

    withdrawSnapshot.forEach((document) => {

        const data = document.data();

        if (data.userId === user.uid) {

            historyList.innerHTML += `
            <div style="border:1px solid #ddd;padding:15px;margin-bottom:15px;border-radius:10px;">
                <h3>Withdrawal</h3>
                <p><strong>Amount:</strong> ₦${data.amount}</p>
                <p><strong>Status:</strong> ${data.status}</p>
                <p><strong>Date:</strong> ${data.createdAt}</p>
            </div>
            `;
        }

    });

    if (historyList.innerHTML === "") {
        historyList.innerHTML = "<p>No transactions found.</p>";
    }

});
