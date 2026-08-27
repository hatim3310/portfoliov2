import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const slides = [
  {
    id: '01', category: 'Web architecture', title: 'Systems before screens',
    description: 'Structure the data, rendering and component boundaries first. The interface becomes faster to build because the foundation is already clear.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'], stat: '99 / 100', project: 'BDE EFET HUB',
    image: '/assets/images/projects/bde_full.png', alt: 'BDE EFET student platform homepage',
  },
  {
    id: '02', category: 'AI integration', title: 'Useful intelligence, not decoration',
    description: 'Connect models to trusted context, precise tools and measurable outcomes. Every AI feature must shorten a task or improve a decision.',
    tags: ['MCP', 'Claude', 'Vector RAG'], stat: 'Tool-aware', project: 'DATAINSIGHT',
    image: '/assets/project-datainsight.jpg', alt: 'DataInsight neural data pipeline interface',
  },
  {
    id: '03', category: 'Data visualization', title: 'Complex data needs a point of view',
    description: 'A dashboard is not a storage room for charts. It is a guided sequence that reveals what changed, why it matters and what to do next.',
    tags: ['D3.js', 'Python', 'Realtime'], stat: '< 80ms', project: 'F1 VELOCITY',
    image: '/assets/images/projects/f1analytics.png', alt: 'F1 Velocity live telemetry dashboard',
  },
  {
    id: '04', category: 'Motion direction', title: 'Motion should explain the interface',
    description: 'Transitions communicate hierarchy, causality and progress. They are tuned for rhythm and restraint, with a reduced-motion path built in.',
    tags: ['GSAP', 'ScrollTrigger', 'A11y'], stat: '60 FPS', project: 'NEYOX',
    image: '/assets/images/projects/neyox_agency.png', alt: 'Neyox system metrics dashboard presented on a laptop',
  },
];

const GsapSwipeSlider = () => {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const triggerRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: '(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      ({ conditions }) => {
        triggerRef.current = null;
        const cards = gsap.utils.toArray('[data-showcase-card]');
        if (conditions.reduceMotion) return;

        if (!conditions.desktop) {
          cards.forEach((card) => {
            const image = card.querySelector('img');
            gsap.from(card.querySelectorAll('[data-showcase-reveal]'), {
              y: 28,
              autoAlpha: 0,
              stagger: 0.055,
              duration: 0.55,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 86%',
                toggleActions: 'play none none reverse',
              },
            });
            gsap.fromTo(image,
              { scale: 1.08, yPercent: -2 },
              {
                scale: 1,
                yPercent: 2,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.65,
                },
              });
          });
          return;
        }

        const distance = () => Math.max(0, trackRef.current.scrollWidth - stageRef.current.clientWidth);
        const tween = gsap.to(trackRef.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 0.7}`,
            pin: stageRef.current,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onRefresh: (self) => { triggerRef.current = self; },
            onUpdate: (self) => {
              triggerRef.current = self;
              const index = Math.min(slides.length - 1, Math.round(self.progress * (slides.length - 1)));
              if (index !== activeRef.current) {
                activeRef.current = index;
                setActiveIndex(index);
              }
              gsap.set(progressRef.current, { scaleX: self.progress, transformOrigin: 'left center' });
            },
          },
        });

        cards.forEach((card) => {
          gsap.from(card.querySelectorAll('[data-showcase-reveal]'), {
            y: 48,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 0.45,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: 'left 74%',
              toggleActions: 'play none none reverse',
            },
          });

          const image = card.querySelector('img');
          gsap.fromTo(image,
            { scale: 1.08, xPercent: -2 },
            {
              scale: 1,
              xPercent: 2,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            });
        });

        return () => { triggerRef.current = null; };
      },
    );
    return () => mm.revert();
  }, { scope: rootRef });

  const goToSlide = (index) => {
    const trigger = triggerRef.current;
    if (trigger) {
      const progress = index / (slides.length - 1);
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: 'smooth' });
      return;
    }

    const card = cardsRef.current[index];
    if (card && trackRef.current) {
      trackRef.current.scrollTo({ left: card.offsetLeft - trackRef.current.offsetLeft, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const handleTrackScroll = () => {
    if (triggerRef.current || !trackRef.current) return;
    const currentScroll = trackRef.current.scrollLeft;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const distance = Math.abs(card.offsetLeft - trackRef.current.offsetLeft - currentScroll);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeRef.current) {
      activeRef.current = closestIndex;
      setActiveIndex(closestIndex);
    }
  };

  return (
    <div ref={rootRef} className="relative -mx-6 md:-mx-12 lg:-mx-20">
      <div ref={stageRef} className="relative min-h-[100dvh] overflow-hidden bg-[#080b11] px-6 py-8 md:px-12 lg:px-20">
        <header className="mx-auto flex max-w-[1500px] items-end justify-between gap-6 border-b border-white/15 pb-5">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#78a4ff]">05 / scroll showcase</span>
            <h2 className="mt-2 max-w-[12ch] font-heading text-[clamp(2.5rem,5vw,5.5rem)] font-black uppercase leading-[0.87] tracking-[-0.055em] text-white">
              Core principles & highlights
            </h2>
          </div>
          <div className="hidden text-right font-mono text-[9px] uppercase tracking-[0.18em] text-white/45 sm:block">
            <span className="block text-2xl text-white">0{activeIndex + 1}</span>
            <span>/ 0{slides.length}</span>
          </div>
        </header>

        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="showcase-track -mx-6 mt-8 flex w-[calc(100%+3rem)] snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-20 [scrollbar-width:none] md:-mx-12 md:mt-10 md:w-[calc(100%+6rem)] md:gap-12 md:px-12"
        >
          {slides.map((slide, index) => (
            <article
              key={slide.id}
              ref={(element) => { cardsRef.current[index] = element; }}
              data-showcase-card
              className="showcase-card grid h-auto min-h-0 w-[86vw] max-w-[78rem] shrink-0 snap-start grid-cols-1 overflow-hidden border border-white/15 bg-[#0b0f17] shadow-[0_28px_90px_rgba(0,12,35,0.32)] md:h-[67vh] md:min-h-[36rem] md:w-[82vw] md:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.65fr)]"
            >
              <figure className="group relative h-[18rem] overflow-hidden border-b border-white/15 bg-[#07090d] p-3 sm:h-[24rem] md:h-auto md:min-h-0 md:border-b-0 md:border-r md:p-5 lg:p-7">
                <div className="absolute left-3 right-3 top-3 z-20 flex h-8 items-center justify-between border border-b-0 border-white/15 bg-[#0b0f17]/95 px-3 font-mono text-[8px] uppercase tracking-[0.16em] text-[#7f8a9a] md:left-5 md:right-5 md:top-5 lg:left-7 lg:right-7 lg:top-7">
                  <span>{slide.project}</span>
                  <span className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-[#78a4ff] shadow-[0_0_10px_#78a4ff]" />Live case</span>
                </div>
                <div className="relative h-full overflow-hidden border border-white/15 bg-[#07090d] pt-8">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center will-change-transform"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,17,0.06),rgba(8,11,17,0.42))]" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07090d]/75 to-transparent" />
                </div>
                <figcaption className="absolute bottom-6 left-6 z-20 font-mono text-[8px] uppercase tracking-[0.18em] text-white/65 lg:bottom-10 lg:left-10">
                  Selected project / {slide.id}
                </figcaption>
              </figure>

              <div className="relative flex flex-col justify-between overflow-hidden p-6 md:p-8 lg:p-10">
                <span className="pointer-events-none absolute -right-4 -top-7 font-mono text-[8rem] leading-none tracking-[-0.1em] text-white/[0.035] lg:text-[11rem]">{slide.id}</span>
                <div>
                  <div data-showcase-reveal className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.18em]">
                    <span className="text-[#78a4ff]">{slide.category}</span>
                    <span className="text-white/45">{slide.stat}</span>
                  </div>
                  <h3 data-showcase-reveal className="mt-8 max-w-[11ch] text-balance font-heading text-[clamp(1.9rem,3.2vw,3.65rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-white">{slide.title}</h3>
                  <p data-showcase-reveal className="mt-6 max-w-[34rem] text-sm leading-7 text-[#9ca8b8]">{slide.description}</p>
                </div>
                <div data-showcase-reveal className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#8793a4]">
                  {slide.tags.map((tag) => <span key={tag}>+ {tag}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="absolute bottom-4 left-6 right-6 flex items-center gap-4 md:left-12 md:right-12 lg:left-20 lg:right-20">
          <div className="relative h-px flex-1 bg-white/15"><div ref={progressRef} className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[#78a4ff]" /></div>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => goToSlide(Math.max(0, activeIndex - 1))} aria-label="Previous principle" className="grid h-9 w-9 place-items-center border border-white/15 text-white/60 transition hover:border-[#78a4ff]/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#78a4ff]">←</button>
            {slides.map((slide, index) => (
              <button key={slide.id} type="button" onClick={() => goToSlide(index)} aria-label={`Go to principle ${index + 1}`} aria-current={activeIndex === index ? 'step' : undefined} className={`grid h-9 min-w-9 place-items-center border font-mono text-[9px] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#78a4ff] ${activeIndex === index ? 'border-[#78a4ff] bg-[#78a4ff] text-[#07090d]' : 'border-white/15 text-white/45 hover:border-white/40 hover:text-white'}`}>0{index + 1}</button>
            ))}
            <button type="button" onClick={() => goToSlide(Math.min(slides.length - 1, activeIndex + 1))} aria-label="Next principle" className="grid h-9 w-9 place-items-center border border-white/15 text-white/60 transition hover:border-[#78a4ff]/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#78a4ff]">→</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GsapSwipeSlider;
