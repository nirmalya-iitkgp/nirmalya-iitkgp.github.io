document.addEventListener("DOMContentLoaded", function () {
  // Typed.js initialization
  if (window.Typed) {
    new Typed(".auto-type", {
      strings: [
        "Consultant at McKinsey and Company",
        "Mechanical Engineer from IIT Kharagpur",
        "MBA graduate from IIM Ahmedabad",
      ],
      typeSpeed: 125,
      backSpeed: 30,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
  }

  // Modal logic
  const modal = document.getElementById("myModal");
  const closeBtn = modal.querySelector(".close");
  const canvasBtn = document.getElementById("test");

  // Open modal when canvas clicked or activated by keyboard (Enter/Space)
  if (canvasBtn) {
    canvasBtn.style.cursor = "pointer";

    canvasBtn.addEventListener("click", () => {
      openModal();
    });

    canvasBtn.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal();
      }
    });
  }

  function closeModal() {
    modal.style.display = "none";
    if (canvasBtn) canvasBtn.focus();
  }

  function openModal() {
    modal.style.display = "block";
    closeBtn.focus();
  }

  closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  // Responsive adjustments
  function handleResponsiveElements() {
    const w = window.innerWidth;
    const carousel = document.querySelector(".carousel, .continuous-carousel");
    const canvasWrapper = document.querySelector(".canvas-wrapper");
    const rightColumn = document.querySelector(".right-column");
    const rightCanvasRow = document.querySelector(".right-canvas-row");
    const iconBar = document.getElementById("main-icon-bar");

    if (w <= 768) {
      if (carousel) carousel.style.display = "none";
      if (canvasWrapper) canvasWrapper.style.display = "none";
      if (rightColumn) rightColumn.style.display = "none";
      if (rightCanvasRow) rightCanvasRow.style.display = "none";
    } else {
      if (carousel) carousel.style.display = "";
      if (canvasWrapper) canvasWrapper.style.display = "";
      if (rightColumn) rightColumn.style.display = "";
      if (rightCanvasRow) rightCanvasRow.style.display = "";
    }

    if (iconBar) {
      if (w <= 480) {
        iconBar.classList.add("icon-bar-horizontal");
      } else {
        iconBar.classList.remove("icon-bar-horizontal");
      }
    }
  }

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResponsiveElements, 150);
  });

  // Initial call
  handleResponsiveElements();

// -------------------------------------------------------------------
// START OF NEW COLOR PICKER LOGIC
// -------------------------------------------------------------------

  // Utility function to convert HEX to RGB components (e.g., "#00A3AD" -> "0, 163, 173")
  function hexToRgb(hex) {
      let r = 0, g = 0, b = 0;
      
      // Handle shorthand hex values (e.g., #abc)
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

  // Utility function to lighten a HEX color (for the hover state)
  function lightenHex(hex, percent) {
      var num = parseInt(hex.slice(1), 16),
          amt = Math.round(2.55 * percent),
          R = (num >> 16) + amt,
          G = (num >> 8 & 0x00FF) + amt,
          B = (num & 0x0000FF) + amt;
      
      // Clamp values to 255
      R = (R < 255) ? R : 255;
      G = (G < 255) ? G : 255;
      B = (B < 255) ? B : 255;

      // Convert back to HEX string
      // Note: Math.min/max is safer but this bitwise approach is compact and common for clamping
      R = Math.min(255, R);
      G = Math.min(255, G);
      B = Math.min(255, B);

      return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1).padStart(6, '0')}`;
  }

  const colorPicker = document.getElementById('accentColorPicker');
  const root = document.documentElement; // This refers to the <html> (:root)

  if (colorPicker) {
    colorPicker.addEventListener('input', (event) => {
        const newHex = event.target.value;
        
        // 1. Set the primary HEX variable
        root.style.setProperty('--accent-primary', newHex);
        
        // 2. Set the RGB components variable for shadows
        root.style.setProperty('--accent-primary-rgb', hexToRgb(newHex));

        // 3. Set the lighter hover color (e.g., lighten by 15%)
        const hoverHex = lightenHex(newHex, 15);
        root.style.setProperty('--accent-primary-hover', hoverHex);
        
        // 4. Set the RGB components for hover shadows
        root.style.setProperty('--accent-primary-hover-rgb', hexToRgb(hoverHex));

        // 5. Update Particles.js color if it's initialized
        if (window.pJSDom && pJSDom.length > 0) {
            // Get the hex color without the '#'
            const pjsColor = newHex.substring(1); 
            // Update particles color (assuming the first instance is the one you want)
            pJSDom[0].pJS.particles.color.value = pjsColor;
            pJSDom[0].pJS.particles.line_linked.color = pjsColor;
            pJSDom[0].pJS.fn.particlesDraw();
            pJSDom[0].pJS.fn.particlesRefresh();
        }
    });
    
    // Initial call to set defaults/sync with picker's initial value
    colorPicker.dispatchEvent(new Event('input'));
  }

// -------------------------------------------------------------------
// END OF NEW COLOR PICKER LOGIC
// -------------------------------------------------------------------

  // Particles.js initialization
  if (window.particlesJS) {
    // Get the current value of the CSS variable for the particle color
    const accentColor = getComputedStyle(root).getPropertyValue('--accent-primary').trim() || '#ffffff';
    
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        // USE THE ACCENT COLOR VARIABLE HERE
        color: { value: accentColor.replace('#', '') }, 
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
        },
        opacity: {
          value: 0.4,
          random: false,
          anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: true,
          distance: 150,
          // USE THE ACCENT COLOR VARIABLE HERE
          color: accentColor.replace('#', ''), 
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
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
  }
});