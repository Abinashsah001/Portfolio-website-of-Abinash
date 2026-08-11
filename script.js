// =================================================
// MOBILE THREE-DOT MENU
// =================================================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });


    // Close menu when a navigation link is clicked

    const mobileLinks = navMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });


    // Close menu when clicking outside

    document.addEventListener("click", (event) => {

        if (
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("active");

        }

    });

}
// =========================================================
// PORTFOLIO WEBSITE - script.js
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // AOS ANIMATION
    // =====================================================

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }


    // =====================================================
    // TYPING ANIMATION
    // =====================================================

    const typingElement = document.getElementById("typing");

    if (typingElement && typeof Typed !== "undefined") {

        new Typed("#typing", {
            strings: [
                "Web Developer",
                "Java Programmer",
                "Frontend Developer",
                "Computer Science Student"
            ],

            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 1500,
            startDelay: 300,
            loop: true,
            showCursor: true,
            cursorChar: "|"
        });
    }


    // =====================================================
    // STICKY HEADER
    // =====================================================

    const header = document.querySelector("header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {

            header.style.background = "#081b29";
            header.style.boxShadow =
                "0 5px 20px rgba(0, 0, 0, 0.4)";
            header.style.padding = "15px 8%";

        } else {

            header.style.background =
                "rgba(8, 27, 41, 0.95)";
            header.style.boxShadow = "none";
            header.style.padding = "20px 8%";
        }
    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    // =====================================================
    // ACTIVE NAVIGATION
    // =====================================================

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");
            }
        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    // =====================================================
    // SCROLL TO TOP BUTTON
    // =====================================================

    let topBtn = document.getElementById("topBtn");

    // Create button if it does not already exist
    if (!topBtn) {

        topBtn = document.createElement("button");

        topBtn.id = "topBtn";
        topBtn.type = "button";
        topBtn.innerHTML = "↑";
        topBtn.setAttribute(
            "aria-label",
            "Scroll to top"
        );

        document.body.appendChild(topBtn);
    }


    function updateTopButton() {

        if (window.scrollY > 400) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }

    window.addEventListener(
        "scroll",
        updateTopButton
    );

    updateTopButton();


    topBtn.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    // =====================================================
    // CONTACT FORM - EMAILJS
    // =====================================================

    const form =
        document.getElementById("contact-form");

    const sendButton =
        document.getElementById("send-btn");


    if (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // Check EmailJS
                if (typeof emailjs === "undefined") {

                    console.error(
                        "EmailJS is not loaded."
                    );

                    alert(
                        "❌ Email service is not loaded.\n\n" +
                        "Please refresh the page and try again."
                    );

                    return;
                }


                // Disable button
                if (sendButton) {

                    sendButton.disabled = true;
                    sendButton.textContent =
                        "Sending...";
                }


                console.log(
                    "Sending contact form..."
                );


                // Send email
                emailjs.sendForm(
                    "service_jnjad29",
                    "template_avno3c1",
                    form
                )

                .then(function (response) {

                    console.log(
                        "EmailJS SUCCESS:",
                        response.status,
                        response.text
                    );


                    alert(
                        "✅ Message sent successfully!"
                    );


                    form.reset();


                    if (sendButton) {

                        sendButton.disabled = false;

                        sendButton.textContent =
                            "Send Message";
                    }

                })


                .catch(function (error) {

                    console.error(
                        "EmailJS ERROR:",
                        error
                    );


                    alert(
                        "❌ Failed to send message.\n\n" +
                        "Please try again later."
                    );


                    if (sendButton) {

                        sendButton.disabled = false;

                        sendButton.textContent =
                            "Send Message";
                    }

                });

            }
        );
    }


    // =====================================================
    // ANIMATED SKILL PROGRESS BARS
    // =====================================================

    const skillBars =
        document.querySelectorAll(".progress-bar");


    if (
        skillBars.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const skillObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                const width =
                                    entry.target
                                        .getAttribute(
                                            "data-width"
                                        );


                                if (width) {

                                    entry.target.style.width =
                                        width;
                                }


                                skillObserver.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },

                {
                    threshold: 0.4
                }
            );


        skillBars.forEach(
            function (bar) {

                bar.style.width = "0";

                skillObserver.observe(bar);
            }
        );

    } else {

        // Fallback for older browsers

        skillBars.forEach(
            function (bar) {

                const width =
                    bar.getAttribute(
                        "data-width"
                    );


                if (width) {

                    bar.style.width = width;
                }
            }
        );
    }


    // =====================================================
    // FIRE CURSOR EFFECT
    // =====================================================

    const fireContainer =
        document.getElementById(
            "fire-container"
        );


    // Disable fire effect on touch devices
    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;


    if (
        fireContainer &&
        !isTouchDevice
    ) {

        let lastFireTime = 0;

        document.addEventListener(
            "mousemove",
            function (event) {

                const currentTime =
                    Date.now();


                // Limit fire particles
                // to improve performance
                if (
                    currentTime -
                    lastFireTime <
                    25
                ) {
                    return;
                }


                lastFireTime =
                    currentTime;


                createFire(
                    event.clientX,
                    event.clientY
                );

            }
        );
    }


    // =====================================================
    // CREATE FIRE PARTICLE
    // =====================================================

    function createFire(x, y) {

        if (!fireContainer) {
            return;
        }


        const fire =
            document.createElement("span");


        fire.className = "fire";


        fire.style.left =
            x + "px";

        fire.style.top =
            y + "px";


        // Random size
        const size =
            Math.random() * 16 + 10;


        fire.style.width =
            size + "px";

        fire.style.height =
            size + "px";


        // Random blur
        const blur =
            Math.random() * 2;


        fire.style.filter =
            `blur(${blur}px)`;


        fireContainer.appendChild(
            fire
        );


        // Random movement
        const randomX =
            (Math.random() - 0.5) * 60;


        const randomY =
            80 + Math.random() * 70;


        // Fire animation
        const animation =
            fire.animate(

                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(1)",
                        opacity: 1
                    },

                    {
                        transform:
                            `translate(${randomX}px, -${randomY}px) scale(0)`,
                        opacity: 0
                    }
                ],

                {
                    duration:
                        600 + Math.random() * 400,

                    easing: "ease-out",

                    fill: "forwards"
                }
            );


        // Remove particle after animation
        animation.onfinish =
            function () {

                fire.remove();
            };
    }

});