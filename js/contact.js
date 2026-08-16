import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIGURATION
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyAULhgsqzrRWhvKzq1G1ZwnrVlucZrI5RU",
    authDomain: "rahul-portfolio-aeade.firebaseapp.com",
    projectId: "rahul-portfolio-aeade",
    storageBucket: "rahul-portfolio-aeade.firebasestorage.app",
    messagingSenderId: "237453829176",
    appId: "1:237453829176:web:8b8001a1c9ced3501ef2cd"
};


/* =========================================================
   INITIALIZE FIREBASE
========================================================= */

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");


contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    /* Clear previous status */

    formStatus.textContent = "";
    formStatus.className = "form-status";


    /* Get form values */

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();


    /* Basic validation */

    if (name.length < 2) {
        formStatus.textContent = "Please enter your full name.";
        return;
    }


    if (!email || !email.includes("@")) {
        formStatus.textContent = "Please enter a valid email address.";
        return;
    }


    if (subject.length < 3) {
        formStatus.textContent = "Please enter a subject.";
        return;
    }


    if (message.length < 10) {
        formStatus.textContent = "Please enter at least 10 characters.";
        return;
    }


    /* Disable button while submitting */

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";


    try {

        /* Save message to Firestore */

        await addDoc(collection(db, "contactMessages"), {

            name: name,

            email: email,

            subject: subject,

            message: message,

            timestamp: serverTimestamp()

        });


        /* Success message */

        formStatus.textContent =
            "Your message has been sent successfully.";

        formStatus.classList.add("success");


        /* Clear form */

        contactForm.reset();


    } catch (error) {

        console.error("Firebase error:", error);


        formStatus.textContent =
            "Something went wrong. Please try again.";

        formStatus.classList.add("error");

    }


    /* Enable button again */

    submitButton.disabled = false;
    submitButton.textContent = "Send Message";

});