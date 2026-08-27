/**
 * EMPIRICAL TEST SUITE FOR MILESTONE 3 PRODUCTION BUILD
 * Runs automated static, DOM, CSS, and JS integration tests.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const projectRoot = path.resolve(__dirname, '../../');
const htmlPath = path.join(projectRoot, 'index.html');
const cssPath = path.join(projectRoot, 'css', 'style.css');
const jsPath = path.join(projectRoot, 'js', 'main.js');

console.log('--- STARTING EMPIRICAL VERIFICATION SUITE ---');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');

const dom = new JSDOM(htmlContent, {
  url: 'file://' + htmlPath,
  runScripts: 'outside-only',
  resources: 'usable'
});

const { document, window } = dom.window;

const results = {
  responsiveness: [],
  scriptLoading: [],
  fallbacks: [],
  accessibility: []
};

// -----------------------------------------------------------------------------
// 1. TEST SCRIPT LOADING ORDER & DEPENDENCY INCLUSION
// -----------------------------------------------------------------------------
console.log('\n[TEST GROUP 1] Script Loading & Dependencies');

const scriptTags = Array.from(document.querySelectorAll('script')).map(s => s.getAttribute('src'));
console.log('Detected script sources in HTML:', scriptTags);

const hasGSAP = scriptTags.some(s => s && s.includes('gsap.min.js'));
const hasScrollTrigger = scriptTags.some(s => s && s.includes('ScrollTrigger.min.js'));
const hasLenis = scriptTags.some(s => s && s.includes('lenis.min.js'));
const hasSplitText = scriptTags.some(s => s && s.includes('SplitText'));

if (hasGSAP) results.scriptLoading.push({ test: 'GSAP 3 CDN inclusion', pass: true });
else results.scriptLoading.push({ test: 'GSAP 3 CDN inclusion', pass: false, error: 'GSAP script missing' });

if (hasScrollTrigger) results.scriptLoading.push({ test: 'ScrollTrigger CDN inclusion', pass: true });
else results.scriptLoading.push({ test: 'ScrollTrigger CDN inclusion', pass: false, error: 'ScrollTrigger script missing' });

if (hasLenis) results.scriptLoading.push({ test: 'Lenis CDN inclusion', pass: true });
else results.scriptLoading.push({ test: 'Lenis CDN inclusion', pass: false, error: 'Lenis script missing' });

if (hasSplitText) {
  results.scriptLoading.push({ test: 'SplitText CDN inclusion', pass: true });
} else {
  results.scriptLoading.push({
    test: 'SplitText CDN inclusion',
    pass: false,
    error: 'SplitText plugin script tag is MISSING from index.html head! SplitText character reveal will fail at runtime.'
  });
}

// Check js/main.js document.fonts.ready usage
const fontReadyMatches = jsContent.match(/document\.fonts\.ready/g) || [];
console.log(`document.fonts.ready referenced ${fontReadyMatches.length} times in main.js`);
if (fontReadyMatches.length >= 2) {
  results.scriptLoading.push({
    test: 'Font loading wait redundancy check',
    pass: true,
    note: `document.fonts.ready called ${fontReadyMatches.length} times (outer wrapper + initManifestoReveal). Redundant nested promise waits present.`
  });
}

// -----------------------------------------------------------------------------
// 2. TEST RESPONSIVENESS & MOBILE NAV CSS RULES
// -----------------------------------------------------------------------------
console.log('\n[TEST GROUP 2] Responsiveness & Mobile Navigation');

// Check if .mobile-nav-toggle has display: flex or display: block in any media query
const hasMobileNavMedia = cssContent.includes('.mobile-nav-toggle') && cssContent.match(/@media[^{]+\{\s*[^}]*\.mobile-nav-toggle\s*\{[^}]*display:\s*(flex|block)/s);
if (!hasMobileNavMedia) {
  results.responsiveness.push({
    test: 'Mobile Navigation Toggle CSS Display',
    pass: false,
    error: 'CRITICAL: .mobile-nav-toggle has display:none globally, and NO @media query enables display: flex/block on mobile viewports (< 768px).'
  });
} else {
  results.responsiveness.push({ test: 'Mobile Navigation Toggle CSS Display', pass: true });
}

// Check if .nav-menu has mobile styles (e.g. position: fixed/absolute, flex-direction: column)
const hasNavMenuMobileStyle = cssContent.match(/@media[^{]+\{\s*[^}]*\.nav-menu/s) || cssContent.match(/\.nav-menu\.active/s);
if (!hasNavMenuMobileStyle) {
  results.responsiveness.push({
    test: 'Mobile Navigation Menu Active CSS Styles',
    pass: false,
    error: 'CRITICAL: .nav-menu has no mobile breakpoint styling and no .nav-menu.active rules in style.css. Nav items stay in inline flex desktop bar on 360px viewport.'
  });
} else {
  results.responsiveness.push({ test: 'Mobile Navigation Menu Active CSS Styles', pass: true });
}

// Check global .btn-editorial width override on 480px
const globalBtnWidthRule = cssContent.match(/@media\s*\([^)]*max-width:\s*480px\)[^{]*\{[^}]*\.btn-editorial\s*\{[^}]*width:\s*100%/s);
if (globalBtnWidthRule) {
  results.responsiveness.push({
    test: 'Global .btn-editorial 100% width on 480px',
    pass: false,
    error: 'LAYOUT RISK: @media (max-width: 480px) applies width: 100% to ALL .btn-editorial elements, causing header button "Get In Touch" and card buttons to stretch full width and distort flex containers.'
  });
} else {
  results.responsiveness.push({ test: 'Global .btn-editorial 100% width on 480px', pass: true });
}

// -----------------------------------------------------------------------------
// 3. TEST FALLBACK MECHANICS
// -----------------------------------------------------------------------------
console.log('\n[TEST GROUP 3] Fallback Mechanics');

// Check ?noloader parameter strictness
const noloaderCheck = jsContent.includes("urlParams.get('noloader') === 'true'");
if (noloaderCheck) {
  results.fallbacks.push({
    test: '?noloader URL parameter handling',
    pass: true,
    note: 'Strict check for noloader=true implemented.'
  });
}

// Check Canvas fallback logic in JS
const hasCanvasFallback = jsContent.includes('orbit-canvas-fallback') && jsContent.includes('drawFallbackFrame');
if (hasCanvasFallback) {
  results.fallbacks.push({
    test: 'Orbit 360 Video Canvas Fallback',
    pass: true,
    note: 'Canvas element and drawFallbackFrame procedure defined.'
  });
} else {
  results.fallbacks.push({
    test: 'Orbit 360 Video Canvas Fallback',
    pass: false,
    error: 'Canvas fallback missing or incomplete.'
  });
}

// Check prefers-reduced-motion CSS
const hasReducedMotionCSS = cssContent.includes('@media (prefers-reduced-motion: reduce)');
if (hasReducedMotionCSS) {
  results.fallbacks.push({
    test: 'prefers-reduced-motion CSS rules',
    pass: true,
    note: 'Reduced motion media query presents resets for animations and orbit section.'
  });
} else {
  results.fallbacks.push({
    test: 'prefers-reduced-motion CSS rules',
    pass: false,
    error: 'Reduced motion media query missing.'
  });
}

// -----------------------------------------------------------------------------
// 4. TEST ACCESSIBILITY, DOM STRUCTURE & MODALS
// -----------------------------------------------------------------------------
console.log('\n[TEST GROUP 4] Accessibility & Modal Focus');

// Check heading structure
const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
  tag: h.tagName.toLowerCase(),
  text: h.textContent.trim().substring(0, 30)
}));
console.log('Heading structure count:', headings.length);

let headingSkipFound = false;
for (let i = 0; i < headings.length - 1; i++) {
  const currentLevel = parseInt(headings[i].tag.replace('h', ''));
  const nextLevel = parseInt(headings[i + 1].tag.replace('h', ''));
  if (nextLevel > currentLevel + 1) {
    headingSkipFound = true;
    results.accessibility.push({
      test: 'Heading Hierarchy Levels',
      pass: false,
      error: `Skipped heading level from <${headings[i].tag}> ("${headings[i].text}") to <${headings[i + 1].tag}> ("${headings[i + 1].text}")`
    });
  }
}
if (!headingSkipFound) {
  results.accessibility.push({ test: 'Heading Hierarchy Levels', pass: true });
}

// Check modal focus management in JS
const modalHasFocusTrap = jsContent.includes('focus()') || jsContent.includes('activeElement');
if (!modalHasFocusTrap) {
  results.accessibility.push({
    test: 'Modal Focus Trap & Focus Return',
    pass: false,
    error: 'ACCESSIBILITY BUG: project-modal lacks focus trapping (tab index constraint) and does not return focus to trigger element upon closing.'
  });
} else {
  results.accessibility.push({ test: 'Modal Focus Trap & Focus Return', pass: true });
}

// Check bento cards accessibility (click handler on non-interactive element)
const bentoCards = document.querySelectorAll('.bento-card');
let invalidClickables = 0;
bentoCards.forEach(card => {
  if (card.hasAttribute('data-project-id') && !card.hasAttribute('tabindex') && card.tagName !== 'BUTTON' && card.tagName !== 'A') {
    invalidClickables++;
  }
});

if (invalidClickables > 0) {
  results.accessibility.push({
    test: 'Interactive Bento Card Keyboard Accessibility',
    pass: false,
    error: `${invalidClickables} <article class="bento-card"> elements have data-project-id click listeners but lack tabindex="0" and keyboard listener (Enter/Space), preventing keyboard navigation.`
  });
} else {
  results.accessibility.push({ test: 'Interactive Bento Card Keyboard Accessibility', pass: true });
}

console.log('\n--- EMPIRICAL TEST RESULTS SUMMARY ---');
console.log(JSON.stringify(results, null, 2));

// Save output to JSON for report generation
fs.writeFileSync(path.join(__dirname, 'empirical_results.json'), JSON.stringify(results, null, 2));
console.log('Results written to empirical_results.json');
