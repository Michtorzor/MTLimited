
/* ==========================================
   MICHY TELECOMMUNICATION LIMITED
   SHARED JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("show-menu");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });

        // Close the mobile menu after a navigation link is selected.
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("show-menu");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
                menuToggle.textContent = "☰";
            });
        });

        // Close the menu if the screen returns to desktop width.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                navLinks.classList.remove("show-menu");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
                menuToggle.textContent = "☰";
            }
        });
    }

    // 2. HIGHLIGHT THE CURRENT PAGE IN THE NAVIGATION.
    let currentPage = window.location.pathname.split("/").pop();

    if (!currentPage) {
        currentPage = "index.html";
    }

    document.querySelectorAll(".nav-links a[data-page]").forEach(function (link) {
        if (link.dataset.page === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // 3. AUTOMATIC COPYRIGHT YEAR.
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 4. PRESELECT A SERVICE FROM AN ENQUIRY BUTTON.
    const serviceSelect = document.getElementById("service");
    const messageField = document.getElementById("message");
    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get("service");

    if (serviceSelect && requestedService) {
        const matchingOption = Array.from(serviceSelect.options).find(
            function (option) {
                return (
                    option.value.toLowerCase() === requestedService.toLowerCase() ||
                    option.textContent.trim().toLowerCase() === requestedService.toLowerCase()
                );
            }
        );

        if (matchingOption) {
            serviceSelect.value = matchingOption.value || matchingOption.textContent;
        } else {
            serviceSelect.value = "Other Services";

            if (messageField) {
                messageField.value =
                    "I would like to enquire about: " + requestedService;
            }
        }
    }

    // 5. CONTACT FORM.
    // This opens the visitor's email application.
    // It does not send email directly from the website.
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;
            const message = document.getElementById("message").value.trim();

            const subject = "MTL Website Enquiry: " + service;

            const body =
                "Hello MICHY TELECOMMUNICATION LIMITED,\n\n" +
                "I would like to make an enquiry.\n\n" +
                "Full Name: " + name + "\n" +
                "Email Address: " + email + "\n" +
                "Phone Number: " + phone + "\n" +
                "Service: " + service + "\n\n" +
                "Message:\n" + message + "\n\n" +
                "Thank you.";

            const mailtoLink =
                "mailto:michytelecoms@gmail.com" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            if (formMessage) {
                formMessage.textContent =
                    "Your email application will open with your enquiry. " +
                    "Please review it and press Send to submit.";
                formMessage.classList.remove("error");
            }

            window.location.href = mailtoLink;
        });
    }

});
