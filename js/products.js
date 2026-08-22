/* ==========================================================================
   MUJTABA FRAGRANCES — Product Catalog
   Single source of truth for all fragrance data.
   Prices in Pakistani Rupees (PKR / Rs).
   Used by index.html, mens.html, womens.html, product.html, cart.html
   ========================================================================== */

window.PRODUCTS = [
  // ==================== MEN'S COLLECTION ====================
  {
    id: 'aqua-celeste',
    name: 'Aqua Céleste',
    collection: 'men',
    collectionName: 'Aqua',
    price: 15000,
    image: 'https://raw.githubusercontent.com/SaadMughal14/batch-assets/main/mens-hero-1.png',
    tagline: 'Ethereal aquatic composition',
    description: 'An ethereal aquatic composition opening with crisp bergamot and sea salt, unfolding into a heart of blue lavender and iris, settling into a warm base of driftwood and ambergris. Crafted for the man who carries the ocean\'s calm.',
    notes: {
      top: 'Bergamot, Sea Salt, Marine Calone',
      heart: 'Blue Lavender, Iris, Sage',
      base: 'Driftwood, Ambergris, White Musk'
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
    tagline: 'Deep, mysterious composition',
    description: 'A deep, mysterious composition where midnight waves meet aged cedar. Top notes of black pepper and oceanic calone give way to a heart of smoked oak and orris, anchored by ambergris and Indo-Australian sandalwood. For the man of few, deliberate words.',
    notes: {
      top: 'Black Pepper, Oceanic Calone, Bergamot',
      heart: 'Smoked Oak, Orris, Juniper',
      base: 'Ambergris, Sandalwood, Vetiver'
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
    tagline: 'Pure clarity distilled',
    description: 'Pure clarity distilled. Cracked ice meets frosted mint and silver birch in a composition that opens sharp and bright, softening into pale violet and white musk. A scent for the deliberate, the patient, the still center of any storm.',
    notes: {
      top: 'Cracked Ice, Frosted Mint, Silver Birch',
      heart: 'Pale Violet, Lavender, Cold Iris',
      base: 'White Musk, Cedar, Vetiver'
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
    tagline: 'Forest depth and bronze warmth',
    description: 'A bold composition where green tobacco leaves meet aged amber resin and dark cedar. The opening is sharp with bergamot and dried leaves, deepening into a heart of pipe tobacco and leather, resting on amber, oud, and tonka bean. For the man who commands every room.',
    notes: {
      top: 'Bergamot, Dried Tobacco Leaves, Pink Pepper',
      heart: 'Pipe Tobacco, Leather, Violet Leaf',
      base: 'Amber, Oud, Tonka Bean, Cedar'
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
    tagline: 'Volcanic stone and grey smoke',
    description: 'A smoky, mysterious composition built around volcanic stone and grey amber. Opens with charcoal and black cardamom, deepens into a heart of incense and smoked vetiver, and settles on dark musk and ash wood. Wear it like armor.',
    notes: {
      top: 'Charcoal, Black Cardamom, Bergamot',
      heart: 'Incense, Smoked Vetiver, Geranium',
      base: 'Dark Musk, Ash Wood, Amber, Patchouli'
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
    tagline: 'Sweet fruity with great depth',
    description: 'This Perfume is a remarkable sweet fruity perfume great depth and excitement to the blend of notes. The sweetness in this perfume is very appealing and not at all overdone. It starts off a little sweet, as it settles in you will experience the elegant floral notes and warmed by the base notes. The top notes are Strawberry, Raspberry, Pear, Bergamots, colognee, Orange and tangerine.',
    notes: {
      top: 'Strawberry, Raspberry, Pear, Bergamot, Colognée, Orange, Tangerine',
      heart: 'Jasmine, Peony, Pink Rose, Freesia',
      base: 'Vanilla, Musk, Sandalwood, Cedar'
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
    tagline: 'Radiant dewy peony meets crystal rose',
    description: 'A radiant composition where dewy peony meets crystal rose and pink pepper. The heart unfolds into Turkish geranium and lychee blossom, settling on a base of white musk and pale sandalwood. Crafted for the woman whose presence lingers in every room she leaves.',
    notes: {
      top: 'Pink Pepper, Bergamot, Lychee',
      heart: 'Turkish Geranium, Peony, Crystal Rose, Lychee Blossom',
      base: 'White Musk, Pale Sandalwood, Amber'
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
    tagline: 'Sensual bouquet with smoky oud',
    description: 'A sensual bouquet of Damask rose and Bulgarian iris, deepened by blackcurrant and a whisper of smoky oud. The base of aged patchouli and warm amber crystallizes into a scent as unforgettable as a ruby at midnight. For the woman who knows her own worth.',
    notes: {
      top: 'Blackcurrant, Bergamot, Pink Pepper',
      heart: 'Damask Rose, Bulgarian Iris, Geranium',
      base: 'Smoky Oud, Aged Patchouli, Warm Amber, Vanilla'
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
    tagline: 'Romantic peach and rose gold',
    description: 'A romantic composition of sun-ripened peach and spring blossoms, dusted with crystalline rose and warm amber. The heart reveals peony and peach flower, settling into creamy sandalwood and white musk. Wear it for the moments you want to remember forever.',
    notes: {
      top: 'Sun-Ripened Peach, Bergamot, Pink Pepper',
      heart: 'Peony, Peach Blossom, Crystal Rose, Apricot',
      base: 'Creamy Sandalwood, White Musk, Amber, Vanilla'
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
    tagline: 'Mystical violet and purple crystal',
    description: 'A mystical composition built around violet flower and amethyst crystal. Opens with bright bergamot and purple plum, deepens into violet, iris, and heliotrope, and rests on dark vanilla, purple amber, and aged sandalwood. For the woman who walks between worlds.',
    notes: {
      top: 'Bergamot, Purple Plum, Pink Pepper',
      heart: 'Violet Flower, Iris, Heliotrope, Lilac',
      base: 'Dark Vanilla, Purple Amber, Aged Sandalwood, Musk'
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
    tagline: 'Warm liquid gold and labdanum resin',
    description: 'An intoxicating unisex composition of liquid amber, warm labdanum resin, and precious golden saffron. Unfolds into a heart of rich Bulgarian rose and dark cocoa, resting on vintage vanilla and oud.',
    notes: {
      top: 'Golden Saffron, Bergamot, Cinnamon Leaf',
      heart: 'Liquid Amber, Labdanum Resin, Bulgarian Rose, Cocoa',
      base: 'Aged Oud, Vintage Vanilla, Sandalwood, Cashmere Wood'
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
    tagline: 'Majestic Cambodian oud and Taif rose',
    description: 'A majestic unisex masterpiece featuring rare wild-harvested Cambodian agarwood balanced with Taif rose petals and incense. A transcendent fragrance for those who appreciate pure artisanal luxury.',
    notes: {
      top: 'Taif Rose, Incense, Cardamom',
      heart: 'Cambodian Oud, Orris, Leather Accord',
      base: 'Smoky Amber, Benzoin, White Sandalwood'
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
    tagline: 'Radiant shadow and velvet iris',
    description: 'An enchanting unisex scent built on the contrast between bright sparkling bergamot and dark velvet iris. Deepened with black tea, tonka bean, and smoked vetiver for a timeless allure.',
    notes: {
      top: 'Sparkling Bergamot, Black Tea, Pink Pepper',
      heart: 'Velvet Iris, Jasmine Sambac, Cedar Leaf',
      base: 'Tonka Bean, Smoked Vetiver, Musk, Amber'
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
    tagline: 'Solar botanicals and crystal amber',
    description: 'A radiant botanical fragrance where solar orange blossom meets wild fig and crystal amber resin. Light yet profoundly rich, evoking golden hour in a Mediterranean garden.',
    notes: {
      top: 'Orange Blossom, Wild Fig, Mandarin',
      heart: 'Neroli, Green Violet Leaf, White Cedar',
      base: 'Crystal Amber, Cashmere Musk, Driftwood'
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

/* Helper: format price in PKR (no decimals for clean look) */
window.formatPrice = function (n) {
  // Pakistani Rupee — format with thousands separator, no decimals
  return 'Rs ' + Number(n).toLocaleString('en-PK');
};
