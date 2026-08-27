import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import Lenis from 'lenis';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AuroraBackground from './components/AuroraBackground';
import ScrollProgress from './components/ScrollProgress';
import ScrollyVideoWorks from './components/ScrollyVideoWorks';
import ScrollCraftIntro from './components/ScrollCraftIntro';
import HeroSection from './components/HeroSection';
import SectionReveal from './components/SectionReveal';

import ManifestoQuoteSection from './components/ManifestoQuoteSection';
import ExpertiseBento from './components/ExpertiseBento';
import GsapSwipeSlider from './components/GsapSwipeSlider';
import CertificationsShowcase from './components/CertificationsShowcase';
import FaqSection from './components/FaqSection';
import GsapFooterBounce from './components/GsapFooterBounce';
import { projects } from './data/portfolioData';
import { translations } from './data/translations';

import Preloader from './components/Preloader';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio-lang') || 'en');
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const t = translations[lang] || translations.en;

  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'fr' : 'en';
    setLang(nextLang);
    localStorage.setItem('portfolio-lang', nextLang);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateRaf);
    };
  }, []);

  return (
    <>
      <Analytics />
      {isPreloaderActive && (
        <Preloader onComplete={() => setIsPreloaderActive(false)} />
      )}
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="min-h-screen text-white/90 font-body cursor-default" style={{ overflowX: 'clip' }}>
        <div className="noise-overlay" />
        <AuroraBackground />
        <ScrollProgress />
        <main id="main-content" role="main">

        <HeroSection lang={lang} t={t} onToggleLang={toggleLang} />

        <ScrollCraftIntro lang={lang} />

        {/* ═══════════════════════════════════
            SELECTED WORKS — ScrollyTelling Video Scroll (Includes NEYOX)
        ═══════════════════════════════════ */}
        <section id="work" aria-label="Projets réalisés par Hatim Lamarti">
          <ScrollyVideoWorks projects={projects} lang={lang} />
        </section>

        {/* ═══════════════════════════════════
            MANIFESTO & PHILOSOPHY QUOTE (Inspired by lukebaffait.fr & CircularText)
        ═══════════════════════════════════ */}
        <ManifestoQuoteSection lang={lang} />



        {/* ═══════════════════════════════════
            NEYOX LEADERSHIP — Co-Founder & Tech Partner Experience
        ═══════════════════════════════════ */}
        <section id="expertise" aria-label="Architectural capability matrix" className="w-full px-4 sm:px-8 md:px-12 lg:px-20">
          <ExpertiseBento lang={lang} />
        </section>

        {/* ═══════════════════════════════════
            GSAP SWIPE SLIDER — Core Principles & Highlights
        ═══════════════════════════════════ */}
        <section id="principles" aria-label="Principes directeurs et innovations" className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <GsapSwipeSlider />
        </section>

        {/* ═══════════════════════════════════
            ABOUT & CERTIFICATIONS
        ═══════════════════════════════════ */}
        <section id="about" aria-label="À propos et accréditations" className="mx-auto max-w-[1400px] px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-36 lg:px-20">
          <CertificationsShowcase />
        </section>

        {/* ═══════════════════════════════════
            FAQ — Model Context Protocol, AI & Architecture
        ═══════════════════════════════════ */}
        <SectionReveal id="faq" index={7} label="FAQ / MCP" ariaLabel="Questions fréquentes" className="mx-auto max-w-[1400px] px-6 pb-28 pt-16 md:px-12 md:pb-36 md:pt-20 lg:px-20">
          <FaqSection lang={lang} />
        </SectionReveal>

        </main>

        {/* ═══════════════════════════════════
            FOOTER / CONTACT — GSAP BOUNCE REVEAL
        ═══════════════════════════════════ */}
        <GsapFooterBounce lang={lang} />
      </div>
    </>
  );
}
