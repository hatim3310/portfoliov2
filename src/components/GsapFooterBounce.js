import React, { useRef, useState } from 'react';
import { Copy, Check, Github, Linkedin, Instagram, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Waves from './Waves';
import { translations } from '../data/translations';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GsapFooterBounce = ({ lang = 'en' }) => {
  const footerRef = useRef(null);
  const titleRef = useRef(null);
  const bounceItemsRef = useRef([]);
  const giantTextRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const t = translations[lang] || translations.en;

  const copyEmail = () => {
    navigator.clipboard.writeText('hatimlamarti3@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  useGSAP(() => {
    const el = footerRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([giantTextRef.current, titleRef.current, ...bounceItemsRef.current.filter(Boolean)], { clearProps: 'all' });
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {

    // Timeline for footer bounce entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse'
      }
    });

    // 1. Giant text bounce & expansion
    tl.fromTo(giantTextRef.current, 
      { y: 100, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'bounce.out' },
      0
    );

    // 2. Title and heading spring reveal
    tl.fromTo(titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      0.2
    );

    // 3. Staggered bounce for CTA buttons and social badges
    const validItems = bounceItemsRef.current.filter(Boolean);
    tl.fromTo(validItems,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(2)' },
      0.4
    );

    });

    return () => mm.revert();

  }, { scope: footerRef });

  return (
    <footer 
      id="contact" 
      ref={footerRef}
      aria-label="Contact — Hatim Lamarti" 
      className="relative overflow-hidden border-t border-white/10 bg-[#0A0A0C] pb-8 pt-16 text-white sm:pb-12 sm:pt-24"
    >
      {/* Waves Interactive Background */}
      <Waves
        lineColor="rgba(255, 255, 255, 0.15)"
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
        className="pointer-events-none opacity-60"
      />

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* TOP STATUS PILL */}
        <div 
          ref={(el) => (bounceItemsRef.current[0] = el)} 
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#121316] border border-white/20 backdrop-blur-xl mb-12 shadow-xl"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#78a4ff] animate-pulse" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">
            {t['footer.label']}
          </span>
        </div>

        {/* FOOTER MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Main Title & Subtitle */}
          <div className="lg:col-span-8" ref={titleRef}>
            <h2 className="mb-6 text-balance font-heading text-[clamp(2.5rem,9vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tighter text-white">
              {t['footer.title']}
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
              {t['footer.subtitle']}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Copy Email Button */}
            <div ref={(el) => (bounceItemsRef.current[1] = el)}>
              <button
                onClick={copyEmail}
                className="group flex w-full min-w-0 items-center justify-between gap-3 rounded-2xl border border-white/20 bg-[#121316] p-3 text-left shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-[#78a4ff]/60 sm:gap-4 sm:p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="shrink-0 rounded-xl bg-white/10 p-2.5 text-[#78a4ff] transition-colors group-hover:bg-[#78a4ff] group-hover:text-[#07101f]">
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0">
                    <span className="block break-all font-mono text-[9px] uppercase tracking-wider text-white/70 sm:text-[10px]">
                      hatimlamarti3@gmail.com
                    </span>
                    <span className="font-heading font-bold text-sm text-white group-hover:text-[#b6cbff] transition-colors">
                      {copied ? t['footer.copied'] : t['footer.copyEmail']}
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
                  {copied ? <Check size={16} className="text-[#78a4ff]" /> : <Copy size={16} />}
                </div>
              </button>
            </div>

            {/* Social Links */}
            <div 
              ref={(el) => (bounceItemsRef.current[2] = el)}
              className="flex flex-wrap items-center gap-3 sm:flex-nowrap"
            >
              <a
                href="https://github.com/hatim3310"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#121316] border border-white/15 hover:border-white/30 text-white font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all shadow-xl"
              >
                <Github size={16} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/lamartihatim/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#121316] border border-white/15 hover:border-white/30 text-white font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all shadow-xl"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>

              <a
                href="https://www.instagram.com/laamarti_hatim/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-[#121316] border border-white/15 hover:border-white/30 text-white hover:bg-white hover:text-black transition-all shadow-xl"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* GIANT BOUNCING WORDMARK */}
        <div 
          ref={giantTextRef}
          className="w-full overflow-hidden py-4 border-t border-b border-white/10 my-8 text-center select-none"
        >
          <span className="font-heading font-black text-[12vw] leading-none uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-800 block">
            HATIM LAMARTI
          </span>
        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50 pt-4">
          <span>{t['footer.rights']}</span>
          <span>{t['footer.studio']}</span>
        </div>

      </div>
    </footer>
  );
};

export default GsapFooterBounce;
