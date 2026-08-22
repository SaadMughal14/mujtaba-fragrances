/* ==========================================================================
   MUJTABA FRAGRANCES — Collection page interactions (mens.html & womens.html)
   - Section dot navigation (click to jump between fragrances)
   - Active dot sync with scroll position
   - Keyboard navigation (↑ ↓ PageUp PageDown)
   - Subtle butterfly parallax on mouse move
   - Touch swipe support
   Exposed as window.MF.initCollection() so it can be re-run after
   dynamically-rendered sections are inserted.
   ========================================================================== */

window.MF = window.MF || {};

window.MF.initCollection = function () {
  'use strict';

  const snapContainer = document.getElementById('snapContainer');
  if (!snapContainer) return;

  const sections = snapContainer.querySelectorAll('.snap-section');
  const dots = document.querySelectorAll('.section-dot');

  if (!sections.length) return;

  /* ---------- Click a dot to jump ---------- */
  dots.forEach((dot) => {
    // Replace onclick to avoid duplicate listeners if re-init
    const newDot = dot.cloneNode(true);
    dot.parentNode.replaceChild(newDot, dot);
  });
  // Re-query after clone
  const freshDots = document.querySelectorAll('.section-dot');
  freshDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.section, 10);
      const target = sections[idx];
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ---------- Sync active dot ---------- */
  let activeIdx = 0;
  const updateActive = (idx) => {
    if (idx === activeIdx) return;
    activeIdx = idx;
    freshDots.forEach((d, i) => d.classList.toggle('active', i === idx));
    const newSection = sections[idx];
    if (newSection) {
      newSection.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        el.classList.remove('active');
        void el.offsetWidth;
        el.classList.add('active');
      });
    }
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const idx = Array.from(sections).indexOf(entry.target);
        if (idx !== -1) updateActive(idx);
      }
    });
  }, { root: snapContainer, threshold: [0.5, 0.7] });

  sections.forEach((s) => io.observe(s));

  /* ---------- Keyboard navigation ---------- */
  const keyHandler = (e) => {
    let nextIdx = activeIdx;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      nextIdx = Math.min(activeIdx + 1, sections.length - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      nextIdx = Math.max(activeIdx - 1, 0);
      e.preventDefault();
    } else if (e.key === 'Home') {
      nextIdx = 0;
      e.preventDefault();
    } else if (e.key === 'End') {
      nextIdx = sections.length - 1;
      e.preventDefault();
    }
    if (nextIdx !== activeIdx) {
      sections[nextIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  document.addEventListener('keydown', keyHandler);

  /* ---------- Butterfly parallax ---------- */
  if (window.matchMedia('(min-width: 900px) and (hover: hover)').matches) {
    const butterflies = snapContainer.querySelectorAll('.butterfly');
    snapContainer.addEventListener('mousemove', (e) => {
      const rect = snapContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      butterflies.forEach((b, i) => {
        const depth = (i + 1) * 8;
        // Preserve existing animation by using CSS variable
        b.style.setProperty('--parallax-x', `${x * depth}px`);
        b.style.setProperty('--parallax-y', `${y * depth}px`);
      });
    });
  }

  /* ---------- Touch swipe (desktop/tablet wide view only) ---------- */
  let touchStartY = 0;
  snapContainer.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  snapContainer.addEventListener('touchend', (e) => {
    if (window.innerWidth <= 900) return; // Allow natural scrolling on mobile
    const touchEndY = e.changedTouches[0].screenY;
    const diff = touchStartY - touchEndY;
    if (Math.abs(diff) < 50) return;
    let nextIdx = activeIdx;
    if (diff > 0) {
      nextIdx = Math.min(activeIdx + 1, sections.length - 1);
    } else {
      nextIdx = Math.max(activeIdx - 1, 0);
    }
    if (nextIdx !== activeIdx) {
      sections[nextIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, { passive: true });
};

/* Auto-init on DOMContentLoaded if container exists at load time */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('snapContainer')) {
    window.MF.initCollection();
  }
});
