/**
 * HATIM LAMARTI — PERSONAL PORTFOLIO WEBSITE
 * MAIN JAVASCRIPT CHOREOGRAPHY (js/main.js)
 * GSAP 3.12.5 + ScrollTrigger + SplitText + Lenis Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Detect query params & reduced motion preference
  const urlParams = new URLSearchParams(window.location.search);
  const skipLoader = urlParams.get('noloader') === 'true';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Registered GSAP Plugins
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    if (typeof SplitText !== 'undefined') gsap.registerPlugin(SplitText);
  }

  /* ==========================================================================
     1. LENIS SMOOTH SCROLL INITIALIZATION & GSAP TICKER BINDING
     ========================================================================== */
  let lenis = null;
  if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      smoothTouch: false
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  /* ==========================================================================
     2. CINEMATIC LOADER
     ========================================================================== */
  const loaderOverlay = document.getElementById('loader-overlay');
  const loaderBarFill = document.querySelector('.loader-bar-fill');
  const loaderCounter = document.querySelector('.loader-counter');
  const heroMediaWrapper = document.querySelector('.hero-media-wrapper');

  function initLoader() {
    if (skipLoader || prefersReducedMotion || !loaderOverlay) {
      if (loaderOverlay) loaderOverlay.style.display = 'none';
      if (heroMediaWrapper) gsap.set(heroMediaWrapper, { scale: 1.0 });
      animateHeroContent();
      return;
    }

    let progress = { value: 0 };
    const loaderTimeline = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderOverlay, {
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => {
            loaderOverlay.style.display = 'none';
            animateHeroContent();
          }
        });
      }
    });

    loaderTimeline.to(progress, {
      value: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(progress.value);
        if (loaderCounter) loaderCounter.textContent = `${val}%`;
        if (loaderBarFill) loaderBarFill.style.width = `${val}%`;
      }
    });

    // Zoom hero media scale from 1.45 to 1.0 during loader
    if (heroMediaWrapper) {
      loaderTimeline.fromTo(
        heroMediaWrapper,
        { scale: 1.45 },
        { scale: 1.0, duration: 1.4, ease: 'power3.out' },
        0
      );
    }
  }

  /* ==========================================================================
     3. HERO CONTENT ANIMATION
     ========================================================================== */
  function animateHeroContent() {
    const heroElements = document.querySelectorAll('#hero .hero-title, #hero .hero-subtitle, #hero .hero-actions, #hero .hero-aside');
    if (heroElements.length > 0 && !prefersReducedMotion) {
      gsap.fromTo(
        heroElements,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );
    }
  }

  /* ==========================================================================
     4. MANIFESTO CHARACTER-BY-CHARACTER COLOR REVEAL ON SCROLL
     ========================================================================== */
  function manualSplitText(container) {
    const chars = [];
    function processNode(node, isHighlight) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < text.length; i++) {
          const charStr = text[i];
          if (charStr === ' ' || charStr === '\n' || charStr === '\t') {
            fragment.appendChild(document.createTextNode(charStr));
          } else {
            const span = document.createElement('span');
            span.className = 'char' + (isHighlight ? ' highlight' : '');
            span.textContent = charStr;
            fragment.appendChild(span);
            chars.push(span);
          }
        }
        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const highlight = isHighlight || node.classList.contains('editorial-italic');
        const children = Array.from(node.childNodes);
        children.forEach((child) => processNode(child, highlight));
      }
    }
    Array.from(container.childNodes).forEach((child) => processNode(child, false));
    return chars;
  }

  function initManifestoReveal() {
    const manifestoText = document.querySelector('.manifesto-text');
    if (!manifestoText) return;

    let chars = [];
    if (typeof SplitText !== 'undefined' && !prefersReducedMotion) {
      const split = new SplitText(manifestoText, { type: 'chars, words' });
      chars = split.chars;
      // Add class to italic highlights
      const italicWords = manifestoText.querySelectorAll('.editorial-italic');
      italicWords.forEach((el) => {
        el.querySelectorAll('.char').forEach((c) => c.classList.add('highlight'));
      });
    } else {
      chars = manualSplitText(manifestoText);
    }

    if (chars.length > 0 && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
      gsap.fromTo(
        chars,
        { opacity: 0.25, color: '#71717A' },
        {
          opacity: 1,
          color: (i, target) => (target.classList.contains('highlight') ? '#E5A93C' : '#F4F4F0'),
          stagger: 0.02,
          scrollTrigger: {
            trigger: '#manifesto',
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 0.5
          }
        }
      );
    }

    // Metric counter animation
    const manifestoMetrics = document.querySelectorAll('.manifesto-metric-num');
    manifestoMetrics.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute('data-value') || '0');
      const suffix = el.getAttribute('data-suffix') || '';
      
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => {
            let counter = { val: 0 };
            gsap.to(counter, {
              val: targetVal,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = `${Math.round(counter.val)}${suffix}`;
              }
            });
          },
          once: true
        });
      } else {
        el.textContent = `${targetVal}${suffix}`;
      }
    });
  }

  /* ==========================================================================
     5. SIGNATURE PINNED 360° ORBIT VIDEO SCRUB (#orbit-scrub)
     ========================================================================== */
  function initOrbitScrub() {
    const orbitSection = document.getElementById('orbit-scrub');
    const orbitVideo = document.querySelector('.orbit-video');
    const orbitCanvas = document.querySelector('.orbit-canvas-fallback');
    const annotations = document.querySelectorAll('.orbit-annotation');
    const targetDots = document.querySelectorAll('.orbit-target-dot');
    const progressFill = document.querySelector('.orbit-progress-fill');

    if (!orbitSection) return;

    let canvasCtx = null;
    if (orbitCanvas) {
      canvasCtx = orbitCanvas.getContext('2d');
    }

    // Render canvas fallback frame if video fails
    function drawFallbackFrame(progress) {
      if (!orbitCanvas || !canvasCtx) return;
      const w = orbitCanvas.width;
      const h = orbitCanvas.height;
      canvasCtx.clearRect(0, 0, w, h);
      
      const angle = progress * Math.PI * 2;
      canvasCtx.save();
      canvasCtx.translate(w / 2, h / 2);
      
      const boxW = 320 * Math.abs(Math.cos(angle)) + 80;
      const boxH = 240;
      
      canvasCtx.fillStyle = '#121316';
      canvasCtx.strokeStyle = '#E5A93C';
      canvasCtx.lineWidth = 2;
      canvasCtx.fillRect(-boxW / 2, -boxH / 2, boxW, boxH);
      canvasCtx.strokeRect(-boxW / 2, -boxH / 2, boxW, boxH);
      
      canvasCtx.fillStyle = '#E5A93C';
      canvasCtx.fillRect(-boxW / 2 + 20, -boxH / 2 + 30, 8, 8);
      canvasCtx.fillStyle = '#F4F4F0';
      canvasCtx.font = 'bold 16px sans-serif';
      canvasCtx.fillText('HATIM AI SERVER — 360° ORBIT SCRUB', -boxW / 2 + 40, -boxH / 2 + 38);
      
      for (let y = -boxH / 2 + 60; y < boxH / 2 - 20; y += 16) {
        canvasCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        canvasCtx.beginPath();
        canvasCtx.moveTo(-boxW / 2 + 20, y);
        canvasCtx.lineTo(boxW / 2 - 20, y);
        canvasCtx.stroke();
      }
      canvasCtx.restore();
    }

    // Handle video load error fallback
    if (orbitVideo) {
      orbitVideo.addEventListener('error', () => {
        orbitVideo.style.display = 'none';
        if (orbitCanvas) orbitCanvas.style.display = 'block';
      });
    }

    // Pinned ScrollTrigger Timeline
    if (!prefersReducedMotion && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: orbitSection,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.orbit-pin-container',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;

          // 1. Scrub video currentTime
          if (orbitVideo && orbitVideo.duration && !isNaN(orbitVideo.duration)) {
            orbitVideo.currentTime = progress * orbitVideo.duration;
          } else if (orbitCanvas && canvasCtx) {
            drawFallbackFrame(progress);
          }

          // 2. Update progress fill
          if (progressFill) {
            progressFill.style.width = `${Math.round(progress * 100)}%`;
          }

          // 3. Highlight annotation cards & target dots at 0%, 33%, 66%, 100%
          const thresholds = [0, 0.33, 0.66, 0.98];
          thresholds.forEach((t, idx) => {
            const isActive = Math.abs(progress - t) < 0.15;
            if (annotations[idx]) annotations[idx].classList.toggle('active', isActive);
            if (targetDots[idx]) targetDots[idx].classList.toggle('active', isActive);
          });
        }
      });
    }
  }

  /* ==========================================================================
     6. BENTO CARD HOVER LIGHTING EFFECT
     ========================================================================== */
  function initBentoCardHover() {
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(229, 169, 60, 0.08), var(--bg-surface) 60%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = 'var(--bg-surface)';
      });
    });
  }

  /* ==========================================================================
     7. FOOTER GIANT WORDMARK MARQUEE SCALING/SLIDING ON SCROLL
     ========================================================================== */
  function initFooterWordmark() {
    const wordmark = document.querySelector('.footer-wordmark');
    if (!wordmark || prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.fromTo(
      wordmark,
      { x: '-15%', scale: 0.9, color: 'var(--bg-surface)' },
      {
        x: '0%',
        scale: 1.05,
        color: 'var(--text-primary)',
        scrollTrigger: {
          trigger: '#footer',
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 0.8
        }
      }
    );
  }

  /* ==========================================================================
     8. PROJECT DETAIL MODAL & KEYBOARD ACCESSIBILITY
     ========================================================================== */
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.querySelector('.modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalStack = document.getElementById('modal-stack');
  let previouslyFocusedElement = null;

  const projectDetailsMap = {
    'bde-hub': {
      title: 'BDE EFET Hub — Student Management Portal',
      desc: 'Complete full-stack student management and event coordination portal for EFET institution. Features automated enrollment verification, real-time analytics, and role-based access control.',
      stack: 'Next.js, TypeScript, PostgreSQL, Supabase, Tailwind CSS'
    },
    'f1-velocity': {
      title: 'F1 Velocity Analytics — Real-Time Telemetry Engine',
      desc: 'High-precision Formula 1 racing telemetry visualizer processing real-time speed vectors, lateral G-force curves, brake points, and lap time deltas.',
      stack: 'React, D3.js, Python FastAPI, WebSockets, Docker'
    },
    'datainsight-ai': {
      title: 'DataInsight AI — Neural Data Pipeline Canvas',
      desc: 'Enterprise AI analytics platform enabling interactive node-based data flow creation, automated anomaly detection, and Claude 3.5 Sonnet reasoning integration.',
      stack: 'Python, Claude API, Node.js, React, Tailwind CSS'
    },
    'servhub': {
      title: 'ServHub (KhedmatMaroc) — Moroccan Service Marketplace',
      desc: 'Architectural service marketplace connecting verified artisans and engineers across major Moroccan cities (Casablanca, Rabat, Marrakech, Tangier) with instant booking and quote management.',
      stack: 'Next.js, Supabase, Stripe, Tailwind CSS, Vercel'
    }
  };

  /* i18n hook — updates project details when language changes */
  window._updateProjectDetailsI18n = function(i18nEngine) {
    const keyMap = {
      'bde-hub': 'bde',
      'f1-velocity': 'f1',
      'datainsight-ai': 'datainsight',
      'servhub': 'servhub'
    };
    Object.keys(projectDetailsMap).forEach(pid => {
      const k = keyMap[pid];
      if (k) {
        projectDetailsMap[pid].title = i18nEngine.t('project.' + k + '.title');
        projectDetailsMap[pid].desc = i18nEngine.t('project.' + k + '.desc');
        projectDetailsMap[pid].stack = i18nEngine.t('project.' + k + '.stack');
      }
    });
  };

  function getModalFocusables() {
    if (!modalOverlay) return [];
    return Array.from(
      modalOverlay.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
  }

  function openProjectModal(projectId) {
    const data = projectDetailsMap[projectId];
    if (!data || !modalOverlay) return;

    previouslyFocusedElement = document.activeElement;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalStack) modalStack.textContent = `Stack: ${data.stack}`;

    modalOverlay.classList.add('active');
    if (lenis) lenis.stop();

    // Focus close button inside modal
    setTimeout(() => {
      if (modalCloseBtn) modalCloseBtn.focus();
    }, 50);
  }

  function closeProjectModal() {
    if (!modalOverlay || !modalOverlay.classList.contains('active')) return;
    modalOverlay.classList.remove('active');
    if (lenis) lenis.start();

    // Restore focus to previously active element
    if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
      previouslyFocusedElement.focus();
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProjectModal();
    });

    // Focus trapping inside modal
    modalOverlay.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const focusables = getModalFocusables();
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // Attach click and keyboard events to project cards & buttons
  document.querySelectorAll('[data-project-id]').forEach((element) => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const pid = element.getAttribute('data-project-id');
      openProjectModal(pid);
    });

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const pid = element.getAttribute('data-project-id');
        openProjectModal(pid);
      }
    });
  });

  /* ==========================================================================
     9. MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('active');
      navMenu.classList.toggle('active', !isOpen);
      navToggle.classList.toggle('active', !isOpen);
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close menu when clicking nav links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ==========================================================================
     10. INITIALIZE ALL MODULES WITH 2.5s TIMEOUT FALLBACK
     ========================================================================== */
  let appInitialized = false;

  function startApp() {
    if (appInitialized) return;
    appInitialized = true;
    initLoader();
    initManifestoReveal();
    initOrbitScrub();
    initBentoCardHover();
    initFooterWordmark();
  }

  // Safety fallback timeout: initialize after 2.5 seconds even if document.fonts hangs
  const fontTimeout = setTimeout(() => {
    startApp();
  }, 2500);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      clearTimeout(fontTimeout);
      startApp();
      /* Initialize i18n after app is ready */
      if (window.i18n) {
        window.i18n.init();
        if (window._updateProjectDetailsI18n) window._updateProjectDetailsI18n(window.i18n);
      }
    }).catch(() => {
      clearTimeout(fontTimeout);
      startApp();
      if (window.i18n) {
        window.i18n.init();
        if (window._updateProjectDetailsI18n) window._updateProjectDetailsI18n(window.i18n);
      }
    });
  } else {
    clearTimeout(fontTimeout);
    startApp();
    if (window.i18n) {
      window.i18n.init();
      if (window._updateProjectDetailsI18n) window._updateProjectDetailsI18n(window.i18n);
    }
  }
});
