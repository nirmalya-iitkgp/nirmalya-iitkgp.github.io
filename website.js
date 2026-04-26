document.addEventListener("DOMContentLoaded", function () {
  // ─────────────────────────────────────────────────────────────
  // Typed.js initialization
  // ─────────────────────────────────────────────────────────────
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

  // ─────────────────────────────────────────────────────────────
  // Modal logic
  // ─────────────────────────────────────────────────────────────
  const modal = document.getElementById("myModal");
  const closeBtn = modal.querySelector(".close");
  const canvasBtn = document.getElementById("test");

  if (canvasBtn) {
    canvasBtn.style.cursor = "pointer";
    canvasBtn.addEventListener("click", () => openModal());
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
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") closeModal();
  });

  // ─────────────────────────────────────────────────────────────
  // Responsive adjustments  (CSS-only at ≤768px; JS adds extra
  // classes above that, doesn't fight the cascade)
  // ─────────────────────────────────────────────────────────────
  function handleResponsiveElements() {
    const w = window.innerWidth;
    const iconBar = document.getElementById("main-icon-bar");

    if (iconBar) {
      if (w <= 480) iconBar.classList.add("icon-bar-horizontal");
      else          iconBar.classList.remove("icon-bar-horizontal");
    }
  }

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResponsiveElements, 150);
  });
  handleResponsiveElements();

  // ─────────────────────────────────────────────────────────────
  // Shared color utilities
  // ─────────────────────────────────────────────────────────────
  function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;
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
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt);
    const B = Math.min(255, (num & 0x0000ff) + amt);
    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1).padStart(6, "0")}`;
  }

  // ─────────────────────────────────────────────────────────────
  // FIX #2 — Apply accent color properly to CSS vars + particles
  // ─────────────────────────────────────────────────────────────
  const root = document.documentElement;

  function applyAccentColor(hex) {
    root.style.setProperty("--accent-primary", hex);
    root.style.setProperty("--accent-primary-rgb", hexToRgb(hex));
    const hoverHex = lightenHex(hex, 15);
    root.style.setProperty("--accent-primary-hover", hoverHex);
    root.style.setProperty("--accent-primary-hover-rgb", hexToRgb(hoverHex));

    // FIX: particles.js expects the full hex string WITH '#'
    if (window.pJSDom && pJSDom.length > 0) {
      const pjs = pJSDom[0].pJS;
      pjs.particles.color.value = hex;           // keep the '#'
      pjs.particles.line_linked.color = hex;     // keep the '#'
      pjs.fn.particlesDraw();
      pjs.fn.particlesRefresh();
    }
  }

  // ─────────────────────────────────────────────────────────────
  // FIX #1 — Theme panel: presets + custom picker + sliders
  // ─────────────────────────────────────────────────────────────
  const PRESETS = [
    { name: "Ocean",   hex: "#00A3AD" },
    { name: "Ember",   hex: "#FF4D00" },
    { name: "Aurora",  hex: "#7B2FBE" },
    { name: "Matrix",  hex: "#00FF41" },
    { name: "Gold",    hex: "#F5A623" },
    { name: "Rose",    hex: "#FF2D55" },
    { name: "Ice",     hex: "#4FC3F7" },
    { name: "Lime",    hex: "#AEEA00" },
  ];

  let activePreset = "Ocean";

  // Build the floating toggle button
  const toggleBtn = document.createElement("button");
  toggleBtn.className = "theme-toggle-btn";
  toggleBtn.setAttribute("aria-label", "Open theme panel");
  toggleBtn.setAttribute("aria-expanded", "false");
  toggleBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93A10 10 0 1 0 4.93 19.07"/>
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
    </svg>`;
  document.body.appendChild(toggleBtn);

  // Build the panel
  const panel = document.createElement("div");
  panel.className = "theme-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Theme customisation panel");
  panel.innerHTML = `
    <p class="theme-panel-title">Personalise</p>

    <div class="theme-presets" id="theme-presets-grid"></div>

    <hr class="theme-divider" />

    <div class="theme-custom-row">
      <span class="theme-custom-label">Custom</span>
      <input type="color" class="theme-color-input" id="themePicker" value="#00A3AD"
             aria-label="Custom accent colour" />
    </div>

    <hr class="theme-divider" />

    <div class="theme-particles-section">
      <p class="theme-particles-title">Particles</p>

      <div class="theme-slider-row">
        <span class="theme-slider-label">Count</span>
        <input type="range" class="theme-slider" id="sliderCount"
               min="20" max="200" value="80" aria-label="Particle count" />
        <span class="theme-slider-val" id="valCount">80</span>
      </div>

      <div class="theme-slider-row">
        <span class="theme-slider-label">Speed</span>
        <input type="range" class="theme-slider" id="sliderSpeed"
               min="1" max="20" value="6" aria-label="Particle speed" />
        <span class="theme-slider-val" id="valSpeed">6</span>
      </div>

      <div class="theme-slider-row">
        <span class="theme-slider-label">Size</span>
        <input type="range" class="theme-slider" id="sliderSize"
               min="1" max="10" value="3" aria-label="Particle size" />
        <span class="theme-slider-val" id="valSize">3</span>
      </div>
    </div>`;
  document.body.appendChild(panel);

  // Populate preset swatches
  const presetsGrid = document.getElementById("theme-presets-grid");
  PRESETS.forEach((preset) => {
    const wrapper = document.createElement("div");
    wrapper.style.textAlign = "center";

    const btn = document.createElement("button");
    btn.className = "theme-preset" + (preset.name === activePreset ? " active" : "");
    btn.style.background = preset.hex;
    btn.title = preset.name;
    btn.setAttribute("aria-label", `${preset.name} theme`);

    btn.addEventListener("click", () => {
      document.querySelectorAll(".theme-preset").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activePreset = preset.name;
      document.getElementById("themePicker").value = preset.hex;
      applyAccentColor(preset.hex);
    });

    const label = document.createElement("span");
    label.className = "theme-preset-label";
    label.textContent = preset.name;

    wrapper.appendChild(btn);
    wrapper.appendChild(label);
    presetsGrid.appendChild(wrapper);
  });

  // Custom picker
  const themePicker = document.getElementById("themePicker");
  themePicker.addEventListener("input", (e) => {
    document.querySelectorAll(".theme-preset").forEach((b) => b.classList.remove("active"));
    activePreset = null;
    applyAccentColor(e.target.value);
  });

  // Toggle open/close
  let panelOpen = false;
  toggleBtn.addEventListener("click", () => {
    panelOpen = !panelOpen;
    panel.classList.toggle("visible", panelOpen);
    toggleBtn.classList.toggle("open", panelOpen);
    toggleBtn.setAttribute("aria-expanded", String(panelOpen));
    toggleBtn.setAttribute("aria-label", panelOpen ? "Close theme panel" : "Open theme panel");
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (panelOpen && !panel.contains(e.target) && e.target !== toggleBtn) {
      panelOpen = false;
      panel.classList.remove("visible");
      toggleBtn.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panelOpen) {
      panelOpen = false;
      panel.classList.remove("visible");
      toggleBtn.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.focus();
    }
  });

  // Apply initial colour immediately (no dispatchEvent timing issue)
  applyAccentColor("#00A3AD");

  // ─────────────────────────────────────────────────────────────
  // FIX #2 (cont.) — Particles.js — correct hex format + slider
  //                  controls wired up after init
  // ─────────────────────────────────────────────────────────────
  let particlesInitialized = false;

  function initParticles(hex) {
    if (!window.particlesJS) return;
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: hex },          // FIX: full hex WITH '#'
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
          color: hex,                   // FIX: full hex WITH '#'
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
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });
    particlesInitialized = true;

    // Wire up particle sliders NOW that pJSDom exists
    wireParticleSliders();
  }

  // FIX #3 — Particle sliders (count/speed/size) with live refresh
  function wireParticleSliders() {
    const sliders = [
      { id: "sliderCount", valId: "valCount", prop: "number.value" },
      { id: "sliderSpeed", valId: "valSpeed", prop: "move.speed" },
      { id: "sliderSize",  valId: "valSize",  prop: "size.value"  },
    ];

    sliders.forEach(({ id, valId, prop }) => {
      const slider = document.getElementById(id);
      const valDisplay = document.getElementById(valId);
      if (!slider) return;

      slider.addEventListener("input", () => {
        const v = Number(slider.value);
        valDisplay.textContent = v;

        if (!window.pJSDom || !pJSDom.length) return;
        const pjs = pJSDom[0].pJS;

        // Resolve nested prop path e.g. "number.value"
        const parts = prop.split(".");
        let target = pjs.particles;
        for (let i = 0; i < parts.length - 1; i++) target = target[parts[i]];
        target[parts[parts.length - 1]] = v;

        pjs.fn.particlesRefresh();
      });
    });
  }

  // Initialise particles with the default accent colour
  initParticles("#00A3AD");
});
