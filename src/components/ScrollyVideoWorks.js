import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ScrollyVideoWorks = ({ projects = [], lang = 'en' }) => {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const mediaInnerRefs = useRef([]);
  const textLeftRefs = useRef([]);
  const navigatorRef = useRef(null);

  useGSAP(() => {
    if (!projects || projects.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: '(min-width: 1024px) and (min-height: 640px)',
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      ({ conditions }) => {
        const slides = slidesRef.current.filter(Boolean);
        const media = mediaInnerRefs.current.filter(Boolean);

        if (!conditions.desktop || conditions.reduceMotion) {
          gsap.set(containerRef.current, { height: 'auto', minHeight: 0 });
          gsap.set(slides, { position: 'relative', inset: 'auto', height: 'auto', yPercent: 0, autoAlpha: 1 });
          gsap.set(media, { scale: 1, autoAlpha: 1 });
          gsap.set(textLeftRefs.current.filter(Boolean), { autoAlpha: 1 });
          gsap.set(navigatorRef.current, { display: 'none' });

          if (conditions.reduceMotion) return;

          slides.forEach((slide, index) => {
            const copy = textLeftRefs.current[index]?.children || [];
            const mediaElement = mediaInnerRefs.current[index];
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: slide,
                start: 'top 82%',
                end: 'bottom 30%',
                toggleActions: 'play none none reverse',
              },
            });

            timeline
              .from(copy, { y: 28, autoAlpha: 0, stagger: 0.055, duration: 0.55, ease: 'power3.out' })
              .from(mediaElement, { y: 36, autoAlpha: 0, scale: 1.06, duration: 0.8, ease: 'power3.out' }, 0.08);

            gsap.fromTo(mediaElement,
              { yPercent: -2 },
              {
                yPercent: 2,
                ease: 'none',
                scrollTrigger: {
                  trigger: slide,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.6,
                },
              });
          });
          return;
        }

        const totalSlides = projects.length;
        const scrollDistance = totalSlides * 100;

        slides.forEach((slide, index) => {
          gsap.set(slide, { yPercent: index > 0 ? 100 : 0 });
          gsap.set(mediaInnerRefs.current[index], { scale: 1.08 });
          const children = Array.from(textLeftRefs.current[index].children);
          gsap.set(children, { autoAlpha: index === 0 ? 1 : 0, y: index === 0 ? 0 : 25 });
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${scrollDistance}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(mediaInnerRefs.current[0], { scale: 1, duration: 1, ease: 'none' }, 0);

        projects.forEach((_, index) => {
          if (index === 0) return;
          const startTime = index;
          const previousCopy = Array.from(textLeftRefs.current[index - 1].children);
          const nextCopy = Array.from(textLeftRefs.current[index].children);

          timeline
            .to(previousCopy, { autoAlpha: 0, y: -25, stagger: 0.04, duration: 0.5, ease: 'power2.in' }, startTime - 0.4)
            .to(slidesRef.current[index], { yPercent: 0, duration: 1, ease: 'power2.inOut' }, startTime - 0.3)
            .fromTo(mediaInnerRefs.current[index], { scale: 1.08 }, { scale: 1, duration: 1, ease: 'none' }, startTime - 0.3)
            .fromTo(nextCopy, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out' }, startTime + 0.1)
            .to(`.proj-nav-num-${index - 1}`, { color: '#52525b', fontWeight: '400', duration: 0.3 }, startTime - 0.2)
            .to(`.proj-nav-num-${index}`, { color: '#ffffff', fontWeight: '700', duration: 0.3 }, startTime - 0.2);
        });
      },
    );

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [projects, lang] });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full overflow-hidden bg-[#0A0A0C] py-16 text-white select-none lg:h-[100dvh] lg:min-h-[40rem] lg:py-0"
    >
      {/* FIXED VERTICAL PROJECT NAVIGATOR */}
      <div ref={navigatorRef} className="absolute left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 pointer-events-auto lg:left-12 lg:flex">
        <span className="text-[8px] md:text-[9px] font-mono tracking-[0.3em] uppercase text-white/50 [writing-mode:vertical-lr] rotate-180 mb-1">
          PROJECTS
        </span>

        <div className="flex flex-col gap-3 font-mono text-xs">
          {projects.map((proj, idx) => (
            <span
              key={proj.id}
              className={`proj-nav-num-${idx} transition-colors duration-300 ${
                idx === 0 ? 'text-white font-bold' : 'text-white/40 font-normal'
              }`}
            >
              {proj.number}
            </span>
          ))}
        </div>
      </div>

      {/* STACKED FULLSCREEN PROJECT SLIDES */}
      {projects.map((project, index) => {
        const category = lang === 'fr' ? project.categoryFR : project.categoryEN;
        const description = lang === 'fr' ? project.descFR : project.descEN;
        const ctaText = lang === 'fr' ? "Explorer l'étude de cas" : "Explore Case Study";

        return (
          <div
            key={project.id}
            ref={(el) => (slidesRef.current[index] = el)}
            className="relative z-10 flex w-full items-center bg-[#0A0A0C] py-8 first:pt-0 last:pb-0 lg:absolute lg:inset-0 lg:h-full lg:py-0"
          >
            {/* MAIN SPLIT COMPOSITION (30% Left Text / 70% Right Media) */}
            <div className="mx-auto grid w-full max-w-[1700px] grid-cols-1 items-center gap-7 px-5 sm:px-8 md:px-12 lg:h-full lg:grid-cols-12 lg:gap-10 lg:px-20 lg:py-8">
              
              {/* LEFT SIDE — EDITORIAL TYPOGRAPHY & DETAILS (approx 35% / 4 columns) */}
              <div 
                ref={(el) => (textLeftRefs.current[index] = el)}
                className="z-20 flex min-w-0 flex-col justify-center gap-3 sm:gap-4 lg:col-span-4 lg:gap-5 lg:pl-6"
              >
                {/* Micro Category & Year */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[10px] sm:text-[11px] font-mono text-white/70 tracking-widest uppercase">
                    {`${project.number} // ${category}`}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span className="text-[10px] sm:text-[11px] font-mono text-white/50">
                    {project.year}
                  </span>
                </div>

                {/* Massive Editorial Project Title */}
                <h2 className="max-w-lg text-balance font-heading text-[clamp(2.25rem,9vw,4.5rem)] font-black uppercase leading-[0.9] tracking-[-0.055em] text-white lg:text-5xl xl:text-6xl">
                  {project.title}
                </h2>

                {/* Concise 1-2 Line Description */}
                <p className="text-white/80 text-xs sm:text-sm lg:text-sm xl:text-base font-light leading-relaxed max-w-md line-clamp-3 lg:line-clamp-none">
                  {description}
                </p>

                {/* Minimalist Tech Tags */}
                <div className="flex flex-wrap gap-1.5 my-0.5">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[9px] sm:text-[10px] font-mono tracking-wider text-white/80 px-2.5 py-0.5 sm:py-1 bg-white/5 border border-white/10 rounded-md uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Case Study Action Button */}
                {project.link && (
                  <div className="pt-1">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all duration-300 group"
                    >
                      <span>{ctaText}</span>
                      <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE — FULLSCREEN MEDIA PRESENTATION (approx 65% / 8 columns) */}
              <div className="relative h-[clamp(16rem,58vw,31rem)] w-full overflow-hidden rounded-xl border border-white/10 bg-black sm:h-[clamp(22rem,54vw,36rem)] lg:col-span-8 lg:h-[72vh] lg:max-h-[620px] lg:rounded-2xl">
                <div 
                  ref={(el) => (mediaInnerRefs.current[index] = el)}
                  className="w-full h-full relative overflow-hidden"
                >
                  {project.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={project.image}
                      className="h-full w-full object-cover contrast-[1.05] brightness-90 pointer-events-none"
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover contrast-[1.05] brightness-90"
                    />
                  )}
                  {/* Subtle darkening vignette border */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ScrollyVideoWorks;
