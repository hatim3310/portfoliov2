const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\LEGION\\Desktop\\portfoliov2';
const htmlPath = path.join(rootDir, 'index.html');
const cssPath = path.join(rootDir, 'css', 'style.css');
const jsPath = path.join(rootDir, 'js', 'main.js');
const assetsDir = path.join(rootDir, 'assets');

console.log('====================================================');
console.log('   INDEPENDENT VICTORY AUDIT VERIFICATION SUITE    ');
console.log('====================================================\n');

let totalChecks = 0;
let passedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
  }
}

// 1. HTML File Checks
assert(fs.existsSync(htmlPath), 'index.html exists at project root');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Section IDs check
const requiredIds = [
  'loader-overlay',
  'site-header',
  'main-content',
  'hero',
  'manifesto',
  'orbit-scrub',
  'works',
  'explainer-flow',
  'about',
  'certifications',
  'footer',
  'project-modal'
];

requiredIds.forEach(id => {
  assert(htmlContent.includes(`id="${id}"`), `index.html contains section with id="${id}"`);
});

// Ground Truth Facts Check in HTML
assert(htmlContent.includes('Hatim Lamarti'), 'HTML contains correct name "Hatim Lamarti"');
assert(htmlContent.includes('Casablanca, Morocco'), 'HTML contains correct location "Casablanca, Morocco"');
assert(htmlContent.includes('BDE EFET Hub'), 'HTML contains Project 1 "BDE EFET Hub"');
assert(htmlContent.includes('F1 Velocity Analytics'), 'HTML contains Project 2 "F1 Velocity Analytics"');
assert(htmlContent.includes('DataInsight AI'), 'HTML contains Project 3 "DataInsight AI"');
assert(htmlContent.includes('ServHub'), 'HTML contains Project 4 "ServHub"');
assert(htmlContent.includes('IBM Data Science Professional'), 'HTML contains IBM certification');
assert(htmlContent.includes('ALX AI Career Program'), 'HTML contains ALX certification');
assert(htmlContent.includes('Anthropic Claude 101'), 'HTML contains Anthropic Claude 101 certification');
assert(htmlContent.includes('Claude Code in Action'), 'HTML contains Claude Code in Action certification');
assert(htmlContent.includes('Intro to MCP'), 'HTML contains Intro to MCP certification');
assert(htmlContent.includes('Anthropic AI Fluency'), 'HTML contains Anthropic AI Fluency certification');
assert(htmlContent.includes('Google Analytics'), 'HTML contains Google Analytics certification');

// Stat metrics check
assert(htmlContent.includes('20+'), 'HTML contains stat metric "20+"');
assert(htmlContent.includes('7+'), 'HTML contains stat metric "7+"');
assert(htmlContent.includes('95%'), 'HTML contains stat metric "95%"');
assert(htmlContent.includes('1000+'), 'HTML contains stat metric "1000+"');

// CDN Script dependencies check
assert(htmlContent.includes('gsap.min.js'), 'HTML includes GSAP CDN script');
assert(htmlContent.includes('ScrollTrigger.min.js'), 'HTML includes ScrollTrigger CDN script');
assert(htmlContent.includes('lenis.min.js'), 'HTML includes Lenis CDN script');

// 2. CSS File Checks
assert(fs.existsSync(cssPath), 'css/style.css exists');
const cssContent = fs.readFileSync(cssPath, 'utf8');

assert(cssContent.includes('--bg-primary: #0A0A0C'), 'CSS defines obsidian background custom property #0A0A0C');
assert(cssContent.includes('--text-primary: #F4F4F0'), 'CSS defines ivory text custom property #F4F4F0');
assert(cssContent.includes('--accent-gold: #E5A93C'), 'CSS defines titanium gold accent property #E5A93C');
assert(cssContent.includes('[hidden]'), 'CSS defines [hidden] display:none !important constraint');
assert(cssContent.includes('@media (prefers-reduced-motion: reduce)'), 'CSS contains prefers-reduced-motion media query');
assert(cssContent.includes('.lenis.lenis-smooth'), 'CSS contains Lenis smooth scroll bridge');
assert(cssContent.includes('@media (max-width: 768px)'), 'CSS contains tablet/mobile responsive breakpoint');
assert(cssContent.includes('@media (max-width: 480px)'), 'CSS contains mobile responsive breakpoint (covering 360px)');

// 3. JS File Checks
assert(fs.existsSync(jsPath), 'js/main.js exists');
const jsContent = fs.readFileSync(jsPath, 'utf8');

assert(jsContent.includes("urlParams.get('noloader') === 'true'"), 'JS implements ?noloader query param check');
assert(jsContent.includes("prefers-reduced-motion: reduce"), 'JS checks prefers-reduced-motion media query');
assert(jsContent.includes('new Lenis'), 'JS initializes Lenis smooth scroll');
assert(jsContent.includes('gsap.registerPlugin'), 'JS registers GSAP plugins');
assert(jsContent.includes('orbitVideo.currentTime = progress * orbitVideo.duration'), 'JS binds 360° orbit video scrub to progress');
assert(jsContent.includes('openProjectModal'), 'JS implements project modal handler');
assert(jsContent.includes('Escape'), 'JS handles Escape key to close modal/drawer');
assert(jsContent.includes('aria-expanded'), 'JS toggles aria-expanded for accessibility');

// 4. Asset Store Checks
const requiredAssets = [
  'explainer-flow.mp4',
  'footer-bg.mp4',
  'hatim-portrait.jpg',
  'hero-bg.mp4',
  'manifesto-bg.jpg',
  'orbit-360.mp4',
  'project-bde-hub.jpg',
  'project-datainsight.jpg',
  'project-f1-velocity.jpg',
  'project-servhub.jpg',
  'stats-bg.jpg'
];

requiredAssets.forEach(asset => {
  const assetPath = path.join(assetsDir, asset);
  const exists = fs.existsSync(assetPath);
  let size = 0;
  if (exists) {
    size = fs.statSync(assetPath).size;
  }
  assert(exists && size > 0, `Asset assets/${asset} exists and is non-empty (${(size / 1024).toFixed(1)} KB)`);
});

console.log('\n====================================================');
console.log(` SUMMARY: ${passedChecks} / ${totalChecks} PASSED`);
console.log('====================================================\n');

if (passedChecks === totalChecks) {
  process.exit(0);
} else {
  process.exit(1);
}
