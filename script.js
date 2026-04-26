// --- 1. DATA CONSTANTS ---
const SOCIAL_MEDIA_LINKS = [
  { icon: "fa-brands fa-x-twitter", href: "https://x.com/panigrahiNirma", label: "Twitter", color: "bg-sky-500" },
  { icon: "fa-brands fa-youtube", href: "https://www.youtube.com/@nirmalyapanigrahi", label: "YouTube", color: "bg-red-600" },
  { icon: "fa-brands fa-facebook", href: "https://www.facebook.com/PanigrahiNirma", label: "Facebook", color: "bg-blue-700" },
  { icon: "fa-brands fa-spotify", href: "https://open.spotify.com/show/0WzbCXJGX3X18sZXyG0qjC?si=552111d512a344f7", label: "Spotify", color: "bg-green-600" },
  { icon: "fa-brands fa-instagram", href: "https://www.instagram.com/pomodoro.breaks/", label: "Instagram", color: "bg-pink-600" },
  { icon: "fa-brands fa-reddit", href: "https://www.reddit.com/r/Ideas_We_Believe/", label: "Reddit", color: "bg-orange-600" },
];

const BLOG_LINKS = [
  { icon: "fa-brands fa-medium", href: "https://medium.com/@nirmalya.panigrahi", label: "Medium", color: "bg-zinc-100 text-black" },
  { icon: "fa-brands fa-blogger", href: "https://nirmalyapanigrahi.blogspot.com/", label: "Blogger", color: "bg-orange-500" },
  { icon: "fa-brands fa-wordpress", href: "https://nirmalyapanigrahi.home.blog/", label: "Wordpress", color: "bg-blue-500" },
];

const CONTACT_LINKS = [
  { icon: "fa-brands fa-linkedin", href: "https://www.linkedin.com/in/nirmalya-panigrahi-461958140/", label: "LinkedIn", color: "bg-blue-600" },
  { icon: "fa-brands fa-github", href: "https://github.com/nirmalya-iitkgp", label: "GitHub", color: "bg-zinc-800" },
  { icon: "fa-solid fa-envelope", href: "mailto:nirmalya.iitkharagpur@gmail.com", label: "Mail", color: "bg-red-500" },
];

const APPS = [
  { name: "Mind Your Subscription", desc: "SaaS subscription management", color: "bg-blue-600", icon: "fa-solid fa-wand-magic-sparkles", href: "https://mind-your-subscription.vercel.app/" },
  { name: "Thought Journal", desc: "CBT-based mental health", color: "bg-indigo-500", icon: "fa-solid fa-heart-pulse", href: "https://drive.google.com/file/..." },
  { name: "Fin Calc", desc: "Complex operation finance", color: "bg-emerald-500", icon: "fa-solid fa-briefcase", href: "https://np-fin.lovable.app" },
  { name: "Cricket Champ", desc: "AI-based strategy game", color: "bg-solid fa-gamepad", icon: "fa-solid fa-gamepad", href: "https://np-hand-cricket.lovable.app" },
  { name: "Tic-Tac-Toe", desc: "Ultimate version", color: "bg-rose-500", icon: "fa-solid fa-code", href: "https://np-ttt-game.vercel.app/" },
  { name: "Stellar Game", desc: "Space-themed battle", color: "bg-blue-900", icon: "fa-solid fa-rocket", href: "https://np-stellar-game.vercel.app/" },
  { name: "Singularity", desc: "Strategic navigation", color: "bg-slate-800", icon: "fa-solid fa-earth-americas", href: "https://np-singularity-game.vercel.app/" },
  { name: "Medical Calc", desc: "Healthcare professional tool", color: "bg-red-600", icon: "fa-solid fa-stethoscope", href: "https://np-medical-calc.vercel.app/" },
];

const PARTNER_LOGOS = [
  { name: "IIT Kharagpur", logo: "https://upload.wikimedia.org/wikipedia/en/1/1c/IIT_Kharagpur_Logo.svg" },
  { name: "University of Tokyo", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/University_of_Tokyo_symbol.svg" },
  { name: "Jaguar Land Rover", logo: "https://upload.wikimedia.org/wikipedia/commons/0/09/JLR_logo_2023.svg" },
  { name: "IIM Ahmedabad", logo: "https://upload.wikimedia.org/wikipedia/en/c/cd/IIM%2C_Ahmedabad_Logo.svg" },
  { name: "McKinsey & Company", logo: "https://upload.wikimedia.org/wikipedia/commons/1/16/McKinsey_Script_Mark_2019.svg" },
];

const THEMES = [
    { id: 'default', name: 'CLASSIC', bg: "#050505", primary: "#ffffff", gradient: "linear-gradient(to right, #9ca3af, #ffffff)" },
    { id: 'serene', name: 'SERENE', bg: "#0f172a", primary: "#38bdf8", gradient: "linear-gradient(to right, #1e40af, #38bdf8)" },
    { id: 'aurora', name: 'AURORA', bg: "#022c22", primary: "#10b981", gradient: "linear-gradient(to right, #064e3b, #10b981)" },
    { id: 'cosmos', name: 'COSMOS', bg: "#0f0720", primary: "#c084fc", gradient: "linear-gradient(to right, #581c87, #c084fc)" }
];

let currentThemeIndex = 0;

// --- 2. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded and DOM ready");
    
    // Initialize standard features
    initTyped();
    initParticles();
    initMarquee();
    setupEventListeners();
    
    // Initialize icons
    if (window.lucide) {
        lucide.createIcons();
    }
});

function initTyped() {
    new Typed('#typed-text', {
        strings: [
            "Consultant at McKinsey & Company",
            "Mechanical Engineer from IIT Kharagpur",
            "MBA graduate from IIM Ahmedabad"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        showCursor: true
    });
}

async function initParticles() {
    // Check if library loaded
    if (typeof tsParticles === "undefined") {
        console.error("tsParticles library not found");
        return;
    }

    await tsParticles.load({
        id: "tsparticles",
        options: {
            fpsLimit: 120,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "grab", // Creates the 'link' effect on mouse hover
                    },
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: { opacity: 0.5 }
                    }
                }
            },
            particles: {
                color: { value: "#ffffff" },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: "none",
                    outModes: { default: "out" },
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 80,
                },
                opacity: {
                    value: { min: 0.1, max: 0.3 },
                },
                shape: { type: "circle" },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        },
    });
    console.log("Particles initialized");
}

function initMarquee() {
    const marquee = document.getElementById('marquee-content');
    if (!marquee) return;
    
    // Double the array to create a seamless infinite loop
    const displayItems = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
    
    marquee.innerHTML = displayItems.map(partner => `
        <div class="flex items-center gap-4 opacity-70 hover:opacity-100 transition-opacity">
            <div class="w-8 h-8 bg-white rounded flex items-center justify-center p-1 shadow-sm">
                <img src="${partner.logo}" alt="${partner.name}" class="w-full h-full object-contain">
            </div>
            <span class="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">${partner.name}</span>
        </div>
    `).join('');
}

// --- 3. THE FIX: EVENT LISTENERS ---
function setupEventListeners() {
    const navItems = {
        'nav-social': 'social',
        'nav-blog': 'blog',
        'nav-contact': 'contact',
        'nav-apps': 'apps'
    };

    for (const [id, type] of Object.entries(navItems)) {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = () => {
                console.log(`Opening dropdown: ${type}`);
                openDropdown(type);
            };
        } else {
            console.warn(`Button with ID ${id} not found in HTML`);
        }
    }

    document.getElementById('close-dropdown')?.addEventListener('click', closeDropdown);
    document.getElementById('dropdown-overlay')?.addEventListener('click', closeDropdown);
    document.getElementById('theme-toggle')?.addEventListener('click', cycleTheme);
}

function openDropdown(type) {
    const grid = document.getElementById('dropdown-grid');
    const overlay = document.getElementById('dropdown-overlay');
    const menu = document.getElementById('dropdown-menu');
    
    if (!grid || !overlay || !menu) return;

    let source = [];
    if (type === 'social') source = SOCIAL_MEDIA_LINKS;
    else if (type === 'blog') source = BLOG_LINKS;
    else if (type === 'contact') source = CONTACT_LINKS;
    else if (type === 'apps') source = APPS;

    // Unified mapping to handle all data structures
    grid.innerHTML = source.map(item => `
        <a href="${item.href}" target="_blank" class="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-all group">
            <div class="w-10 h-10 rounded-lg ${item.color || 'bg-white/5'} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <i class="${item.icon} text-lg"></i>
            </div>
            <div class="flex flex-col">
                <span class="text-[11px] font-black uppercase tracking-widest">${item.label || item.name}</span>
                <span class="text-[9px] opacity-40 uppercase tracking-tighter">${item.desc || 'Explore'}</span>
            </div>
        </a>
    `).join('');

    // Re-scan for the <i> tags we just injected
    if (window.lucide) {
        lucide.createIcons();
    }

    overlay.classList.remove('hidden');
    menu.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.add('show');
        menu.classList.add('show');
    }, 10);
}

function closeDropdown() {
    const overlay = document.getElementById('dropdown-overlay');
    const menu = document.getElementById('dropdown-menu');
    
    overlay.classList.remove('show');
    menu.classList.remove('show');
    
    setTimeout(() => {
        overlay.classList.add('hidden');
        menu.classList.add('hidden');
    }, 300);
}

function cycleTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
    const theme = THEMES[currentThemeIndex];

    // 1. Update Colors with a smooth transition
    document.body.style.transition = "background-color 1s ease, color 1s ease";
    document.body.style.backgroundColor = theme.bg;
    
    const typedSpan = document.getElementById('typed-text');
    if (typedSpan) typedSpan.style.color = theme.primary;

    // 2. Update the Sliding Text Label
    const labelContainer = document.getElementById('theme-label-container');
    if (labelContainer) {
        // We move it up by (index * height of one label)
        // Since our CSS .theme-label is 1rem (16px), we use that.
        labelContainer.style.transform = `translateY(-${currentThemeIndex * 1}rem)`;
    }
	
	// 3. Update the Gradient Text
    const gradientText = document.querySelector('.theme-gradient-text');
    if (gradientText) {
        gradientText.style.backgroundImage = theme.gradient;
    }

    // 4. Update the Dots
    const dots = document.querySelectorAll('.theme-dot');
    dots.forEach((dot, idx) => {
        if (idx === currentThemeIndex) {
            dot.classList.add('active');
            dot.classList.remove('inactive');
            dot.style.backgroundColor = theme.primary; // Dot takes the theme's primary color
        } else {
            dot.classList.remove('active');
            dot.classList.add('inactive');
            dot.style.backgroundColor = ''; // Reset to default
        }
    });

    // 5. Update Particles
    const container = tsParticles.domItem(0);
    if (container) {
        container.options.particles.color.value = theme.primary;
        container.options.particles.links.color = theme.primary;
        container.refresh();
    }
}