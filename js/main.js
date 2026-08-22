/* ==========================================================================
   MUJTABA FRAGRANCES — Shared interactions
   - Sticky nav background on scroll
   - IntersectionObserver-based reveal animations
   - Mobile nav toggle
   - Working cart (add to cart buttons everywhere)
   - Toast notifications
   - Filter tags
   - Smooth scroll
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Toast utility ---------- */
  function showToast(message, link) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="5 12 10 17 19 7"/></svg><span class="toast-msg"></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector('.toast-msg').textContent = message;
    if (link) {
      toast.style.cursor = 'pointer';
      toast.onclick = () => { window.location.href = link; };
    } else {
      toast.style.cursor = 'default';
      toast.onclick = null;
    }
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 3500);
  }
  window.MF = window.MF || {};
  window.MF.toast = showToast;

  /* ---------- Sticky nav & Back to Top ---------- */
  const nav = document.getElementById('nav');
  let backToTopBtn = document.getElementById('backToTop');

  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTop';
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.setAttribute('aria-label', 'Back to Top');
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
  }

  const snapContainer = document.getElementById('snapContainer');
  const isHomePage = document.body.classList.contains('page-home') || 
                     (!document.body.classList.contains('page-inner') && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')));

  const handleScrollProgress = () => {
    const scrollY = snapContainer ? snapContainer.scrollTop : (window.scrollY || window.pageYOffset);
    
    if (nav) {
      if (!isHomePage) {
        // On all inner pages, keep island floating navbar fixed and constant
        nav.classList.add('scrolled');
      } else {
        // On home page, start normal at top, morph to island pill when scrolled > 30px
        if (scrollY > 30) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  if (snapContainer) {
    snapContainer.addEventListener('scroll', handleScrollProgress, { passive: true });
  }
  window.addEventListener('scroll', handleScrollProgress, { passive: true });
  handleScrollProgress();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      if (window.MF && window.MF.lenis && typeof window.MF.lenis.scrollTo === 'function') {
        window.MF.lenis.scrollTo(0);
      } else if (snapContainer) {
        snapContainer.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('active'));
  }

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      if (isOpen) {
        navLinks.style.display = '';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.background = 'var(--overlay-dark)';
        navLinks.style.backdropFilter = 'blur(20px)';
        navLinks.style.padding = '24px 4rem';
        navLinks.style.gap = '16px';
        navLinks.style.borderBottom = '1px solid var(--border-gold)';
      }
    });
  }

  /* ---------- Filter tags ---------- */
  const filterTags = document.querySelectorAll('.filter-tag');
  filterTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      filterTags.forEach((t) => t.classList.remove('active'));
      tag.classList.add('active');
    });
  });

  /* ---------- Smooth scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Hero parallax ---------- */
  const heroImg = document.querySelector('.hero-image');
  if (heroImg && window.matchMedia('(min-width: 900px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < 800) heroImg.style.transform = `translateY(${y * 0.08}px)`;
    }, { passive: true });
  }

  /* ---------- Working "Add to Cart" buttons ---------- */
  // Any element with data-add-to-cart="<productId>" will add to cart
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add-to-cart]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const productId = btn.dataset.addToCart;
    const sizeMl = btn.dataset.sizeMl ? parseInt(btn.dataset.sizeMl, 10) : 50;
    const qty = btn.dataset.qty ? parseInt(btn.dataset.qty, 10) : 1;
    if (window.MF && window.MF.cart) {
      window.MF.cart.add(productId, qty, sizeMl);
      const product = window.findProduct ? window.findProduct(productId) : null;
      const name = product ? product.name : 'Item';
      showToast(`${name} (${sizeMl}ml) added to cart`, 'cart.html');
    }
  });

  /* ---------- In-Card ML Size Selector Helper ---------- */
  window.selectCardSize = function (btn, productId, ml, price) {
    const card = btn.closest('.product-card');
    if (!card) return;
    const sizePills = card.querySelectorAll('.size-pill');
    sizePills.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');

    const priceDisplay = card.querySelector('.card-price-display');
    if (priceDisplay && window.formatPrice) {
      priceDisplay.textContent = window.formatPrice(price);
    }

    const addBtn = card.querySelector('[data-add-to-cart]');
    if (addBtn) {
      addBtn.dataset.sizeMl = ml;
    }
  };

  /* ---------- Global Product Card Generator ---------- */
  window.createProductCardHTML = function (p) {
    const collection = p.collection || 'unisex';
    const genderClass = collection === 'men' ? 'gender-card-men' : (collection === 'women' ? 'gender-card-women' : 'gender-card-unisex');
    const badgeClass = collection === 'men' ? 'badge-men' : (collection === 'women' ? 'badge-women' : 'badge-unisex');
    const genderLabel = collection === 'men' ? "Men's" : (collection === 'women' ? "Women's" : "Unisex");
    const price50 = p.sizes && p.sizes[0] ? p.sizes[0].price : p.price;
    const price100 = p.sizes && p.sizes[1] ? p.sizes[1].price : Math.round(p.price * 1.6);

    return `
      <article class="glass-card product-card ${genderClass}" onclick="window.location.href='product.html?id=${p.id}'">
        <div class="product-card-image skeleton-loader">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onload="this.classList.add('img-loaded'); this.parentElement.classList.remove('skeleton-loader');" onerror="this.parentElement.classList.remove('skeleton-loader');">
        </div>
        <div class="product-card-body">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span class="gender-badge ${badgeClass}">${genderLabel}</span>
            <span style="font-size:13px; font-weight:600; color:var(--accent);" class="card-price-display">${window.formatPrice(price50)}</span>
          </div>
          <h3>${p.name}</h3>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:12px; height:34px; overflow:hidden;">${p.tagline}</p>
          
          <div class="card-size-selector" onclick="event.stopPropagation();">
            <button type="button" class="size-pill active" onclick="window.selectCardSize(this, '${p.id}', 50, ${price50})">50ml</button>
            <button type="button" class="size-pill" onclick="window.selectCardSize(this, '${p.id}', 100, ${price100})">100ml</button>
          </div>

          <div class="card-actions-row" onclick="event.stopPropagation();">
            <button type="button" class="btn-card-add" data-add-to-cart="${p.id}" data-size-ml="50">
              <i class="fa-solid fa-bag-shopping"></i> Add to Cart
            </button>
            <button type="button" class="btn-quick-view" title="Quick View" onclick="event.stopPropagation(); window.openQuickView('${p.id}');">
              <i class="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  };

  /* ---------- QUICK VIEW MODAL LOGIC ---------- */
  function ensureQuickViewModal() {
    let backdrop = document.getElementById('quickViewBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'quickViewBackdrop';
      backdrop.className = 'quick-view-backdrop';
      backdrop.innerHTML = `
        <div class="quick-view-modal">
          <button class="quick-view-close" id="quickViewCloseBtn" aria-label="Close modal">&times;</button>
          <div id="quickViewContent"></div>
        </div>
      `;
      document.body.appendChild(backdrop);

      const closeBtn = backdrop.querySelector('#quickViewCloseBtn');
      closeBtn.addEventListener('click', () => window.closeQuickView());
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) window.closeQuickView();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && backdrop.classList.contains('active')) {
          window.closeQuickView();
        }
      });
    }
    return backdrop;
  }

  window.openQuickView = function (productId) {
    if (!window.PRODUCTS) return;
    const p = window.findProduct ? window.findProduct(productId) : window.PRODUCTS.find(x => x.id === productId);
    if (!p) return;

    const backdrop = ensureQuickViewModal();
    const content = backdrop.querySelector('#quickViewContent');

    const collection = p.collection || 'unisex';
    const badgeClass = collection === 'men' ? 'badge-men' : (collection === 'women' ? 'badge-women' : 'badge-unisex');
    const genderLabel = collection === 'men' ? "Men's" : (collection === 'women' ? "Women's" : "Unisex");
    const price50 = p.sizes && p.sizes[0] ? p.sizes[0].price : p.price;
    const price100 = p.sizes && p.sizes[1] ? p.sizes[1].price : Math.round(p.price * 1.6);

    let selectedSize = 50;
    let selectedPrice = price50;
    let qty = 1;

    content.innerHTML = `
      <div class="quick-view-grid">
        <div class="quick-view-img-wrap skeleton-loader">
          <img src="${p.image}" alt="${p.name}" onload="this.parentElement.classList.remove('skeleton-loader');" onerror="this.parentElement.classList.remove('skeleton-loader');">
        </div>
        <div>
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
            <span class="gender-badge ${badgeClass}">${genderLabel}</span>
            <span style="font-size:12px; letter-spacing:0.15em; text-transform:uppercase; color:var(--text-muted);">${p.collectionName} Collection</span>
          </div>
          <h2 style="font-family:var(--font-heading); font-size:28px; font-weight:300; margin-bottom:6px; color:#fff;">${p.name}</h2>
          <p style="font-size:14px; color:var(--accent); font-style:italic; margin-bottom:14px;">"${p.tagline}"</p>
          
          <p style="font-size:13px; color:var(--text-muted); line-height:1.6; margin-bottom:18px;">${p.description}</p>
          
          <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:12px; border:1px solid rgba(255,255,255,0.08); margin-bottom:18px; font-size:12px;">
            <div style="margin-bottom:4px;"><strong style="color:var(--accent);">Top:</strong> <span style="color:#d1d5db;">${p.notes ? p.notes.top : 'N/A'}</span></div>
            <div style="margin-bottom:4px;"><strong style="color:var(--accent);">Heart:</strong> <span style="color:#d1d5db;">${p.notes ? p.notes.heart : 'N/A'}</span></div>
            <div><strong style="color:var(--accent);">Base:</strong> <span style="color:#d1d5db;">${p.notes ? p.notes.base : 'N/A'}</span></div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
            <div>
              <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); margin-bottom:4px;">Select Size</div>
              <div style="display:flex; gap:8px;">
                <button type="button" class="size-pill active" id="qvSize50">50 ml</button>
                <button type="button" class="size-pill" id="qvSize100">100 ml</button>
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); margin-bottom:4px;">Price</div>
              <div id="qvPriceDisplay" style="font-size:22px; font-weight:600; color:var(--accent);">${window.formatPrice(price50)}</div>
            </div>
          </div>

          <div style="display:flex; gap:12px; align-items:center;">
            <div style="display:flex; align-items:center; border:1px solid rgba(255,255,255,0.2); border-radius:10px; overflow:hidden; background:rgba(0,0,0,0.3);">
              <button type="button" id="qvMinusQty" style="padding:8px 14px; background:none; border:none; color:#fff; cursor:pointer;">-</button>
              <span id="qvQtyDisplay" style="padding:8px 12px; font-size:14px; font-weight:600; color:#fff;">1</span>
              <button type="button" id="qvPlusQty" style="padding:8px 14px; background:none; border:none; color:#fff; cursor:pointer;">+</button>
            </div>
            <button type="button" class="btn-card-add" id="qvAddToCartBtn" style="padding:12px 20px; font-size:13px;">
              <i class="fa-solid fa-bag-shopping"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;

    const btn50 = content.querySelector('#qvSize50');
    const btn100 = content.querySelector('#qvSize100');
    const priceDisp = content.querySelector('#qvPriceDisplay');
    const minusBtn = content.querySelector('#qvMinusQty');
    const plusBtn = content.querySelector('#qvPlusQty');
    const qtyDisp = content.querySelector('#qvQtyDisplay');
    const addBtn = content.querySelector('#qvAddToCartBtn');

    btn50.addEventListener('click', () => {
      btn50.classList.add('active');
      btn100.classList.remove('active');
      selectedSize = 50;
      selectedPrice = price50;
      priceDisp.textContent = window.formatPrice(price50);
    });

    btn100.addEventListener('click', () => {
      btn100.classList.add('active');
      btn50.classList.remove('active');
      selectedSize = 100;
      selectedPrice = price100;
      priceDisp.textContent = window.formatPrice(price100);
    });

    minusBtn.addEventListener('click', () => {
      if (qty > 1) {
        qty--;
        qtyDisp.textContent = qty;
      }
    });

    plusBtn.addEventListener('click', () => {
      qty++;
      qtyDisp.textContent = qty;
    });

    addBtn.addEventListener('click', () => {
      if (window.MF && window.MF.cart) {
        window.MF.cart.add(p.id, qty, selectedSize);
        showToast(`${p.name} (${selectedSize}ml x${qty}) added to cart`, 'cart.html');
        window.closeQuickView();
      }
    });

    backdrop.classList.add('active');
  };

  window.closeQuickView = function () {
    const backdrop = document.getElementById('quickViewBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  };

  /* ---------- Update cart badge on cart:changed ---------- */
  window.addEventListener('cart:changed', () => {
    if (window.MF && window.MF.cart) {
      window.MF.cart.updateBadge();
    }
  });

  /* ---------- Feature Story Switcher ---------- */
  const featureTitle = document.getElementById('featureTitle');
  const featureDesc = document.getElementById('featureDesc');
  const featureNum = document.getElementById('featureNum');
  const featurePrevBtn = document.getElementById('featurePrevBtn');
  const featureNextBtn = document.getElementById('featureNextBtn');

  if (featureTitle && featureDesc && featurePrevBtn && featureNextBtn) {
    const stories = [
      {
        num: '(01)',
        tag: 'HERITAGE',
        title: 'Ethically Crafted,<br><span class="italic-gold">Exquisitely Sourced</span>',
        desc: 'We partner with world-renowned perfumers and source the finest, sustainable ingredients. Every fragrance is a testament to our commitment to craft, community, and the natural world that inspires us.'
      },
      {
        num: '(02)',
        tag: 'PURITY',
        title: 'Botanical Purity,<br><span class="italic-gold">Sustainably Harvested</span>',
        desc: 'From rare Taif roses to wild-harvested Cambodian agarwood, our ingredients are ethically gathered at peak bloom, preserving nature’s integrity and supporting indigenous farming communities.'
      },
      {
        num: '(03)',
        tag: 'ARTISAN',
        title: 'Artisanal Mastery,<br><span class="italic-gold">Cruelty-Free Legacy</span>',
        desc: 'Hand-blended in micro-batches with zero synthetic fillers or animal testing. Our master perfumers balance ancient heritage techniques with modern olfactory innovation.'
      }
    ];

    let currentStory = 0;

    function updateStory(index) {
      currentStory = (index + stories.length) % stories.length;
      const textContainer = featureTitle.parentElement;
      textContainer.style.opacity = '0';
      textContainer.style.transform = 'translateY(10px)';
      textContainer.style.transition = 'all 0.3s ease';

      // Trigger Gold Seal pulse animation
      const goldSeal = document.getElementById('feature3dContainer');
      if (goldSeal) {
        goldSeal.classList.remove('pulse-spin');
        void goldSeal.offsetWidth;
        goldSeal.classList.add('pulse-spin');
      }

      setTimeout(() => {
        featureTitle.innerHTML = stories[currentStory].title;
        featureDesc.textContent = stories[currentStory].desc;
        if (featureNum) {
          featureNum.textContent = stories[currentStory].num;
          const numAccent = featureNum.parentElement.querySelector('.feature-num-accent');
          if (numAccent) numAccent.textContent = stories[currentStory].tag;
        }
        textContainer.style.opacity = '1';
        textContainer.style.transform = 'translateY(0)';
      }, 300);
    }

    featureNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updateStory(currentStory + 1);
    });
    featurePrevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updateStory(currentStory - 1);
    });
  }

  /* ---------- Play button ---------- */
  const playBtn = document.querySelector('.play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playBtn.animate(
        [{ transform: 'translate(-50%, -50%) scale(1)' },
         { transform: 'translate(-50%, -50%) scale(0.85)' },
         { transform: 'translate(-50%, -50%) scale(1)' }],
        { duration: 300 }
      );
    });
  }

  /* ---------- Customer Testimonials Slider ---------- */
  const testiTrack = document.getElementById('testiTrack');
  const testiPrevBtn = document.getElementById('testiPrevBtn');
  const testiNextBtn = document.getElementById('testiNextBtn');
  const testiDotsContainer = document.getElementById('testiDots');
  const testiWrap = document.getElementById('testimonialSliderWrap');

  if (testiTrack && testiPrevBtn && testiNextBtn && testiDotsContainer) {
    const slides = testiTrack.querySelectorAll('.testimonial-card');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let autoPlayTimer = null;

    // Create dots
    testiDotsContainer.innerHTML = Array.from({ length: totalSlides }, (_, i) =>
      `<button class="slider-dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>`
    ).join('');

    const dots = testiDotsContainer.querySelectorAll('.slider-dot');

    function goToSlide(index) {
      currentSlide = (index + totalSlides) % totalSlides;
      testiTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    testiNextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoPlay();
    });

    testiPrevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoPlay();
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.dataset.slide, 10);
        goToSlide(slideIndex);
        resetAutoPlay();
      });
    });

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 4500);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    if (testiWrap) {
      testiWrap.addEventListener('mouseenter', stopAutoPlay);
      testiWrap.addEventListener('mouseleave', startAutoPlay);
      testiWrap.addEventListener('touchstart', stopAutoPlay, { passive: true });
      testiWrap.addEventListener('touchend', startAutoPlay, { passive: true });
    }

    startAutoPlay();
  }

})();
