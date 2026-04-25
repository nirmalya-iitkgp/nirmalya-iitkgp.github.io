document.addEventListener('DOMContentLoaded', function () {
  // Typed.js initialization
  if (window.Typed) {
    new Typed('.auto-type', {
      strings: [
        'Consultant at McKinsey and Company',
        'Mechanical Engineer from IIT Kharagpur',
        'MBA graduate from IIM Ahmedabad',
        'Entrepreneur & Innovator',
        'Problem Solver & Builder',
      ],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
  }

  // Color Picker functionality
  const colorPicker = document.getElementById('accentColorPicker');
  const root = document.documentElement;

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }

  function lightenHex(hex, percent) {
    let num = parseInt(hex.slice(1), 16);
    let amt = Math.round(2.55 * percent);
    let R = Math.min(255, (num >> 16) + amt);
    let G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    let B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1).padStart(6, '0')}`;
  }

  if (colorPicker) {
    colorPicker.addEventListener('input', (event) => {
      const newHex = event.target.value;
      root.style.setProperty('--accent-primary', newHex);
      root.style.setProperty('--accent-primary-rgb', hexToRgb(newHex));
      const hoverHex = lightenHex(newHex, 15);
      root.style.setProperty('--accent-primary-hover', hoverHex);
      root.style.setProperty('--accent-primary-hover-rgb', hexToRgb(hoverHex));

      // Update Particles.js color
      if (window.pJSDom && pJSDom.length > 0) {
        const pjsColor = newHex.substring(1);
        pJSDom[0].pJS.particles.color.value = pjsColor;
        pJSDom[0].pJS.particles.line_linked.color = pjsColor;
        pJSDom[0].pJS.fn.particlesDraw();
        pJSDom[0].pJS.fn.particlesRefresh();
      }
    });
    colorPicker.dispatchEvent(new Event('input'));
  }

  // Resume Modal
  const resumeModal = document.getElementById('resumeModal');
  const resumeBtn = document.getElementById('resumeBtn');
  const modalClose = document.querySelector('.modal-close');

  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      resumeModal.classList.add('active');
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      resumeModal.classList.remove('active');
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      resumeModal.classList.remove('active');
    }
  });

  // Resume Canvas Drawing
  const canvas = document.getElementById('resumeCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function drawResume() {
      const width = canvas.width;
      const height = canvas.height;
      const accentColor = getComputedStyle(root).getPropertyValue('--accent-primary').trim();

      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, width, height);

      // Draw decorative elements
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, accentColor + '00');
      gradient.addColorStop(1, accentColor + '40');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw border
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      // Draw text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('My Resume', width / 2, height / 2 - 20);
      ctx.font = '14px Inter';
      ctx.fillStyle = '#b0b0b0';
      ctx.fillText('Click to view full resume', width / 2, height / 2 + 20);
    }

    drawResume();

    // Redraw on color change
    const observer = new MutationObserver(drawResume);
    observer.observe(root, { attributes: true, attributeFilter: ['style'] });
  }

  // Particles.js initialization
  if (window.particlesJS) {
    const accentColor = getComputedStyle(root).getPropertyValue('--accent-primary').trim() || '#00A3AD';

    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: accentColor.replace('#', '') },
        shape: {
          type: 'circle',
          stroke: { width: 0, color: '#000000' },
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
          color: accentColor.replace('#', ''),
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
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

  // Smooth scroll behavior for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
      }
    });
  });
});