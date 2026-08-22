/* ==========================================================================
   MUJTABA FRAGRANCES — Shared Global Engine
   - Corner Slide-Out Cart & Favorites & Orders Drawer
   - Working Global Live Search Modal
   - Save to Wishlist & Product Card Engine
   - Sticky Island Navbar & Back to Top
   - Simple, natural spoken English throughout
   ========================================================================== */

(function () {
  'use strict';

  window.MF = window.MF || {};

  /* ---------- Toast Notification Utility ---------- */
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
      toast.onclick = () => {
        if (link === 'cart.html' && typeof window.MF.openCartDrawer === 'function') {
          window.MF.openCartDrawer('cart');
        } else {
          window.location.href = link;
        }
      };
    } else {
      toast.style.cursor = 'default';
      toast.onclick = null;
    }
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 3500);
  }
  window.MF.toast = showToast;

  /* ---------- Sticky Nav & Back to Top ---------- */
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
        nav.classList.add('scrolled');
      } else {
        if (scrollY > 30) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      }
    }
    if (backToTopBtn) {
      if (scrollY > 350) backToTopBtn.classList.add('visible');
      else backToTopBtn.classList.remove('visible');
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

  /* ---------- Reveal on Scroll ---------- */
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

  /* ---------- Mobile Nav Toggle Engine ---------- */
  function initMobileNav() {
    const navToggles = document.querySelectorAll('.nav-toggle, #navToggle');
    const navLinksList = document.querySelectorAll('.nav-links, #navLinks');

    navToggles.forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = toggle.classList.toggle('active');
        navLinksList.forEach((links) => {
          if (isOpen) {
            links.classList.add('open');
          } else {
            links.classList.remove('open');
          }
        });
      });
    });

    // Close when clicking any nav link
    navLinksList.forEach((links) => {
      links.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navToggles.forEach((t) => t.classList.remove('active'));
          navLinksList.forEach((l) => l.classList.remove('open'));
        });
      });
    });

    // Close when clicking outside navbar
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-links') && !e.target.closest('.nav-toggle') && !e.target.closest('#navToggle')) {
        navToggles.forEach((t) => t.classList.remove('active'));
        navLinksList.forEach((l) => l.classList.remove('open'));
      }
    });
  }
  initMobileNav();

  /* ---------- Filter Tags Helper ---------- */
  const filterTags = document.querySelectorAll('.filter-tag');
  filterTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      filterTags.forEach((t) => t.classList.remove('active'));
      tag.classList.add('active');
    });
  });

  /* ---------- Global "Add to Cart" delegated click ---------- */
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
      const name = product ? product.name : 'Perfume';
      showToast(`${name} (${sizeMl}ml) added to cart!`, 'cart.html');
      
      // Open Corner Cart Drawer smoothly
      if (typeof window.MF.openCartDrawer === 'function') {
        window.MF.openCartDrawer('cart');
      }
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

  /* ==========================================================================
     GLOBAL PRODUCT CARD HTML GENERATOR (Includes Wishlist Heart Button)
     ========================================================================== */
  window.createProductCardHTML = function (p) {
    const collection = p.collection || 'unisex';
    const genderClass = collection === 'men' ? 'gender-card-men' : (collection === 'women' ? 'gender-card-women' : 'gender-card-unisex');
    const badgeClass = collection === 'men' ? 'badge-men' : (collection === 'women' ? 'badge-women' : 'badge-unisex');
    const genderLabel = collection === 'men' ? "Men's" : (collection === 'women' ? "Women's" : "Unisex");
    const price50 = p.sizes && p.sizes[0] ? p.sizes[0].price : p.price;
    const price100 = p.sizes && p.sizes[1] ? p.sizes[1].price : Math.round(p.price * 1.6);
    const isSaved = window.MF && window.MF.wishlist && window.MF.wishlist.has(p.id);

    return `
      <article class="glass-card product-card ${genderClass}" onclick="window.location.href='product.html?id=${p.id}'">
        <div class="product-card-image skeleton-loader">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onload="this.classList.add('img-loaded'); this.parentElement.classList.remove('skeleton-loader');" onerror="this.parentElement.classList.remove('skeleton-loader');">
          <button type="button" class="card-wishlist-btn ${isSaved ? 'is-active' : ''}" data-wishlist-id="${p.id}" aria-label="${isSaved ? 'Remove from favorites' : 'Save to favorites'}" title="${isSaved ? 'Remove from favorites' : 'Save to favorites'}" onclick="event.stopPropagation(); window.toggleWishlist('${p.id}', this);">
            <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
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
            <button type="button" class="btn-notes btn-notes-sm" title="Fragrance Notes" onclick="event.stopPropagation(); window.openNotesModal('${p.id}');">
              <i class="fa-solid fa-feather-pointed"></i> Notes
            </button>
          </div>
        </div>
      </article>
    `;
  };

  /* ==========================================================================
     FRAGRANCE NOTES MODAL
     ========================================================================== */
  function ensureNotesModal() {
    let backdrop = document.getElementById('notesModalBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'notesModalBackdrop';
      backdrop.className = 'notes-modal-backdrop quick-view-backdrop';
      backdrop.innerHTML = `
        <div class="notes-modal-dialog quick-view-modal">
          <button class="quick-view-close" id="notesModalCloseBtn" aria-label="Close notes">&times;</button>
          <div id="notesModalContent"></div>
        </div>
      `;
      document.body.appendChild(backdrop);

      const closeBtn = backdrop.querySelector('#notesModalCloseBtn');
      closeBtn.addEventListener('click', () => window.closeNotesModal());
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) window.closeNotesModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && backdrop.classList.contains('active')) {
          window.closeNotesModal();
        }
      });
    }
    return backdrop;
  }

  window.openNotesModal = function (productId) {
    if (!window.PRODUCTS) return;
    const p = window.findProduct ? window.findProduct(productId) : window.PRODUCTS.find(x => x.id === productId);
    if (!p) return;

    const backdrop = ensureNotesModal();
    const content = backdrop.querySelector('#notesModalContent');

    const collection = p.collection || 'unisex';
    const badgeClass = collection === 'men' ? 'badge-men' : (collection === 'women' ? 'badge-women' : 'badge-unisex');
    const genderLabel = collection === 'men' ? "Men's" : (collection === 'women' ? "Women's" : "Unisex");
    const price50 = p.sizes && p.sizes[0] ? p.sizes[0].price : p.price;

    const topNote = p.notes && p.notes.top ? p.notes.top : 'Fresh opening notes';
    const heartNote = p.notes && p.notes.heart ? p.notes.heart : 'Floral and wood notes';
    const baseNote = p.notes && p.notes.base ? p.notes.base : 'Warm amber, vanilla and musk';

    content.innerHTML = `
      <div class="notes-modal-wrapper">
        <div class="notes-header-block">
          <div class="notes-badge-row">
            <span class="gender-badge ${badgeClass}">${genderLabel}</span>
            <span class="notes-olfactory-tag"><i class="fa-solid fa-feather-pointed"></i> Scent Notes</span>
          </div>
          <h2 class="notes-perfume-title">${p.name}</h2>
          <p class="notes-perfume-tagline">"${p.tagline}"</p>
        </div>

        <div class="notes-pyramid-grid">
          <!-- TOP NOTES -->
          <div class="note-tier-card tier-top">
            <div class="note-tier-header">
              <span class="tier-icon">🌸</span>
              <div>
                <h4>Top Notes</h4>
                <span class="tier-timing">First 15–30 mins (Opening)</span>
              </div>
            </div>
            <p class="note-tier-ingredients">${topNote}</p>
          </div>

          <!-- HEART NOTES -->
          <div class="note-tier-card tier-heart">
            <div class="note-tier-header">
              <span class="tier-icon">🌿</span>
              <div>
                <h4>Heart Notes</h4>
                <span class="tier-timing">2–4 hours (Main Scent)</span>
              </div>
            </div>
            <p class="note-tier-ingredients">${heartNote}</p>
          </div>

          <!-- BASE NOTES -->
          <div class="note-tier-card tier-base">
            <div class="note-tier-header">
              <span class="tier-icon">🪵</span>
              <div>
                <h4>Base Notes</h4>
                <span class="tier-timing">Lasts 12+ hours (Lasting Base)</span>
              </div>
            </div>
            <p class="note-tier-ingredients">${baseNote}</p>
          </div>
        </div>

        <div class="notes-performance-strip">
          <div class="perf-metric">
            <span class="perf-lbl"><i class="fa-regular fa-clock"></i> Longevity</span>
            <span class="perf-val">${p.longevity}</span>
          </div>
          <div class="perf-divider"></div>
          <div class="perf-metric">
            <span class="perf-lbl"><i class="fa-solid fa-wind"></i> Projection</span>
            <span class="perf-val">${p.sillage || 'Strong'}</span>
          </div>
          <div class="perf-divider"></div>
          <div class="perf-metric">
            <span class="perf-lbl"><i class="fa-regular fa-calendar"></i> Season</span>
            <span class="perf-val">${p.season || 'All Season'}</span>
          </div>
        </div>

        <div class="notes-action-row">
          <a href="product.html?id=${p.id}" class="btn-target" style="flex:1; text-align:center; padding:12px 18px; font-size:13px;">
            Full Details →
          </a>
          <button type="button" class="btn-glass" style="flex:1; justify-content:center; padding:12px 18px; font-size:13px;" onclick="
            if (window.MF && window.MF.cart) {
              window.MF.cart.add('${p.id}', 1, 50);
              showToast('${p.name} (50ml) added to cart!', 'cart.html');
              window.closeNotesModal();
            }
          ">
            <svg viewBox="0 0 24 24" style="width:16px;height:16px;margin-right:6px;"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>
            Add 50ml (${window.formatPrice ? window.formatPrice(price50) : 'Rs ' + price50})
          </button>
        </div>
      </div>
    `;

    backdrop.classList.add('active');
  };

  window.closeNotesModal = function () {
    const backdrop = document.getElementById('notesModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  };
  window.openQuickView = window.openNotesModal;
  window.closeQuickView = window.closeNotesModal;

  /* ==========================================================================
     WORKING GLOBAL LIVE SEARCH MODAL
     ========================================================================== */
  function ensureSearchModal() {
    let backdrop = document.getElementById('searchModalBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'searchModalBackdrop';
      backdrop.className = 'search-modal-backdrop';
      backdrop.innerHTML = `
        <div class="search-modal-dialog glass-panel">
          <div class="search-modal-header">
            <div class="search-bar-wrap">
              <i class="fa-solid fa-magnifying-glass search-bar-icon"></i>
              <input type="text" id="globalSearchInput" class="search-modal-input" placeholder="Search by name, note (Amber, Oud, Rose, Vanilla), or type..." autocomplete="off">
              <button type="button" id="clearSearchBtn" class="search-clear-btn" aria-label="Clear search" style="display:none;">&times;</button>
            </div>
            <button type="button" class="search-modal-close" id="searchModalCloseBtn" aria-label="Close search">&times;</button>
          </div>

          <div class="search-quick-tags" id="searchQuickTags">
            <span class="quick-tags-label">Popular:</span>
            <button type="button" class="search-chip" data-search="Oud">Oud</button>
            <button type="button" class="search-chip" data-search="Amber">Amber</button>
            <button type="button" class="search-chip" data-search="Rose">Rose</button>
            <button type="button" class="search-chip" data-search="Vanilla">Vanilla</button>
            <button type="button" class="search-chip" data-search="Citrus">Citrus</button>
            <button type="button" class="search-chip" data-search="Men">Men's</button>
            <button type="button" class="search-chip" data-search="Women">Women's</button>
            <button type="button" class="search-chip" data-search="Unisex">Unisex</button>
          </div>

          <div class="search-results-container" id="searchResultsContainer">
            <!-- Populated on typing -->
          </div>
        </div>
      `;
      document.body.appendChild(backdrop);

      const input = backdrop.querySelector('#globalSearchInput');
      const clearBtn = backdrop.querySelector('#clearSearchBtn');
      const closeBtn = backdrop.querySelector('#searchModalCloseBtn');
      const resultsEl = backdrop.querySelector('#searchResultsContainer');

      function doSearch(q) {
        q = (q || '').trim().toLowerCase();
        if (!q) {
          clearBtn.style.display = 'none';
          resultsEl.innerHTML = `
            <div class="search-empty-state">
              <i class="fa-solid fa-spray-can-sparkles" style="font-size:32px; color:var(--accent); margin-bottom:12px; opacity:0.7;"></i>
              <h4>Explore Our Fragrances</h4>
              <p>Type the name of any perfume, scent note, or collection above to search instantly.</p>
            </div>
          `;
          return;
        }

        clearBtn.style.display = 'block';

        if (!window.PRODUCTS || !window.PRODUCTS.length) {
          resultsEl.innerHTML = '<div class="search-empty-state"><p>No products available.</p></div>';
          return;
        }

        const matches = window.PRODUCTS.filter(p => {
          const name = (p.name || '').toLowerCase();
          const coll = (p.collection || '').toLowerCase();
          const tagline = (p.tagline || '').toLowerCase();
          const desc = (p.description || '').toLowerCase();
          const notesStr = p.notes ? `${p.notes.top} ${p.notes.heart} ${p.notes.base}`.toLowerCase() : '';
          return name.includes(q) || coll.includes(q) || tagline.includes(q) || desc.includes(q) || notesStr.includes(q);
        });

        if (matches.length === 0) {
          resultsEl.innerHTML = `
            <div class="search-empty-state">
              <i class="fa-regular fa-face-meh" style="font-size:32px; color:var(--text-muted); margin-bottom:12px;"></i>
              <h4>No perfumes found for "${q}"</h4>
              <p>Try searching for words like "Rose", "Oud", "Amber", "Citrus", or "Men".</p>
            </div>
          `;
          return;
        }

        resultsEl.innerHTML = `
          <div class="search-results-header">
            <span>Found ${matches.length} ${matches.length === 1 ? 'fragrance' : 'fragrances'}</span>
            <a href="shop.html?q=${encodeURIComponent(q)}" class="search-shop-link">View all in shop →</a>
          </div>
          <div class="search-results-list">
            ${matches.map(p => {
              const price50 = p.sizes && p.sizes[0] ? p.sizes[0].price : p.price;
              const genderLabel = p.collection === 'men' ? "Men's" : (p.collection === 'women' ? "Women's" : "Unisex");
              const isSaved = window.MF && window.MF.wishlist && window.MF.wishlist.has(p.id);
              return `
                <div class="search-result-item" onclick="window.location.href='product.html?id=${p.id}'">
                  <img src="${p.image}" alt="${p.name}" class="search-item-img">
                  <div class="search-item-info">
                    <h4 class="search-item-name">${p.name}</h4>
                    <span class="search-item-price">${window.formatPrice(price50)}</span>
                  </div>
                  <div class="search-item-actions" onclick="event.stopPropagation();">
                    <button type="button" class="btn-card-add btn-search-add" data-add-to-cart="${p.id}" data-size-ml="50">
                      <i class="fa-solid fa-bag-shopping"></i> Add
                    </button>
                    <button type="button" class="search-wish-btn ${isSaved ? 'is-active' : ''}" data-wishlist-id="${p.id}" onclick="window.toggleWishlist('${p.id}', this);" title="Save to favorites">
                      <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      input.addEventListener('input', (e) => doSearch(e.target.value));
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const q = input.value.trim();
          if (q) {
            window.location.href = `shop.html?q=${encodeURIComponent(q)}`;
          }
        }
      });

      clearBtn.addEventListener('click', () => {
        input.value = '';
        input.focus();
        doSearch('');
      });

      closeBtn.addEventListener('click', () => window.closeSearchModal());
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) window.closeSearchModal();
      });

      // Quick tags click
      backdrop.querySelectorAll('.search-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const term = chip.dataset.search;
          input.value = term;
          input.focus();
          doSearch(term);
        });
      });
    }
    return backdrop;
  }

  window.openSearchModal = function (initialQuery) {
    const backdrop = ensureSearchModal();
    const input = backdrop.querySelector('#globalSearchInput');
    backdrop.classList.add('active');
    if (initialQuery) {
      input.value = initialQuery;
      input.dispatchEvent(new Event('input'));
    } else {
      input.value = '';
      input.dispatchEvent(new Event('input'));
    }
    setTimeout(() => input.focus(), 100);
  };

  window.closeSearchModal = function () {
    const backdrop = document.getElementById('searchModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  };

  // Wire up all search buttons in navbar & headers
  document.addEventListener('click', (e) => {
    const searchTrigger = e.target.closest('.nav-icon[aria-label="Search"], button[aria-label="Search"], #navSearchBtn, .open-search-trigger');
    if (searchTrigger) {
      e.preventDefault();
      // If on shop.html, focus the search bar if present, or open global search
      const shopInput = document.getElementById('shopSearchInput');
      if (shopInput) {
        shopInput.focus();
        shopInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.openSearchModal();
      }
    }
  });

  // Global keyboard shortcut '/' or 'Ctrl+K' to open search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      window.openSearchModal();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      window.openSearchModal();
    } else if (e.key === 'Escape') {
      window.closeSearchModal();
      window.closeNotesModal();
      if (typeof window.MF.closeCartDrawer === 'function') window.MF.closeCartDrawer();
    }
  });

  /* ==========================================================================
     CORNER SLIDE-OUT CART & FAVORITES & ORDERS DRAWER
     ========================================================================== */
  function ensureCartDrawer() {
    let drawer = document.getElementById('cartDrawerOverlay');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'cartDrawerOverlay';
      drawer.className = 'cart-drawer-overlay';
      drawer.innerHTML = `
        <div class="cart-drawer-panel glass-panel" id="cartDrawerPanel">
          <!-- Drawer Header -->
          <div class="cart-drawer-header">
            <div class="cart-drawer-title-row">
              <h3 id="drawerMainTitle">Your Cart</h3>
              <button type="button" class="cart-drawer-close" id="cartDrawerCloseBtn" aria-label="Close cart">&times;</button>
            </div>

            <!-- Tab Switcher (Cart / Favorites / Orders) -->
            <div class="cart-drawer-tabs">
              <button type="button" class="drawer-tab-btn active" data-tab="cart">
                <i class="fa-solid fa-bag-shopping"></i> Cart (<span id="drawerCartCount">0</span>)
              </button>
              <button type="button" class="drawer-tab-btn" data-tab="wishlist">
                <i class="fa-solid fa-heart"></i> Favorites (<span id="drawerWishlistCount">0</span>)
              </button>
              <button type="button" class="drawer-tab-btn" data-tab="orders">
                <i class="fa-solid fa-clock-rotate-left"></i> Orders (<span id="drawerOrdersCount">0</span>)
              </button>
            </div>
          </div>

          <!-- Drawer Content Body -->
          <div class="cart-drawer-body" id="cartDrawerBody">
            <!-- Populated dynamically based on active tab -->
          </div>

          <!-- Drawer Footer (Sticky Checkout for Cart tab) -->
          <div class="cart-drawer-footer" id="cartDrawerFooter">
            <!-- Populated dynamically -->
          </div>
        </div>
      `;
      document.body.appendChild(drawer);

      // Event listeners for close
      drawer.querySelector('#cartDrawerCloseBtn').addEventListener('click', () => window.MF.closeCartDrawer());
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) window.MF.closeCartDrawer();
      });

      // Tab switching
      drawer.querySelectorAll('.drawer-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          drawer.querySelectorAll('.drawer-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderDrawerTab(btn.dataset.tab);
        });
      });
    }
    return drawer;
  }

  function renderDrawerTab(tab = 'cart') {
    const drawer = ensureCartDrawer();
    const body = drawer.querySelector('#cartDrawerBody');
    const footer = drawer.querySelector('#cartDrawerFooter');
    const titleEl = drawer.querySelector('#drawerMainTitle');

    // Update count badges
    const cart = window.MF.cart;
    const wishlist = window.MF.wishlist;
    const orders = window.MF.orders;

    const cartCount = cart ? cart.count() : 0;
    const wishCount = wishlist ? wishlist.count() : 0;
    const orderCount = orders ? orders.getAll().length : 0;

    drawer.querySelector('#drawerCartCount').textContent = cartCount;
    drawer.querySelector('#drawerWishlistCount').textContent = wishCount;
    drawer.querySelector('#drawerOrdersCount').textContent = orderCount;

    if (tab === 'cart') {
      titleEl.textContent = 'Shopping Cart';
      const items = cart ? cart.detailedItems() : [];

      if (items.length === 0) {
        body.innerHTML = `
          <div class="drawer-empty-state">
            <svg viewBox="0 0 24 24" style="width:64px;height:64px;stroke:var(--accent);fill:none;stroke-width:1;margin:0 auto 16px;opacity:0.6;"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>
            <h4>Your cart is empty</h4>
            <p>Explore our handcrafted perfumes and find your signature scent.</p>
            <a href="shop.html" class="btn-primary-3d" onclick="window.MF.closeCartDrawer();" style="display:inline-flex;margin-top:16px;padding:10px 24px;">
              <span>Shop All Perfumes</span>
            </a>
          </div>
        `;
        footer.style.display = 'none';
        return;
      }

      const subtotal = cart.subtotal();
      const shipping = cart.shipping();
      const total = cart.total();
      const freeShipThreshold = 10000;
      const amountNeeded = Math.max(0, freeShipThreshold - subtotal);
      const shipPercent = Math.min(100, Math.round((subtotal / freeShipThreshold) * 100));

      const freeShippingNotice = shipping === 0 
        ? `<div class="drawer-shipping-bar unlocked"><span class="ship-icon">✓</span> Free delivery across Pakistan!</div>`
        : `<div class="drawer-shipping-bar"><div class="ship-progress"><div class="ship-fill" style="width:${shipPercent}%"></div></div><span>Add Rs ${amountNeeded.toLocaleString('en-PK')} more for <strong>FREE Delivery</strong></span></div>`;

      body.innerHTML = `
        ${freeShippingNotice}
        <div class="drawer-items-list">
          ${items.map(i => `
            <div class="drawer-item">
              <img src="${i.image}" alt="${i.name}" class="drawer-item-img">
              <div class="drawer-item-info">
                <div class="drawer-item-title-row">
                  <h4 class="drawer-item-name">${i.name}</h4>
                  <button type="button" class="drawer-item-remove" data-action="remove" data-id="${i.id}" data-size="${i.sizeMl}" title="Remove item">&times;</button>
                </div>
                <div class="drawer-item-meta">${i.sizeMl}ml · Rs ${i.unitPrice.toLocaleString('en-PK')} each</div>
                
                <div class="drawer-item-bottom">
                  <!-- Touch-Friendly Quantity Controls -->
                  <div class="drawer-qty-pill">
                    <button type="button" class="drawer-qty-btn" data-action="dec" data-id="${i.id}" data-size="${i.sizeMl}" aria-label="Decrease quantity">−</button>
                    <span class="drawer-qty-val">${i.qty}</span>
                    <button type="button" class="drawer-qty-btn" data-action="inc" data-id="${i.id}" data-size="${i.sizeMl}" aria-label="Increase quantity">+</button>
                  </div>
                  <div class="drawer-item-total">Rs ${i.lineTotal.toLocaleString('en-PK')}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      footer.style.display = 'block';
      footer.innerHTML = `
        <div class="drawer-summary-rows">
          <div class="summary-line"><span>Subtotal</span><span>Rs ${subtotal.toLocaleString('en-PK')}</span></div>
          <div class="summary-line"><span>Delivery</span><span>${shipping === 0 ? '<strong style="color:var(--accent);">FREE</strong>' : 'Rs ' + shipping.toLocaleString('en-PK')}</span></div>
          <div class="summary-line total-line"><span>Total</span><span>Rs ${total.toLocaleString('en-PK')}</span></div>
        </div>
        <div class="drawer-cta-group">
          <a href="checkout.html" class="btn-primary-3d drawer-checkout-btn">
            <span>Proceed to Checkout</span>
            <svg class="btn-arrow" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg>
          </a>
          <a href="cart.html" class="drawer-view-cart-link">View Full Cart Page →</a>
        </div>
      `;

      // Attach quantity / remove handlers
      body.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const id = btn.dataset.id;
          const size = parseInt(btn.dataset.size, 10);
          const act = btn.dataset.action;
          if (act === 'inc') cart.increment(id, size);
          else if (act === 'dec') cart.decrement(id, size);
          else if (act === 'remove') cart.remove(id, size);
          renderDrawerTab('cart');
        });
      });

    } else if (tab === 'wishlist') {
      titleEl.textContent = 'Your Saved Favorites';
      footer.style.display = 'none';

      const savedProducts = wishlist ? wishlist.getProducts() : [];

      if (savedProducts.length === 0) {
        body.innerHTML = `
          <div class="drawer-empty-state">
            <i class="fa-regular fa-heart" style="font-size:48px; color:var(--accent); margin-bottom:16px; opacity:0.6;"></i>
            <h4>No favorites saved yet</h4>
            <p>Tap the heart icon on any perfume to save it to your browser favorites.</p>
            <a href="shop.html" class="btn-primary-3d" onclick="window.MF.closeCartDrawer();" style="display:inline-flex;margin-top:16px;padding:10px 24px;">
              <span>Explore Collection</span>
            </a>
          </div>
        `;
        return;
      }

      body.innerHTML = `
        <div class="drawer-items-list">
          ${savedProducts.map(p => {
            const price50 = p.sizes && p.sizes[0] ? p.sizes[0].price : p.price;
            const genderLabel = p.collection === 'men' ? "Men's" : (p.collection === 'women' ? "Women's" : "Unisex");
            return `
              <div class="drawer-item wishlist-item" onclick="window.location.href='product.html?id=${p.id}'">
                <img src="${p.image}" alt="${p.name}" class="drawer-item-img">
                <div class="drawer-item-info">
                  <div class="drawer-item-title-row">
                    <h4 class="drawer-item-name">${p.name}</h4>
                    <button type="button" class="drawer-item-remove" data-remove-wish="${p.id}" title="Remove from favorites">&times;</button>
                  </div>
                  <div class="drawer-item-meta">${genderLabel} · ${window.formatPrice(price50)}</div>
                  <p style="font-size:12px; color:var(--text-muted); margin:4px 0 8px; line-height:1.3;">${p.tagline}</p>
                  
                  <div class="drawer-item-bottom" onclick="event.stopPropagation();">
                    <button type="button" class="btn-card-add" data-add-to-cart="${p.id}" data-size-ml="50" style="padding:6px 14px; font-size:11px;">
                      <i class="fa-solid fa-bag-shopping"></i> Add 50ml
                    </button>
                    <a href="product.html?id=${p.id}" class="drawer-detail-link">Details →</a>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      // Remove from wishlist handlers
      body.querySelectorAll('[data-remove-wish]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = btn.dataset.removeWish;
          wishlist.remove(id);
          renderDrawerTab('wishlist');
        });
      });

    } else if (tab === 'orders') {
      titleEl.textContent = 'Your Recent Orders';
      footer.style.display = 'none';

      const allOrders = orders ? orders.getAll() : [];

      if (allOrders.length === 0) {
        body.innerHTML = `
          <div class="drawer-empty-state">
            <i class="fa-solid fa-clock-rotate-left" style="font-size:48px; color:var(--accent); margin-bottom:16px; opacity:0.6;"></i>
            <h4>No recent orders</h4>
            <p>When you complete a purchase, your order history is safely saved here on your browser.</p>
            <a href="shop.html" class="btn-primary-3d" onclick="window.MF.closeCartDrawer();" style="display:inline-flex;margin-top:16px;padding:10px 24px;">
              <span>Start Shopping</span>
            </a>
          </div>
        `;
        return;
      }

      body.innerHTML = `
        <div class="drawer-orders-list">
          ${allOrders.map(o => {
            const dateStr = o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent';
            const itemsCount = o.items ? o.items.reduce((s, i) => s + (i.qty || 1), 0) : 0;
            return `
              <div class="drawer-order-card">
                <div class="drawer-order-top">
                  <span class="order-badge-confirmed">✓ ${o.status || 'Confirmed'}</span>
                  <span class="order-date">${dateStr}</span>
                </div>
                <div class="order-num-id">Order ID: <strong>${o.orderId}</strong></div>
                <div class="order-items-preview">
                  ${(o.items || []).map(i => `
                    <div class="order-mini-item">
                      <span>${i.name} (${i.sizeMl || 50}ml) × ${i.qty || 1}</span>
                      <span>Rs ${(i.lineTotal || (i.unitPrice * i.qty)).toLocaleString('en-PK')}</span>
                    </div>
                  `).join('')}
                </div>
                <div class="order-total-row">
                  <span>Total Amount</span>
                  <strong>Rs ${(o.total || 0).toLocaleString('en-PK')}</strong>
                </div>
                <div class="order-actions-row">
                  <a href="order-confirmation.html?id=${o.orderId}" class="order-view-btn">View Order Receipt →</a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
  }

  window.MF.openCartDrawer = function (tab = 'cart') {
    const drawer = ensureCartDrawer();
    drawer.classList.add('active');
    // Set active tab button
    drawer.querySelectorAll('.drawer-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    renderDrawerTab(tab);
  };

  window.MF.closeCartDrawer = function () {
    const drawer = document.getElementById('cartDrawerOverlay');
    if (drawer) drawer.classList.remove('active');
  };

  window.MF.openWishlistDrawer = function () {
    window.MF.openCartDrawer('wishlist');
  };

  window.MF.openOrdersDrawer = function () {
    window.MF.openCartDrawer('orders');
  };

  // Intercept cart icon clicks across all pages so it opens the smooth corner drawer!
  document.addEventListener('click', (e) => {
    const cartTrigger = e.target.closest('.nav-icon[aria-label="Cart"], .open-cart-drawer');
    if (cartTrigger) {
      // If user is already on cart.html or checkout.html, they might want either full page or drawer
      // But opening the drawer instantly gives the corner slide-over experience requested!
      if (!window.location.pathname.endsWith('cart.html') && !window.location.pathname.endsWith('checkout.html')) {
        e.preventDefault();
        window.MF.openCartDrawer('cart');
      }
    }
  });

  // Re-render drawer when cart or wishlist changes
  window.addEventListener('cart:changed', () => {
    if (window.MF && window.MF.cart) {
      window.MF.cart.updateBadge();
    }
    const drawer = document.getElementById('cartDrawerOverlay');
    if (drawer && drawer.classList.contains('active')) {
      const activeTabBtn = drawer.querySelector('.drawer-tab-btn.active');
      const activeTab = activeTabBtn ? activeTabBtn.dataset.tab : 'cart';
      renderDrawerTab(activeTab);
    }
  });

  window.addEventListener('wishlist:changed', () => {
    if (window.MF && window.MF.wishlist) {
      window.MF.wishlist.updateBadges();
    }
    const drawer = document.getElementById('cartDrawerOverlay');
    if (drawer && drawer.classList.contains('active')) {
      const activeTabBtn = drawer.querySelector('.drawer-tab-btn.active');
      const activeTab = activeTabBtn ? activeTabBtn.dataset.tab : 'cart';
      renderDrawerTab(activeTab);
    }
  });

  /* ---------- Feature Story Switcher (Index Page) ---------- */
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
        title: 'Handcrafted With<br><span class="italic-gold">Pure Ingredients</span>',
        desc: 'We work with top perfume makers to bring you long-lasting luxury fragrances. Every bottle is made with pure fragrance oils and ethically sourced botanicals.'
      },
      {
        num: '(02)',
        tag: 'PURITY',
        title: 'Natural & Long Lasting<br><span class="italic-gold">All Day Long</span>',
        desc: 'From rich Cambodian oud to fresh morning roses, our ingredients are harvested at peak freshness for fragrances that last 12 to 18 hours on your clothes.'
      },
      {
        num: '(03)',
        tag: 'ARTISAN',
        title: 'Clean & Safe<br><span class="italic-gold">Everyday Luxury</span>',
        desc: 'Made in small fresh batches with no harmful chemicals and no animal testing. Designed for daily wear and memorable occasions.'
      }
    ];

    let currentStory = 0;

    function updateStory(index) {
      currentStory = (index + stories.length) % stories.length;
      const textContainer = featureTitle.parentElement;
      textContainer.style.opacity = '0';
      textContainer.style.transform = 'translateY(10px)';
      textContainer.style.transition = 'all 0.3s ease';

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

  /* Auto-collapse expanded descriptions on scroll */
  function collapseExpandedDescriptions() {
    const expanded = document.querySelectorAll('.fragrance-desc.is-expanded');
    if (expanded.length > 0) {
      expanded.forEach(el => el.classList.remove('is-expanded'));
    }
  }

  window.addEventListener('scroll', collapseExpandedDescriptions, { passive: true, capture: true });
  window.addEventListener('touchmove', collapseExpandedDescriptions, { passive: true, capture: true });
  window.addEventListener('wheel', collapseExpandedDescriptions, { passive: true, capture: true });

})();
