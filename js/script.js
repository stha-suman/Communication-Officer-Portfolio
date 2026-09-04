// ===============================
// MOBILE NAVIGATION
// ===============================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

function setMenuState(isOpen) {
    nav.classList.toggle("active", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

menuBtn.addEventListener("click", () => {
    setMenuState(!nav.classList.contains("active"));
});

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {
        setMenuState(false);
    });

});


// ===============================
// HEADER SCROLL EFFECT
// ===============================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


// ===============================
// DARK MODE
// ===============================

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀";
    themeBtn.setAttribute("aria-label", "Enable light mode");
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀";
        themeBtn.setAttribute("aria-label", "Enable light mode");

        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.textContent = "☾";
        themeBtn.setAttribute("aria-label", "Enable dark mode");

        localStorage.setItem("theme", "light");

    }

});


// ===============================
// PORTFOLIO FILTER
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const filterTimers = new Map();

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterTimers.forEach(timer => clearTimeout(timer));
        filterTimers.clear();

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        portfolioItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {

                item.style.display = "block";

                requestAnimationFrame(() => {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                });

            } else {

                item.style.opacity = "0";
                item.style.transform = "scale(.9)";

                const timer = setTimeout(() => {
                    item.style.display = "none";
                    filterTimers.delete(item);
                }, 250);
                filterTimers.set(item, timer);

            }

        });

    });

});


// ===============================
// PROJECT MODAL
// ===============================

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const projectButtons = document.querySelectorAll(".view-project");
let lastFocusedElement = null;

projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        lastFocusedElement = document.activeElement;

        const title = button.dataset.title;
        const image = button.dataset.image;
        const description = button.dataset.description;

        modalTitle.textContent = title;
        modalImage.src = image;
        modalImage.alt = title;
        modalDescription.textContent = description;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
        modalClose.focus();

    });

});


function closeModal() {

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }

}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        closeModal();
    }

});

document.addEventListener("keydown", (event) => {

    if (!modal.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeModal();
    }

    if (event.key === "Tab") {
        const focusable = modal.querySelectorAll(
            'button:not([disabled]), [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

});


// ===============================
// COUNTER ANIMATION
// ===============================

const counters = document.querySelectorAll("[data-count]");

let countersStarted = false;

function startCounters() {

    if (countersStarted) return;

    const statsSection = document.querySelector(".stats");

    const sectionPosition = statsSection.getBoundingClientRect().top;

    if (sectionPosition < window.innerHeight - 100) {

        countersStarted = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.count);

            let current = 0;

            const increment = Math.max(1, Math.ceil(target / 50));

            const updateCounter = () => {

                current += increment;

                if (current >= target) {
                    counter.textContent = target + "+";
                    return;
                }

                counter.textContent = current;

                requestAnimationFrame(updateCounter);

            };

            updateCounter();

        });

    }

}

window.addEventListener("scroll", startCounters);

startCounters();


// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    formMessage.textContent =
        "Your email app is opening with the message prepared. Send it there to complete your enquiry.";

    const emailBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:xzron.ss@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

});


// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();


// ===============================
// BACK TO TOP
// ===============================

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});

backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ===============================
// CURRENT YEAR
// ===============================

document.getElementById("year").textContent =
    new Date().getFullYear();
