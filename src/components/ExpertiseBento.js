import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { translations } from '../data/translations';

import { svg as reactSvg } from 'thesvg/react';
import { svg as nextSvg } from 'thesvg/nextdotjs';
import { svg as tsSvg } from 'thesvg/typescript';
import { svg as pythonSvg } from 'thesvg/python';
import { svg as tensorflowSvg } from 'thesvg/tensorflow';
import { svg as dockerSvg } from 'thesvg/docker';
import { svg as awsSvg } from 'thesvg/amazon-web-services';
import { svg as figmaSvg } from 'thesvg/figma';
import { svg as gsapSvg } from 'thesvg/gsap';
import { svg as vercelSvg } from 'thesvg/vercel';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SvgItem = ({ rawSvg }) => (
  <div
    className="flex h-7 w-7 items-center justify-center [&>svg]:h-full [&>svg]:w-full [&>svg]:max-h-full [&>svg]:max-w-full"
    dangerouslySetInnerHTML={{ __html: rawSvg }}
  />
);

const dataEN = [
  {
    id: '01', code: 'SYS.WEB', title: 'Full Stack Engineering', category: 'Architecture & scalability',
    desc: 'Modular product systems built around server rendering, typed APIs and dependable data layers. Every choice is made for speed today and maintainability later.',
    tags: ['React 19', 'Next.js 15', 'Node.js', 'TypeScript', 'PostgreSQL'],
    stats: ['99 / 100', '< 1.2s', 'SSR + ISR'], statLabels: ['Lighthouse', 'First paint', 'Rendering'], svgs: [reactSvg, nextSvg, tsSvg],
  },
  {
    id: '02', code: 'SYS.AI', title: 'AI & Data Science', category: 'Intelligent systems',
    desc: 'Applied AI pipelines that connect models to real product workflows: retrieval, tool use, structured outputs, evaluation and observable data processing.',
    tags: ['Python', 'TensorFlow', 'Pandas', 'LLM Agents', 'MCP', 'RAG'],
    stats: ['MCP', 'RAG', '24 / 7'], statLabels: ['Protocol', 'Retrieval', 'Automation'], svgs: [pythonSvg, tensorflowSvg],
  },
  {
    id: '03', code: 'SYS.OPS', title: 'Cloud & DevOps', category: 'Deployment & resilience',
    desc: 'Containerized infrastructure, automated delivery and production monitoring designed to keep releases predictable and services recoverable.',
    tags: ['Docker', 'AWS', 'Vercel', 'CI/CD', 'Redis', 'Linux'],
    stats: ['0', '99.9%', '< 8m'], statLabels: ['Downtime goal', 'Availability', 'Deploy cycle'], svgs: [dockerSvg, awsSvg, vercelSvg],
  },
  {
    id: '04', code: 'SYS.MOTION', title: 'UI/UX & Motion', category: 'Digital experiences',
    desc: 'Visual systems where hierarchy, interaction and motion share one language. Animation clarifies state, directs attention and gives the interface rhythm.',
    tags: ['Figma', 'GSAP', 'ScrollTrigger', 'Design Systems', 'Accessibility'],
    stats: ['60', 'AA', '100%'], statLabels: ['FPS target', 'Contrast', 'Responsive'], svgs: [figmaSvg, gsapSvg],
  },
];

const dataFR = [
  {
    ...dataEN[0], title: 'Ingénierie Full Stack', category: 'Architecture & évolutivité',
    desc: 'Des produits modulaires fondés sur le rendu serveur, des API typées et des couches de données fiables. Chaque choix sert la vitesse aujourd’hui et la maintenabilité demain.',
  },
  {
    ...dataEN[1], title: 'IA & Data Science', category: 'Systèmes intelligents',
    desc: 'Des pipelines IA appliqués aux vrais usages produit : recherche, outils, sorties structurées, évaluation et traitement de données observable.',
  },
  {
    ...dataEN[2], title: 'Cloud & DevOps', category: 'Déploiement & résilience',
    desc: 'Infrastructure conteneurisée, livraison automatisée et monitoring de production pour rendre les releases prévisibles et les services récupérables.',
  },
  {
    ...dataEN[3], title: 'UI/UX & Motion', category: 'Expériences numériques',
    desc: 'Des systèmes visuels où hiérarchie, interaction et mouvement parlent le même langage. L’animation clarifie, guide l’attention et donne du rythme.',
  },
];

const ExpertiseBento = ({ lang = 'en' }) => {
  const t = translations[lang] || translations.en;
  const items = lang === 'fr' ? dataFR : dataEN;
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const panelsRef = useRef([]);
  const progressRef = useRef(null);
  const triggerRef = useRef(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: '(min-width: 1024px) and (min-height: 680px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      ({ conditions }) => {
        triggerRef.current = null;
        const panels = panelsRef.current.filter(Boolean);
        if (!conditions.desktop || conditions.reduceMotion) {
          gsap.set(panels, {
            position: 'relative',
            inset: 'auto',
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            marginBottom: '1.5rem',
          });
          gsap.set(progressRef.current, { display: 'none' });
          return;
        }

        gsap.set(panels, { autoAlpha: 0, yPercent: 18, scale: 0.96 });
        gsap.set(panels[0], { autoAlpha: 1, yPercent: 0, scale: 1 });
        gsap.set(progressRef.current, { scaleY: 0, transformOrigin: 'top center' });

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: `+=${items.length * 92}%`,
            pin: stageRef.current,
            scrub: 0.75,
            invalidateOnRefresh: true,
            onRefresh: (self) => { triggerRef.current = self; },
            onUpdate: (self) => {
              triggerRef.current = self;
              const next = Math.min(items.length - 1, Math.floor(self.progress * items.length));
              if (next !== activeRef.current) {
                activeRef.current = next;
                setActiveIndex(next);
              }
            },
          },
        });

        timeline.to(progressRef.current, { scaleY: 1, duration: items.length }, 0);

        panels.forEach((panel, index) => {
          if (index === 0) return;
          const previous = panels[index - 1];
          timeline
            .to(previous, { autoAlpha: 0, yPercent: -14, scale: 0.97, duration: 0.48 }, index - 0.48)
            .to(panel, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.52 }, index - 0.45)
            .from(panel.querySelectorAll('[data-matrix-reveal]'), {
              y: 30, autoAlpha: 0, stagger: 0.04, duration: 0.34, ease: 'power3.out',
            }, index - 0.25);
        });

        return () => { triggerRef.current = null; };
      },
    );

    return () => mm.revert();
  }, { scope: rootRef, dependencies: [lang], revertOnUpdate: true });

  const goToCapability = (index) => {
    const trigger = triggerRef.current;
    if (trigger) {
      const progress = index / items.length + 0.02;
      window.scrollTo({
        top: trigger.start + (trigger.end - trigger.start) * progress,
        behavior: 'smooth',
      });
      return;
    }

    panelsRef.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div ref={rootRef} className="relative w-full bg-[#07090d] lg:min-h-[100dvh]">
      <div ref={stageRef} className="relative mx-auto min-h-[100dvh] max-w-[1540px] overflow-hidden px-1 py-8 lg:px-0 lg:py-10">
        <div className="grid min-h-[calc(100dvh-5rem)] grid-cols-1 gap-10 lg:grid-cols-[minmax(19rem,0.78fr)_minmax(0,1.52fr)] lg:gap-12 xl:gap-16">
          <aside className="relative z-20 flex flex-col justify-between lg:py-4">
            <div>
              <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.24em] text-[#78a4ff]">03 / capability system</span>
              <h2 className="max-w-[10ch] text-balance font-heading text-[clamp(2.75rem,3.4vw,4rem)] font-black uppercase leading-[0.86] tracking-[-0.06em] text-white">
                {t['expertise.title']}
              </h2>
              <p className="mt-7 max-w-[32rem] text-sm leading-relaxed text-[#9aa5b5]">
                {lang === 'fr' ? 'Quatre couches, un même système de production.' : 'Four layers, one connected production system.'}
              </p>
            </div>

            <nav aria-label="Capability matrix" className="mt-12 grid grid-cols-2 border-t border-white/15 lg:mt-0 lg:block">
              {items.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => goToCapability(index)}
                  aria-current={activeIndex === index ? 'step' : undefined}
                  className={`matrix-nav-row group flex w-full items-center justify-between border-b border-white/15 px-1 py-4 text-left font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#78a4ff] ${activeIndex === index ? 'text-white' : 'text-white/40 hover:text-white/75'}`}
                >
                  <span>{item.id} / {item.code}</span>
                  <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'scale-100 bg-[#78a4ff] shadow-[0_0_12px_#5b8cff]' : 'scale-50 bg-white/30 group-hover:scale-75'}`} />
                </button>
              ))}
            </nav>
          </aside>

          <div className="relative lg:min-h-[calc(100dvh-5rem)]">
            <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 lg:block">
              <div ref={progressRef} className="h-full w-px bg-[#78a4ff]" />
            </div>

            {items.map((item, index) => (
              <article
                key={item.id}
                ref={(element) => { panelsRef.current[index] = element; }}
                className="relative mb-6 min-h-0 overflow-hidden border border-white/15 bg-[#0b0f18] p-5 sm:p-6 lg:absolute lg:inset-y-4 lg:left-8 lg:right-0 lg:mb-0 lg:min-h-0 lg:p-8 xl:p-10"
              >
                <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#2f6bff]/10 blur-[90px]" />
                <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(120,164,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(120,164,255,.09)_1px,transparent_1px)] [background-size:4rem_4rem]" />

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <header data-matrix-reveal className="flex items-start justify-between gap-5 border-b border-white/15 pb-5">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#78a4ff]">{item.code}</span>
                        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#7f8a9a]">{item.category}</p>
                      </div>
                      <div className="flex gap-2">
                        {item.svgs.map((svg, iconIndex) => (
                          <div key={iconIndex} className="border border-white/15 bg-white/5 p-2.5 text-white grayscale transition hover:border-[#78a4ff]/50 hover:grayscale-0">
                            <SvgItem rawSvg={svg} />
                          </div>
                        ))}
                      </div>
                    </header>

                    <div className="py-8 xl:py-10">
                      <span data-matrix-reveal className="block font-mono text-[clamp(3.8rem,6vw,6.8rem)] leading-[0.72] tracking-[-0.08em] text-white/10">{item.id}</span>
                      <h3 data-matrix-reveal className="mt-2 max-w-[12ch] text-balance font-heading text-[clamp(2.35rem,3.9vw,4.6rem)] font-black uppercase leading-[0.9] tracking-[-0.055em] text-white">
                        {item.title}
                      </h3>
                      <p data-matrix-reveal className="mt-6 max-w-[60ch] text-sm leading-7 text-[#aab4c3] md:text-[15px]">{item.desc}</p>
                    </div>
                  </div>

                  <div>
                    <div className="grid grid-cols-3 border-y border-white/15">
                      {item.stats.map((stat, statIndex) => (
                        <div data-matrix-reveal key={stat} className="border-r border-white/15 px-3 py-4 last:border-r-0 md:px-5">
                          <strong className="block break-words font-mono text-sm font-medium text-white sm:text-lg md:text-2xl">{stat}</strong>
                          <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.16em] text-[#728094] md:text-[9px]">{item.statLabels[statIndex]}</span>
                        </div>
                      ))}
                    </div>
                    <div data-matrix-reveal className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#8d99aa]">
                      {item.tags.map((tag) => <span key={tag}>+ {tag}</span>)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseBento;
