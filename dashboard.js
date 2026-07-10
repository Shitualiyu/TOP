import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

   if (docSnap.exists()) {

    const data = docSnap.data();

    document.getElementById("welcomeUser").innerText =
        "Welcome, " + data.fullname + " 👋";

    document.getElementById("balance").innerText =
        "₦" + Number(data.balance).toLocaleString();

}
});
