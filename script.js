// ===============================
// AOS Animation
// ===============================

if (typeof AOS !== "undefined") {
    AOS.init({
        duration: 1000,
        once: true
    });
}


// ===============================
// Typing Animation
// ===============================

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
        loop: true
    });
}


// ===============================
// Sticky Header
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.style.background = "#081b29";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.4)";
        header.style.padding = "15px 8%";

    } else {

        header.style.background = "rgba(8,27,41,.95)";
        header.style.boxShadow = "none";
        header.style.padding = "20px 8%";

    }

});


// ===============================
// Active Navigation
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// ===============================
// Scroll To Top Button
// ===============================

const topBtn = document.createElement("button");

topBtn.innerHTML = "↑";
topBtn.id = "topBtn";
topBtn.type = "button";

document.body.appendChild(topBtn);

topBtn.style.display = "none";

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ===============================
// Contact Form - EmailJS
// ===============================

const form = document.getElementById("contact-form");
const sendButton = document.getElementById("send-btn");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // Check EmailJS
        if (typeof emailjs === "undefined") {

            console.error("EmailJS is not loaded.");

            alert(
                "❌ Email service is not loaded.\n\n" +
                "Please refresh the page and try again."
            );

            return;
        }

        // Disable button
        if (sendButton) {
            sendButton.disabled = true;
            sendButton.textContent = "Sending...";
        }

        console.log("Sending contact form...");

        // Send form
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

            alert("✅ Message sent successfully!");

            form.reset();

            if (sendButton) {
                sendButton.disabled = false;
                sendButton.textContent = "Send Message";
            }

        })

        .catch(function (error) {

            console.error("EmailJS ERROR:", error);

            alert(
                "❌ Failed to send message.\n\n" +
                "Please try again later."
            );

            if (sendButton) {
                sendButton.disabled = false;
                sendButton.textContent = "Send Message";
            }

        });

    });

}


// ===============================
// Reveal Animation
// ===============================

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    document.querySelectorAll("section").forEach(section => {

        section.classList.add("hidden");

        revealObserver.observe(section);

    });

}


// ===============================
// Animated Skill Progress Bars
// ===============================

const skillBars = document.querySelectorAll(".progress-bar");

if ("IntersectionObserver" in window) {

    const skillObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const width =
                        entry.target.getAttribute("data-width");

                    if (width) {
                        entry.target.style.width = width;
                    }

                    skillObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    skillBars.forEach(bar => {

        bar.style.width = "0";

        skillObserver.observe(bar);

    });

} else {

    // Fallback for older browsers
    skillBars.forEach(bar => {

        const width =
            bar.getAttribute("data-width");

        if (width) {
            bar.style.width = width;
        }

    });

}


// ===============================
// Fire Cursor Effect
// ===============================

const fireContainer =
    document.getElementById("fire-container");

if (fireContainer) {

    document.addEventListener("mousemove", (e) => {

        createFire(
            e.clientX,
            e.clientY
        );

    });

}


function createFire(x, y) {

    if (!fireContainer) return;

    const fire = document.createElement("span");

    fire.className = "fire";

    fire.style.left = x + "px";
    fire.style.top = y + "px";

    // Random fire size
    const size = Math.random() * 20 + 10;

    fire.style.width = size + "px";
    fire.style.height = size + "px";

    // Random blur
    fire.style.filter =
        `blur(${Math.random() * 2}px)`;

    fireContainer.appendChild(fire);


    // Fire animation
    fire.animate(
        [
            {
                transform: "translate(-50%, -50%)",
                opacity: 1
            },

            {
                transform:
                    `translate(${(Math.random() - 0.5) * 50}px, -${80 + Math.random() * 60}px) scale(0)`,
                opacity: 0
            }
        ],
        {
            duration: 700 + Math.random() * 300,
            easing: "ease-out"
        }
    );


    // Remove fire
    setTimeout(() => {

        fire.remove();

    }, 1000);

}