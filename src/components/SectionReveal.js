import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SectionReveal = ({ id, label, index, className = '', children, ariaLabel }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: index % 2 ? 'right center' : 'left center' });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          end: 'top 34%',
          scrub: 0.65,
        },
      });

      timeline
        .from('[data-section-index]', { autoAlpha: 0, y: 28, duration: 0.35, ease: 'power3.out' }, 0)
        .to(lineRef.current, { scaleX: 1, duration: 0.65, ease: 'none' }, 0.08)
        .from(contentRef.current, {
          autoAlpha: 0,
          x: index % 2 ? 70 : -70,
          y: 48,
          clipPath: index % 2 ? 'inset(0 0 0 14%)' : 'inset(0 14% 0 0)',
          duration: 0.9,
          ease: 'power3.out',
        }, 0.14);
    });
    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section id={id} ref={sectionRef} aria-label={ariaLabel} className={`relative ${className}`}>
      <div className="mb-8 flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
        <span data-section-index className="text-[#78a4ff]">[{String(index).padStart(2, '0')}]</span>
        <div ref={lineRef} className="h-px flex-1 bg-white/20" />
        <span data-section-index>{label}</span>
      </div>
      <div ref={contentRef}>{children}</div>
    </section>
  );
};

export default SectionReveal;
