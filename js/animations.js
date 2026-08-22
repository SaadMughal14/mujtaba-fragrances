/* ==========================================================================
   MUJTABA FRAGRANCES — GSAP animations + Lenis smooth scroll
   Loaded after GSAP + ScrollTrigger + Lenis CDNs.
   Handles:
   1. Hero entrance timeline (label, headline, description, button, tags stagger)
   2. Section reveals with ScrollTrigger at 80% in view
   3. Card stagger when sections enter viewport
   4. Parallax on hero image (0.3x) and editorial bg (0.5x)
   5. Hover micro-interactions (handled in CSS, but hooks provided here)
   6. Circular badge continuous rotation (CSS animation — verified present)
   7. Floating animation (CSS keyframes — verified present)

   Hooks supported in HTML:
   - .gsap-fade-up        → fade up on scroll
   - .gsap-stagger         → children fade up with stagger
   - .gsap-hero-item       → hero timeline child
   - .gsap-hero-image      → hero image (scale + fade)
   - .gsap-hero-card       → hero floating card (slide from right)
   - .gsap-parallax-hero   → parallax 0.3x
   - .gsap-parallax-editorial → parallax 0.5x
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Feature detection ---------- */
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';

  // Fallback flag — if GSAP missing, CSS handles visibility
  if (!hasGSAP) {
    document.documentElement.classList.add('no-gsap');
  }

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  if (hasLenis && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      lenis = new window.Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      // Hook into GSAP ticker if available
      const updateLenis = (time) => {
        if (lenis && typeof lenis.raf === 'function') {
          lenis.raf(time * 1000);
        }
      };

      if (hasGSAP) {
        if (hasScrollTrigger) {
          lenis.on('scroll', window.ScrollTrigger.update);
        }
        window.gsap.ticker.add(updateLenis);
        window.gsap.ticker.lagSmoothing(0);
      } else {
        // No GSAP — use requestAnimationFrame for Lenis
        const raf = (time) => {
          if (lenis && typeof lenis.raf === 'function') {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
        };
        requestAnimationFrame(raf);
      }

      // Expose for debug / other scripts
      window.MF = window.MF || {};
      window.MF.lenis = lenis;

      // Pause Lenis on snap-container pages (mens/womens/unisex) — they use native snap
      const snapContainer = document.getElementById('snapContainer');
      if (snapContainer && lenis) {
        if (hasGSAP && window.gsap && window.gsap.ticker) {
          window.gsap.ticker.remove(updateLenis);
        }
        lenis.destroy();
        lenis = null;
        window.MF.lenis = null;
      }
    } catch (err) {
      console.warn('Lenis init failed:', err);
    }
  }

  if (!hasGSAP) return;

  const gsap = window.gsap;
  if (hasScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    // Show everything immediately if user prefers reduced motion
    document.querySelectorAll('.gsap-fade-up, .gsap-stagger > *, .gsap-hero-item, .gsap-hero-image, .gsap-hero-card')
      .forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0, scale: 1, x: 0, clearProps: 'all' });
      });
    return;
  }

  /* ---------- 1. Hero entrance timeline ---------- */
  function initHero() {
    const heroItems = document.querySelectorAll('.gsap-hero-item');
    const heroImage = document.querySelector('.gsap-hero-image');
    const heroCard = document.querySelector('.gsap-hero-card');

    if (heroItems.length || heroImage || heroCard) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (heroItems.length) {
        tl.from(heroItems, {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.15,
        }, 0.2);
      }

      if (heroImage) {
        tl.from(heroImage, {
          opacity: 0,
          scale: 0.95,
          duration: 1.4,
          ease: 'power2.out',
        }, 0.3);
      }

      if (heroCard && window.matchMedia('(min-width: 900px)').matches) {
        tl.from(heroCard, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(heroCard, { clearProps: 'transform' });
          }
        }, 0.8);
      }
    }
  }

  /* ---------- 2 & 3. Section reveals + card stagger ---------- */
  function initScrollReveals() {
    if (!hasScrollTrigger) return;

    // Generic fade-up
    document.querySelectorAll('.gsap-fade-up').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Stagger groups
    document.querySelectorAll('.gsap-stagger').forEach((group) => {
      const children = group.children;
      if (!children.length) return;
      gsap.fromTo(children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  /* ---------- 4. Parallax ---------- */
  function initParallax() {
    if (!hasScrollTrigger) return;

    // Hero image — moves slower (0.3x)
    document.querySelectorAll('.gsap-parallax-hero').forEach((el) => {
      gsap.to(el, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section, header') || el,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Editorial background — 0.5x
    document.querySelectorAll('.gsap-parallax-editorial').forEach((el) => {
      gsap.to(el, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  /* ---------- 5. Sleek Badge continuous rotation ---------- */
  function initSleekBadge() {
    const rotatingGroup = document.querySelector('.sleek-rotating-group');
    if (!rotatingGroup) return;

    // Continuous slow rotation — very subtle, 30s per revolution
    gsap.to(rotatingGroup, {
      rotation: 360,
      duration: 30,
      ease: 'none',
      repeat: -1,
      transformOrigin: '110px 110px',
    });

    // Subtle scale-in when badge enters viewport
    if (hasScrollTrigger) {
      const badge = document.querySelector('.sleek-badge');
      if (badge) {
        gsap.fromTo(badge,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: badge,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }
  }

  /* ---------- Init on DOMContentLoaded ---------- */
  function init() {
    initHero();
    initScrollReveals();
    initParallax();
    initSleekBadge();

    // Refresh ScrollTrigger after fonts/images load to get correct positions
    if (hasScrollTrigger) {
      window.addEventListener('load', () => {
        window.ScrollTrigger.refresh();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
