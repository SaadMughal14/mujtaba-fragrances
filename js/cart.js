/* ==========================================================================
   MUJTABA FRAGRANCES — Cart System
   localStorage-based shopping cart with full CRUD.
   Exposes: MF.cart (the cart instance)
   ========================================================================== */

window.MF = window.MF || {};

(function () {
  'use strict';

  const STORAGE_KEY = 'mujtaba_cart_v1';
  const ORDERS_KEY = 'mujtaba_orders_v1';

  /* ---------- Cart API ---------- */
  const cart = {
    /* items: [{ id, qty, sizeMl }, ...] */

    items: [],

    /* Load from localStorage */
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        this.items = raw ? JSON.parse(raw) : [];
      } catch (e) {
        console.warn('Cart load failed:', e);
        this.items = [];
      }
      return this;
    },

    /* Persist to localStorage */
    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      } catch (e) {
        console.warn('Cart save failed:', e);
      }
      this.updateBadge();
      // Notify any listeners
      window.dispatchEvent(new CustomEvent('cart:changed', { detail: this.items }));
    },

    /* Add item (or merge if same id + size) */
    add(productId, qty = 1, sizeMl = null) {
      const product = window.findProduct(productId);
      if (!product) {
        console.warn('Unknown product:', productId);
        return;
      }
      // Default to first size if not specified
      if (!sizeMl) sizeMl = product.sizes[0].ml;

      const existing = this.items.find(i => i.id === productId && i.sizeMl === sizeMl);
      if (existing) {
        existing.qty += qty;
      } else {
        this.items.push({ id: productId, qty, sizeMl });
      }
      this.save();
    },

    /* Update quantity */
    setQty(productId, sizeMl, qty) {
      const item = this.items.find(i => i.id === productId && i.sizeMl === sizeMl);
      if (!item) return;
      item.qty = Math.max(0, qty);
      if (item.qty === 0) {
        this.remove(productId, sizeMl);
      } else {
        this.save();
      }
    },

    /* Increment qty */
    increment(productId, sizeMl) {
      const item = this.items.find(i => i.id === productId && i.sizeMl === sizeMl);
      if (item) {
        item.qty += 1;
        this.save();
      }
    },

    /* Decrement qty (removes if hits 0) */
    decrement(productId, sizeMl) {
      const item = this.items.find(i => i.id === productId && i.sizeMl === sizeMl);
      if (!item) return;
      item.qty -= 1;
      if (item.qty <= 0) {
        this.remove(productId, sizeMl);
      } else {
        this.save();
      }
    },

    /* Remove item entirely */
    remove(productId, sizeMl) {
      this.items = this.items.filter(i => !(i.id === productId && i.sizeMl === sizeMl));
      this.save();
    },

    /* Clear all items */
    clear() {
      this.items = [];
      this.save();
    },

    /* Total item count (sum of quantities) */
    count() {
      return this.items.reduce((sum, i) => sum + i.qty, 0);
    },

    /* Subtotal in dollars */
    subtotal() {
      return this.items.reduce((sum, i) => {
        const p = window.findProduct(i.id);
        if (!p) return sum;
        const size = p.sizes.find(s => s.ml === i.sizeMl);
        const unitPrice = size ? size.price : p.price;
        return sum + unitPrice * i.qty;
      }, 0);
    },

    /* Shipping (free over Rs 10,000, else Rs 500) */
    shipping() {
      const sub = this.subtotal();
      if (sub === 0) return 0;
      return sub >= 10000 ? 0 : 500;
    },

    /* Sales tax (5% — demo, applies to subtotal) */
    tax() {
      return this.subtotal() * 0.05;
    },

    /* Grand total */
    total() {
      return this.subtotal() + this.shipping() + this.tax();
    },

    /* Format detailed items for checkout / Discord */
    detailedItems() {
      return this.items.map(i => {
        const p = window.findProduct(i.id);
        if (!p) return null;
        const size = p.sizes.find(s => s.ml === i.sizeMl) || p.sizes[0];
        return {
          id: p.id,
          name: p.name,
          collection: p.collection,
          sizeMl: size.ml,
          unitPrice: size.price,
          qty: i.qty,
          lineTotal: size.price * i.qty,
          image: p.image
        };
      }).filter(Boolean);
    },

    /* Update cart badge count in nav */
    updateBadge() {
      const badges = document.querySelectorAll('.cart-badge');
      const count = this.count();
      badges.forEach(b => {
        b.textContent = count;
        b.style.display = count > 0 ? 'flex' : 'flex';
      });
    }
  };

  /* ---------- Orders API (for confirmation page) ---------- */
  const orders = {
    save(order) {
      try {
        const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
        all.push(order);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(all));
      } catch (e) {
        console.warn('Order save failed:', e);
      }
    },
    get(id) {
      try {
        const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
        return all.find(o => o.orderId === id || o.id === id);
      } catch (e) {
        return null;
      }
    }
  };

  /* ---------- Generate order ID ---------- */
  function genOrderId() {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).substr(2, 4).toUpperCase();
    return 'MF-' + ts + '-' + rand;
  }

  /* ---------- Expose ---------- */
  cart.load();
  window.MF.cart = cart;
  window.MF.orders = orders;
  window.MF.genOrderId = genOrderId;

  /* ---------- Update badge on page load ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    cart.updateBadge();
  });

})();
