import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

const Preloader = ({ onComplete }) => {
  const rootRef = useRef(null);
  const progressRef = useRef(null);
  const progressLineRef = useRef(null);
  const statusRef = useRef(null);
  const logoRef = useRef(null);
  const introRef = useRef(null);
  const leftCurtainRef = useRef(null);
  const rightCurtainRef = useRef(null);
  const hasCompletedRef = useRef(false);

  useGSAP(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const finish = () => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      document.body.style.overflow = previousOverflow;
      onComplete?.();
    };

    const updateProgress = (value) => {
      const roundedValue = Math.round(value);
      const paddedValue = String(roundedValue).padStart(3, '0');

      if (progressRef.current) progressRef.current.textContent = paddedValue;
      if (rootRef.current) rootRef.current.setAttribute('aria-valuenow', roundedValue);

      if (statusRef.current) {
        statusRef.current.textContent = roundedValue < 34
          ? 'LOADING SYSTEM'
          : roundedValue < 76
            ? 'CALIBRATING MOTION'
            : roundedValue < 100
              ? 'COMPOSING EXPERIENCE'
              : 'SYSTEM READY';
      }
    };

    const motionPreference = gsap.matchMedia();

    motionPreference.add('(prefers-reduced-motion: reduce)', () => {
      updateProgress(100);
      gsap.to(rootRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        delay: 0.1,
        onComplete: finish,
      });
    });

    motionPreference.add('(prefers-reduced-motion: no-preference)', () => {
      const counter = { value: 0 };
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .from('[data-preloader-meta]', {
          autoAlpha: 0,
          y: 12,
          duration: 0.45,
          stagger: 0.06,
        })
        .from(logoRef.current, {
          autoAlpha: 0,
          scale: 0.72,
          rotate: -16,
          duration: 0.65,
          ease: 'expo.out',
        }, '<0.05')
        .from('[data-preloader-word]', {
          yPercent: 115,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power4.out',
        }, '<0.05')
        .to(counter, {
          value: 100,
          duration: 1.35,
          ease: 'power2.inOut',
          onUpdate: () => updateProgress(counter.value),
        }, '<0.12')
        .to(progressLineRef.current, {
          scaleX: 1,
          duration: 1.35,
          ease: 'power2.inOut',
        }, '<')
        .to(logoRef.current, {
          rotate: 12,
          scale: 1.08,
          duration: 0.35,
          ease: 'back.in(1.6)',
        }, '-=0.12')
        .to(introRef.current, {
          autoAlpha: 0,
          y: -24,
          duration: 0.35,
          ease: 'power2.in',
        }, '+=0.08')
        .to(leftCurtainRef.current, {
          xPercent: -101,
          duration: 0.8,
          ease: 'expo.inOut',
        }, 'curtains')
        .to(rightCurtainRef.current, {
          xPercent: 101,
          duration: 0.8,
          ease: 'expo.inOut',
        }, 'curtains')
        .call(finish);

      return () => timeline.kill();
    });

    return () => {
      motionPreference.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, { scope: rootRef, dependencies: [onComplete] });

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[99999] select-none overflow-hidden text-white"
      role="progressbar"
      aria-label="Chargement du portfolio"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow="0"
    >
      <div ref={leftCurtainRef} className="absolute inset-y-0 left-0 w-1/2 bg-[#07090d]" />
      <div ref={rightCurtainRef} className="absolute inset-y-0 right-0 w-1/2 bg-[#07090d]" />

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.11]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div ref={introRef} className="relative z-10 flex h-full flex-col justify-between px-5 py-5 sm:px-8 sm:py-7 md:px-12 md:py-9">
        <header className="flex items-start justify-between font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-white/50 sm:text-[10px]">
          <p data-preloader-meta>
            Hatim Lamarti<br />
            Portfolio / 2026
          </p>
          <p data-preloader-meta className="text-right">
            Casablanca / MA<br />
            33.5731° N
          </p>
        </header>

        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          <div className="hidden h-px bg-white/20 md:block" data-preloader-meta />

          <div className="flex flex-col items-center">
            <div ref={logoRef} className="relative mb-6 grid size-20 place-items-center rounded-full border border-[#78a4ff]/45 sm:size-24">
              <div className="absolute inset-[7px] rounded-full border border-dashed border-white/20" />
              <img
                src="/assets/images/logo_hatim.svg"
                alt=""
                className="relative z-10 size-9 object-contain sm:size-11"
              />
            </div>

            <div className="overflow-hidden text-center">
              <p data-preloader-word className="font-display text-[clamp(2.8rem,8vw,7.5rem)] font-black uppercase leading-[0.78] tracking-[-0.07em]">
                Creative
              </p>
            </div>
            <div className="overflow-hidden text-center">
              <p data-preloader-word className="font-display text-[clamp(2.8rem,8vw,7.5rem)] font-black uppercase leading-[0.78] tracking-[-0.07em] text-[#78a4ff]">
                Engineer
              </p>
            </div>
          </div>

          <div className="hidden h-px bg-white/20 md:block" data-preloader-meta />
        </div>

        <footer>
          <div className="mb-3 flex items-end justify-between gap-4">
            <p ref={statusRef} data-preloader-meta aria-live="polite" className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/50 sm:text-[10px]">
              Loading system
            </p>
            <div className="flex items-end font-mono tabular-nums">
              <span ref={progressRef} className="text-[clamp(3.5rem,9vw,7rem)] font-light leading-[0.75] tracking-[-0.08em]">000</span>
              <span className="ml-2 text-xs text-[#78a4ff]">%</span>
            </div>
          </div>

          <div className="h-px w-full overflow-hidden bg-white/15">
            <div
              ref={progressLineRef}
              className="h-full w-full origin-left scale-x-0 bg-[#78a4ff] shadow-[0_0_18px_rgba(120,164,255,0.85)]"
            />
          </div>
        </footer>
      </div>

      <span className="absolute left-5 top-1/2 z-10 h-2 w-2 -translate-y-1/2 border-l border-t border-[#78a4ff] sm:left-8 md:left-12" />
      <span className="absolute right-5 top-1/2 z-10 h-2 w-2 -translate-y-1/2 border-b border-r border-[#78a4ff] sm:right-8 md:right-12" />
    </div>
  );
};

export default Preloader;
