
/* =========================================
   MICHY TELECOMMUNICATIONS LIMITED
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("mainNavbar");

    if (menuToggle && navbar) {

        function closeMenu() {
            navbar.classList.remove("show-menu");

            menuToggle.innerHTML = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }

        menuToggle.addEventListener("click", function () {

            const isOpen = navbar.classList.toggle("show-menu");

            menuToggle.innerHTML = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        // Close the menu when a navigation link is clicked.
        navbar.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", closeMenu);

        });

        // Close the menu when clicking outside it.
        document.addEventListener("click", function (event) {

            if (
                !navbar.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

        // Close the menu when the Escape key is pressed.
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }

        });

        // Reset the menu when returning to desktop width.
        window.addEventListener("resize", function () {

            if (window.innerWidth > 768) {
                closeMenu();
            }

        });

    }


    // =====================================
    // 2. HIGHLIGHT THE ACTIVE NAVIGATION LINK
    // =====================================

    const navigationLinks = document.querySelectorAll(
        '.navbar a[href^="#"]'
    );

    function setActiveLink() {

        const currentSection = window.location.hash || "#home";

        navigationLinks.forEach(function (link) {

            if (link.getAttribute("href") === currentSection) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }

        });

    }

    window.addEventListener("hashchange", setActiveLink);

    setActiveLink();


    // =====================================
    // 3. MAKE PHONE NUMBERS CLICKABLE
    // =====================================

    document.querySelectorAll(".contact-card").forEach(function (card) {

        const heading = card.querySelector("h3");
        const paragraph = card.querySelector("p");

        if (!heading || !paragraph) {
            return;
        }

        const headingText = heading.textContent.trim().toLowerCase();

        // Turn each phone number into a clickable telephone link.
        if (headingText.includes("call")) {

            const phoneNumbers = paragraph.textContent.match(
                /\+234[\d\s-]+/g
            );

            if (phoneNumbers && phoneNumbers.length > 0) {

                paragraph.textContent = "";

                phoneNumbers.forEach(function (phone, index) {

                    const cleanPhone = phone.replace(/[^\d+]/g, "");

                    const phoneLink = document.createElement("a");

                    phoneLink.href = "tel:" + cleanPhone;
                    phoneLink.textContent = phone.trim();

                    paragraph.appendChild(phoneLink);

                    if (index < phoneNumbers.length - 1) {
                        paragraph.appendChild(
                            document.createTextNode(" | ")
                        );
                    }

                });

            }

        }


        // Turn the email address into a mailto link.
        if (headingText.includes("email")) {

            const email = paragraph.textContent.trim();

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

                const emailLink = document.createElement("a");

                emailLink.href = "mailto:" + email;
                emailLink.textContent = email;

                paragraph.textContent = "";
                paragraph.appendChild(emailLink);

            }

        }


        // Turn the business address into a Google Maps link.
        if (headingText.includes("visit")) {

            const address = paragraph.textContent.trim();

            if (address) {

                const mapLink = document.createElement("a");

                mapLink.href =
                    "https://www.google.com/maps/search/?api=1&query=" +
                    encodeURIComponent(address);

                mapLink.target = "_blank";
                mapLink.rel = "noopener noreferrer";
                mapLink.textContent = address;

                paragraph.textContent = "";
                paragraph.appendChild(mapLink);

            }

        }

    });


    // =====================================
    // 4. FOOTER CONTACT LINKS
    // =====================================

    document.querySelectorAll(".footer-column p").forEach(function (p) {

        const text = p.textContent.trim();

        // Convert footer email addresses to clickable links.
        const emailMatch = text.match(
            /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
        );

        if (emailMatch) {

            const email = emailMatch[0];
            const link = document.createElement("a");

            link.href = "mailto:" + email;
            link.textContent = text;

            p.textContent = "";
            p.appendChild(link);

            return;
        }

        // Convert footer phone numbers to clickable links.
        const phoneMatch = text.match(/\+234[\d\s,-]+/);

        if (phoneMatch) {

            const phone = phoneMatch[0].trim();
            const link = document.createElement("a");

            link.href = "tel:" + phone.replace(/[^\d+]/g, "");
            link.textContent = text;

            p.textContent = "";
            p.appendChild(link);

        }

    });


    // =====================================
    // 5. SMOOTH SCROLL FOR INTERNAL LINKS
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Update the URL without forcing an abrupt jump.
                if (window.location.hash !== targetId) {
                    history.pushState(null, "", targetId);
                }

            }

        });

    });


    // =====================================
    // 6. UPDATE THE COPYRIGHT YEAR
    // =====================================

    const copyright = document.querySelector(".copyright p");

    if (copyright) {

        copyright.textContent =
            "© " + new Date().getFullYear() +
            " Michy Telecommunications Limited. All Rights Reserved.";

    }


    // =====================================
    // 7. SOCIAL MEDIA PLACEHOLDER CHECK
    // =====================================

    document.querySelectorAll(".socials a").forEach(function (link) {

        if (
            !link.getAttribute("href") ||
            link.getAttribute("href") === "#"
        ) {
            link.addEventListener("click", function (event) {
                event.preventDefault();
            });
        }

    });

    console.log(
        "Michy Telecommunications Limited website JavaScript loaded."
    );

});
