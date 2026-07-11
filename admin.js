import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc,
    getDoc
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

    // ==========================
    // DEPOSIT REQUESTS
    // ==========================

    const depositList = document.getElementById("depositList");
    depositList.innerHTML = "<h3>Deposit Requests</h3>";

    const depositSnapshot = await getDocs(collection(db, "depositRequests"));

    depositSnapshot.forEach((document) => {

        const data = document.data();

        depositList.innerHTML += `
        <div style="border:1px solid #ddd;padding:15px;margin:15px 0;border-radius:10px;">

            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Amount:</strong> ₦${data.amount}</p>
            <p><strong>Method:</strong> ${data.method}</p>
            <p><strong>Status:</strong> ${data.status}</p>

            <button
            class="approveBtn"
            data-id="${document.id}"
            ${data.status === "Approved" ? "disabled" : ""}>
            ${data.status === "Approved" ? "Approved ✅" : "Approve"}
            </button>

        </div>
        `;
    });

    document.querySelectorAll(".approveBtn").forEach((button) => {

        button.addEventListener("click", async () => {
        button.disabled = true;
            const id = button.dataset.id;

            const depositRef = doc(db, "depositRequests", id);
            const depositSnap = await getDoc(depositRef);

            if (!depositSnap.exists()) {
                alert("Deposit not found.");
                return;
            }

            const depositData = depositSnap.data();

            if (depositData.status === "Approved") {
                alert("Already approved.");
                return;
            }

            await updateDoc(depositRef, {
                status: "Approved"
            });

            const userRef = doc(db, "users", depositData.userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {

                const userData = userSnap.data();

                await updateDoc(userRef, {
                    balance: Number(userData.balance) + Number(depositData.amount)
                });

            }

            alert("Deposit approved and wallet updated!");

            location.reload();

        });

    });

    // ==========================
    // WITHDRAWAL REQUESTS
    // ==========================

    const withdrawList = document.getElementById("withdrawList");
    withdrawList.innerHTML = "<h3>Withdrawal Requests</h3>";

    const withdrawSnapshot = await getDocs(collection(db, "withdrawRequests"));

    withdrawSnapshot.forEach((document) => {

        const data = document.data();

        withdrawList.innerHTML += `
        <div style="border:1px solid #ddd;padding:15px;margin:15px 0;border-radius:10px;">

            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Amount:</strong> ₦${data.amount}</p>
            <p><strong>Bank:</strong> ${data.bank}</p>
            <p><strong>Account No:</strong> ${data.accountNumber}</p>
            <p><strong>Account Name:</strong> ${data.accountName}</p>
            <p><strong>Status:</strong> ${data.status}</p>

            <button
            class="withdrawApproveBtn"
            data-id="${document.id}"
            ${data.status === "Approved" ? "disabled" : ""}>
            ${data.status === "Approved" ? "Approved ✅" : "Approve"}
            </button>

        </div>
        `;
    });

    document.querySelectorAll(".withdrawApproveBtn").forEach((button) => {

        button.addEventListener("click", async () => {

            const id = button.dataset.id;

            const withdrawRef = doc(db, "withdrawRequests", id);
            const withdrawSnap = await getDoc(withdrawRef);

            if (!withdrawSnap.exists()) {
                alert("Withdrawal not found.");
                return;
            }

            const withdrawData = withdrawSnap.data();

            if (withdrawData.status === "Approved") {
                alert("This withdrawal has already been approved.");
                return;
            }

            const userRef = doc(db, "users", withdrawData.userId);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                alert("User not found.");
                return;
            }

            const userData = userSnap.data();

            if (Number(userData.balance) < Number(withdrawData.amount)) {
                alert("Insufficient balance.");
                return;
            }

            await updateDoc(userRef, {
                balance: Number(userData.balance) - Number(withdrawData.amount)
            });

            await updateDoc(withdrawRef, {
                status: "Approved"
            });
            button.innerText = "Approved ✅";
            button.disabled = true;

            alert("Withdrawal approved and wallet updated!");

            location.reload();

        });

    });

});
