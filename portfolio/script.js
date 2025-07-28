// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(44, 24, 16, 0.98)";
  } else {
    navbar.style.background = "rgba(44, 24, 16, 0.95)";
  }
});

// Animate skill progress bars when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll(".progress-bar");
      progressBars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      });
    }
  });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector(".skills-section");
if (skillsSection) {
  progressObserver.observe(skillsSection);
}

// Fade in animation on scroll
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".skill-card, .project-card, .about-text, .contact-info, .contact-form"
  );
  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in");
    fadeObserver.observe(el);
  });
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.");
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 100);
  }
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add click animation to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple animation
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add active nav link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Add CSS for active nav link
const navStyle = document.createElement("style");
navStyle.textContent = `
    .nav-link.active {
        color: #d2691e !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add CSS for loading state
const loadingStyle = document.createElement("style");
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #2c1810;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    body:not(.loaded)::after {
        content: '☕';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4em;
        z-index: 10000;
        animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
`;
document.head.appendChild(loadingStyle);

// Console message for developers
console.log(`
🎨 Portfolio Website Loaded Successfully!
📧 Contact: john.smith@email.com
💼 Portfolio made with HTML, CSS, and JavaScript
☕ Built with lots of coffee and passion!

This portfolio demonstrates:
✅ HTML5 Semantic Structure
✅ Responsive CSS Design
✅ CSS Flexbox & Grid Layouts
✅ CSS Animations & Transitions
✅ JavaScript Interactivity
✅ Mobile-First Approach
✅ SEO Meta Tags
✅ External CSS File
✅ Clean, Commented Code
`);

// Add smooth reveal animation for text content
function revealText() {
  const textElements = document.querySelectorAll("h1, h2, h3, p");
  textElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease";

    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Initialize text reveal when DOM is loaded
document.addEventListener("DOMContentLoaded", revealText);
