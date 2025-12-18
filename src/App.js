import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Globe, Database, ShieldCheck, Copy, Check, ArrowUpRight } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react"

// Components
import AuroraBackground from './components/AuroraBackground';
import MagneticButton from './components/MagneticButton';
import CinematicRow from './components/CinematicRow';
import BentoItem from './components/BentoItem';

// Data
import { projects, certs } from './data/portfolioData';

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
        {/* --- HERO SECTION (PERFECTLY FRAMED) --- */}
        <section id="home" className="relative flex min-h-screen flex-col pt-32 md:pt-48 px-6 md:px-12 max-w-[1600px] mx-auto overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start w-full">

            {/* Left Content: The "Ethereal Clarity" Design */}
            <div className="md:col-span-8 z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Badge Pill - Compact */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 md:mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  <span className="text-[10px] md:text-xs font-sans font-medium text-zinc-300 tracking-wide uppercase">
                    Available for new projects
                  </span>
                </div>

                {/* Main Title - Adjusted for Viewport Fit */}
                <div className="relative">
                  <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                  <h1 className="relative font-display font-medium text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-tight leading-[1] text-white">
                    <span className="block text-zinc-100">Designing Intelligence.</span>
                    <span className="block text-zinc-400">Coding Performance.</span>
                  </h1>
                </div>

                {/* Description */}
                <p className="mt-6 md:mt-8 text-base md:text-lg text-zinc-300 max-w-lg leading-relaxed font-sans font-light">
                  I am <strong className="text-white font-medium">Hatim Lamarti</strong>, a Full Stack Developer & Data Scientist constructing the digital backbone of next-gen businesses.
                </p>
              </motion.div>

              {/* Call to Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="mt-8 md:mt-10 flex flex-wrap gap-4 md:gap-6"
              >
                <MagneticButton href="#work" className="bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-sans font-medium text-xs md:text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  Explore Work
                </MagneticButton>
                <MagneticButton href="mailto:hatimlamarti3@gmail.com" className="group px-6 py-3 md:px-8 md:py-4 rounded-full font-sans font-medium text-xs md:text-sm uppercase tracking-wider text-white border border-white/20 hover:bg-white/5 transition-all flex items-center gap-3">
                  <span>Contact Me</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
                <span className="block text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-500">Projects Delivered</span>
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
        {/* --- BENTO GRID "TREND 2025" --- */}
        <section id="expertise" className="px-4 md:px-8 py-32 max-w-[1800px] mx-auto">
          <div className="mb-16 md:mb-24">
            <h2 className="font-display font-medium text-4xl md:text-6xl text-white mb-6">
              Beyond <span className="text-zinc-600">Code.</span>
            </h2>
            <div className="h-[1px] w-full bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">

            {/* Card 1: LEADERSHIP (BDE) - Featured */}
            <BentoItem colSpan="md:col-span-2" className="flex flex-col justify-between relative group overflow-hidden bg-zinc-900">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-60"></div>

              <div className="relative z-20 flex justify-between items-start">
                <div className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                  <img src={bdeLogoPath} alt="BDE EFET Logo" className="w-8 h-8" />
                </div>
                <div className="px-4 py-1 rounded-full border border-white/10 bg-black/20 text-xs font-sans uppercase tracking-widest text-zinc-400">
                  Leadership
                </div>
              </div>

              <div className="relative z-20 max-w-2xl">
                <h3 className="font-display text-3xl md:text-5xl text-white leading-tight mb-4">
                  Vice President <span className="text-zinc-500">Student Bureau</span>
                </h3>
                <p className="font-sans text-lg text-zinc-300 mb-6 max-w-md">
                  Orchestrating strategic operations and events for EFET School.
                </p>
                <a href="https://bde-efet.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-sans uppercase tracking-widest text-white border-b border-white/30 pb-1 hover:border-white transition-all">
                  Visit Platform <ArrowUpRight size={14} />
                </a>
              </div>
            </BentoItem>

            {/* Card 2: THE BUILDER (Terminal) */}
            <BentoItem dark={true} className="font-mono text-sm leading-relaxed flex flex-col justify-center relative overflow-hidden bg-[#050505]">
              <div className="absolute top-0 right-0 p-6 opacity-20 text-4xl md:text-6xl font-display font-bold text-white outline-text">
                DEV
              </div>
              <div className="space-y-4 text-zinc-300 relative z-10">
                <p><span className="text-blue-400">const</span> <span className="text-white">Profile</span> = {'{'}</p>
                <div className="pl-4 space-y-2 text-zinc-400">
                  <p>code: [<span className="text-green-400">'Clean'</span>, <span className="text-green-400">'Scalable'</span>],</p>
                  <p>tools: [<span className="text-green-400">'React'</span>, <span className="text-green-400">'Python'</span>],</p>
                  <p>passion: <span className="text-yellow-200">true</span></p>
                </div>
                <p>{'};'}</p>
              </div>
            </BentoItem>

            {/* Card 3: GLOBAL IMPACT (Stats) */}
            <BentoItem className="flex flex-col justify-between bg-zinc-900 text-white group">
              <div className="flex justify-between items-start">
                <Globe size={32} strokeWidth={1} />
                <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div>
                <span className="font-display text-7xl md:text-9xl font-bold tracking-tighter block leading-[0.8]">11</span>
                <span className="font-sans text-sm text-zinc-400 uppercase tracking-widest mt-4 block">Projects Delivered</span>
              </div>
            </BentoItem>

            {/* Card 4: TECH ARSENAL */}
            <BentoItem colSpan="md:col-span-2" className="flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-900/5"></div>
              <div className="relative z-10 w-full px-4">
                <div className="flex items-end justify-between mb-8">
                  <h3 className="font-display text-3xl text-white">Tech Arsenal</h3>
                  <span className="text-xs font-sans uppercase tracking-widest text-zinc-500">Full Stack & AI</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "React / Next", icon: Globe },
                    { label: "Python AI", icon: Database },
                    { label: "Node.js", icon: ShieldCheck },
                    { label: "Docker / AWS", icon: Database }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <item.icon className="w-6 h-6 text-blue-400 mb-3" strokeWidth={1.5} />
                      <p className="font-medium text-white">{item.label}</p>
                    </div>
                  ))}
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
        {/* --- FOOTER MONUMENTAL (TREND 2025) --- */}
        <footer id="contact" className="relative bg-[#EAEAEA] text-[#030303] py-24 px-6 md:px-12 overflow-hidden rounded-t-[3rem] mt-32">
          {/* Background Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none opacity-[0.03]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-black blur-[150px] rounded-full"></div>
          </div>

          <motion.div style={{ y }} className="max-w-[1800px] mx-auto relative z-10 flex flex-col justify-between min-h-[60vh]">

            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                  <p className="text-sm font-sans font-medium uppercase tracking-widest text-zinc-500">Open for new opportunities</p>
                </div>
                <h2 className="font-display font-bold text-6xl sm:text-8xl md:text-9xl tracking-tighter leading-[0.85]">
                  Let's <span className="text-zinc-400">scale</span><br />
                  your vision.
                </h2>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-6">
                <button
                  onClick={copyEmail}
                  className="group relative inline-flex items-center gap-4 text-2xl md:text-4xl font-sans font-medium cursor-pointer transition-colors"
                >
                  <span className="relative z-10 border-b-2 border-black/10 group-hover:border-blue-600 transition-colors pb-1">
                    hatimlamarti3@gmail.com
                  </span>
                  <span className="p-3 md:p-4 rounded-full bg-white group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                    {copied ? <Check size={24} /> : <Copy size={24} />}
                  </span>
                </button>
                <AnimatePresence mode='wait'>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-blue-600 font-sans font-medium text-sm"
                    >
                      Email copied to clipboard
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
              <div className="flex flex-col gap-2">
                <span className="font-display text-2xl font-bold tracking-tight">HATIM LAMARTI.</span>
                <span className="font-sans text-xs text-zinc-500">© 2026. All rights reserved.</span>
              </div>

              <div className="flex gap-8 md:gap-12">
                {[
                  { name: 'Instagram', url: 'https://instagram.com' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/lamartihatim/' },
                  { name: 'GitHub', url: 'https://github.com/hatim3310' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm font-medium uppercase tracking-widest hover:text-blue-600 transition-colors relative group"
                  >
                    {social.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>

              <div className="hidden md:block font-sans text-xs font-medium text-zinc-400 uppercase tracking-widest text-right">
                Based in<br />Casablanca, MA
              </div>
            </div>
          </motion.div>
        </footer>

      </div>
    </>
  );
}