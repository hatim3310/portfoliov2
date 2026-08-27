# Challenge Report — Milestone 3 Iteration 2 Re-testing

**Date**: 2026-07-23
**Target Files**: `index.html`, `css/style.css`, `js/main.js`
**Tester**: Challenger Subagent (`challenger_m3_2`)

---

## Challenge Summary

**Overall Risk Assessment**: **MEDIUM**

Automated empirical testing via headless Playwright browser automation confirmed that:
1. Viewport responsiveness at 360px is robust with **0px horizontal overflow** across 360px, 375px, 768px, 1024px, and 1440px viewports.
2. Mobile menu toggle and `#project-modal` keyboard focus trapping (forward/backward) and focus restoration function as intended.
3. Manifesto text character reveal works properly due to an inline manual fallback in `js/main.js`.

However, **1 console error** was detected:
- Line 22 of `index.html` attempts to load `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js`. SplitText is a paid Club GreenSock plugin and is not hosted on cdnjs CDN, resulting in an HTTP 404 network error logged in the browser console.

---

## Detailed Test Verification Matrix

| Objective / Requirement | Target Criteria | Empirical Result | Status |
| :--- | :--- | :--- | :---: |
| **1. 360px Viewport Responsiveness** | `document.documentElement.scrollWidth` equals `window.innerWidth` (0px horizontal overflow) | `clientWidth`: 360px, `scrollWidth`: 360px, `overflow`: 0px. Verified on 360px, 375px, 768px, 1024px, 1440px. | **PASS** |
| **2. SplitText Execution & Manifesto Reveal** | Script tag presence, SplitText execution, and 260 character spans reveal on scroll | Script tag present. CDN returns 404, but `manualSplitText` fallback correctly generates 260 `.char` spans & animates color on scroll to `#manifesto`. | **PARTIAL PASS / ISSUE FOUND** |
| **3a. Mobile Menu Toggle Interaction** | Open/close toggle via click, Escape key, and nav links; `aria-expanded` updates | Click opens menu (`right: 0px`, `aria-expanded="true"`). Escape & link clicks close menu (`aria-expanded="false"`). | **PASS** |
| **3b. Modal Focus Trapping & Restoration** | Focus moves to modal on open; Tab & Shift+Tab trap focus inside `#project-modal`; focus restored on close | Modal receives focus on `.modal-close`. 100% of forward Tab & backward Shift+Tab cycles trapped. Focus restored to triggering `.bento-card`. | **PASS** |
| **4. Zero Console Errors** | No console errors or unhandled page errors during load or interaction | 1 console network error: `GET https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js 404 (Not Found)`. | **FAIL** |

---

## Challenges & Empirical Findings

### [Medium] Challenge 1: Invalid GSAP SplitText CDN Script Tag Causes Console Error

- **Assumption challenged**: That `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>` in `index.html` loads a valid GSAP plugin without console errors.
- **Empirical Observation**: 
  - Executing `run_detailed_tests.py` captured the following console log:
    ```
    CONSOLE error: Failed to load resource: the server responded with a status of 404 (Not Found)
    URL: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js
    ```
  - `SplitText` is a proprietary GSAP Club plugin and is unavailable on the public cdnjs repository.
- **Blast Radius**: 
  - Violates the zero console errors requirement.
  - Causes unnecessary network attempt on page load.
  - Note: `js/main.js` correctly prevents a JavaScript crash by checking `typeof SplitText !== 'undefined'` and falling back to `manualSplitText()`.
- **Mitigation**: Remove line 22 (`<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>`) from `index.html`, or host a local copy of `SplitText.min.js` if licensed. Since `manualSplitText()` in `js/main.js` already handles character splitting flawlessly, removing the invalid CDN tag resolves the console error while preserving full manifesto animation functionality.

---

## Stress Test Results

1. **Viewport Overflow Stress Test (360px, 375px, 768px, 1024px, 1440px)**
   - **Command/Script**: `run_detailed_tests.py`
   - **Result**: `scrollWidth == clientWidth` across all breakpoints. Zero horizontal layout overflow.
   - **Status**: **PASS**

2. **Mobile Navigation Menu Interaction Test**
   - **Command/Script**: `run_detailed_tests.py`
   - **Actions**:
     1. Click `.mobile-nav-toggle` -> `.nav-menu` gets `.active`, `right: 0px`, `aria-expanded="true"`.
     2. Press `Escape` -> `.nav-menu` loses `.active`, `aria-expanded="false"`.
     3. Click `.mobile-nav-toggle` then click `.nav-link[href="#works"]` -> `.nav-menu` closes immediately.
   - **Status**: **PASS**

3. **Modal Focus Trap & Restoration Test (`#project-modal`)**
   - **Command/Script**: `run_detailed_tests.py`
   - **Actions**:
     1. Focus card `[data-project-id="f1-velocity"]`, press `Space` -> Modal opens, focus moves to `.modal-close`.
     2. Send 5 consecutive `Tab` keypresses -> Focus cycles between `.modal-close` and `.btn-editorial` (100% inside modal).
     3. Send 5 consecutive `Shift+Tab` keypresses -> Focus cycles backward between elements (100% inside modal).
     4. Press `Escape` -> Modal closes, focus returns to `[data-project-id="f1-velocity"]`.
   - **Status**: **PASS**

4. **Console Error Monitoring**
   - **Command/Script**: `run_detailed_tests.py`
   - **Captured Logs**:
     - `CONSOLE error: Failed to load resource: the server responded with a status of 404 (Not Found)` (SplitText CDN script tag).
   - **Status**: **FAIL** (1 console error).

---

## Unchallenged Areas

- **Audio/Video Playback**: Video element autoplay and scrub performance was verified programmatically for loading and video scrub logic; hardware GPU decoding limits under extreme resource constraints were not challenged.
