"use strict";

/*
    K Rahul Portfolio
    Accessibility & Navigation JavaScript
*/


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton =
    document.querySelector(".menu-button");

const navigation =
    document.querySelector("#primary-navigation");


if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";


        menuButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );


        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Open navigation menu"
                : "Close navigation menu"
        );


        navigation.classList.toggle(
            "is-open"
        );

    });


    /* Close menu after selecting a link */

    navigation
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                    navigation.classList.remove(
                        "is-open"
                    );

                }
            );

        });


    /* Close menu using Escape */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navigation.classList.contains("is-open")
            ) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                navigation.classList.remove(
                    "is-open"
                );

                menuButton.focus();

            }

        }
    );

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.querySelector("#contact-form");

const formStatus =
    document.querySelector("#form-status");


if (contactForm && formStatus) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            if (!contactForm.checkValidity()) {

                formStatus.textContent =
                    "Please complete all required fields correctly.";

                contactForm.reportValidity();

                return;

            }


            formStatus.textContent =
                "Thank you! Your message has been submitted successfully.";

            contactForm.reset();

        }
    );

}