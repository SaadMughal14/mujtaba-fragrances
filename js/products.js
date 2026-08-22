/* ==========================================================================
   MUJTABA FRAGRANCES — Product Catalog & Data
   Single source of truth for all fragrance data.
   Prices in Pakistani Rupees (PKR / Rs).
   Used by index.html, shop.html, mens.html, womens.html, unisex.html, product.html, cart.html
   ========================================================================== */

window.MF = window.MF || {};

window.PRODUCTS = [
  // ==================== MEN'S COLLECTION ====================
  {
    id: 'aqua-celeste',
    name: 'Aqua Céleste',
    collection: 'men',
    collectionName: 'Aqua',
    price: 15000,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/mens-hero-1.png',
    tagline: 'Fresh ocean breeze and clean woods',
    description: 'A clean and crisp ocean fragrance. Opens with fresh Italian bergamot and sea salt, moves into calming blue lavender and iris, and settles on warm driftwood and soft musk. Long-lasting and fresh for daily wear.',
    notes: {
      top: 'Bergamot, Sea Salt, Marine Breeze',
      heart: 'Blue Lavender, Iris, Fresh Sage',
      base: 'Driftwood, Amber, White Musk'
    },
    sizes: [
      { ml: 50, price: 15000 },
      { ml: 100, price: 25000 }
    ],
    longevity: '8-10 hours',
    sillage: 'Moderate',
    season: 'Spring, Summer',
    badge: 'Bestseller'
  },
  {
    id: 'noir-marin',
    name: 'Noir Marin',
    collection: 'men',
    collectionName: 'Noir',
    price: 18000,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/mens-hero-2.png',
    tagline: 'Deep dark ocean with smoky cedar',
    description: 'A bold, masculine scent where fresh black pepper and sea notes meet smoked cedar wood, sandalwood, and rich amber. Ideal for evenings and cold weather when you want to leave a lasting impression.',
    notes: {
      top: 'Black Pepper, Sea Breeze, Fresh Bergamot',
      heart: 'Smoked Oak Wood, Iris, Juniper Berry',
      base: 'Warm Amber, Sandalwood, Vetiver'
    },
    sizes: [
      { ml: 50, price: 18000 },
      { ml: 100, price: 30000 }
    ],
    longevity: '12-18 hours',
    sillage: 'Heavy',
    season: 'Autumn, Winter',
    badge: 'New'
  },
  {
    id: 'glacial',
    name: 'Glacial',
    collection: 'men',
    collectionName: 'Glacial',
    price: 14000,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/mens-hero-3.png',
    tagline: 'Crisp cool mint and silver birch',
    description: 'Ultra-refreshing, clean, and energetic. Cool mountain mint and silver birch open the scent, softening into gentle violet and clean cedar wood. Perfect for hot summer days and active lifestyles.',
    notes: {
      top: 'Cracked Ice, Cool Mint, Silver Birch',
      heart: 'Pale Violet, Lavender, Iris',
      base: 'White Musk, Cedar Wood, Vetiver'
    },
    sizes: [
      { ml: 50, price: 14000 },
      { ml: 100, price: 22000 }
    ],
    longevity: '10-12 hours',
    sillage: 'Moderate',
    season: 'Summer, Spring',
    badge: null
  },
  {
    id: 'emerald-tobacco',
    name: 'Emerald Tobacco',
    collection: 'men',
    collectionName: 'Emerald',
    price: 20000,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/mens-hero-4.png',
    tagline: 'Rich green tobacco and warm amber',
    description: 'A commanding blend of cured tobacco leaves, soft leather, warm amber, and aged agarwood (oud). Rich, warm, and sophisticated for special occasions and formal gatherings.',
    notes: {
      top: 'Bergamot, Dried Tobacco Leaves, Pink Pepper',
      heart: 'Rich Tobacco, Leather, Green Leaves',
      base: 'Warm Amber, Agarwood (Oud), Tonka Bean, Cedar'
    },
    sizes: [
      { ml: 50, price: 20000 },
      { ml: 100, price: 32000 }
    ],
    longevity: '14-18 hours',
    sillage: 'Heavy',
    season: 'Autumn, Winter',
    badge: 'Limited'
  },
  {
    id: 'smoke-velvet',
    name: 'Smoke Velvet',
    collection: 'men',
    collectionName: 'Smoke',
    price: 17000,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/mens-hero-5.png',
    tagline: 'Warm smoky incense and dark woods',
    description: 'A deep, mysterious fragrance with notes of black cardamom, frankincense, smoked vetiver, and dark wood. Strong, confident, and stays on your clothes all day.',
    notes: {
      top: 'Black Cardamom, Citrus Bergamot',
      heart: 'Frankincense, Smoked Vetiver, Geranium',
      base: 'Dark Musk, Ash Wood, Warm Amber, Patchouli'
    },
    sizes: [
      { ml: 50, price: 17000 },
      { ml: 100, price: 27000 }
    ],
    longevity: '12-15 hours',
    sillage: 'Heavy',
    season: 'Autumn, Winter',
    badge: null
  },

  // ==================== WOMEN'S COLLECTION ====================
  {
    id: 'rio-brand',
    name: 'Rio Brand',
    collection: 'women',
    collectionName: 'Rio',
    price: 12500,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/womens-hero-1.png',
    tagline: 'Sweet strawberry, florals, and warm vanilla',
    description: 'A delicious, sweet fruity fragrance with great depth. Opens with sweet strawberry, raspberry, and juicy pear, blending into soft jasmine and peony flowers, warmed by sweet vanilla and creamy sandalwood.',
    notes: {
      top: 'Strawberry, Raspberry, Juicy Pear, Sweet Orange',
      heart: 'Jasmine, Peony, Pink Rose, Freesia',
      base: 'Sweet Vanilla, Soft Musk, Sandalwood'
    },
    sizes: [
      { ml: 50, price: 12500 },
      { ml: 100, price: 20000 }
    ],
    longevity: '8-10 hours',
    sillage: 'Moderate',
    season: 'Spring, Summer',
    badge: 'Bestseller'
  },
  {
    id: 'rose-eclat',
    name: 'Rosé Éclat',
    collection: 'women',
    collectionName: 'Rosé',
    price: 13500,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/womens-hero-2.png',
    tagline: 'Fresh morning roses and sweet peony',
    description: 'A bright, romantic floral perfume. Crisp pink pepper and sweet lychee fruit meet fresh blooming Turkish roses and soft white musk. Elegant, fresh, and feminine.',
    notes: {
      top: 'Pink Pepper, Bergamot, Sweet Lychee',
      heart: 'Turkish Rose, Soft Peony, Geranium',
      base: 'White Musk, Creamy Sandalwood, Amber'
    },
    sizes: [
      { ml: 50, price: 13500 },
      { ml: 100, price: 21000 }
    ],
    longevity: '10-12 hours',
    sillage: 'Moderate',
    season: 'Spring, Summer',
    badge: 'New'
  },
  {
    id: 'coeur-rubis',
    name: 'Cœur Rubis',
    collection: 'women',
    collectionName: 'Rubis',
    price: 15500,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/womens-hero-3.png',
    tagline: 'Dark rose, blackcurrant, and soft oud',
    description: 'A luxurious evening fragrance. Rich Damask rose and dark berries meet gentle smoky oud, patchouli, and sweet vanilla. An alluring and classy scent for dinners and special events.',
    notes: {
      top: 'Blackcurrant, Bergamot, Pink Pepper',
      heart: 'Damask Rose, Iris Flower, Geranium',
      base: 'Soft Oud Wood, Patchouli, Warm Amber, Vanilla'
    },
    sizes: [
      { ml: 50, price: 15500 },
      { ml: 100, price: 24000 }
    ],
    longevity: '14-18 hours',
    sillage: 'Heavy',
    season: 'Autumn, Winter',
    badge: 'Limited'
  },
  {
    id: 'peach-blossom',
    name: 'Peach Blossom',
    collection: 'women',
    collectionName: 'Peach',
    price: 14500,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/womens-hero-4.png',
    tagline: 'Juicy ripe peach and sweet spring flowers',
    description: 'A joyful and uplifting scent featuring juicy sweet peaches, gentle spring blossoms, creamy sandalwood, and soft vanilla. Fresh and easy to wear all day long.',
    notes: {
      top: 'Ripe Peach, Sweet Mandarin, Pink Pepper',
      heart: 'Peach Blossom, Soft Peony, Rose, Apricot',
      base: 'Creamy Sandalwood, White Musk, Vanilla'
    },
    sizes: [
      { ml: 50, price: 14500 },
      { ml: 100, price: 23000 }
    ],
    longevity: '10-12 hours',
    sillage: 'Moderate',
    season: 'Spring, Summer',
    badge: null
  },
  {
    id: 'violet-amethyst',
    name: 'Violet Amethyst',
    collection: 'women',
    collectionName: 'Violet',
    price: 16500,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/womens-hero-5.png',
    tagline: 'Sweet violet flowers, plum, and warm vanilla',
    description: 'A dreamy and powdery floral perfume with dark ripe plum, sweet violet petals, rich vanilla, and warm sandalwood. Leaves a beautiful, memorable scent trail.',
    notes: {
      top: 'Fresh Bergamot, Dark Plum, Pink Pepper',
      heart: 'Sweet Violet, Iris Flower, Lilac',
      base: 'Rich Vanilla, Warm Amber, Sandalwood, Musk'
    },
    sizes: [
      { ml: 50, price: 16500 },
      { ml: 100, price: 26000 }
    ],
    longevity: '12-15 hours',
    sillage: 'Heavy',
    season: 'Autumn, Winter',
    badge: 'New'
  },

  // ==================== UNISEX COLLECTION ====================
  {
    id: 'amber-gold-unisex',
    name: 'Amber Gold',
    collection: 'unisex',
    collectionName: 'Amber',
    price: 19500,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/amber-gold.jpg',
    tagline: 'Rich golden saffron, warm amber, and vanilla',
    description: 'A cozy, inviting unisex perfume. Golden saffron and cinnamon lead to warm liquid amber, Bulgarian rose, rich cocoa, and sweet vanilla. Feels warm, luxurious, and comforting.',
    notes: {
      top: 'Golden Saffron, Bergamot, Cinnamon',
      heart: 'Liquid Amber, Bulgarian Rose, Cocoa',
      base: 'Warm Oud, Pure Vanilla, Sandalwood'
    },
    sizes: [
      { ml: 50, price: 19500 },
      { ml: 100, price: 31000 }
    ],
    longevity: '14-18 hours',
    sillage: 'Heavy',
    season: 'All Seasons',
    badge: 'Bestseller'
  },
  {
    id: 'oud-royal-unisex',
    name: 'Oud Royal',
    collection: 'unisex',
    collectionName: 'Oud',
    price: 22000,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/collection-oud.jpg',
    tagline: 'Precious Cambodian agarwood and Taif rose',
    description: 'Our most premium unisex masterpiece. Rare wild Cambodian agarwood (oud) balanced with fresh Taif rose petals, cardamom, and sandalwood. Truly long-lasting and unforgettable.',
    notes: {
      top: 'Taif Rose, Incense, Green Cardamom',
      heart: 'Cambodian Oud, Iris, Soft Leather',
      base: 'Smoky Amber, Benzoin Resin, Sandalwood'
    },
    sizes: [
      { ml: 50, price: 22000 },
      { ml: 100, price: 35000 }
    ],
    longevity: '16-24 hours',
    sillage: 'Enormous',
    season: 'Autumn, Winter',
    badge: 'Limited'
  },
  {
    id: 'eclat-noir-unisex',
    name: 'Éclat Noir',
    collection: 'unisex',
    collectionName: 'Noir',
    price: 18500,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/hero-noir.png',
    tagline: 'Sparkling citrus, black tea, and velvet iris',
    description: 'A chic, modern fragrance suitable for everyone. Fresh Italian bergamot and black tea blend with smooth iris, tonka bean, and vetiver wood. Crisp, clean, and very sophisticated.',
    notes: {
      top: 'Sparkling Bergamot, Black Tea, Pink Pepper',
      heart: 'Velvet Iris, Jasmine Sambac, Cedar Leaf',
      base: 'Tonka Bean, Vetiver Wood, Clean Musk, Amber'
    },
    sizes: [
      { ml: 50, price: 18500 },
      { ml: 100, price: 29000 }
    ],
    longevity: '12-15 hours',
    sillage: 'Heavy',
    season: 'All Seasons',
    badge: 'New'
  },
  {
    id: 'lumiere-botanique-unisex',
    name: 'Lumière Botanique',
    collection: 'unisex',
    collectionName: 'Lumière',
    price: 16000,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/lumiere-botanique.jpg',
    tagline: 'Sunny orange blossom, fresh fig, and amber',
    description: 'A radiant, sunny unisex perfume. Bright orange blossoms and fresh green figs blend with neroli flowers, white cedar, and warm amber resin. Clean, uplifting, and cheerful.',
    notes: {
      top: 'Orange Blossom, Fresh Fig, Sweet Mandarin',
      heart: 'Neroli, Green Violet Leaf, White Cedar',
      base: 'Warm Amber, Clean Cashmere Musk, Driftwood'
    },
    sizes: [
      { ml: 50, price: 16000 },
      { ml: 100, price: 26000 }
    ],
    longevity: '10-12 hours',
    sillage: 'Moderate',
    season: 'Spring, Summer',
    badge: null
  }
];

/* Helper: find product by ID */
window.findProduct = function (id) {
  return window.PRODUCTS.find(p => p.id === id);
};

/* Helper: get products by collection */
window.productsByCollection = function (collection) {
  return window.PRODUCTS.filter(p => p.collection === collection);
};

/* Helper: format price in PKR */
window.formatPrice = function (n) {
  return 'Rs ' + Number(n).toLocaleString('en-PK');
};

/* ==========================================================================
   WISHLIST / SAVED FAVORITES SYSTEM (Local Browser Storage)
   ========================================================================== */
const WISHLIST_KEY = 'mujtaba_wishlist_v1';

const wishlist = {
  items: [],

  load() {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      this.items = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(this.items)) this.items = [];
    } catch (e) {
      console.warn('Wishlist load failed:', e);
      this.items = [];
    }
    return this.items;
  },

  save() {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.warn('Wishlist save failed:', e);
    }
    this.updateBadges();
    window.dispatchEvent(new CustomEvent('wishlist:changed', { detail: this.items }));
  },

  has(id) {
    return this.items.includes(id);
  },

  toggle(id) {
    const p = window.findProduct ? window.findProduct(id) : null;
    const name = p ? p.name : 'Perfume';
    const index = this.items.indexOf(id);
    let isSaved = false;

    if (index > -1) {
      this.items.splice(index, 1);
      isSaved = false;
      this.save();
      if (window.MF && window.MF.toast) {
        window.MF.toast(`Removed ${name} from your favorites`);
      }
    } else {
      this.items.push(id);
      isSaved = true;
      this.save();
      if (window.MF && window.MF.toast) {
        window.MF.toast(`Saved ${name} to your favorites!`);
      }
    }
    return isSaved;
  },

  remove(id) {
    this.items = this.items.filter(x => x !== id);
    this.save();
  },

  count() {
    return this.items.length;
  },

  getProducts() {
    if (!window.PRODUCTS) return [];
    return this.items.map(id => window.findProduct(id)).filter(Boolean);
  },

  updateBadges() {
    const count = this.count();
    document.querySelectorAll('.wishlist-badge').forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const id = btn.dataset.wishlistId;
      const isSaved = this.has(id);
      btn.classList.toggle('is-active', isSaved);
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isSaved ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
      }
      btn.setAttribute('aria-label', isSaved ? 'Remove from favorites' : 'Save to favorites');
      btn.setAttribute('title', isSaved ? 'Remove from favorites' : 'Save to favorites');
    });
  }
};

wishlist.load();
window.MF.wishlist = wishlist;

window.toggleWishlist = function(productId, btn) {
  const isSaved = wishlist.toggle(productId);
  if (btn) {
    btn.classList.toggle('is-active', isSaved);
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = isSaved ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  wishlist.updateBadges();
});
