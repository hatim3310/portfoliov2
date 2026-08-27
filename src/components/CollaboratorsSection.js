import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { translations } from '../data/translations';

const CollaboratorsSection = ({ lang = 'en' }) => {
  const t = translations[lang] || translations.en;

  return (
    <section aria-label="Partenaires et Collaborateurs" className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24 max-w-[1300px] mx-auto select-none">
      {/* SECTION HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-mono tracking-widest uppercase backdrop-blur-md">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t['collaborators.label']}</span>
        </div>
        <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
          {t['collaborators.title']}
        </h2>
        <p className="text-xs sm:text-sm font-mono text-white/70 max-w-xl mx-auto leading-relaxed">
          {t['collaborators.subtitle']}
        </p>
      </motion.div>

      {/* LOGOS CONTAINER */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-12"
      >
        {/* Placeholder Logos - Remplacez par vos balises <img> */}
        <div className="w-32 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/30 font-mono text-xs">LOGO 1</div>
        <div className="w-32 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/30 font-mono text-xs">LOGO 2</div>
        <div className="w-32 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/30 font-mono text-xs">LOGO 3</div>
        <div className="w-32 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/30 font-mono text-xs">LOGO 4</div>
        <div className="w-32 h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/30 font-mono text-xs">LOGO 5</div>
      </motion.div>
    </section>
  );
};

export default CollaboratorsSection;
