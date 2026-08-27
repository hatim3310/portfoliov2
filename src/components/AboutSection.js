import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Sparkles, ArrowRight, Globe, CheckCircle2, Calendar, Layers } from 'lucide-react';
import CardSpotlight from './ui/CardSpotlight';
import CertificationsShowcase from './CertificationsShowcase';
import { translations } from '../data/translations';

const AboutSection = ({ lang = 'en' }) => {
  const t = translations[lang] || translations.en;
  const skills = t['currently.skills'] || [];

  return (
    <div className="space-y-16">
      {/* ── Section Header ── */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-mono tracking-widest uppercase backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>{t['about.label']}</span>
        </div>
        <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
          {t['about.title']}
        </h2>
        <p className="text-sm sm:text-base font-mono text-white/70 max-w-2xl leading-relaxed">
          {t['about.subtitle']}
        </p>
      </div>

      {/* ── Featured "Currently / Experience" Spotlight Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative group"
      >
        {/* Glow ambient background effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-purple-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition duration-700 pointer-events-none" />

        <CardSpotlight className="p-8 sm:p-12 rounded-3xl bg-[#0A0A0C]/95 border border-white/15 backdrop-blur-2xl relative z-10 overflow-hidden shadow-2xl">
          {/* Top Row: Live Status + Timeline + Company */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                </span>
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                  {t['currently.badge']}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 font-mono text-xs uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t['currently.period']}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-white font-heading font-black text-xs uppercase tracking-wider shadow-md">
              <Building2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{t['currently.company']}</span>
            </div>
          </div>

          {/* Main Position & Division Stack */}
          <div className="space-y-4 mb-8">
            <div className="inline-block px-4 py-1.5 rounded-xl bg-white/5 border border-cyan-500/30 font-mono text-xs sm:text-sm font-bold text-cyan-300 uppercase tracking-widest backdrop-blur-md">
              {t['currently.role']}
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight uppercase">
              {t['currently.headline']}
            </h3>

            <p className="text-white/80 font-mono text-xs sm:text-sm leading-relaxed max-w-3xl">
              {t['currently.responsibility']}
            </p>
          </div>

          {/* Core Technical Responsibilities / Bullet Items (7 Grid items) */}
          <div className="mb-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-white/90 font-bold uppercase tracking-widest">
                  {t['currently.skillsTitle']}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-widest uppercase">
                7 CORE RESPONSIBILITIES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 2 }}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all duration-300 shadow-md"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  <span className="text-xs font-mono text-white/90 font-semibold tracking-wide">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Highlight Banner: Website Creation */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-white/[0.03] to-cyan-950/30 border border-emerald-500/30 flex items-start sm:items-center gap-4 mb-8 transition-all duration-300 shadow-xl">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg">
              <Globe className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-0.5">
                KEY EXECUTIVE ACHIEVEMENT
              </span>
              <p className="text-xs sm:text-sm font-mono text-white font-semibold leading-normal">
                {t['currently.highlight']}
              </p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 hidden sm:block shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>

          {/* CTA Link to Neyox Section */}
          <div className="flex justify-end">
            <a
              href="#neyox"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-heading font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all duration-300 group/btn shadow-xl cursor-pointer"
            >
              <span>{t['currently.cta']}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </CardSpotlight>
      </motion.div>

      {/* ── Accompanying Certifications Showcase ── */}
      <div className="pt-8">
        <CertificationsShowcase />
      </div>
    </div>
  );
};

export default AboutSection;
