import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const images = [
  { src: '/assets/project-bde-hub.jpg', alt: 'BDE EFET platform dashboard', label: 'Platform / 01', className: '-left-[12%] top-[15%] w-[62vw] max-w-[25rem] md:left-[4%] md:top-[12%] md:w-[30vw]' },
  { src: '/assets/project-f1-velocity.jpg', alt: 'F1 Velocity telemetry interface', label: 'Telemetry / 02', className: '-right-[16%] top-[28%] w-[58vw] max-w-[20rem] md:right-[5%] md:top-[8%] md:w-[23vw]' },
  { src: '/assets/project-datainsight.jpg', alt: 'DataInsight intelligent pipeline', label: 'Intelligence / 03', className: 'bottom-[11%] left-[8%] w-[68vw] max-w-[23rem] md:bottom-[8%] md:left-[28%] md:w-[27vw]' },
];

const ManifestoQuoteSection = ({ lang = 'en' }) => {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const imageRefs = useRef([]);
  const lineRefs = useRef([]);
  const counterRef = useRef(null);

  const lines = lang === 'fr'
    ? [
        { text: 'Chaque projet est', accent: false },
        { text: 'une occasion de', accent: false },
        { text: 'comprendre, essayer', accent: true },
        { text: 'et dépasser mes limites.', accent: false },
      ]
    : [
        { text: 'Every project is', accent: false },
        { text: 'an opportunity to', accent: false },
        { text: 'learn, experiment,', accent: true },
        { text: 'and push my boundaries.', accent: false },
      ];

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: '(min-width: 768px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      ({ conditions }) => {
        const lineElements = lineRefs.current.filter(Boolean);
        const imageElements = imageRefs.current.filter(Boolean);

        if (conditions.reduceMotion) {
          gsap.set([...lineElements, ...imageElements], { clearProps: 'all' });
          return;
        }

        if (!conditions.desktop) {
          gsap.set(lineElements, { autoAlpha: 0, y: 32 });
          gsap.set(imageElements, { autoAlpha: 0, scale: 0.88, rotate: (index) => index % 2 ? 5 : -5 });

          const entrance = gsap.timeline({
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          });

          entrance
            .to(imageElements, { autoAlpha: 0.36, scale: 1, rotate: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' })
            .to(lineElements, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.075, ease: 'power3.out' }, 0.08);

          imageElements.forEach((image, index) => {
            gsap.to(image, {
              yPercent: index % 2 ? -9 : 9,
              ease: 'none',
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.65,
              },
            });
          });
          return;
        }

        gsap.set(lineElements, { autoAlpha: 0.1 });
        gsap.set(imageElements, { autoAlpha: 0, scale: 0.78, rotate: (i) => i % 2 ? 7 : -7 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: '+=260%',
            pin: stageRef.current,
            scrub: 0.8,
          },
        });

        lineElements.forEach((line, index) => {
          timeline
            .to(line, { autoAlpha: 1, x: index % 2 ? 0 : 0, duration: 0.42, ease: 'none' }, index * 0.36)
            .from(line, { xPercent: index % 2 ? 12 : -12, duration: 0.42, ease: 'power3.out' }, index * 0.36);
        });

        imageElements.forEach((image, index) => {
          timeline
            .to(image, { autoAlpha: 0.72, scale: 1, rotate: 0, duration: 0.62, ease: 'power3.out' }, 0.22 + index * 0.46)
            .to(image, { yPercent: index % 2 ? -16 : 16, xPercent: index - 1, duration: 1.1, ease: 'none' }, 0.7 + index * 0.25);
        });

        timeline
          .to(counterRef.current, { '--manifest-progress': '100%', duration: 1.8, ease: 'none' }, 0)
          .to(imageElements, { autoAlpha: 0.18, scale: 1.08, duration: 0.5 }, 1.55)
          .to(lineElements, { letterSpacing: '-0.065em', duration: 0.5, ease: 'none' }, 1.55);
      },
    );

    return () => mm.revert();
  }, { scope: rootRef, dependencies: [lang], revertOnUpdate: true });

  return (
    <section ref={rootRef} className="relative bg-[#07090d] text-white">
      <div ref={stageRef} className="relative min-h-[100dvh] overflow-hidden px-5 py-6 sm:px-10 md:px-14 lg:px-20">
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(120,164,255,.15)_1px,transparent_1px)] [background-size:2rem_2rem] opacity-30" />
        <header className="relative z-30 flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[8px] uppercase tracking-[0.18em] text-white/50 sm:text-[9px] sm:tracking-[0.22em]">
          <span>02 / working principle</span>
          <span className="hidden sm:inline">{lang === 'fr' ? 'Le processus crée la forme' : 'Process creates form'}</span>
        </header>

        {images.map((image, index) => (
          <figure
            key={image.src}
            ref={(element) => { imageRefs.current[index] = element; }}
            className={`pointer-events-none absolute z-10 overflow-hidden border border-[#78a4ff]/25 bg-[#0b0f18] ${image.className}`}
          >
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover saturate-0 contrast-125" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[#07090d]/75 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
              {image.label}
            </figcaption>
          </figure>
        ))}

        <div className="relative z-20 flex min-h-[calc(100dvh-6rem)] items-center justify-center py-20 sm:py-16">
          <h2 className="w-full max-w-[1500px] text-center">
            {lines.map((line, index) => (
              <span
                key={line.text}
                ref={(element) => { lineRefs.current[index] = element; }}
                className={`block text-balance text-[clamp(2.25rem,7.7vw,9rem)] leading-[0.9] tracking-[-0.055em] ${line.accent ? 'font-serif italic text-[#78a4ff]' : 'font-heading font-black uppercase text-white'}`}
              >
                {line.text}
              </span>
            ))}
          </h2>
        </div>

        <div className="absolute bottom-6 left-5 right-5 z-30 flex items-end gap-5 sm:left-10 sm:right-10 md:left-14 md:right-14 lg:left-20 lg:right-20">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">000</span>
          <div ref={counterRef} className="manifest-progress relative h-px flex-1 bg-white/15 before:absolute before:inset-y-0 before:left-0 before:w-[var(--manifest-progress,0%)] before:bg-[#78a4ff]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">100</span>
        </div>
      </div>
    </section>
  );
};

export default ManifestoQuoteSection;
