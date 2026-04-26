import React, { useEffect, useRef, useState, useMemo } from 'react';
import Typed from 'typed.js';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Globe, MessageSquare, Linkedin, Twitter, Github, 
  Instagram, Youtube, Facebook, Rss, Laptop, Briefcase, BookOpen,
  LayoutGrid, ChevronDown, ChevronUp, ExternalLink, GraduationCap,
  Sparkles, Code, Gamepad2, HeartPulse, Calculator, Mail
} from 'lucide-react';
import { TextSparksCanvas } from './components/TextSparksCanvas';
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// --- DATA ---

const SOCIAL_MEDIA_LINKS = [
  { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/panigrahiNirma", label: "Twitter", color: "bg-sky-500" },
  { icon: <Youtube className="w-5 h-5" />, href: "https://www.youtube.com/@nirmalyapanigrahi", label: "YouTube", color: "bg-red-600" },
  { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/PanigrahiNirma", label: "Facebook", color: "bg-blue-700" },
  { icon: <Globe className="w-5 h-5" />, href: "https://open.spotify.com/show/0WzbCXJGX3X18sZXyG0qjC?si=552111d512a344f7", label: "Spotify", color: "bg-green-600" },
  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/pomodoro.breaks/", label: "Instagram", color: "bg-pink-600" },
  { icon: <MessageSquare className="w-5 h-5" />, href: "https://www.reddit.com/r/Ideas_We_Believe/", label: "Reddit", color: "bg-orange-600" },
];

const BLOG_LINKS = [
  { icon: <MessageSquare className="w-5 h-5" />, href: "https://medium.com/@nirmalya.panigrahi", label: "Medium", color: "bg-zinc-100 text-black" },
  { icon: <Globe className="w-5 h-5" />, href: "https://nirmalyapanigrahi.blogspot.com/", label: "Blogger", color: "bg-orange-500" },
  { icon: <Rss className="w-5 h-5" />, href: "https://nirmalyapanigrahi.home.blog/", label: "Wordpress", color: "bg-blue-500" },
];

const CONTACT_LINKS = [
  { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/nirmalya-panigrahi-461958140/", label: "LinkedIn", color: "bg-blue-600" },
  { icon: <Github className="w-5 h-5" />, href: "https://github.com/nirmalya-iitkgp", label: "GitHub", color: "bg-zinc-800" },
  { icon: <Mail className="w-5 h-5" />, href: "mailto:nirmalya.iitkharagpur@gmail.com", label: "Mail", color: "bg-red-500" },
];

const APPS = [
  { name: "Thought Journal", desc: "CBT-based mental health", color: "bg-indigo-500", icon: <HeartPulse />, href: "https://drive.google.com/file/d/1BJKZuhwSpcUG5SQDKaOmcGpxy0SqL0GV/view?usp=sharing" },
  { name: "Fin Calc", desc: "Complex operation finance", color: "bg-emerald-500", icon: <Briefcase />, href: "https://np-fin.lovable.app" },
  { name: "Cricket Champ", desc: "AI-based strategy game", color: "bg-orange-500", icon: <Gamepad2 />, href: "https://np-hand-cricket.lovable.app" },
  { name: "Tic-Tac-Toe", desc: "Ultimate version", color: "bg-rose-500", icon: <Code />, href: "https://np-ttt-game.vercel.app/" },
  { name: "Stellar Game", desc: "Space-themed battle", color: "bg-blue-900", icon: <Sparkles />, href: "https://np-stellar-game.vercel.app/" },
  { name: "Singularity", desc: "Strategic navigation", color: "bg-slate-800", icon: <Globe />, href: "https://np-singularity-game.vercel.app/" },
  { name: "Medical Calc", desc: "Healthcare professional tool", color: "bg-red-600", icon: <HeartPulse />, href: "https://np-medical-calc.vercel.app/" },
];

const PARTNER_LOGOS = [
  { name: "IIT Kharagpur", logo: "https://upload.wikimedia.org/wikipedia/en/1/1c/IIT_Kharagpur_Logo.svg" },
  { name: "University of Tokyo", logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/University_of_Tokyo_logo.svg" },
  { name: "Jaguar Land Rover", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Jaguar_Land_Rover_logo.svg/1024px-Jaguar_Land_Rover_logo.svg.png" },
  { name: "IIM Ahmedabad", logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/IIM_Ahmedabad_logo.png" },
  { name: "McKinsey & Company", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/McKinsey_%26_Company_logo.svg" },
];

// --- COMPONENTS ---

export default function App() {
  const [activeMenu, setActiveMenu] = useState<null | 'social' | 'blog' | 'contact' | 'apps'>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'default' | 'serene' | 'aurora' | 'cosmos'>('default');
  const [init, setInit] = useState(false);
  const el = useRef(null);

  const themeConfig = useMemo(() => {
    switch (theme) {
      case 'serene': return { bg: "#0f172a", primary: "#38bdf8", accent: "#ea580c", modeLabel: "Serene Blue" };
      case 'aurora': return { bg: "#022c22", primary: "#10b981", accent: "#8b5cf6", modeLabel: "Aurora Green" };
      case 'cosmos': return { bg: "#0f0720", primary: "#c084fc", accent: "#f472b6", modeLabel: "Cosmos Purple" };
      default: return { bg: "#050505", primary: "#ffffff", accent: "#ffffff", modeLabel: "Classic Dark" };
    }
  }, [theme]);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 120,
      background: {
        color: { value: themeConfig.bg }
      },
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          push: { quantity: 4 },
          grab: { distance: 140, links: { opacity: 0.5 } },
        },
      },
      particles: {
        color: { value: themeConfig.primary },
        links: {
          color: themeConfig.primary,
          distance: 150,
          enable: true,
          opacity: 0.1,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "out" },
          random: false,
          speed: 0.6,
          straight: false,
        },
        number: {
          density: { enable: true },
          value: 80,
        },
        opacity: { value: 0.25 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.5 } },
      },
      detectRetina: true,
    }),
    [themeConfig],
  );

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Consultant at McKinsey & Company",
        "Mechanical Engineer from IIT Kharagpur",
        "MBA graduate from IIM Ahmedabad",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const toggleMenu = (menu: 'social' | 'blog' | 'contact' | 'apps') => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const renderDropdown = () => {
    let items: any[] = [];
    let title = "";
    
    if (activeMenu === 'apps') {
      items = APPS;
      title = "Interactive Portfolio";
    } else if (activeMenu === 'social') {
      items = SOCIAL_MEDIA_LINKS;
      title = "Social Media";
    } else if (activeMenu === 'blog') {
      items = BLOG_LINKS;
      title = "Blog";
    } else if (activeMenu === 'contact') {
      items = CONTACT_LINKS;
      title = "Contact";
    } else {
      return null;
    }

    return (
      <>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveMenu(null)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[95vw] max-w-5xl bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl"
        >
          <div className="absolute top-4 right-4 z-50">
            <button 
              onClick={() => setActiveMenu(null)} 
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${activeMenu === 'social' ? '5' : '4'} gap-4 pt-8`}>
            {items.map((app, idx) => (
              <motion.a 
                key={idx} 
                href={app.href} 
                target="_blank"
                className="flex items-center gap-4 p-3 rounded-xl border border-white/5 transition-all group hover:bg-white/5 glow-on-click active:scale-95"
              >
                <div className={`w-12 h-12 rounded-lg ${app.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  {'icon' in app ? app.icon : <Globe />}
                </div>
                <div className="flex-grow">
                  <div className="text-[11px] font-black uppercase tracking-widest">{'name' in app ? app.name : app.label}</div>
                  <div className="text-[9px] opacity-40 mt-0.5 line-clamp-1">{'desc' in app ? app.desc : 'Explore link'}</div>
                </div>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-40 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-nav/80 backdrop-blur-md border-b border-white/10 px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex flex-col">
            <div className="text-xl font-serif italic tracking-tighter text-white leading-none">
              <span className="hidden md:inline">Nirmalya Panigrahi</span>
              <span className="md:hidden">Nirmalya P.</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-white/40">
            <button 
              onClick={() => toggleMenu('social')}
              className={`nav-link-underline glow-hover hover:text-white transition-colors ${activeMenu === 'social' ? 'text-white' : ''}`}
            >
              Social Media
            </button>
            <button 
              onClick={() => toggleMenu('blog')}
              className={`nav-link-underline glow-hover hover:text-white transition-colors ${activeMenu === 'blog' ? 'text-white' : ''}`}
            >
              Blog
            </button>
            <button 
              onClick={() => toggleMenu('contact')}
              className={`nav-link-underline glow-hover hover:text-white transition-colors ${activeMenu === 'contact' ? 'text-white' : ''}`}
            >
              Contact
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => toggleMenu('apps')}
            className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all border ${activeMenu === 'apps' ? 'bg-white text-black border-white' : 'bg-white/5 hover:bg-white/10 border-white/10'}`}
          >
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">My Apps</span>
          </button>

          <button className="md:hidden p-2 text-white/60" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Dropdowns */}
      <AnimatePresence>
        {renderDropdown()}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-brand-bg p-12 flex flex-col items-center justify-center gap-12"
          >
            <button className="absolute top-8 right-8" onClick={() => setIsMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center gap-8 text-2xl font-serif italic">
              <button onClick={() => { setIsMenuOpen(false); setActiveMenu('social'); }}>Social Media</button>
              <button onClick={() => { setIsMenuOpen(false); setActiveMenu('blog'); }}>Blog</button>
              <button onClick={() => { setIsMenuOpen(false); setActiveMenu('contact'); }}>Contact</button>
              <button onClick={() => { setIsMenuOpen(false); setActiveMenu('apps'); }}>My Apps</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="h-[calc(100vh-80px)] flex flex-col pt-16">
        <section className={`relative flex-grow flex flex-col items-center justify-center px-12 overflow-hidden text-center transition-colors duration-1000`} style={{ backgroundColor: themeConfig.bg }}>
          {init && (
            <div className="absolute inset-0 z-0">
              <Particles id="tsparticles" options={particlesOptions} className="h-full w-full" />
            </div>
          )}

          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 md:mb-8 opacity-50 text-[10px] uppercase tracking-[0.5em] font-light"
            >
              Strategy | Operations | Development
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-5xl md:text-8xl font-serif mb-6 md:mb-10 leading-[1.1] tracking-tight"
            >
              Crafting <span className="italic opacity-80 decoration-white/20 underline underline-offset-[8px] md:underline-offset-[12px] decoration-1">Systems</span> <br/> 
              for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">Future.</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-base md:text-xl text-zinc-500 font-light max-w-2xl leading-relaxed mb-6 md:mb-8 h-12 md:h-16"
            >
              I am a <span ref={el} className="italic transition-colors duration-1000" style={{ color: themeConfig.primary }}></span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <a 
                href="https://vercel.com/nirmalyaiitkharagpur-9572s-projects"
                target="_blank"
                className="px-10 py-3.5 bg-white text-black font-black uppercase tracking-widest rounded-full text-xs hover:bg-zinc-200 transition-all flex items-center gap-3 glow-on-click"
              >
                View Projects
              </a>
              
              <a 
                href="https://nirmalyapanigrahi.blogspot.com/"
                target="_blank"
                className="px-10 py-3.5 border border-white/20 hover:border-white/50 rounded-full text-xs font-black uppercase tracking-widest transition-all glow-on-click"
              >
                Read Notes
              </a>
            </motion.div>
          </div>

          <div className="absolute right-24 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden lg:block">
            <div className="w-64 h-64">
              <TextSparksCanvas />
            </div>
          </div>
        </section>
      </main>

      {/* Experience Ticker Footer */}
      <footer className="h-20 border-t border-white/10 flex items-center overflow-hidden z-20 relative transition-colors duration-1000" style={{ backgroundColor: `${themeConfig.bg}e6` }}>
        {/* Theme Cycle Button */}
        <div className="flex-none px-6 md:px-8 border-r border-white/5 h-full flex items-center">
           <button 
             onClick={() => {
               const themes: ('default' | 'serene' | 'aurora' | 'cosmos')[] = ['default', 'serene', 'aurora', 'cosmos'];
               const next = themes[(themes.indexOf(theme) + 1) % themes.length];
               setTheme(next);
             }}
             className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all group overflow-hidden relative"
           >
             <div className="flex gap-1.5 overflow-hidden">
                <div className={`w-3 h-3 rounded-full transition-all duration-500 bg-white ${theme === 'default' ? 'scale-125' : 'opacity-20 translate-y-4'}`} />
                <div className={`w-3 h-3 rounded-full transition-all duration-500 bg-sky-400 ${theme === 'serene' ? 'scale-125' : 'opacity-20 translate-y-4'}`} />
                <div className={`w-3 h-3 rounded-full transition-all duration-500 bg-emerald-400 ${theme === 'aurora' ? 'scale-125' : 'opacity-20 translate-y-4'}`} />
                <div className={`w-3 h-3 rounded-full transition-all duration-500 bg-purple-400 ${theme === 'cosmos' ? 'scale-125' : 'opacity-20 translate-y-4'}`} />
             </div>
             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col h-4 overflow-hidden pointer-events-none">
                {['CLASSIC', 'SERENE', 'AURORA', 'COSMOS'].map((name, i) => (
                  <span 
                    key={i} 
                    className="text-[8px] font-black tracking-widest transition-transform duration-500"
                    style={{ transform: `translateY(-${(['default', 'serene', 'aurora', 'cosmos'].indexOf(theme) * 100)}%)` }}
                  >
                    {name}
                  </span>
                ))}
             </div>
             <span className="w-12 h-4" /> {/* Spacer for absolute label */}
           </button>
        </div>
        <div className="flex-grow relative overflow-hidden h-full flex items-center">
          <div className="flex items-center gap-16 md:gap-24 whitespace-nowrap animate-marquee px-12">
            {/* Multiplying logos for infinite effect */}
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-4 opacity-70 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-sm bg-white overflow-hidden flex items-center justify-center p-1 shadow-lg">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
