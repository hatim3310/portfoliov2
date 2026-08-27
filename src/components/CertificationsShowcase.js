import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const credentials = [
  { id: '01', title: 'IBM Data Science', provider: 'IBM', type: 'Professional certificate', year: '2025', score: '95% final score', detail: 'Python / Data analysis / Machine learning / Deep learning' },
  { id: '02', title: 'Claude Code in Action', provider: 'Anthropic', type: 'Academy certificate', year: '2026', score: 'Verified', detail: 'Agentic workflows / MCP servers / Tool integration' },
  { id: '03', title: 'ALX AI Career Specialization', provider: 'ALX', type: 'Specialization', year: '2025', score: 'Top 10% cohort', detail: 'NLP / Neural networks / AI ethics / Applied AI' },
  { id: '04', title: 'Google Analytics', provider: 'Google', type: 'Professional certificate', year: '2024', score: 'Certified', detail: 'GA4 / Behaviour / Conversion funnels / Visualization' },
  { id: '05', title: 'Claude 101', provider: 'Anthropic', type: 'Academy certificate', year: '2026', score: 'Verified', detail: 'Prompt systems / Context management / Evaluation' },
  { id: '06', title: 'AI Fluency for Students', provider: 'Anthropic', type: 'Academy certificate', year: '2026', score: 'Verified', detail: 'AI literacy / Research / Academic workflows' },
  { id: '07', title: 'Model Context Protocol', provider: 'Anthropic', type: 'Academy certificate', year: '2026', score: 'Verified', detail: 'Client-server / Tools / Resources / Integrations' },
];

const filters = ['All', 'Anthropic', 'IBM', 'Google', 'ALX'];

const CertificationsShowcase = () => {
  const rootRef = useRef(null);
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? credentials : credentials.filter((item) => item.provider === filter);

  useGSAP(() => {
    const rows = gsap.utils.toArray('[data-credential-row]');
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      rows.forEach((row, index) => {
        const line = row.querySelector('[data-credential-line]');
        gsap.set(line, { scaleX: 0, transformOrigin: index % 2 ? 'right center' : 'left center' });
        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 86%',
            end: 'top 52%',
            scrub: 0.55,
          },
        })
          .from(row.querySelectorAll('[data-credential-reveal]'), {
            y: 42,
            autoAlpha: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: 'power3.out',
          }, 0)
          .to(line, { scaleX: 1, duration: 0.7, ease: 'none' }, 0.08);
      });
    });
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, { scope: rootRef, dependencies: [filter], revertOnUpdate: true });

  return (
    <div ref={rootRef} className="w-full">
      <header className="grid gap-8 border-b border-white/15 pb-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#78a4ff]">06 / verified learning</span>
          <h2 className="mt-3 max-w-[10ch] font-heading text-[clamp(2.8rem,6vw,7rem)] font-black uppercase leading-[0.85] tracking-[-0.06em] text-white">
            Certifications & badges
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="max-w-sm text-sm leading-relaxed text-white/55">A growing record of applied learning across data, AI systems, analytics and engineering workflows.</p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-[0.16em]">
            {filters.map((item) => (
              <button key={item} onClick={() => setFilter(item)} className={`border-b pb-1 transition ${filter === item ? 'border-[#78a4ff] text-white' : 'border-transparent text-white/35 hover:text-white/70'}`}>{item}</button>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-2">
        {filtered.map((credential, index) => (
          <article key={credential.id} data-credential-row className="credential-row group relative grid gap-4 py-7 md:grid-cols-12 md:items-center md:py-10">
            <div data-credential-line className="absolute inset-x-0 bottom-0 h-px bg-white/18" />
            <span data-credential-reveal className="font-mono text-xs text-[#78a4ff] md:col-span-1">{credential.id}</span>
            <div data-credential-reveal className="md:col-span-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">{credential.provider} / {credential.type}</span>
              <h3 className="mt-2 font-heading text-2xl font-black uppercase leading-none tracking-[-0.035em] text-white transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">{credential.title}</h3>
            </div>
            <p data-credential-reveal className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-white/40 md:col-span-3">{credential.detail}</p>
            <div data-credential-reveal className="flex items-end justify-between gap-5 md:col-span-3 md:justify-end">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/35">{credential.year}</span>
              <span className="border border-[#78a4ff]/35 bg-[#78a4ff]/5 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-[#9bbaff]">{credential.score}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between border-y border-white/15 py-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
        <span>{String(filtered.length).padStart(2, '0')} credentials shown</span>
        <span>Continuous learning / 2024—2026</span>
      </div>
    </div>
  );
};

export default CertificationsShowcase;
