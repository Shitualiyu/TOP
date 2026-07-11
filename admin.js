import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc
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

    querySnapshot.forEach((document) => {

    const data = document.data();

    

    depositList.innerHTML += `
    ...
    `;
});
       depositList.innerHTML += `
<div style="border:1px solid #ddd;padding:15px;margin:15px 0;border-radius:10px;">

<p><strong>Email:</strong> ${data.email}</p>

<p><strong>Amount:</strong> ₦${data.amount}</p>

<p><strong>Method:</strong> ${data.method}</p>

<p><strong>Status:</strong> ${data.status}</p>

<button class="approveBtn" data-id="${document.id}">
Approve
</button>

<button class="rejectBtn" data-id="${document.id}">
Reject
</button>

</div>
`; 
    });
document.querySelectorAll(".approveBtn").forEach((button) => {

    button.addEventListener("click", async () => {

        const id = button.dataset.id;

        await updateDoc(doc(db, "depositRequests", id), {
            status: "Approved"
        });

        alert("Deposit Approved!");

        location.reload();

    });

});
});
