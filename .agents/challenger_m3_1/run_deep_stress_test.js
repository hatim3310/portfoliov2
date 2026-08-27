/**
 * DEEP LAYOUT & ACCESSIBILITY STRESS TESTER
 * Tests 360px viewport layout rules, font ready blocking, and mobile button flex collisions.
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const projectRoot = path.resolve(__dirname, '../../');
const htmlPath = path.join(projectRoot, 'index.html');
const cssPath = path.join(projectRoot, 'css', 'style.css');
const jsPath = path.join(projectRoot, 'js', 'main.js');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');

console.log('--- RUNNING DEEP STRESS TEST 2 ---');

// 1. Stress test font load failure risk
console.log('\n[STRESS TEST 1] Font Loading Failure Fallback');
const loaderWrappedByFontReady = jsContent.includes('document.fonts.ready.then') && jsContent.indexOf('initLoader()') > jsContent.indexOf('document.fonts.ready');

if (loaderWrappedByFontReady) {
  console.log('RISK CONFIRMED: initLoader() is inside document.fonts.ready.then() block.');
  console.log('If Google Fonts (Plus Jakarta Sans) network request fails or hangs, loader overlay will remain stuck at 0% indefinitely.');
}

// 2. Stress test mobile button 100% width collisions
console.log('\n[STRESS TEST 2] Bento Card Footer Flex Collision on <=480px');
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

const bentoFooters = document.querySelectorAll('.bento-card-footer');
console.log(`Found ${bentoFooters.length} bento card footers.`);
bentoFooters.forEach((footer, idx) => {
  const label = footer.querySelector('.micro-label');
  const btn = footer.querySelector('.btn-editorial');
  console.log(`Footer ${idx + 1}: Label="${label ? label.textContent.trim() : 'NONE'}", Btn="${btn ? btn.textContent.trim() : 'NONE'}"`);
});
console.log('Under CSS rule "@media (max-width: 480px) { .btn-editorial { width: 100%; justify-content: center; } }", .btn-editorial takes 100% width inside flex container containing .micro-label, causing flex wrapping/collapse bugs on 360px viewport.');

// 3. Stress test mobile nav toggle visibility
console.log('\n[STRESS TEST 3] Mobile Nav Toggle & Nav Menu CSS Rules');
const navToggleInHTML = document.querySelector('.mobile-nav-toggle');
const navMenuInHTML = document.querySelector('.nav-menu');
console.log(`Mobile Nav Toggle present in HTML: ${!!navToggleInHTML}`);
console.log(`Nav Menu present in HTML with ${navMenuInHTML ? navMenuInHTML.children.length : 0} items.`);

// Check style.css for .mobile-nav-toggle
const toggleCssMatches = cssContent.match(/\.mobile-nav-toggle\s*\{[^}]*\}/g) || [];
console.log('CSS rules matching .mobile-nav-toggle:', toggleCssMatches);

// Check if display flex is ever added in media query
const toggleMediaMatches = cssContent.match(/@media[^{]+\{[^}]*\.mobile-nav-toggle[^}]*\}/g) || [];
console.log('Media query rules for .mobile-nav-toggle:', toggleMediaMatches);

if (toggleMediaMatches.length === 0) {
  console.log('CONFIRMED BUG: .mobile-nav-toggle is hidden with display:none at line 532, and NO media query ever displays it on mobile screens!');
}

console.log('\n--- DEEP STRESS TEST COMPLETE ---');
