import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroSection = ({ lang = 'en', t, onToggleLang }) => {
  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  const copyRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: '(min-width: 768px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      ({ conditions }) => {
        if (conditions.reduceMotion) {
          gsap.set('[data-hero-reveal]', { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' });
          return;
        }

        const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
        intro
          .from('[data-hero-word]', {
            yPercent: 115,
            rotate: 2,
            duration: 1.15,
            stagger: 0.1,
          })
          .from(mediaRef.current, {
            scale: 0.68,
            rotate: -7,
            autoAlpha: 0,
            clipPath: 'inset(22% 18% 22% 18% round 44%)',
            duration: 1.25,
          }, 0.12)
          .from('[data-hero-reveal]', {
            y: 24,
            autoAlpha: 0,
            duration: 0.75,
            stagger: 0.06,
          }, 0.42);

        const scroll = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        });

        scroll
          .to(mediaRef.current, { yPercent: 24, scale: 1.15, rotate: 4, ease: 'none' }, 0)
          .to('[data-hero-top]', { xPercent: -9, ease: 'none' }, 0)
          .to('[data-hero-bottom]', { xPercent: 9, ease: 'none' }, 0)
          .to(copyRef.current, { yPercent: -28, autoAlpha: 0, ease: 'none' }, 0.2);
      },
    );

    return () => mm.revert();
  }, { scope: heroRef });

  return (
    <section
      id="home"
      ref={heroRef}
      aria-label="Accueil — Hatim Lamarti, développeur créatif à Casablanca"
      className="hero-grid relative min-h-[42rem] overflow-hidden bg-[#07090d] px-5 py-5 text-[#f2f6ff] sm:min-h-[44rem] sm:px-8 md:min-h-[100dvh] md:px-12"
    >
      <div className="hero-grid-lines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-[48%] h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2f6bff]/10 blur-[130px]" />

      <header data-hero-reveal className="relative z-30 flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.2em] md:text-xs">
        <a href="#home" className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6ea0ff]">
          <img src="/assets/images/logo_hatim.svg" alt="" className="h-8 w-8 brightness-0 invert transition-transform duration-300 group-hover:rotate-12" />
          <span>Hatim Lamarti</span>
        </a>
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 md:flex">
          <a href="#work" className="hero-nav-link">{t['nav.work']}</a>
          <a href="#expertise" className="hero-nav-link">{t['nav.services']}</a>
          <a href="#principles" className="hero-nav-link">{t['nav.principles']}</a>
          <a href="#about" className="hero-nav-link">{t['nav.about']}</a>
          <a href="#contact" className="hero-nav-link">{t['nav.contact']}</a>
        </nav>
      </header>

      <div className="absolute inset-x-5 top-[12%] z-20 overflow-hidden sm:inset-x-8 md:inset-x-12 md:top-[11%]">
        <h1 data-hero-top className="whitespace-nowrap font-heading text-[clamp(3.1rem,11.6vw,12.5rem)] font-black uppercase leading-[0.76] tracking-[-0.075em]">
          <span data-hero-word className="inline-block">Full-stack</span>
        </h1>
      </div>

      <div
        ref={mediaRef}
        className="absolute left-1/2 top-[47%] z-10 h-[34vh] min-h-[14rem] w-[82vw] max-w-[46rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[46%_54%_48%_52%/56%_42%_58%_44%] border border-[#75a3ff]/40 bg-[#0b1020] shadow-[0_0_90px_rgba(47,107,255,0.22)] will-change-transform sm:h-[42vh] sm:w-[72vw] md:top-[48%] md:h-[55vh] md:w-[44vw]"
      >
        <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true" className="h-full w-full scale-110 object-cover opacity-80 saturate-0 contrast-125">
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_38%,rgba(80,137,255,0.05),rgba(4,8,20,0.72)_78%)]" />
        <div className="absolute inset-0 mix-blend-color bg-[#2f6bff]/35" />
      </div>

      <div ref={copyRef} className="absolute inset-x-5 bottom-[20%] z-30 grid grid-cols-2 items-end gap-4 sm:inset-x-8 sm:gap-6 md:inset-x-12 md:bottom-[21%] md:grid-cols-12">
        <div data-hero-reveal className="col-span-1 md:col-span-4">
          <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.22em] text-[#78a4ff]">{lang === 'fr' ? 'À propos' : 'About'}</span>
          <p className="max-w-[34rem] text-[11px] font-medium uppercase leading-relaxed tracking-[0.08em] text-white/70 md:text-xs">
            {lang === 'fr'
              ? 'Je conçois des produits numériques expressifs où ingénierie, intelligence artificielle et mouvement travaillent ensemble.'
              : 'I build expressive digital products where engineering, artificial intelligence and motion work as one system.'}
          </p>
        </div>
        <div data-hero-reveal className="col-span-1 text-right font-mono text-[8px] uppercase leading-5 tracking-[0.13em] text-white/60 sm:text-[9px] sm:leading-6 sm:tracking-[0.18em] md:col-span-3 md:col-start-10">
          <p>Casablanca, MA</p>
          <p>{lang === 'fr' ? 'Disponible en freelance' : 'Available for freelance'}</p>
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-[5%] z-20 overflow-hidden sm:inset-x-8 md:inset-x-12">
        <div data-hero-bottom className="flex items-end justify-between gap-4">
          <h2 className="whitespace-nowrap font-heading text-[clamp(3.1rem,11.6vw,12.5rem)] font-black uppercase leading-[0.76] tracking-[-0.075em]">
            <span data-hero-word className="inline-block">Engineer</span>
          </h2>
          <button
            data-hero-reveal
            onClick={onToggleLang}
            className="mb-1 shrink-0 border border-white/25 bg-white/5 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] backdrop-blur-md transition-colors hover:border-[#78a4ff] hover:text-[#9bbaff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#78a4ff] md:mb-3"
          >
            {lang === 'fr' ? 'FR / EN' : 'EN / FR'}
          </button>
        </div>
      </div>

      <a data-hero-reveal href="#work" className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/70 lg:flex">
        <span className="h-px w-10 bg-[#78a4ff]" /> Scroll to work
      </a>
    </section>
  );
};

export default HeroSection;
