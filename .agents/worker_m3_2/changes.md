# Changes Log — Milestone 3 Iteration 2: Production Build Remediation

## Date: 2026-07-23

### 1. `index.html`
- **SplitText Script CDN**: Added `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>` in `<head>` after ScrollTrigger.
- **Mobile Navigation Accessibility**: Added `id="nav-menu"` to `<ul class="nav-menu">` and `aria-controls="nav-menu"` to `<button class="mobile-nav-toggle">` for explicit ARIA linkage.
- **Bento Card Accessibility**: Added `tabindex="0"` and `role="button"` to all 4 `.bento-card` elements, enabling full keyboard navigation focus and screen reader button role recognition.

### 2. `css/style.css`
- **Horizontal Scroll Prevention**: Added `width: 100%;` alongside `overflow-x: hidden;` on `html, body` in base styles and under `@media (max-width: 768px)` breakpoint to guarantee zero horizontal scroll down to 360px viewport width.
- **Mobile Navigation Drawer & Toggle**: Added comprehensive `@media (max-width: 768px)` rules:
  - `.mobile-nav-toggle`: Displayed as flex column with `gap: 5px`, `z-index: 1001`, and hamburger lines.
  - `.mobile-nav-toggle.active`: Smooth CSS transform animations turning the hamburger icon into an 'X' icon (`rotate(45deg)` / `rotate(-45deg)` / fade middle bar).
  - `.nav-menu`: Mobile drawer styled as a fixed full-screen overlay (`top: 0`, `right: -100%`, `width: 100%`, `height: 100vh`, background `#0A0A0C`, `backdrop-filter: blur(20px)`, vertical flex stack). Slides in from right on `.nav-menu.active`.
- **Bento Card Footer Mobile Alignment**: Configured `.bento-card-footer` with `flex-wrap: wrap` and `.bento-card-footer .btn-editorial` with `width: auto` on mobile, preventing button overflow and flex layout breakage.

### 3. `js/main.js`
- **SplitText Fallback Character Splitter**: Implemented `manualSplitText(container)` DOM tree parser that recursively splits text nodes into `<span class="char">` (and `<span class="char highlight">` for `.editorial-italic` children). If `SplitText` CDN is unavailable, `initManifestoReveal()` falls back to this manual DOM splitter, ensuring character color reveal on scroll works deterministically in all runtime environments.
- **Web Font Load Safety Timeout**: Added a 2.5-second `setTimeout` fallback (`fontTimeout`) wrapping `document.fonts.ready`. Ensures `initLoader()`, `initManifestoReveal()`, and all modules initialize smoothly even if web fonts hang or delay over slow networks.
- **Mobile Navigation Toggle Logic**: Implemented click listeners on `.mobile-nav-toggle` to open/close `.nav-menu`, toggling `.active` state and updating `aria-expanded` ("true"/"false"). Added automatic menu collapse when any `.nav-link` is clicked or when Escape key is pressed.
- **Keyboard Navigation & Modal Focus Trapping/Restoration**:
  - Bento cards respond to `Enter` and `Space` keypresses, triggering `openProjectModal(projectId)`.
  - `openProjectModal()` captures `previouslyFocusedElement = document.activeElement` and moves focus to the modal close button.
  - Implemented keyboard Tab focus trapping inside active `#project-modal` container.
  - `closeProjectModal()` restores focus back to `previouslyFocusedElement`.
