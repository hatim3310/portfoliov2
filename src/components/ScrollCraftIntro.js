import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const disciplines = [
  'Product engineering',
  'Creative development',
  'AI systems',
  'Motion direction',
];

const ScrollCraftIntro = ({ lang = 'en' }) => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const lineRef = useRef(null);

  const copy = lang === 'fr'
    ? {
        eyebrow: 'Défilement 01 — approche',
        lead: 'Je transforme des systèmes complexes en expériences',
        accent: 'claires, rapides et mémorables.',
        note: 'Ingénierie, produit et mouvement réunis dans une même direction.',
      }
    : {
        eyebrow: 'Scroll 01 — approach',
        lead: 'I turn complex systems into experiences that feel',
        accent: 'clear, fast and memorable.',
        note: 'Engineering, product and motion moving in one direction.',
      };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: '(min-width: 768px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      ({ conditions }) => {
        const { desktop, reduceMotion } = conditions;

        if (reduceMotion) {
          gsap.set('[data-craft-reveal]', { autoAlpha: 1, y: 0 });
          gsap.set(trackRef.current, { x: 0 });
          gsap.set(lineRef.current, { scaleX: 1 });
          return;
        }

        gsap.set('[data-craft-reveal]', { autoAlpha: 0, y: 56 });
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });

        if (!desktop) {
          const entrance = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          });

          entrance
            .to('[data-craft-reveal]', {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.06,
              ease: 'power3.out',
            })
            .to(lineRef.current, { scaleX: 1, duration: 0.6, ease: 'power2.out' }, 0.12);

          gsap.fromTo(trackRef.current,
            { x: 90 },
            {
              x: () => Math.min(-120, window.innerWidth - trackRef.current.scrollWidth - 24),
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            });
          return;
        }

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=190%',
            pin: stageRef.current,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to('[data-craft-reveal]', {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.07,
            ease: 'power3.out',
          }, 0)
          .to(lineRef.current, { scaleX: 1, duration: 0.8 }, 0.08)
          .to(trackRef.current, {
            x: () => Math.min(0, window.innerWidth - trackRef.current.scrollWidth - 48),
            duration: 1.45,
          }, 0.45)
          .to('[data-craft-copy]', {
            yPercent: -18,
            autoAlpha: 0.18,
            duration: 0.6,
          }, 1.3);
      },
    );

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [lang], revertOnUpdate: true });

  return (
    <section ref={sectionRef} className="scroll-craft relative bg-[#dfe7f3] text-[#080b12]">
      <div ref={stageRef} className="relative min-h-[100dvh] overflow-hidden px-5 py-6 sm:px-10 md:px-14 lg:px-20">
        <div className="mx-auto flex min-h-[calc(100dvh-3rem)] max-w-[1600px] flex-col justify-between">
          <div data-craft-reveal className="flex items-center justify-between border-b border-black/20 pb-4 font-mono text-[10px] uppercase tracking-[0.24em]">
            <span>{copy.eyebrow}</span>
            <span className="hidden tabular-nums sm:inline">2026 / Casablanca</span>
          </div>

          <div data-craft-copy className="my-auto py-12 md:py-16">
            <p data-craft-reveal className="max-w-[13ch] font-heading text-[clamp(2.45rem,7.4vw,8.4rem)] font-black uppercase leading-[0.86] tracking-[-0.06em] text-balance">
              {copy.lead}
            </p>
            <p data-craft-reveal className="ml-[5vw] mt-3 max-w-[12ch] font-serif text-[clamp(2.3rem,7vw,7.8rem)] italic leading-[0.9] tracking-[-0.05em] text-[#285fd1] text-balance sm:ml-[9vw]">
              {copy.accent}
            </p>
          </div>

          <div>
            <div ref={lineRef} className="h-px w-full bg-black/70" />
            <div className="mt-5 flex items-end justify-between gap-8">
              <p data-craft-reveal className="max-w-sm text-sm leading-relaxed text-black/65 md:text-base">{copy.note}</p>
              <span data-craft-reveal className="hidden font-mono text-[10px] uppercase tracking-[0.24em] md:block">↓ keep scrolling</span>
            </div>
          </div>
        </div>

        <div ref={trackRef} aria-hidden="true" className="absolute bottom-[15%] left-[55%] flex w-max gap-3 will-change-transform md:bottom-[12%]">
          {[...disciplines, ...disciplines].map((item, index) => (
            <span key={`${item}-${index}`} className="whitespace-nowrap border border-[#17346f]/25 bg-[#edf3fb]/85 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] backdrop-blur-sm">
              {String((index % disciplines.length) + 1).padStart(2, '0')} — {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollCraftIntro;
