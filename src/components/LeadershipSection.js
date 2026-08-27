import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Layers, Brain, Database, Building2, Sparkles, ArrowRight } from 'lucide-react';
import CardSpotlight from './ui/CardSpotlight';
import { translations } from '../data/translations';

const pillarsData = [
  {
    key: 'p1',
    id: '01',
    icon: ShieldCheck,
    titleKey: 'leadership.p1.title',
    descKey: 'leadership.p1.desc',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'group-hover:border-emerald-500/40',
    iconColor: 'text-emerald-400'
  },
  {
    key: 'p2',
    id: '02',
    icon: TrendingUp,
    titleKey: 'leadership.p2.title',
    descKey: 'leadership.p2.desc',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'group-hover:border-cyan-500/40',
    iconColor: 'text-cyan-400'
  },
  {
    key: 'p3',
    id: '03',
    icon: Layers,
    titleKey: 'leadership.p3.title',
    descKey: 'leadership.p3.desc',
    gradient: 'from-indigo-500/20 to-purple-500/10',
    borderColor: 'group-hover:border-indigo-500/40',
    iconColor: 'text-indigo-400'
  },
  {
    key: 'p4',
    id: '04',
    icon: Brain,
    titleKey: 'leadership.p4.title',
    descKey: 'leadership.p4.desc',
    gradient: 'from-purple-500/20 to-pink-500/10',
    borderColor: 'group-hover:border-purple-500/40',
    iconColor: 'text-purple-400'
  },
  {
    key: 'p5',
    id: '05',
    icon: Database,
    titleKey: 'leadership.p5.title',
    descKey: 'leadership.p5.desc',
    gradient: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'group-hover:border-amber-500/40',
    iconColor: 'text-amber-400'
  }
];

const LeadershipSection = ({ lang = 'en' }) => {
  const t = translations[lang] || translations.en;

  return (
    <section id="leadership" aria-label="Leadership Exécutif et Stratégie Technologique" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 max-w-[1300px] mx-auto select-none">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

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
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              01.2 // {t['leadership.label']}
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter uppercase text-white">
              {t['leadership.title']}
            </h2>
          </div>
          <p className="text-sm font-mono text-white/70 max-w-md leading-relaxed">
            {t['leadership.subtitle']}
          </p>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-emerald-500/40 via-white/10 to-transparent" />
      </motion.div>

      {/* HERO EXECUTIVE TITLE BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl bg-[#0d0e12]/90 border border-white/15 backdrop-blur-2xl p-8 sm:p-12 mb-12 shadow-2xl group"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/15 via-cyan-500/10 to-transparent rounded-bl-full pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-tr-full pointer-events-none blur-xl" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                <Building2 size={14} />
                EXECUTIVE DIRECTION & TECH LEADERSHIP
              </span>
              <span className="text-xs font-mono text-white/70 tracking-widest uppercase">
                NEYOX ENTERPRISE & AI SOLUTIONS
              </span>
            </div>

            <h3 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight leading-tight">
              {t['leadership.titleMain']}
            </h3>

            <div className="inline-block px-4 py-1.5 rounded-xl bg-white/5 border border-white/15 font-mono text-sm sm:text-lg text-cyan-300 font-bold uppercase tracking-wider backdrop-blur-md">
              {t['leadership.titleSub']}
            </div>

            <p className="text-white/80 font-mono text-sm sm:text-base leading-relaxed pt-2">
              "{t['leadership.pitch']}"
            </p>
          </div>

          {/* CTA Link to Neyox */}
          <div className="shrink-0 flex justify-start lg:justify-end">
            <a
              href="#neyox"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-black font-heading font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all duration-300 group/btn shadow-xl"
            >
              <span>Explore Neyox Case Study</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* 5 LEADERSHIP PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillarsData.map((pillar, idx) => {
          const Icon = pillar.icon;

          return (
            <motion.div
              key={pillar.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${pillar.gradient} rounded-3xl blur-xl opacity-40 group-hover:opacity-80 transition duration-500 pointer-events-none`} />

              <CardSpotlight className={`p-8 rounded-3xl bg-[#0A0A0C]/90 border border-white/10 ${pillar.borderColor} backdrop-blur-2xl relative z-10 h-full flex flex-col justify-between transition-all duration-300`}>
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/15 text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-xl">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-white/50 font-bold tracking-widest">
                      0{idx + 1} &bull; EXECUTIVE PILLAR
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                    {t[pillar.titleKey]}
                  </h4>

                  <p className="text-white/70 font-mono text-xs sm:text-sm leading-relaxed">
                    {t[pillar.descKey]}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    CORE EXECUTIVE DISCIPLINE
                  </span>
                  <Sparkles className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </div>
              </CardSpotlight>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default LeadershipSection;
