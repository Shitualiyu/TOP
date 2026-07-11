import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const adminEmail = "aliyuashitu180@gmail.com";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    if (user.email !== adminEmail) {
        alert("Access Denied");
        window.location.href = "dashboard.html";
        return;
    }

    const depositList = document.getElementById("depositList");

    depositList.innerHTML = "<h3>Deposit Requests</h3>";

    const querySnapshot = await getDocs(collection(db, "depositRequests"));

    querySnapshot.forEach((doc) => {
if (doc.data().status === "Approved") {
    // We'll disable the button later
}
        const data = doc.data();

        depositList.innerHTML += `
            <div style="border:1px solid #ccc;padding:10px;margin:10px 0;border-radius:8px;">
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Amount:</strong> ₦${data.amount}</p>
                <p><strong>Method:</strong> ${data.method}</p>
                <p><strong>Status:</strong> ${data.status}</p>

<button class="approveBtn" data-id="${doc.id}">
    Approve
</button>
            </div>
        `;
    });

});
