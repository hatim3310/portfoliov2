import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Copy, Check, ArrowDown, Code2, Brain, Server, Paintbrush } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react";

import AuroraBackground from './components/AuroraBackground';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import SplitText from './components/SplitText';
import Marquee from './components/Marquee';
import ProjectCard from './components/ProjectCard';
import BorderBeam from './components/BorderBeam';
import MagneticButton from './components/MagneticButton';
import CinematicRow from './components/CinematicRow';
import { projects, certs } from './data/portfolioData';

/* ─── Animation Presets ─── */
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const lineExpand = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

/* ─── Tech Stack for Marquee ─── */
const techStack = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'Python',
  'TensorFlow', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS',
  'D3.js', 'Pandas', 'Figma', 'Git', 'REST APIs',
  'GraphQL', 'Redis', 'MongoDB', 'Vercel', 'CI/CD',
];

/* ─── Expertise Data ─── */
const expertise = [
  {
    icon: Code2,
    title: 'Full Stack Development',
    desc: 'Building high‑performance web applications with React, Next.js, Node.js, and TypeScript.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
  },
  {
    icon: Brain,
    title: 'AI & Data Science',
    desc: 'Designing ML models, data pipelines, and predictive analytics with Python and TensorFlow.',
    tags: ['Python', 'TensorFlow', 'Pandas', 'NLP'],
  },
  {
    icon: Server,
    title: 'Cloud & DevOps',
    desc: 'Deploying scalable infrastructure with Docker, AWS, PostgreSQL, and automated CI/CD.',
    tags: ['Docker', 'AWS', 'PostgreSQL', 'CI/CD'],
  },
  {
    icon: Paintbrush,
    title: 'Design & UX',
    desc: 'Crafting intuitive interfaces with Figma, Tailwind CSS, and motion design.',
    tags: ['Figma', 'Tailwind', 'Responsive', 'Motion'],
  },
];

export default function App() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("hatimlamarti3@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Analytics />
      <div className="min-h-screen text-zinc-200 font-body overflow-x-hidden cursor-default">
        <div className="noise-overlay" />
        <AuroraBackground />
        <ScrollProgress />
        <Navbar />

        {/* ═══════════════════════════════════
            HERO — Split Text Name Reveal
        ═══════════════════════════════════ */}
        <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-[1100px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Status Pill */}
            <motion.div variants={fadeUp} className="mb-10">
              <div className="inline-flex items-center gap-2.5 cursor-default group">
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 absolute -inset-0.5 animate-ping" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 relative" />
                </div>
                <span className="text-[11px] font-mono text-zinc-500 tracking-wider group-hover:text-emerald-400/80 transition-colors duration-300">
                  Available for projects
                </span>
              </div>
            </motion.div>

            {/* Name — Character-by-character reveal */}
            <div className="mb-3">
              <h1 className="font-heading font-bold text-[clamp(4rem,10vw,7.5rem)] leading-[0.88] tracking-[-0.04em]">
                <span className="block text-white">
                  <SplitText delay={0.3}>Hatim</SplitText>
                </span>
                <span className="block text-white">
                  <SplitText delay={0.5}>Lamarti</SplitText>
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-accent inline-block"
                  >
                    .
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* Role */}
            <motion.div variants={fadeUp} className="mb-8 pl-1">
              <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed max-w-[460px]">
                Full Stack Developer & Data Scientist — building performant digital products and intelligent systems.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pl-1">
              <BorderBeam>
                <MagneticButton
                  href="#work"
                  className="group px-8 py-3.5 rounded-xl bg-accent text-white text-[12px] font-body font-semibold transition-all duration-300 hover:bg-accent-hover flex items-center gap-2.5"
                >
                  <span>View Work</span>
                  <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                </MagneticButton>
              </BorderBeam>

              <MagneticButton
                href="mailto:hatimlamarti3@gmail.com"
                className="group px-8 py-3.5 rounded-xl border border-white/[0.08] text-zinc-400 text-[12px] font-body font-medium transition-all duration-300 hover:border-white/[0.15] hover:text-zinc-200 flex items-center gap-2.5 bg-white/[0.02]"
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </MagneticButton>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={fadeUp} className="flex gap-12 mt-16 pl-1">
              {[
                { val: 11, suffix: '+', label: 'Projects Built' },
                { val: 95, suffix: '%', label: 'IBM Data Science' },
                { val: 3, suffix: '+', label: 'Years Experience' },
              ].map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex items-baseline">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="block font-heading text-4xl md:text-5xl font-bold text-zinc-200 group-hover:text-white transition-colors duration-500"
                    >
                      {stat.val}
                    </motion.span>
                    <span className="text-accent font-heading text-2xl font-bold ml-0.5">{stat.suffix}</span>
                  </div>
                  <span className="block text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-2 group-hover:text-zinc-400 transition-colors duration-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>


        </section>

        {/* ═══════════════════════════════════
            TECH MARQUEE — Infinite Scroll Band
        ═══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Marquee items={techStack} speed={35} />
        </motion.div>

        {/* ═══════════════════════════════════
            SELECTED WORKS — Visual Cards
        ═══════════════════════════════════ */}
        <section id="work" className="px-6 md:px-12 lg:px-20 py-28 md:py-36 max-w-[1100px] mx-auto">
          {/* Section Header with reveal line */}
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
              <div>
                <span className="text-[11px] font-mono text-accent uppercase tracking-[0.15em] mb-3 block">
                  Portfolio
                </span>
                <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-[-0.02em] text-white">
                  Selected Works
                </h2>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  2026 Collection
                </span>
              </div>
            </div>
          </motion.div>

          {/* Reveal line */}
          <motion.div
            variants={lineExpand}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="reveal-line mb-14"
          />

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project, i) => (
              <ProjectCard key={i} index={i} {...project} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            EXPERTISE — Card Grid
        ═══════════════════════════════════ */}
        <section id="expertise" className="px-6 md:px-12 lg:px-20 py-28 md:py-36 max-w-[1100px] mx-auto">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-6"
          >
            <span className="text-[11px] font-mono text-accent uppercase tracking-[0.15em] mb-3 block">
              Capabilities
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-[-0.02em] text-white">
              What I Do
            </h2>
          </motion.div>

          <motion.div
            variants={lineExpand}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="reveal-line mb-14"
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {expertise.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl p-6 md:p-8 bg-base-surface border border-white/[0.06] transition-all duration-500 hover:border-white/[0.12] h-full flex flex-col"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-accent/[0.06] border border-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/[0.12] transition-colors duration-500">
                  <item.icon size={18} className="text-accent" strokeWidth={1.5} />
                </div>

                <h3 className="font-heading font-semibold text-lg text-white mb-2 group-hover:text-accent transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed mb-5 flex-1">
                  {item.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium text-zinc-500 bg-white/[0.03] border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Leadership card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4"
          >
            <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-base-surface border border-white/[0.06] transition-all duration-500 hover:border-white/[0.12] group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center overflow-hidden">
                    <img
                      src="/assets/images/projects/servhub.png"
                      alt="ServHub"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-base text-white">
                      CEO & Founder — ServHub
                    </h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5">
                      Building a next-generation services platform connecting providers and clients.
                    </p>
                  </div>
                </div>
                <a
                  href="https://servvhub1.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-500 hover:text-accent transition-colors cursor-pointer"
                >
                  Visit Platform
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════
            CERTIFICATIONS
        ═══════════════════════════════════ */}
        <section id="about" className="px-6 md:px-12 lg:px-20 pb-28 md:pb-36 max-w-[1100px] mx-auto">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-6"
          >
            <span className="text-[11px] font-mono text-accent uppercase tracking-[0.15em] mb-3 block">
              Credentials
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-[-0.02em] text-white">
              Certifications
            </h2>
          </motion.div>

          <motion.div
            variants={lineExpand}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="reveal-line mb-14"
          />

          <div onMouseLeave={() => setHoveredRow(null)}>
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
        </section>

        {/* ═══════════════════════════════════
            FOOTER / CONTACT
        ═══════════════════════════════════ */}
        <footer id="contact" className="relative border-t border-white/[0.06]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono text-zinc-600 tracking-wider">
                    Open for opportunities
                  </span>
                </div>
                <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.92]">
                  <span className="text-white">Let's work</span>
                  <br />
                  <span className="text-zinc-500">together</span>
                  <span className="text-accent">.</span>
                </h2>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-3">
                <button
                  onClick={copyEmail}
                  className="group inline-flex items-center gap-3 cursor-pointer"
                >
                  <span className="text-base sm:text-xl md:text-2xl font-body font-medium text-zinc-400 group-hover:text-white transition-colors duration-300 border-b border-white/[0.06] group-hover:border-accent/40 pb-0.5">
                    hatimlamarti3@gmail.com
                  </span>
                  <span className="p-2 rounded-lg border border-white/[0.06] group-hover:border-accent/30 group-hover:bg-accent/[0.06] transition-all duration-300">
                    {copied
                      ? <Check size={16} className="text-emerald-500" />
                      : <Copy size={16} className="text-zinc-600 group-hover:text-accent transition-colors" />
                    }
                  </span>
                </button>

                <AnimatePresence mode="wait">
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-emerald-500 text-[11px] font-mono"
                    >
                      Copied to clipboard
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Bottom Bar */}
            <motion.div
              variants={lineExpand}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="reveal-line"
            />
            <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="font-heading text-sm font-semibold tracking-wide text-zinc-400">
                  Hatim Lamarti
                </span>
                <span className="text-accent font-heading">.</span>
                <span className="block text-[10px] font-mono text-zinc-700 tracking-widest uppercase mt-1">
                  © 2026 · All rights reserved
                </span>
              </div>

              <div className="flex gap-6">
                {[
                  { name: 'GitHub', href: 'https://github.com/hatim3310' },
                  { name: 'LinkedIn', href: '#' },
                  { name: 'Instagram', href: '#' },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-body font-medium text-zinc-600 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    {s.name}
                  </a>
                ))}
              </div>

              <div className="hidden md:block text-[10px] font-mono text-zinc-700 uppercase tracking-widest text-right">
                Based in<br />
                <span className="text-zinc-500">Casablanca, MA</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}