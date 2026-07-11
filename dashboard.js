import { auth, db } from "./firebase.js";

import { 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }


    // Load user data
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);


    if (userSnap.exists()) {

        const data = userSnap.data();

        document.getElementById("welcomeUser").innerText =
            "Welcome, " + data.fullname + " 👋";


        document.getElementById("balance").innerText =
            "₦" + Number(data.balance).toLocaleString();

    }



    // ==========================
    // Transaction History
    // ==========================

    const transactionList = document.getElementById("transactionList");

    transactionList.innerHTML = "<h3>Transaction History</h3>";


    const depositQuery = query(
        collection(db, "depositRequests"),
        where("userId", "==", user.uid)
    );


    const depositSnapshot = await getDocs(depositQuery);


    if (depositSnapshot.empty) {

        transactionList.innerHTML += 
        "<p>No transactions found.</p>";

        return;
    }



    depositSnapshot.forEach((transaction) => {

        const data = transaction.data();


        transactionList.innerHTML += `

        <div class="transaction-card">

            <p><b>Type:</b> Deposit</p>

            <p><b>Amount:</b> ₦${data.amount}</p>

            <p><b>Method:</b> ${data.method}</p>

            <p><b>Status:</b> ${data.status}</p>

        </div>

        `;

    });


});
