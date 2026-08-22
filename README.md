# Mujtaba Fragrances - Premium E-Commerce Website

A full multi-page luxury perfume e-commerce site with cart, checkout, and Discord order notifications. Built as static HTML/CSS/vanilla JS with a single Vercel serverless function for order submission. **All prices in Pakistani Rupees (PKR / Rs).**

## Features

- **7 pages**: Home, Men's Collection, Women's Collection, Product Detail, Cart, Checkout, Order Confirmation
- **10 fragrances** (5 men's, 5 women's) with full product data (notes, sizes, prices, longevity, sillage, season)
- **Working cart** with localStorage persistence — survives page reloads and across pages
- **Full checkout flow** with form validation (name, email, phone, address, payment method)
- **Discord webhook integration** — every order posts a rich embed to your Discord channel
- **Premium MF monogram logo** (SVG, scalable)
- **Scroll-snap collection pages** — full-screen fragrance sections with side dot navigation, keyboard arrows, and touch swipe
- **Men's hero matches the original screenshot** — "Discover Your Perfect Fragrance" headline, body text, Shop Now button with target arrows, 90+ Perfumes / 15M+ Customers stats, NEW FRAGRANCE rotating badge, floating butterflies
- **Women's hero matches the original screenshot** — RIO BRAND with the exact description text from the screenshot, burgundy card on pink background with diamond pattern
- **Responsive** down to mobile, accessible (semantic HTML, ARIA labels, keyboard nav)
- **Animations** — fade-up reveals, floating product cards, parallax butterflies, rotating badges, hover lifts

## Tech Stack

- **Frontend**: Pure HTML5, CSS3 (custom properties, grid, scroll-snap), vanilla JavaScript (no framework)
- **Backend**: Single Vercel serverless function (`/api/order.js`) — Node.js 18+ with native `fetch`
- **Storage**: Browser `localStorage` for cart + order history
- **Notifications**: Discord webhook via server-side POST (keeps webhook URL secret)
- **Currency**: Pakistani Rupee (Rs), formatted with `en-PK` locale (thousands separator, no decimals)

## Project Structure

```
mujtaba-fragrances/
├── index.html                    # Home page (dark/gold luxury)
├── mens.html                     # Men's collection (blue, scroll-snap, hero + 5 fragrances)
├── womens.html                   # Women's collection (pink/burgundy, scroll-snap, 5 fragrances)
├── product.html                  # Single product detail (?id=<fragrance-id>)
├── cart.html                     # Shopping cart with qty controls
├── checkout.html                 # Checkout form (contact, shipping, payment)
├── order-confirmation.html       # Thank you page (?id=<order-id>)
├── api/
│   └── order.js                  # Vercel serverless function → Discord webhook
├── assets/
│   └── images/
│       ├── logo.svg              # Premium MF monogram
│       ├── hero-noir.png
│       ├── mens-hero-{1..5}.png
│       ├── womens-hero-{1..5}.png
│       └── ... (collection row, editorial, footer bottles)
├── css/
│   └── styles.css                # All styles (CSS vars, themes, responsive)
├── js/
│   ├── products.js               # Product catalog (single source of truth, PKR prices)
│   ├── cart.js                   # Cart + orders API (localStorage, PKR shipping/tax)
│   ├── collection.js             # Scroll-snap interactions
│   └── main.js                   # Nav, toasts, add-to-cart wiring
├── vercel.json                   # Vercel config (minimal — no `public` property)
└── .gitignore
```

## Setup Instructions

### 1. Clone & Install

No build step needed - just clone and deploy.

```bash
git clone https://github.com/SaadMughal14/mujtaba-fragrances.git
cd mujtaba-fragrances
```

### 2. Set Up Discord Webhook (CRITICAL for orders to reach you)

1. Open your Discord server
2. Pick the channel where you want order notifications to appear
3. Right-click the channel → **Edit Channel**
4. Go to **Integrations** → **Webhooks** → **New Webhook**
5. Customize the name (e.g., "Mujtaba Orders") and avatar if you want
6. Click **Copy Webhook URL** — it will look like:
   `https://discord.com/api/webhooks/<numeric-id>/<token>`

### 3. Deploy to Vercel

1. The repo is already on GitHub at `SaadMughal14/mujtaba-fragrances`
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New Project** → import `mujtaba-fragrances`
4. Vercel will auto-detect the static site + `/api` serverless functions — no config needed (vercel.json is minimal)
5. **Before clicking Deploy**, expand **Environment Variables** and add:
   - **Name**: `DISCORD_WEBHOOK_URL`
   - **Value**: paste your Discord webhook URL (e.g. `https://discord.com/api/webhooks/1532777692091646083/PJd_...`)
   - Apply to: Production, Preview, Development (all three)
6. Click **Deploy**
7. Visit your live URL — test by adding items to cart and placing an order

### 4. Local Development (optional)

For local testing with the API endpoint:

```bash
npm install -g vercel
vercel dev
```

Then visit `http://localhost:3000`. Set `DISCORD_WEBHOOK_URL` in a local `.env` file:

```bash
echo "DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/..." > .env
```

## Currency Configuration

All prices are in **Pakistani Rupees (PKR)**. The `formatPrice` helper in `js/products.js` formats amounts as `Rs 15,000` (with thousands separator, no decimals).

To change currency:
- Edit `formatPrice` in `js/products.js` (frontend display)
- Edit `formatMoney` in `api/order.js` (Discord webhook formatting)
- Update individual product prices in `js/products.js`

### Pricing Structure (PKR)

| Fragrance | 50ml | 100ml |
|---|---|---|
| Aqua Céleste (Men) | Rs 15,000 | Rs 25,000 |
| Noir Marin (Men) | Rs 18,000 | Rs 30,000 |
| Glacial (Men) | Rs 14,000 | Rs 22,000 |
| Emerald Tobacco (Men) | Rs 20,000 | Rs 32,000 |
| Smoke Velvet (Men) | Rs 17,000 | Rs 27,000 |
| Rio Brand (Women) | Rs 12,500 | Rs 20,000 |
| Rosé Éclat (Women) | Rs 13,500 | Rs 21,000 |
| Cœur Rubis (Women) | Rs 15,500 | Rs 24,000 |
| Peach Blossom (Women) | Rs 14,500 | Rs 23,000 |
| Violet Amethyst (Women) | Rs 16,500 | Rs 26,000 |

### Cart Calculations

- **Free shipping**: Orders over **Rs 10,000** ship free
- **Standard shipping**: Rs 500 flat rate
- **Sales tax**: 5% (applied to subtotal)

To change these, edit `js/cart.js` → `shipping()` and `tax()` methods.

## How Order Flow Works

1. User browses fragrances on `index.html`, `mens.html`, or `womens.html`
2. Clicks **Add to Cart** → item added to localStorage cart, badge updates, toast notification appears
3. Clicks **View Details** → goes to `product.html?id=<fragrance>` to read notes, pick size, set quantity
4. Cart icon in nav → `cart.html` → review items, adjust qty, see totals
5. **Proceed to Checkout** → `checkout.html` → fills contact/shipping/payment form (with validation)
6. **Place Order** → POST to `/api/order` → serverless function formats Discord embed and posts to webhook
7. Cart is cleared, user redirected to `order-confirmation.html?id=<orderId>` showing summary

## Adding More Fragrances

Edit `js/products.js` and add a new object to the `window.PRODUCTS` array:

```javascript
{
  id: 'new-scent-slug',           // unique, used in URL ?id=
  name: 'New Scent Name',
  collection: 'men' | 'women',    // which collection page it appears on
  collectionName: 'Short Name',
  price: 16500,                   // default price in PKR
  image: 'assets/images/your-image.png',
  tagline: 'One-line description',
  description: 'Full paragraph...',
  notes: {
    top: 'Note 1, Note 2',
    heart: 'Note 1, Note 2',
    base: 'Note 1, Note 2'
  },
  sizes: [
    { ml: 50, price: 16500 },
    { ml: 100, price: 26000 }
  ],
  longevity: '10-12 hours',
  sillage: 'Moderate',
  season: 'Spring, Summer',
  badge: 'New' | 'Bestseller' | 'Limited' | null
}
```

The new fragrance will automatically appear on the corresponding collection page (`mens.html` or `womens.html`), in the product detail page (`product.html?id=new-scent-slug`), and on the home page if it has a badge.

## Customization

- **Brand colors**: Edit CSS variables at the top of `css/styles.css` (`:root`, `.theme-mens`, `.theme-womens`)
- **Logo**: Replace `assets/images/logo.svg` (keep same viewBox `0 0 280 200` or update CSS sizing)
- **Free shipping threshold**: Change `10000` in `js/cart.js` → `shipping()` method
- **Shipping cost**: Change `500` in `js/cart.js` → `shipping()` method
- **Tax rate**: Change `0.05` in `js/cart.js` → `tax()` method (and update the `Tax (5%)` label in `cart.html` and `checkout.html`)

## Tech Notes

- Cart and order history persist in `localStorage` (keys: `mujtaba_cart_v1`, `mujtaba_orders_v1`)
- Discord webhook URL is **never** exposed to the client — it lives only as a Vercel env var
- If webhook isn't configured, orders still save locally and redirect to confirmation with a warning
- No real payment processing — this is a storefront + order notification system. For real payments, integrate Stripe Checkout in `/api/order.js`
- `vercel.json` is intentionally minimal — Vercel auto-detects the static site + `/api` functions

## License

© 2025 Mujtaba Fragrances. All rights reserved.
