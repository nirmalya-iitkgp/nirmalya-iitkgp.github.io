document.addEventListener("DOMContentLoaded", function () {
  // ===== TYPED.JS INITIALIZATION =====
  const dynamicRole = document.querySelector(".dynamic-role");
  if (dynamicRole && window.Typed) {
    new Typed(dynamicRole, {
      strings: [
        "Consultant at McKinsey",
        "Mechanical Engineer",
        "MBA from IIM Ahmedabad",
        "Product Developer",
      ],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: false,
    });
  }

  // ===== RESUME MODAL LOGIC =====
  const resumeModal = document.getElementById("resumeModal");
  const resumeCard = document.getElementById("resumeCard");
  const modalClose = document.querySelector(".modal-close");

  if (resumeCard) {
    resumeCard.addEventListener("click", openResumeModal);
    resumeCard.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openResumeModal();
      }
    });
  }

  function openResumeModal() {
    resumeModal.classList.add("active");
    modalClose.focus();
    document.body.style.overflow = "hidden";
  }

  function closeResumeModal() {
    resumeModal.classList.remove("active");
    resumeCard?.focus();
    document.body.style.overflow = "auto";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeResumeModal);
  }

  resumeModal?.addEventListener("click", (e) => {
    if (e.target === resumeModal) {
      closeResumeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && resumeModal.classList.contains("active")) {
      closeResumeModal();
    }
  });

  // ===== COLOR PICKER LOGIC =====
  function hexToRgb(hex) {
    let r = 0,
      g = 0,
      b = 0;

    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `${r}, ${g}, ${b}`;
  }

  function lightenHex(hex, percent) {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = ((num >> 8) & 0x00ff) + amt;
    let B = (num & 0x0000ff) + amt;

    R = Math.min(255, R);
    G = Math.min(255, G);
    B = Math.min(255, B);

    return `#${((1 << 24) + (R << 16) + (G << 8) + B)
      .toString(16)
      .slice(1)
      .padStart(6, "0")}`;
  }

  const colorPicker = document.getElementById("accentColorPicker");
  const root = document.documentElement;

  if (colorPicker) {
    colorPicker.addEventListener("input", (event) => {
      const newHex = event.target.value;

      // Update CSS variables
      root.style.setProperty("--accent-primary", newHex);
      root.style.setProperty("--accent-primary-rgb", hexToRgb(newHex));

      const hoverHex = lightenHex(newHex, 15);
      root.style.setProperty("--accent-primary-hover", hoverHex);
      root.style.setProperty("--accent-primary-hover-rgb", hexToRgb(hoverHex));

      // Update Particles.js if available
      if (window.pJSDom && pJSDom.length > 0) {
        const pjsColor = newHex.substring(1);
        pJSDom[0].pJS.particles.color.value = pjsColor;
        pJSDom[0].pJS.particles.line_linked.color = pjsColor;
        pJSDom[0].pJS.fn.particlesDraw();
        pJSDom[0].pJS.fn.particlesRefresh();
      }
    });

    // Initialize with default
    colorPicker.dispatchEvent(new Event("input"));
  }

  // ===== PARTICLES.JS INITIALIZATION =====
  if (window.particlesJS) {
    const accentColor =
      getComputedStyle(root).getPropertyValue("--accent-primary").trim() ||
      "#ffffff";

    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: accentColor.replace("#", ""),
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: accentColor.replace("#", ""),
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }

  // ===== SMOOTH SCROLL OFFSET FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "#!" && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const offsetTop = target.offsetTop - 70; // Navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll(".app-card, .tool-card, .link-item").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // ===== SKIP TO MAIN CONTENT LINK =====
  const skipLink = document.createElement("a");
  skipLink.href = "#projects";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-to-main";
  document.body.prepend(skipLink);
});

// Add CSS for skip-to-main link
const style = document.createElement("style");
style.textContent = `
  .skip-to-main {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent-primary);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 100;
    border-radius: 0 0 8px 0;
  }
  
  .skip-to-main:focus {
    top: 0;
  }
`;
document.head.appendChild(style);
