import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Rocket, 
  Brain, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Database, 
  Cpu, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Users,
  Target,
  UserCheck,
  Trophy,
  ArrowDown
} from 'lucide-react';
import { translations } from '../data/translations';

const responsibilitiesEN = [
  { icon: Layers, title: 'Digital Solution Architecture', desc: 'Designing end-to-end cloud & software architectures tailored for enterprise goals.' },
  { icon: Cpu, title: 'Full Stack Platforms', desc: 'Developing high-performance web applications with modern frameworks and microservices.' },
  { icon: Database, title: 'Data & Backend Systems', desc: 'Building robust data engineering pipelines, backend systems, and database layers.' },
  { icon: Brain, title: 'AI & Automation Integration', desc: 'Embedding neural models, LLM agents, and automated data workflows into products.' },
  { icon: ShieldCheck, title: 'Technical Leadership', desc: 'Directing technology strategy, code standards, and technical governance for client projects.' },
  { icon: TrendingUp, title: 'Digital Growth Strategy', desc: 'Bridging business objectives with scalable technology roadmaps for long-term impact.' }
];

const responsibilitiesFR = [
  { icon: Layers, title: 'Architecture des Solutions Digitales', desc: 'Conception d\'architectures logicielle et cloud sur mesure adaptées aux objectifs d\'entreprise.' },
  { icon: Cpu, title: 'Développement Full Stack', desc: 'Création de plateformes web haute performance avec des frameworks modernes et microservices.' },
  { icon: Database, title: 'Gestion des Données & Backend', desc: 'Mise en place de pipelines de data engineering, systèmes backend et couches de bases de données.' },
  { icon: Brain, title: 'Intégration IA & Automatisation', desc: 'Intégration de modèles de machine learning, d\'agents LLM et de flux d\'automatisation intelligentes.' },
  { icon: ShieldCheck, title: 'Direction Technique', desc: 'Supervision des choix technologiques, normes de code et gouvernance technique des projets clients.' },
  { icon: TrendingUp, title: 'Stratégie de Croissance Digitale', desc: 'Alignement des objectifs business avec des feuilles de route technologiques évolutives.' }
];

const NeyoxExperience = ({ lang = 'en' }) => {
  const [activeTab, setActiveTab] = useState('casestudy');
  const t = translations[lang] || translations.en;
  const responsibilities = lang === 'fr' ? responsibilitiesFR : responsibilitiesEN;
  const caseStudyResps = t['neyox.csRespItems'] || [];

  const comparisonData = [
    {
      labelAgencies: t['neyox.row1Agencies'],
      labelNeyox: t['neyox.row1Neyox'],
      icon: Layers
    },
    {
      labelAgencies: t['neyox.row2Agencies'],
      labelNeyox: t['neyox.row2Neyox'],
      icon: Zap
    },
    {
      labelAgencies: t['neyox.row3Agencies'],
      labelNeyox: t['neyox.row3Neyox'],
      icon: Database
    },
    {
      labelAgencies: t['neyox.row4Agencies'],
      labelNeyox: t['neyox.row4Neyox'],
      icon: Users
    },
    {
      labelAgencies: t['neyox.row5Agencies'],
      labelNeyox: t['neyox.row5Neyox'],
      icon: TrendingUp
    }
  ];

  return (
    <section id="neyox" aria-label="Neyox — Partenaire Technologique & Leadership" className="relative px-6 md:px-12 lg:px-20 py-28 md:py-36 max-w-[1300px] mx-auto select-none">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-mono text-[#ECECEE] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              01.5 // {t['neyox.badge']}
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter uppercase text-white">
              {t['neyox.title']}
            </h2>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#121316]/90 border border-white/15 backdrop-blur-xl shadow-lg self-start md:self-auto">
            <Building2 size={16} className="text-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-white/90 uppercase tracking-widest font-bold">
              NEYOX PARTNER 2026
            </span>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-emerald-500/40 via-white/10 to-transparent" />
      </motion.div>

      {/* HERO EXECUTIVE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl bg-[#121316]/90 border border-white/15 backdrop-blur-2xl p-8 sm:p-12 mb-12 shadow-2xl group"
      >
        {/* Subtle Ambient Light Corner */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 via-cyan-500/5 to-transparent rounded-bl-full pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Role & Bio */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles size={12} />
                  {t['neyox.roleBadge']}
                </span>
                <span className="text-xs font-mono text-white/70 tracking-widest uppercase">
                  CASABLANCA · B2B PARTNER
                </span>
              </div>

              <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight mb-4 leading-tight">
                Hatim Lamarti
              </h3>

              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-light">
                {t['neyox.roleDesc']}
              </p>
            </div>

            {/* Tagline Ribbon */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs sm:text-sm font-mono text-white/90 tracking-wide font-semibold">
                  "{t['neyox.tagline']}"
                </span>
              </div>
              <ArrowUpRight size={18} className="text-white/70 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Right Column: Key Stats / Quick Highlights */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-between hover:border-emerald-500/30 transition-colors">
              <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest mb-1">
                POSITIONING
              </span>
              <span className="text-lg font-heading font-black text-white uppercase">
                Strategic Technology Partner
              </span>
              <span className="text-xs font-mono text-emerald-400 mt-2">
                Not a simple agency · End-to-end execution
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-500/30 transition-colors">
              <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest mb-1">
                CORE CAPABILITY
              </span>
              <span className="text-lg font-heading font-black text-white uppercase">
                Software + Data + Business
              </span>
              <span className="text-xs font-mono text-cyan-400 mt-2">
                Full-Stack & AI Infrastructure
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* VIEW TOGGLE TABS */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-2xl bg-[#121316] border border-white/15 backdrop-blur-xl shadow-xl flex-wrap justify-center gap-1">
          <button
            onClick={() => setActiveTab('casestudy')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 ${
              activeTab === 'casestudy'
                ? 'bg-white text-black shadow-lg scale-[1.02]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {t['neyox.csTab']}
          </button>
          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 ${
              activeTab === 'pillars'
                ? 'bg-white text-black shadow-lg scale-[1.02]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {t['neyox.pillarsLabel']}
          </button>
          <button
            onClick={() => setActiveTab('responsibilities')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 ${
              activeTab === 'responsibilities'
                ? 'bg-white text-black shadow-lg scale-[1.02]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {t['neyox.respLabel']}
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 ${
              activeTab === 'matrix'
                ? 'bg-white text-black shadow-lg scale-[1.02]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {t['neyox.matrixTitle']}
          </button>
        </div>
      </div>

      {/* TAB CONTENT 0: DEDICATED CASE STUDY */}
      {activeTab === 'casestudy' && (
        <motion.div
          key="casestudy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          {/* Main Case Study Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0d0e12]/95 border border-white/15 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl text-center group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/15 via-cyan-500/10 to-transparent rounded-bl-full pointer-events-none transition-opacity duration-700 opacity-70 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest mb-4 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                <Sparkles size={14} />
                <span>NEYOX CASE STUDY & AGENCY VENTURE</span>
              </div>
              <h3 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-2">
                NEYOX DIGITAL AGENCY
              </h3>
              <p className="font-mono text-base sm:text-xl text-cyan-300 font-semibold uppercase tracking-wider">
                {t['neyox.csSubheading']}
              </p>
            </div>
          </div>

          {/* Downward Connector Arrow (↓) */}
          <div className="flex flex-col items-center my-2">
            <div className="w-[2px] h-8 bg-gradient-to-b from-white/20 via-emerald-400 to-white/20 animate-pulse" />
            <div className="w-11 h-11 rounded-full bg-[#121316] border border-emerald-500/40 backdrop-blur-md flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <ArrowDown size={20} className="animate-bounce" />
            </div>
            <div className="w-[2px] h-8 bg-gradient-to-b from-white/20 via-emerald-400 to-white/20 animate-pulse" />
          </div>

          {/* 1. Challenge Card */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0c]/90 border border-white/10 backdrop-blur-xl p-8 sm:p-10 hover:border-amber-500/40 transition-all duration-300 group shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-md">
                <Target size={22} />
              </div>
              <span className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                {t['neyox.csChallengeTitle']}
              </span>
            </div>
            <p className="text-white/80 font-mono text-base sm:text-lg leading-relaxed">
              {t['neyox.csChallengeDesc']}
            </p>
          </div>

          {/* Downward Connector Arrow (↓) */}
          <div className="flex flex-col items-center my-2">
            <div className="w-[2px] h-8 bg-gradient-to-b from-white/20 via-emerald-400 to-white/20 animate-pulse" />
            <div className="w-11 h-11 rounded-full bg-[#121316] border border-emerald-500/40 backdrop-blur-md flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <ArrowDown size={20} className="animate-bounce" />
            </div>
            <div className="w-[2px] h-8 bg-gradient-to-b from-white/20 via-emerald-400 to-white/20 animate-pulse" />
          </div>

          {/* 2. My Role Card */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0c]/90 border border-white/10 backdrop-blur-xl p-8 sm:p-10 hover:border-cyan-500/40 transition-all duration-300 group shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-md">
                <UserCheck size={22} />
              </div>
              <span className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                {t['neyox.csRoleTitle']}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/15 font-mono text-sm sm:text-base text-white font-bold uppercase tracking-wider shadow-md">
                {t['neyox.csRoleVal1']}
              </span>
              <span className="px-5 py-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 font-mono text-sm sm:text-base text-cyan-300 font-bold uppercase tracking-wider shadow-md">
                {t['neyox.csRoleVal2']}
              </span>
            </div>
          </div>

          {/* Downward Connector Arrow (↓) */}
          <div className="flex flex-col items-center my-2">
            <div className="w-[2px] h-8 bg-gradient-to-b from-white/20 via-emerald-400 to-white/20 animate-pulse" />
            <div className="w-11 h-11 rounded-full bg-[#121316] border border-emerald-500/40 backdrop-blur-md flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <ArrowDown size={20} className="animate-bounce" />
            </div>
            <div className="w-[2px] h-8 bg-gradient-to-b from-white/20 via-emerald-400 to-white/20 animate-pulse" />
          </div>

          {/* 3. Responsibilities Grid (7 items) */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0c]/90 border border-white/10 backdrop-blur-xl p-8 sm:p-10 hover:border-emerald-500/40 transition-all duration-300 group shadow-xl">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-md">
                  <Layers size={22} />
                </div>
                <span className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                  {t['neyox.csRespTitle']}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase">
                7 TECHNICAL PILLARS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {caseStudyResps.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all duration-300">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                  <span className="font-mono text-xs sm:text-sm text-white/90 font-semibold tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Downward Connector Arrow (↓) */}
          <div className="flex flex-col items-center my-2">
            <div className="w-[2px] h-8 bg-gradient-to-b from-white/20 via-emerald-400 to-white/20 animate-pulse" />
            <div className="w-11 h-11 rounded-full bg-[#121316] border border-emerald-500/40 backdrop-blur-md flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <ArrowDown size={20} className="animate-bounce" />
            </div>
            <div className="w-[2px] h-8 bg-gradient-to-b from-white/20 via-emerald-400 to-white/20 animate-pulse" />
          </div>

          {/* 4. Result Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#0d0e12]/90 to-cyan-950/40 border border-emerald-500/30 backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 shadow-lg">
                <Trophy size={24} />
              </div>
              <span className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                {t['neyox.csResultTitle']}
              </span>
            </div>
            <p className="text-white font-mono text-base sm:text-xl font-bold leading-relaxed">
              {t['neyox.csResultDesc']}
            </p>
          </div>
        </motion.div>
      )}

      {/* TAB CONTENT 1: THREE CORE PILLARS */}
      {activeTab === 'pillars' && (
        <motion.div
          key="pillars"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Pillar 1 */}
          <div className="group relative overflow-hidden rounded-3xl bg-[#121316]/90 border border-white/10 backdrop-blur-xl p-8 transition-all duration-500 hover:border-emerald-500/40 hover:shadow-2xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />
            <div>
              <div className="p-3.5 w-fit rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-6">
                <Rocket size={24} />
              </div>
              <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tight mb-3">
                {t['neyox.p1Title']}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                {t['neyox.p1Desc']}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {['Web Systems', 'Business Apps', 'Automation', 'Custom SaaS', 'Cloud Infra'].map((tag, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="group relative overflow-hidden rounded-3xl bg-[#121316]/90 border border-white/10 backdrop-blur-xl p-8 transition-all duration-500 hover:border-cyan-500/40 hover:shadow-2xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-bl-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />
            <div>
              <div className="p-3.5 w-fit rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6">
                <Brain size={24} />
              </div>
              <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tight mb-3">
                {t['neyox.p2Title']}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                {t['neyox.p2Desc']}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {['Data Engineering', 'Data Analytics', 'Smart Dashboards', 'Data Workflows', 'AI Integration'].map((tag, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="group relative overflow-hidden rounded-3xl bg-[#121316]/90 border border-white/10 backdrop-blur-xl p-8 transition-all duration-500 hover:border-purple-500/40 hover:shadow-2xl flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-bl-full pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
            <div>
              <div className="p-3.5 w-fit rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-6">
                <TrendingUp size={24} />
              </div>
              <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tight mb-3">
                {t['neyox.p3Title']}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                {t['neyox.p3Desc']}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              {['Project Architecture', 'Digital Strategy', 'Tech Selection', 'Digital Identity', 'Process Optimization'].map((tag, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB CONTENT 2: TECHNICAL RESPONSIBILITIES MATRIX */}
      {activeTab === 'responsibilities' && (
        <motion.div
          key="responsibilities"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {responsibilities.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-3xl bg-[#121316]/90 border border-white/10 backdrop-blur-xl hover:border-emerald-500/30 transition-colors flex flex-col justify-between">
                <div>
                  <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 text-emerald-400 mb-4">
                    <ItemIcon size={20} />
                  </div>
                  <h4 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-2">
                    {item.title}
                  </h4>
                  <p className="text-white/70 text-xs leading-relaxed font-mono">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}

      {/* TAB CONTENT 3: PARADIGM SHIFT COMPARISON TABLE */}
      {activeTab === 'matrix' && (
        <motion.div
          key="matrix"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-[#121316]/90 border border-white/15 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl overflow-hidden"
        >
          <div className="mb-6">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1 font-bold">
              {t['neyox.matrixLabel']}
            </span>
            <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
              {t['neyox.matrixTitle']}
            </h3>
          </div>

          <div className="w-full">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-white/70">
              <div className="col-span-5 text-rose-400/80 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500/60" />
                {t['neyox.colAgencies']}
              </div>
              <div className="col-span-2 text-center text-white/50">VS</div>
              <div className="col-span-5 text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t['neyox.colNeyox']}
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-white/5">
              {comparisonData.map((row, idx) => {
                const RowIcon = row.icon;
                return (
                  <div key={idx} className="grid grid-cols-12 gap-4 py-5 items-center hover:bg-white/[0.02] transition-colors rounded-xl px-2">
                    {/* Traditional Agency Column */}
                    <div className="col-span-5 text-sm text-white/70 flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500/50 flex-shrink-0" />
                      <span className="line-through decoration-rose-500/40 text-white/70">{row.labelAgencies}</span>
                    </div>

                    {/* Divider Icon */}
                    <div className="col-span-2 flex justify-center">
                      <div className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70">
                        <RowIcon size={14} />
                      </div>
                    </div>

                    {/* Neyox Column */}
                    <div className="col-span-5 text-sm font-semibold text-white flex items-center gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                      <span className="text-emerald-100">{row.labelNeyox}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default NeyoxExperience;
