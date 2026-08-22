/* ==========================================================================
   MUJTABA FRAGRANCES — Cart & Orders System
   localStorage-based shopping cart and recent order storage with full CRUD.
   Exposes: MF.cart, MF.orders
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
        if (!Array.isArray(this.items)) this.items = [];
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
      const product = window.findProduct ? window.findProduct(productId) : null;
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

    /* Subtotal in PKR */
    subtotal() {
      return this.items.reduce((sum, i) => {
        const p = window.findProduct ? window.findProduct(i.id) : null;
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

    /* Sales tax (5%) */
    tax() {
      return Math.round(this.subtotal() * 0.05);
    },

    /* Grand total */
    total() {
      return this.subtotal() + this.shipping() + this.tax();
    },

    /* Format detailed items for checkout & drawer */
    detailedItems() {
      return this.items.map(i => {
        const p = window.findProduct ? window.findProduct(i.id) : null;
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
        b.style.display = 'inline-flex';
      });
    }
  };

  /* ---------- Orders API (Stored in Local Browser Memory) ---------- */
  const orders = {
    save(order) {
      try {
        if (!order.createdAt) order.createdAt = new Date().toISOString();
        if (!order.status) order.status = 'Confirmed';
        const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
        // Prepend new order at the front
        const exists = all.findIndex(o => o.orderId === order.orderId);
        if (exists > -1) {
          all[exists] = order;
        } else {
          all.unshift(order);
        }
        localStorage.setItem(ORDERS_KEY, JSON.stringify(all));
        window.dispatchEvent(new CustomEvent('orders:changed', { detail: all }));
      } catch (e) {
        console.warn('Order save failed:', e);
      }
    },

    getAll() {
      try {
        const all = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
        return Array.isArray(all) ? all : [];
      } catch (e) {
        return [];
      }
    },

    get(id) {
      try {
        const all = this.getAll();
        return all.find(o => o.orderId === id || o.id === id);
      } catch (e) {
        return null;
      }
    },

    clear() {
      try {
        localStorage.removeItem(ORDERS_KEY);
        window.dispatchEvent(new CustomEvent('orders:changed', { detail: [] }));
      } catch (e) {}
    }
  };

  /* ---------- Generate clean order ID ---------- */
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
