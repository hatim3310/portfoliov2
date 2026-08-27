# Changes Log - Milestone 3 Iteration 3: Production Build Polish

## Overview
Removed line 22 containing the invalid SplitText CDN script tag (`https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js`) from `index.html`.

## File Modifications

### `index.html`
- **Removed**: `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>`
- **Rationale**: GSAP `SplitText` is a paid/Club GreenSock plugin and is not hosted on public cdnjs, returning an HTTP 404 network error in browser console. `js/main.js` contains a robust `manualSplitText()` function that automatically executes when `SplitText` is undefined, splitting text into `.char` elements and executing character-by-character scroll reveal animations cleanly with 0 console errors.

## Verification
- Verified `index.html` script tags using Node.js script inspection.
- Confirmed total script tags in `index.html`:
  1. `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
  2. `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
  3. `https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js`
  4. `js/main.js`
- Zero 404 script tags remain in `index.html`.
