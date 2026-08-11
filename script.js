// =========================================================
// PORTFOLIO WEBSITE - script.js
// =========================================================

// =========================================================
// AOS ANIMATION
// =========================================================

if (typeof AOS !== "undefined") {

```
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});
```

}

// =========================================================
// TYPING ANIMATION
// =========================================================

const typingElement = document.getElementById("typing");

if (typingElement && typeof Typed !== "undefined") {

```
new Typed("#typing", {

    strings: [
        "Software Engineer",
        "Web Developer",
        "Java Programmer",
        "Frontend Developer",
        "Computer Science Student",
        "Problem Solver"
    ],

    typeSpeed: 70,
    backSpeed: 45,
    backDelay: 1500,
    startDelay: 500,
    loop: true

});
```

}

// =========================================================
// STICKY HEADER
// =========================================================

const header = document.querySelector("header");

window.addEventListener("scroll", function () {

```
if (!header) {
    return;
}

if (window.scrollY > 50) {

    header.style.background = "rgba(8, 27, 41, 0.98)";
    header.style.boxShadow =
        "0 5px 25px rgba(0, 0, 0, 0.4)";
    header.style.padding = "15px 8%";

} else {

    header.style.background =
        "rgba(8, 27, 41, 0.94)";
    header.style.boxShadow = "none";
    header.style.padding = "18px 8%";

}
```

});

// =========================================================
// ACTIVE NAVIGATION
// =========================================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

function updateActiveNavigation() {

```
let current = "";

sections.forEach(function (section) {

    const sectionTop =
        section.offsetTop - 180;

    const sectionHeight =
        section.offsetHeight;

    if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
    ) {

        current = section.getAttribute("id");

    }

});

navLinks.forEach(function (link) {

    link.classList.remove("active");

    if (
        link.getAttribute("href") ===
        "#" + current
    ) {

        link.classList.add("active");

    }

});
```

}

window.addEventListener(
"scroll",
updateActiveNavigation
);

window.addEventListener(
"load",
updateActiveNavigation
);

// =========================================================
// SMOOTH NAVIGATION
// =========================================================

navLinks.forEach(function (link) {

```
link.addEventListener("click", function (event) {

    const targetId =
        this.getAttribute("href");

    if (!targetId || targetId === "#") {
        return;
    }

    const target =
        document.querySelector(targetId);

    if (target) {

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

});
```

});

// =========================================================
// SCROLL TO TOP BUTTON
// =========================================================

const topBtn =
document.createElement("button");

topBtn.innerHTML = "↑";
topBtn.id = "topBtn";
topBtn.type = "button";
topBtn.setAttribute(
"aria-label",
"Scroll to top"
);

document.body.appendChild(topBtn);

window.addEventListener("scroll", function () {

```
if (window.scrollY > 400) {

    topBtn.style.display = "block";

} else {

    topBtn.style.display = "none";

}
```

});

topBtn.addEventListener("click", function () {

```
window.scrollTo({
    top: 0,
    behavior: "smooth"
});
```

});

// =========================================================
// CONTACT FORM - EMAILJS
// =========================================================

const form =
document.getElementById("contact-form");

const sendButton =
document.getElementById("send-btn");

if (form) {

```
form.addEventListener("submit", function (event) {

    event.preventDefault();


    // Check EmailJS

    if (typeof emailjs === "undefined") {

        console.error(
            "EmailJS is not loaded."
        );

        alert(
            "Email service is not loaded. Please refresh the page and try again."
        );

        return;

    }


    // Disable send button

    if (sendButton) {

        sendButton.disabled = true;
        sendButton.textContent = "Sending...";

    }


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
            "Message sent successfully!"
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
            "Failed to send message. Please try again later."
        );


        if (sendButton) {

            sendButton.disabled = false;
            sendButton.textContent =
                "Send Message";

        }

    });

});
```

}

// =========================================================
// SECTION REVEAL ANIMATION
// =========================================================

if ("IntersectionObserver" in window) {

```
const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.1
        }

    );


document
    .querySelectorAll("section")
    .forEach(function (section) {

        section.classList.add("hidden");

        revealObserver.observe(section);

    });
```

}

// =========================================================
// SKILL PROGRESS BARS
// =========================================================

const skillBars =
document.querySelectorAll(
".progress-bar"
);

if (
skillBars.length > 0 &&
"IntersectionObserver" in window
) {

```
const skillObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const width =
                        entry.target.getAttribute(
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

            });

        },

        {
            threshold: 0.5
        }

    );


skillBars.forEach(function (bar) {

    bar.style.width = "0";

    skillObserver.observe(bar);

});
```

} else {

```
skillBars.forEach(function (bar) {

    const width =
        bar.getAttribute(
            "data-width"
        );

    if (width) {

        bar.style.width = width;

    }

});


}

// =========================================================
// FIRE CURSOR EFFECT
// =========================================================

const fireContainer =
document.getElementById(
"fire-container"
);

let lastFireTime = 0;

if (fireContainer) {

```
document.addEventListener(
    "mousemove",
    function (event) {

        const currentTime =
            Date.now();


        // Limit particle creation
        // for better performance

        if (
            currentTime - lastFireTime < 25
        ) {

            return;

        }


        lastFireTime = currentTime;


        createFire(
            event.clientX,
            event.clientY
        );

    }
);


}

// =========================================================
// CREATE FIRE PARTICLE
// =========================================================

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
    Math.random() * 16 + 8;


fire.style.width =
    size + "px";

fire.style.height =
    size + "px";


// Random blur

fire.style.filter =
    "blur(" +
    Math.random() * 2 +
    "px)";


fireContainer.appendChild(fire);


// Random movement

const randomX =
    (Math.random() - 0.5) * 70;

const randomY =
    80 + Math.random() * 70;


// Fire animation

fire.animate(

    [
        {
            transform:
                "translate(-50%, -50%) scale(1)",
            opacity: 1
        },

        {
            transform:
                "translate(" +
                randomX +
                "px, -" +
                randomY +
                "px) scale(0)",
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


// Remove particle

setTimeout(function () {

    if (fire) {
        fire.remove();
    }

}, 1100);


}

// =========================================================
// WEBSITE LOADED
// =========================================================

window.addEventListener("load", function () {


console.log(
    "Portfolio website loaded successfully."
);


});
