
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// MOBILE NAVIGATION
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// PROJECT INFORMATION
const projects = {
    farm: {
        category: "E-COMMERCE WEBSITE",
        title: "Agricultural E-Commerce",
        description:
            "An online platform for browsing agricultural products. " +
            "The project focuses on presenting products clearly and " +
            "providing a convenient shopping experience.",
        tags: ["E-Commerce", "HTML", "CSS", "UI/UX Design"]
    },

    uc: {
        category: "STUDENT SYSTEM",
        title: "UC Reporting System",
        description:
            "A university reporting system designed to help students " +
            "submit school concerns in an organized and convenient way. " +
            "It focuses on reporting workflows and clear interface design.",
        tags: ["System Design", "Forms", "Database", "User Experience"]
    },

    design: {
        category: "WEB DESIGN",
        title: "Website UI/UX & Routing",
        description:
            "Website interface concepts and navigation structures " +
            "designed to make websites visually appealing and easy to use. " +
            "The project focuses on layout, navigation, and user flow.",
        tags: ["UI/UX", "Navigation", "Prototyping", "Web Design"]
    }
};

// PROJECT DETAILS MODAL
const modal = document.getElementById("projectModal");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");

document.querySelectorAll("[data-project]").forEach(function (button) {
    button.addEventListener("click", function () {
        const project = projects[button.dataset.project];

        if (!project || !modal) {
            return;
        }

        modalCategory.textContent = project.category;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;

        modalTags.replaceChildren();

        project.tags.forEach(function (tag) {
            const tagElement = document.createElement("span");
            tagElement.textContent = tag;
            modalTags.appendChild(tagElement);
        });

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    });
});

// CLOSE PROJECT MODAL
function closeProjectModal() {
    if (!modal) {
        return;
    }

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

document.querySelectorAll("[data-close-modal]").forEach(function (button) {
    button.addEventListener("click", closeProjectModal);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeProjectModal();
    }
});

// HIGHLIGHT ACTIVE NAVIGATION LINK
const sections = document.querySelectorAll("header[id], main section[id]");
const sectionLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                sectionLinks.forEach(function (link) {
                    const active =
                        link.getAttribute("href") === "#" + entry.target.id;

                    link.classList.toggle("active", active);
                });
            });
        },
        {
            rootMargin: "-25% 0px -65% 0px"
        }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });
}

// CONTACT FORM DEMONSTRATION
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        formMessage.textContent =
            "Thank you for your message! This is a demo form; " +
            "your message has not been sent.";

        contactForm.reset();
    });
}
