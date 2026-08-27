import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Cpu, Brain, Database, ArrowDown } from 'lucide-react';
import CardSpotlight from './ui/CardSpotlight';
import { translations } from '../data/translations';

const rolesData = [
  {
    key: 'r1',
    id: '01',
    icon: Rocket,
    titleKey: 'roles.r1.title',
    descKey: 'roles.r1.desc',
    accentColor: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'group-hover:border-emerald-500/40',
    iconColor: 'text-emerald-400',
    badge: 'VENTURE & LEADERSHIP'
  },
  {
    key: 'r2',
    id: '02',
    icon: Cpu,
    titleKey: 'roles.r2.title',
    descKey: 'roles.r2.desc',
    accentColor: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'group-hover:border-cyan-500/40',
    iconColor: 'text-cyan-400',
    badge: 'FULL STACK ARCHITECTURE'
  },
  {
    key: 'r3',
    id: '03',
    icon: Brain,
    titleKey: 'roles.r3.title',
    descKey: 'roles.r3.desc',
    accentColor: 'from-purple-500/20 to-pink-500/10',
    borderColor: 'group-hover:border-purple-500/40',
    iconColor: 'text-purple-400',
    badge: 'INTELLIGENT AGENTS & ML'
  },
  {
    key: 'r4',
    id: '04',
    icon: Database,
    titleKey: 'roles.r4.title',
    descKey: 'roles.r4.desc',
    accentColor: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'group-hover:border-amber-500/40',
    iconColor: 'text-amber-400',
    badge: 'DATA PIPELINES & PRODUCTS'
  }
];

const MyRolesSection = ({ lang = 'en' }) => {
  const t = translations[lang] || translations.en;

  return (
    <div className="space-y-12">
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
            <span className="text-xs font-mono text-white/70 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              02.0 // {t['roles.label']}
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase text-white">
              {t['roles.title']}
            </h2>
          </div>
          <p className="text-sm font-mono text-white/70 max-w-md leading-relaxed">
            {t['roles.subtitle']}
          </p>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-emerald-500/40 via-white/10 to-transparent" />
      </motion.div>

      {/* ROLES FLOW SEQUENCE */}
      <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
        {rolesData.map((role, idx) => {
          const Icon = role.icon;
          const isLast = idx === rolesData.length - 1;

          return (
            <React.Fragment key={role.key}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full relative group"
              >
                {/* Background Ambient Glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${role.accentColor} rounded-3xl blur-xl opacity-40 group-hover:opacity-80 transition duration-500 pointer-events-none`} />

                <CardSpotlight className={`p-8 sm:p-10 rounded-3xl bg-[#0A0A0C]/90 border border-white/10 ${role.borderColor} backdrop-blur-2xl relative z-10 transition-all duration-300 shadow-2xl`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    {/* Left: Step Number + Icon + Role Title */}
                    <div className="flex items-start sm:items-center gap-6">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-xl">
                          <Icon className="w-7 h-7" />
                        </div>
                        <span className="absolute -top-2 -left-2 px-2.5 py-0.5 rounded-full bg-[#0A0A0C] border border-emerald-500/30 font-mono text-[10px] text-emerald-400 font-bold shadow-[0_0_8px_rgba(52,211,153,0.3)]">
                          {role.id}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-white/70 font-bold tracking-widest uppercase block">
                          {role.badge}
                        </span>
                        <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight uppercase group-hover:text-emerald-400 transition-colors duration-300">
                          {t[role.titleKey]}
                        </h3>
                      </div>
                    </div>

                    {/* Right: Description Pitch */}
                    <div className="sm:text-right border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
                      <p className="text-sm sm:text-base font-mono text-white/80 font-semibold tracking-wide leading-relaxed">
                        {t[role.descKey]}
                      </p>
                    </div>
                  </div>
                </CardSpotlight>
              </motion.div>

              {/* Downward Connector Arrow (↓) */}
              {!isLast && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 + 0.05 }}
                  className="flex flex-col items-center my-1"
                >
                  <div className="w-[2px] h-8 bg-gradient-to-b from-white/20 via-emerald-400 to-white/20 animate-pulse" />
                  <div className="w-10 h-10 rounded-full bg-[#121316] border border-emerald-500/40 backdrop-blur-md flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] group">
                    <ArrowDown className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="w-[2px] h-8 bg-gradient-to-b from-white/20 via-emerald-400 to-white/20 animate-pulse" />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default MyRolesSection;
