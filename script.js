document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // ELEMENTS
    // =========================
    const burgerMenu = document.getElementById("burger-menu");
    const navMenu = document.getElementById("nav-menu");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section");

    const icon = burgerMenu?.querySelector("i");

    const slider = document.querySelector(".testimonial-track");
    const slides = document.querySelectorAll(".testimonial");
    const dots = document.querySelectorAll(".dot");

    const form = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    let currentSlide = 0;

    // =========================
    // SAFETY CHECK
    // =========================
if (!burgerMenu || !navbar) return;
    // =========================
   // =========================
// =========================
// MOBILE MENU FIX
// =========================

const mobileMenu = document.querySelector(".nav-links");

burgerMenu.addEventListener("click", () => {

    const isOpen = mobileMenu.classList.toggle("active");

    icon.classList.toggle("fa-bars", !isOpen);
    icon.classList.toggle("fa-times", isOpen);

    burgerMenu.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");

        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");

        burgerMenu.setAttribute("aria-expanded", "false");
    });
});

    // =========================
    // SMOOTH SCROLL
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) return;

            e.preventDefault();

            window.scrollTo({
                top: target.offsetTop - navbar.offsetHeight,
                behavior: "smooth"
            });
        });
    });

    // =========================
    // NAVBAR SCROLL EFFECT
    // =========================
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    // =========================
    // SCROLLSPY
    // =========================
    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    });

    // =========================
    // TESTIMONIAL SLIDER + DOTS
    // =========================
    function updateSlider() {
        if (!slider || slides.length === 0) return;

        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    if (slider && slides.length > 0) {
        setInterval(nextSlide, 4000);
    }

    // =========================
    // CONTACT FORM (CLEAN)
    // =========================
    if (form && formStatus) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            formStatus.textContent = "Sending message...";
            formStatus.style.color = "#2563eb";

            const data = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: data,
                    headers: { Accept: "application/json" }
                });

                if (response.ok) {
                    formStatus.textContent = "Message sent successfully ✔";
                    formStatus.style.color = "green";
                    form.reset();
                } else {
                    formStatus.textContent = "Something went wrong. Try again.";
                    formStatus.style.color = "red";
                }
            } catch (err) {
                formStatus.textContent = "Network error. Check connection.";
                formStatus.style.color = "red";
            }
});
    }
});
