// ===============================
// MOBILE NAVIGATION
// ===============================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {
        nav.classList.remove("active");
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
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀";

        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.textContent = "☾";

        localStorage.setItem("theme", "light");

    }

});


// ===============================
// PORTFOLIO FILTER
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        portfolioItems.forEach(item => {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {

                item.style.display = "block";

                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                }, 10);

            } else {

                item.style.opacity = "0";
                item.style.transform = "scale(.9)";

                setTimeout(() => {
                    item.style.display = "none";
                }, 250);

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

projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const title = button.dataset.title;
        const image = button.dataset.image;
        const description = button.dataset.description;

        modalTitle.textContent = title;
        modalImage.src = image;
        modalDescription.textContent = description;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        closeModal();
    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeModal();
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

    const name = document.getElementById("name").value;

    formMessage.textContent =
        `Thank you, ${name}! Your message has been received.`;

    contactForm.reset();

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