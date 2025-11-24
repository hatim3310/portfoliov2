import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Globe, Database, ShieldCheck, Copy, Check, ChevronDown } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react"
// --- UTILS & COMPONENTS ---

// 1. Background "Aurora" (Luxe & Profondeur)
const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#030303]">
        {/* Orbes lumineux animés */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1], 
                rotate: [0, 90, 0], 
                opacity: [0.1, 0.2, 0.1] 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] h-[800px] w-[800px] rounded-full bg-blue-900/20 blur-[120px]" 
        />
        <motion.div 
            animate={{ 
                scale: [1, 1.5, 1], 
                x: [0, 100, 0], 
                opacity: [0.05, 0.1, 0.05] 
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] right-[0%] h-[600px] w-[600px] rounded-full bg-purple-900/10 blur-[120px]" 
        />
        
        {/* Grain Texture (Film effect) */}
        <div className="absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
        
        {/* Grid technique ultra-fine */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
  );
};

// 2. Bouton Magnétique (Refined)
const MagneticButton = ({ children, className = "", href = "#", onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.15); 
    y.set(middleY * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      onClick={onClick}
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`relative z-10 inline-flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer ${className}`}
    >
      {children}
    </motion.a>
  );
};

// 3. Projet Row "Cinematic Focus"
const CinematicRow = ({ title, subtitle, detail, index, isCert = false, setHoveredRow, hoveredRow, link }) => {
  const isHovered = hoveredRow === index;
  const isDimmed = hoveredRow !== null && hoveredRow !== index;

  const content = (
    <motion.div
      onMouseEnter={() => setHoveredRow(index)}
      onMouseLeave={() => setHoveredRow(null)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      className={`group relative flex flex-col md:flex-row md:items-center justify-between border-t border-white/5 py-12 px-4 md:px-6 cursor-pointer transition-all duration-500 ${isDimmed ? 'opacity-20 blur-[2px]' : 'opacity-100'}`}
    >
      <div className="flex items-start gap-8 md:items-center">
        <span className="text-xs font-mono text-zinc-600 mt-2 md:mt-0">0{index + 1}</span>
        <div>
            <h3 className="text-3xl md:text-5xl font-light tracking-tighter text-zinc-300 transition-colors duration-500 group-hover:text-white group-hover:translate-x-2">
            {title}
            </h3>
            <p className="text-sm text-zinc-500 mt-2 font-mono uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>
      
      <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
        <div className="flex flex-wrap gap-2 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
             {detail && detail.split(',').map((tag, i) => (
                 <span key={i} className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 text-zinc-400 bg-white/5 backdrop-blur-md">
                     {tag.trim()}
                 </span>
             ))}
        </div>
        <div className={`h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 transition-all duration-500 ${isHovered ? 'bg-white text-black border-white scale-110 rotate-45' : ''}`}>
            {isCert ? <ShieldCheck size={20} /> : <ArrowUpRight size={20} />}
        </div>
      </div>
    </motion.div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
};
// 4. Bento Card "Glassmorphism 2.0"
const BentoItem = ({ children, className = "", colSpan = "col-span-1", rowSpan = "row-span-1", dark = false }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.01 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={`relative overflow-hidden rounded-3xl p-8 backdrop-blur-3xl transition-all duration-500 ${dark ? 'bg-black border border-white/10' : 'bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15]'} ${colSpan} ${rowSpan} ${className}`}
  >
    {children}
  </motion.div>
);

// --- MAIN APP ---

export default function App() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]); // Parallax footer

  const copyEmail = () => {
    navigator.clipboard.writeText("hatimlamarti3@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Définition du chemin d'accès conceptuel pour le logo BDE
  const bdeLogoPath = "/assets/images/logo_bde_efet.png";

  // Données
  const projects = [
    { title: "KhedmatMaroc", subtitle: "Plateforme Services", detail: "PHP, Architecture, UX" },
    { title: "F1 Analytics", subtitle: "Dashboard Temps Réel", detail: "React, D3.js, API", link: "https://f1-velocity-analytics.vercel.app" },
    { title: "DataInsight AI", subtitle: "Machine Learning", detail: "Python, Pandas, Streamlit" },
  ];

  const certs = [
    { title: "IBM Data Science", subtitle: "Professional Cert", detail: "Python, AI, 95%" },
    { title: "Google Analytics", subtitle: "Advanced Tracking", detail: "Data, SEO, Conversion" },
    { title: "ALX AI Career", subtitle: "Intelligence Artificielle", detail: "Top 10%, NLP, Ethics" },
  ];

  return (
    <>
      <Analytics />
      <div className="min-h-screen text-zinc-100 font-sans selection:bg-white selection:text-black overflow-x-hidden cursor-default">

      <AuroraBackground />
      
      {/* --- NAV FLOTTANTE MINIMALISTE --- */}
      <nav className="fixed top-4 md:top-6 left-4 right-4 md:left-0 md:right-0 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-0.5 md:gap-1 rounded-full bg-black/40 border border-white/10 p-1 md:p-1.5 backdrop-blur-xl shadow-2xl w-full md:w-auto justify-between md:justify-center">
          <img src="/assets/images/logo_hatim.png" alt="Logo" className="h-7 w-7 md:h-8 md:w-8 rounded-full ml-1 md:mr-2" />
          <div className="flex items-center gap-0.5 md:gap-1">
            <a href="#work" className="rounded-full px-3 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-medium uppercase tracking-wider md:tracking-widest text-zinc-400 transition-all hover:bg-white hover:text-black hover:scale-105">
              Work
            </a>
            <a href="#expertise" className="rounded-full px-3 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-medium uppercase tracking-wider md:tracking-widest text-zinc-400 transition-all hover:bg-white hover:text-black hover:scale-105">
              Expertise
            </a>
            <a href="#about" className="rounded-full px-3 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-medium uppercase tracking-wider md:tracking-widest text-zinc-400 transition-all hover:bg-white hover:text-black hover:scale-105">
              About
            </a>
            <a
              href="#contact"
              className="rounded-full bg-white px-3 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs font-bold uppercase tracking-wider md:tracking-widest text-black hover:bg-zinc-200 transition-all"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (PROFESSIONAL & CLEAN) --- */}
      <section id="home" className="relative flex min-h-screen flex-col justify-center px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mt-20 md:mt-0">
            
            {/* Left Content: Typography Focus */}
            <div className="md:col-span-8 z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-3 mb-8">
                         <div className="h-[1px] w-12 bg-blue-500"></div>
                         <h2 className="text-sm font-mono text-blue-400 uppercase tracking-widest">
                            Portfolio 2026
                         </h2>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[1.1] mb-6 md:mb-8">
                        Designing <span className="text-zinc-600">Intelligence</span>.<br />
                        Coding <span className="text-zinc-600">Performance</span>.
                    </h1>

                    <p className="text-base md:text-lg lg:text-xl text-zinc-400 max-w-xl leading-relaxed">
                        Je suis <strong className="text-white">Hatim Lamarti</strong>, Développeur Full Stack & Data Scientist.
                        Je conçois des architectures digitales robustes et des solutions IA sur mesure pour les entreprises exigeantes.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-8 md:mt-12 flex flex-wrap gap-4 md:gap-6"
                >
                    <MagneticButton href="#work" className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-xs md:text-sm uppercase tracking-wider hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        Voir mes projets
                    </MagneticButton>
                    <MagneticButton href="mailto:hatimlamarti3@gmail.com" className="border border-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-xs md:text-sm uppercase tracking-wider hover:bg-white/10">
                        Me contacter
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Right Content: Key Metrics (Credibility) */}
            <div className="flex md:hidden flex-row items-center justify-around gap-8 mt-12 mb-8 z-10 opacity-80 md:col-span-4 md:flex-col md:items-end md:justify-center md:gap-12 md:text-right md:mt-0 md:mb-0">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="space-y-2 group cursor-default text-center md:text-right"
                 >
                     <span className="block text-4xl md:text-6xl font-light text-white group-hover:text-blue-400 transition-colors duration-500">11+</span>
                     <span className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-500">Projets Livrés</span>
                 </motion.div>

                 <div className="w-[1px] h-12 md:w-full md:h-[1px] bg-white/10"></div>

                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="space-y-2 group cursor-default text-center md:text-right"
                 >
                     <span className="block text-4xl md:text-6xl font-light text-white group-hover:text-purple-400 transition-colors duration-500">95%</span>
                     <span className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-500">Score IBM Data Science</span>
                 </motion.div>
            </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="hidden md:flex absolute bottom-12 left-6 md:left-12 items-center gap-4 text-xs font-mono text-zinc-600 uppercase tracking-widest"
        >
            <div className="h-12 w-[1px] bg-zinc-800 overflow-hidden relative">
                <motion.div 
                    animate={{ y: [0, 48, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 h-6 w-full bg-blue-500"
                ></motion.div>
            </div>
            <span>Scroll to explore</span>
        </motion.div>
      </section>

      {/* --- BENTO GRID "LUXURY" --- */}
      <section id="expertise" className="px-4 md:px-8 py-32 max-w-[1600px] mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]">
            
            {/* Card 1: EXPÉRIENCE BDE EFET (2 colonnes) - MISE À JOUR */}
            <BentoItem colSpan="md:col-span-2" className="flex flex-col justify-between relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent opacity-50"></div>

                {/* Header (Logo & Title) */}
                <div className="flex items-start md:items-center gap-4 md:gap-6 relative z-20 mb-4">
                    <div className="p-3 md:p-4 rounded-xl bg-blue-500/20 border-2 border-blue-500/50 text-blue-300 flex-shrink-0">
                         <img src={bdeLogoPath} alt="BDE EFET Logo" className="w-10 h-10 md:w-12 md:h-12" />
                   </div>
                    <div>
                        <p className="text-base md:text-xl lg:text-2xl font-normal text-white">Vice-Président – Bureau des Étudiants (BDE EFET)</p>
                        <p className="text-xs md:text-sm font-mono text-zinc-500 uppercase tracking-wider md:tracking-widest">BDE EFET – École de Formation en Technologies (EFET)</p>
                    </div>
                </div>
                
                {/* Content (Responsabilités & Accomplissement) */}
                <div className="mt-auto relative z-20 max-w-4xl pt-8 border-t border-white/10">
                    <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-4">sept. 2025 - aujourd’hui · Casablanca-Settat, Maroc</p>
                    <p className="text-lg text-zinc-400 leading-relaxed mb-4">
                        Vice-Président du Bureau des Étudiants de l’EFET, responsable de la coordination stratégique, de l'organisation d'événements et de la gestion opérationnelle du BDE.
                    </p>
                   
                    
                    <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                        <h4 className="text-xs font-mono font-medium text-blue-300 flex items-center gap-2 mb-1 uppercase tracking-widest">
                            Accomplissement Notable <ArrowUpRight size={14} />
                        </h4>
                        <p className="text-sm text-zinc-400">Lancement du site web officiel du BDE : <a href="https://bde-efet.vercel.app" target="_blank" className="text-blue-400 underline hover:text-blue-300 transition-colors">bde-efet.vercel.app</a></p>
                    </div>
                </div>
                
                {/* Pas d'image d'ambiance pour rester professionnel et centré sur le texte */}
            </BentoItem>

            {/* Card 2: Terminal Code - Très sombre (Pas de changement) */}
            <BentoItem dark={true} className="font-mono text-xs md:text-sm leading-relaxed flex flex-col justify-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                 <div className="space-y-2 text-zinc-400 relative z-10">
                    <div className="flex gap-2 mb-6">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                    </div>
                    <p><span className="text-purple-400">class</span> <span className="text-yellow-100">Developer</span> {'{'}</p>
                    <p className="pl-4">stack: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Node'</span>, <span className="text-green-400">'Python'</span>];</p>
                    <p className="pl-4">focus: <span className="text-green-400">'Performance'</span>;</p>
                     <p>{'}'}</p>
                 </div>
                 {/* Glow effect */}
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none"></div>
            </BentoItem>

            {/* Card 3: Stats - Minimaliste (Pas de changement) */}
            <BentoItem className="flex flex-col justify-between bg-zinc-900/20">
                <div className="flex justify-between items-start">
                    <Globe size={24} className="text-zinc-600" />
                    <span className="text-[10px] uppercase tracking-widest border border-zinc-800 px-2 py-1 rounded text-zinc-500">Worldwide</span>
                </div>
                <div>
                    <span className="text-6xl font-thin text-white block">11+</span>
                    <span className="text-sm text-zinc-500 uppercase tracking-widest mt-2 block">Projets Livrés</span>
                </div>
            </BentoItem>

            {/* Card 4: Stack Expertise (Pas de changement) */}
            <BentoItem colSpan="md:col-span-2" className="flex items-center justify-between relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10 w-full">
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">Core Expertise</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-white font-medium mb-2 flex items-center gap-2"><Database size={14}/> Data</h4>
                            <ul className="text-xs text-zinc-400 space-y-1 font-mono">
                                <li>Pandas / NumPy</li>
                                <li>Scikit-Learn</li>
                                <li>Visualization</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-2 flex items-center gap-2"><Globe size={14}/> Frontend</h4>
                            <ul className="text-xs text-zinc-400 space-y-1 font-mono">
                                <li>React / Next.js</li>
                                <li>Tailwind / GSAP</li>
                                <li>WebGL</li>
                            </ul>
                        </div>
                         <div>
                            <h4 className="text-white font-medium mb-2 flex items-center gap-2"><ShieldCheck size={14}/> Backend</h4>
                            <ul className="text-xs text-zinc-400 space-y-1 font-mono">
                                <li>Node.js</li>
                                <li>PHP / SQL</li>
                                <li>AWS / Docker</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </BentoItem>
         </div>
      </section>

      {/* --- SELECTED WORKS (CINEMATIC LIST) --- */}
      <section id="work" className="px-4 md:px-12 py-32 max-w-[1600px] mx-auto">
        <div className="mb-24 border-b border-white/10 pb-8 flex items-end justify-between">
            <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-[0.2em]">Selected Works (2024-25)</h2>
        </div>

        <div onMouseLeave={() => setHoveredRow(null)}>
            {projects.map((project, i) => (
                <CinematicRow 
                    key={i} 
                    index={i} 
                    {...project} 
                    hoveredRow={hoveredRow} 
                    setHoveredRow={setHoveredRow} 
                />
            ))}
        </div>
      </section>
      
      {/* --- CERTIFICATIONS --- */}
      <section id="about" className="px-4 md:px-12 pb-32 max-w-[1600px] mx-auto">
        <div className="mb-16">
            <h2 className="text-2xl font-light text-white mb-8">Certifications</h2>
             <div className="grid grid-cols-1 border-t border-white/10">
                {certs.map((cert, i) => (
                    <CinematicRow 
                        key={i} 
                        index={i} 
                        {...cert} 
                        isCert={true}
                        hoveredRow={hoveredRow} 
                        setHoveredRow={setHoveredRow} 
                    />
                ))}
            </div>
        </div>
      </section>

      {/* --- FOOTER MONUMENTAL --- */}
      <footer id="contact" className="relative bg-zinc-50 text-black py-32 px-6 md:px-12 overflow-hidden">
         <motion.div style={{ y }} className="max-w-[1600px] mx-auto relative z-10">
             <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
                 <div>
                     <p className="text-xs md:text-sm font-mono uppercase tracking-widest mb-6 md:mb-8 text-zinc-500">Got an idea?</p>
                     <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-medium tracking-tighter leading-[0.9] mb-8 md:mb-12">
                         LET'S BUILD<br/>THE FUTURE.
                     </h2>
                 </div>

                 <div className="flex flex-col items-start md:items-end gap-4 md:gap-6 w-full md:w-auto">
                     <div
                        onClick={copyEmail}
                        className="group flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 text-lg sm:text-xl md:text-3xl lg:text-4xl font-medium cursor-pointer hover:text-blue-600 transition-colors break-all"
                     >
                        <span className="break-all">hatimlamarti3@gmail.com</span>
                        <span className="p-2 md:p-3 rounded-full bg-zinc-200 group-hover:bg-blue-600 group-hover:text-white transition-all flex-shrink-0">
                            {copied ? <Check size={16} className="md:w-5 md:h-5" /> : <Copy size={16} className="md:w-5 md:h-5" />}
                        </span>
                     </div>
                     <p className="text-zinc-500 font-mono text-xs md:text-sm">
                        {copied ? "Email copié dans le presse-papier !" : "Cliquez pour copier"}
                     </p>
                 </div>
             </div>

             <div className="mt-16 md:mt-32 border-t border-zinc-300 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-500 text-center md:text-left">
                 <span className="order-2 md:order-1">© 2026 LAMARTI HATIM. ALL RIGHTS RESERVED.</span>
                 <div className="flex gap-6 md:gap-8 order-1 md:order-2">
                     <a href="https://www.instagram.com/laamarti_hatim" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
                     <a href="https://www.linkedin.com/in/lamartihatim/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
                     <a href="https://github.com/hatim3310" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GitHub</a>
                 </div>
                 <span className="order-3">CASABLANCA, MAROC</span>
             </div>
         </motion.div>
      </footer>

      </div>
    </>
  );
}