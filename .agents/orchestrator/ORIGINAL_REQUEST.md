# Original User Request

## Initial Request — 2026-07-23T20:00:12Z

Design and build an Awwwards-grade, Apple/Editorial-style portfolio website for **Hatim Lamarti** (Full Stack Engineer | AI Engineer | Data Science Specialist based in Casablanca, Morocco). Accompanied by a complete Higgsfield.ai asset pack, interactive GSAP 3.15 + ScrollTrigger + Lenis scroll choreography, signature 360° orbit/explainer video scrub, and self-contained static architecture.

Working directory: c:\Users\LEGION\Desktop\portfoliov2
Integrity mode: development

## Real Content & Facts (DO NOT INVENT)
- **Name**: Hatim Lamarti
- **Role**: Full Stack Engineer | AI Engineer | Data Science Specialist
- **Tagline**: Building intelligent digital products powered by AI, data, and modern web technologies.
- **Location**: Casablanca, Morocco (English language site)
- **Links**:
  - Portfolio: https://hatimlamarti.space
  - GitHub: https://github.com/hatim3310
  - LinkedIn: https://linkedin.com/in/lamartihatim
- **Featured Projects**:
  1. BDE EFET Hub — Student Management Platform
  2. F1 Velocity Analytics — Real-Time Formula 1 Analytics Dashboard
  3. DataInsight AI — AI-powered Data Analytics Platform
  4. ServHub (KhedmatMaroc) — Moroccan Service Marketplace
- **Core Stack**: Next.js, React, TypeScript, Python, Tailwind CSS, Node.js, PostgreSQL, Supabase, Docker, OpenAI, Claude, MCP, GitHub, Vercel.
- **Certifications**:
  - IBM Data Science Professional Certificate (95%)
  - ALX AI Career Program
  - Anthropic Claude 101
  - Anthropic Claude Code in Action
  - Anthropic Intro to MCP
  - Anthropic AI Fluency
  - Google Analytics
- **Key Stats**: 20+ Projects | 7+ Certifications | 95% IBM Data Science Score | 1000+ GitHub Commits
- **Design DNA Constraints**:
  - Vibe: Premium, Minimal, Editorial, Modern, Luxury, Elegant, Sophisticated, Clean, Spacious, High-End, Timeless.
  - Prioritize: Exceptional typography, editorial composition, generous white space, subtle smooth motion, strong hierarchy.
  - EXPLICITLY AVOID: Glassmorphism, neon gradients, cyberpunk aesthetics, dashboard layouts, generic cards.

## Requirements

### R1. Phase 1 — Inspo Autopsy & Phase 2 — Art Direction Brief (`BRIEF.md`)
1. Analyze the 6 inspiration links (fromanother.love, heynesh.com, rauno.me, danielspatzek.com, olivierlarose.com, linear.app) into an Inspo Autopsy table (palette, typography, motion patterns, layout system, signature moment).
2. Commit to ONE fused direction (Minimal Luxury Editorial Creative Studio).
3. Output `BRIEF.md` containing:
   - Brand system (Canvas: deep matte obsidian/monochrome ivory; Ink: crisp high-contrast monochrome; Accent: single scarce accent with AA contrast).
   - Single font family system (Tight tracking -0.03em on display sizes, italic accents in same family).
   - Photographic & visual register.
   - Per-section compositional concepts (no repeated card grids).
   - Motion register (GSAP, Lenis, subtle transitions).
   - Explicit Do-NOT-Invent list enforcing true content.

### R2. Phase 3 — Higgsfield AI Asset Pack (`ASSETS.md`)
Output `ASSETS.md` with numbered cards for all visual assets needed:
`#n · what it is · where used · MODEL · aspect ratio · exact prompt · target filename`
Utilizing:
- GPT Image 2 (2K) for studio product/hardware stills.
- Nano Banana for photo restyling ("STRICT PHOTO EDIT...").
- Seedance 2.0 for 10s seamless ambient looping background videos & 360° product-orbit scroll-scrubbed video (first frame = last frame).
- Minimax Hailuo for organic wave motion/terrains (with palindrome loop instruction).
- Chained keyframes + Seedance 2.0 for multi-shot feature explainers.
- Safety-checked phrasing (avoiding flag words).

### R3. Phase 4 — Production Build (`index.html`, `css/`, `js/`, `assets/`)
Build a fully self-contained static site inside `c:\Users\LEGION\Desktop\portfoliov2`:
- Typography & Canvas: Single Google/Fontshare font, tight display tracking, 4/8px spacing grid, dark overlay (`rgba(10,10,12, 0.65-0.8)`) on media with AA contrast white text.
- Motion & Libraries: GSAP 3.15 + ScrollTrigger + SplitText + Lenis (version-pinned CDNs). Include Lenis CSS bridge. Wait for `document.fonts.check()` before SplitText split.
- Cinematic Loader: Hero video/canvas starts scaled (~1.45), white monogram/logo floating, zooms out (~1.2s) landing as hero, title/CTA stagger in. Supports `?noloader` query param & respects `prefers-reduced-motion`.
- Signature Interactive Section: Scroll-scrubbed 360° orbit/explainer video pinned in place (`video.currentTime = progress × duration`), with numbered HTML editorial annotation cards + SVG target dots fading in at key progress stops.
- Interactive UI Components: Editorial buttons with sliding arrow chips, character-by-character color reveal on manifesto quote, masked logo marquee, ambient video bento backdrops at low opacity, and giant sliding footer wordmark.
- Robust Fallbacks & Responsiveness: No horizontal scroll at 360px, `[hidden]{display:none!important}`, fallback images for reduced motion, native scroll fallback on mobile.

### R4. Phase 5 — Project Handoff & Tooling
Provide:
- File tree structure.
- Exact `ffmpeg` one-liners for audio stripping, `-movflags +faststart`, keyframe density (`-g 6`), palindrome looping, and poster frame extraction.
- Beautiful, high-quality SVG/CSS placeholders so the site runs flawlessly before custom AI assets arrive.
- 10-point QA checklist verifying console cleanliness, contrast, 360px layout, and motion fallbacks.
