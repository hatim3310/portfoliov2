# Project Plan: Hatim Lamarti Awwwards-Grade Portfolio Website

## Architecture & Layout
- Target Root: `c:\Users\LEGION\Desktop\portfoliov2`
- Files:
  - `index.html`: Complete HTML5 semantic markup, single-page Awwwards editorial layout.
  - `css/style.css`: Clean, modular CSS system with CSS variables, 4/8px spacing grid, tight display tracking (-0.03em), Lenis smooth scrolling bridge, accessibility styling, media query breakpoints down to 360px.
  - `js/main.js`: GSAP 3.15 + ScrollTrigger + SplitText + Lenis setup, font loading check, cinematic hero loader, signature 360° scroll-scrubbed orbit video with annotations & target dots, manifesto character reveal, masked marquee, ambient bento hover, sliding footer wordmark, reduced-motion & `?noloader` handling.
  - `assets/`: Scalable SVG/CSS placeholder images and video mocks for all Higgsfield AI cards.
  - `BRIEF.md`: Art Direction Brief & 6-site Inspo Autopsy.
  - `ASSETS.md`: Complete Higgsfield.ai Asset Pack Specification.
  - `HANDOFF.md`: Final handoff document, ffmpeg utilities, tree structure, 10-point QA checklist.

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Inspo Autopsy & Art Direction Brief (`BRIEF.md`) | Phase 1 & 2: Autopsy table of 6 sites, fused Minimal Luxury Editorial Creative Studio direction, brand system, font system, motion register, Do-NOT-Invent list. | None | DONE |
| 2 | Higgsfield AI Asset Pack (`ASSETS.md`) | Phase 3: Numbered cards (#n format), prompts, models (GPT Image 2, Nano Banana, Seedance 2.0, Minimax Hailuo), aspect ratios, filenames. | M1 | DONE |
| 3 | Production Build (`index.html`, `css/style.css`, `js/main.js`, `assets/`) | Phase 4: Single font family system, tight tracking -0.03em, GSAP 3.15 + ScrollTrigger + SplitText + Lenis, Cinematic Loader, Signature 360° Orbit Scrub with HTML annotations & SVG dots, Interactive components, high-quality SVG/CSS placeholders, responsive down to 360px. | M1, M2 | DONE |
| 4 | Project Handoff, Tooling & QA (`HANDOFF.md`) | Phase 5: File tree, exact ffmpeg one-liners, 10-point QA checklist verification. | M3 | DONE |

## Interface Contracts & Quality Standards
- Single font family system (Plus Jakarta Sans, display tracking -0.035em).
- Spacing: 4px/8px grid system.
- Contrast: WCAG AAA/AA contrast compliance.
- Motion: GSAP 3.15 + ScrollTrigger + SplitText + Lenis version-pinned CDNs. `prefers-reduced-motion` and `?noloader` support.
- Responsiveness: Tested down to 360px viewport width, zero horizontal overflow.
- Code Layout & Integrity: Authentic logic, 100% clean forensic audit, zero cheating.
