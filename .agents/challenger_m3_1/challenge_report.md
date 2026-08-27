# CHALLENGE REPORT — MILESTONE 3 PRODUCTION BUILD

**Target Artifacts**: `index.html`, `css/style.css`, `js/main.js`, `assets/`  
**Challenger Agent**: Challenger M3 (Empirical Challenger)  
**Execution Date**: 2026-07-23  

---

## Challenge Summary

**Overall Risk Assessment**: **HIGH**

Empirical verification and stress testing of the production build revealed critical responsiveness failure modes on mobile devices (360px viewport), missing runtime animation dependencies, accessibility WCAG 2.1 violations in modal focus management, and potential script execution blockages under network degraded states.

| Category | Total Tests | Pass | Fail | Primary Cause |
|---|---|---|---|---|
| **Responsiveness (360px)** | 3 | 1 | 2 | Mobile nav toggle CSS `display:none` & unstyled mobile nav menu |
| **Script Loading & Dependencies** | 5 | 4 | 1 | Missing `<script>` tag for GSAP `SplitText` plugin |
| **Fallback Mechanics** | 3 | 3 | 0 | Canvas fallback, `?noloader`, `prefers-reduced-motion` present |
| **Accessibility & Modals** | 3 | 0 | 3 | Missing focus trap/return, non-keyboard card elements, heading skip |

---

## Confirmed Failure Modes & Challenges

### [CRITICAL] Challenge 1: Mobile Navigation Hamburger Toggle Hidden & Nav Bar Horizontal Overflow
- **Assumption Challenged**: The production build provides a responsive mobile navigation menu that works down to 360px viewports.
- **Attack Scenario**: Render website at viewport width = 360px (mobile browser). Click or inspect header navigation.
- **Empirical Observation**:
  - `index.html`: Line 80 includes `<button class="mobile-nav-toggle" aria-label="Toggle navigation menu">`.
  - `css/style.css`: Line 532 sets `.mobile-nav-toggle { display: none; }`.
  - No `@media` rule anywhere in `style.css` enables `.mobile-nav-toggle { display: flex; }` on screens < 768px or < 1024px.
  - `css/style.css`: Lines 490-495 set `.nav-menu { display: flex; gap: var(--space-8); }` without any mobile drawer / accordion CSS rules or `.nav-menu.active` styling.
  - `js/main.js`: Lines 397-403 toggle `navMenu.classList.toggle('active')`, but `.nav-menu.active` has 0 CSS rules in `style.css`.
- **Blast Radius**: Mobile users (360px width) see all 7 nav links laid out inline horizontally, causing the header container (`.header-inner`) to overflow the 360px screen by >600px. The hamburger menu button is completely invisible.
- **Mitigation**:
  1. Add CSS media query for mobile screens (`@media (max-width: 768px)`):
     - Display `.mobile-nav-toggle` as `display: flex`.
     - Style `.nav-menu` as a full-screen or slide-over drawer when `.nav-menu.active` is toggled.

---

### [HIGH] Challenge 2: GSAP `SplitText` CDN Script Missing in `index.html`
- **Assumption Challenged**: The character-by-character color reveal animation in `#manifesto` works out of the box in production.
- **Attack Scenario**: Load `index.html` in browser and scroll down to the `#manifesto` section.
- **Empirical Observation**:
  - `index.html`: Lines 20-22 load GSAP, ScrollTrigger, and Lenis via CDN script tags.
  - `js/main.js`: Line 18 (`if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);`) and Line 129 (`split = new SplitText(...)`).
  - No `<script src=".../SplitText.min.js">` tag exists anywhere in `index.html`.
  - Node empirical test runner confirmed `typeof SplitText` evaluates to `'undefined'`.
- **Blast Radius**: SplitText character reveal fails silently at runtime. The manifesto paragraph text remains locked at low opacity (`color: #71717A`) during scroll.
- **Mitigation**: Add GSAP SplitText CDN script tag to `<head>` of `index.html` or implement a lightweight CSS/JS word-wrap fallback.

---

### [HIGH] Challenge 3: Modal Dialog Focus Management & Accessibility Violations
- **Assumption Challenged**: The project detail modal (`#project-modal`) complies with accessibility standards and WCAG 2.1 Level AA modal dialog guidelines.
- **Attack Scenario**: Open modal using keyboard (Tab + Enter), attempt to navigate inside modal, press Escape, inspect focus state.
- **Empirical Observation**:
  - `index.html`: Line 638 defines `<div id="project-modal" class="modal-overlay" role="dialog" aria-modal="true">`.
  - `js/main.js`: Lines 354-380 handle `openProjectModal` and `closeProjectModal`.
  - When opened: No code transfers focus into `.modal-container` or `.modal-close`. Keyboard focus stays on background elements.
  - No focus trap listener exists (`keydown` `Tab` key allows keyboard focus to escape the modal into hidden background links).
  - When closed: Focus is not returned to the trigger button that opened the modal.
  - `index.html`: Lines 239, 268, 292, 317 give `<article class="bento-card" data-project-id="...">` click event listeners, but `<article>` lacks `tabindex="0"`, `role="button"`, and keyboard handlers (`Enter`/`Space`).
- **Blast Radius**: Severe WCAG 2.1 Level AA accessibility failure (2.4.3 Focus Order, 2.4.7 Focus Visible, 4.1.2 Name/Role/Value). Keyboard and screen reader users cannot operate modals effectively.
- **Mitigation**:
  1. Store `document.activeElement` before opening modal.
  2. Set focus to `.modal-close` or `#modal-title` upon open.
  3. Implement keyboard focus trap (`Tab` and `Shift+Tab`) restricted to `.modal-container`.
  4. Restore focus to stored active element on close.
  5. Add `tabindex="0"`, `role="button"`, and `keydown` event listeners to interactive `.bento-card` elements.

---

### [MEDIUM] Challenge 4: Screen Lock Vulnerability on Font Load Failure (`document.fonts.ready`)
- **Assumption Challenged**: Script initialization is resilient to slow or failed web font network requests.
- **Attack Scenario**: Load website with blocked or slow Google Fonts network requests (e.g. offline, firewalled, high-latency connection).
- **Empirical Observation**:
  - `js/main.js`: Lines 409-423 wrap `initLoader()`, `initManifestoReveal()`, `initOrbitScrub()`, `initBentoCardHover()`, and `initFooterWordmark()` inside `document.fonts.ready.then(...)`.
- **Blast Radius**: If `document.fonts.ready` promise hangs or fails to resolve due to blocked font downloads, `initLoader()` NEVER runs. The loader overlay (`#loader-overlay`) remains permanently displayed over the page at 0%.
- **Mitigation**: Wrap `document.fonts.ready` in `Promise.race` with a 2-second fallback timeout, ensuring `initLoader()` always executes even if fonts fail to load.

---

### [MEDIUM] Challenge 5: Global `.btn-editorial` 100% Width Rule Distorts Card Footers on Viewports <= 480px
- **Assumption Challenged**: Editorial button styling on mobile viewports preserves card layout structure.
- **Attack Scenario**: Resize viewport to 360px and inspect `.bento-card-footer` and `.header-cta`.
- **Empirical Observation**:
  - `css/style.css`: Lines 1474-1477 apply:
    ```css
    @media (max-width: 480px) {
      .btn-editorial {
        width: 100%;
        justify-content: center;
      }
    }
    ```
  - In `.bento-card-footer` (`display: flex; justify-content: space-between;`), `.btn-editorial` forcing `width: 100%` collides with `.micro-label`, causing flex item squishing and text clipping on 360px viewports.
  - In `#site-header` `.header-cta`, `.btn-editorial.btn-editorial-gold` ("Get In Touch") expands to 100% width, breaking header layout.
- **Blast Radius**: Visual layout degradation on mobile screens.
- **Mitigation**: Restrict `width: 100%` rule specifically to `.hero-actions .btn-editorial` rather than all `.btn-editorial` buttons globally.

---

### [LOW] Challenge 6: Skipped Heading Level in Tech Architecture Explainer Section
- **Assumption Challenged**: Heading levels follow strict sequential hierarchy (WCAG 1.3.1).
- **Attack Scenario**: Run automated DOM accessibility scanner.
- **Empirical Observation**:
  - `index.html`: Line 357 uses `h2.section-title` ("Multi-shot Neural Data Pipeline").
  - Lines 360, 366, 372 use `h4.bento-card-title` ("Data Ingestion...", "Data Bus...", "Wide Neural Engine...") skipping `h3`.
- **Blast Radius**: Minor WCAG 1.3.1 compliance warning.
- **Mitigation**: Change `<h4 class="bento-card-title">` in `.explainer-step-card` to `<h3 class="bento-card-title">`.

---

## Stress Test Results Matrix

| Scenario | Expected Behavior | Actual Behavior | Pass / Fail |
|---|---|---|---|
| **Mobile Nav at 360px Viewport** | Hamburger toggle displays; menu opens as mobile drawer | Hamburger toggle is hidden (`display:none`); 7 nav items overflow screen horizontally by 600px | **FAIL** |
| **Manifesto Character Scroll Reveal** | Text reveals character-by-character via SplitText | SplitText plugin undefined; animation silently skipped | **FAIL** |
| **Modal Keyboard Navigation** | Modal traps focus; Escape closes modal; focus restored to trigger | Focus escapes modal to hidden links; focus not set or restored | **FAIL** |
| **Offline Font Loading State** | Loader displays and dismisses smoothly even without custom font | Blocked by pending `document.fonts.ready` promise; site hangs on loader | **FAIL** |
| **360° Orbit Video Load Failure** | Video hides, canvas fallback renders 360° chassis simulation | Canvas fallback code executes cleanly (`drawFallbackFrame`) | **PASS** |
| **URL `?noloader=true` Parameter** | Skips loader overlay instantly and scales hero media | `skipLoader` condition sets overlay `display: none` and animates hero | **PASS** |
| **`prefers-reduced-motion: reduce`** | Disables Lenis, ScrollTrigger pinning, and CSS marquee | Resets animations, marquee, and pins `.orbit-pin-container` to relative | **PASS** |

---

## Attack Surface Summary

- **Hypotheses Tested**: 
  - Mobile responsiveness down to 360px viewport: **FAILED** (Nav header overflow & hidden toggle button).
  - External script dependency completeness: **FAILED** (SplitText script tag missing in HTML).
  - Accessibility & Modal focus: **FAILED** (Focus trap/return missing, non-keyboard cards).
  - Fallback mechanics (`?noloader`, canvas fallback, reduced motion): **PASSED**.
- **Vulnerabilities Found**: 2 Critical/High CSS/HTML layout bugs, 1 High dependency omission, 1 High accessibility flaw, 1 Medium network resilience risk.
- **Untested Angles**: Full cross-browser WebGL canvas rendering across legacy iOS devices (tested via JSDOM DOM execution).
