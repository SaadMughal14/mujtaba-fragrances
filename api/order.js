/* ==========================================================================
   Vercel Serverless Function — Order Submission to Discord Webhook
   Path: /api/order.js

   HOW IT WORKS:
   - Receives POST with JSON body containing order data
   - Formats it as a rich Discord embed
   - Forwards to Discord webhook URL (from env var DISCORD_WEBHOOK_URL)
   - Returns success/failure to the client

   SETUP (on Vercel):
   1. Go to your project settings → Environment Variables
   2. Add: DISCORD_WEBHOOK_URL = <your Discord channel webhook URL>
      (Get one from Discord: Channel Settings → Integrations → Webhooks → New Webhook → Copy URL)
   3. Redeploy the project

   LOCAL TESTING:
   - Set DISCORD_WEBHOOK_URL in .env file or shell, then run `vercel dev`
   ========================================================================== */

export default async function handler(req, res) {
  // CORS + method guard
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // Read webhook URL from environment
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('DISCORD_WEBHOOK_URL env var not set');
    return res.status(500).json({
      ok: false,
      error: 'Discord webhook URL is not configured. Set DISCORD_WEBHOOK_URL environment variable on Vercel.'
    });
  }

  // Parse body
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) {
      return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
    }
  }

  if (!body || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return res.status(400).json({ ok: false, error: 'Order must contain at least one item' });
  }

  // Build Discord embed
  const {
    orderId,
    items,
    subtotal,
    shipping,
    tax,
    total,
    customer = {},
    payment = {}
  } = body;

  const formatMoney = (n) => 'Rs ' + Number(n || 0).toLocaleString('en-PK');

  // Items list (Discord field value max 1024 chars — truncate if needed)
  let itemsText = items.map(i =>
    `• **${i.name}** (${i.sizeMl}ml) × ${i.qty} — ${formatMoney(i.lineTotal)}`
  ).join('\n');
  if (itemsText.length > 1000) {
    itemsText = itemsText.slice(0, 1000) + '\n... (truncated)';
  }

  // Customer info
  const customerText = [
    `**Name:** ${customer.firstName || ''} ${customer.lastName || ''}`.trim(),
    `**Email:** ${customer.email || '—'}`,
    `**Phone:** ${customer.phone || '—'}`
  ].join('\n');

  // Shipping address
  const addressText = [
    customer.address || '—',
    [customer.city, customer.state, customer.zip].filter(Boolean).join(', '),
    customer.country || ''
  ].filter(Boolean).join('\n') || '—';

  // Payment (we never store real card numbers — just last 4 if provided)
  const paymentText = payment.method
    ? `${payment.method}${payment.last4 ? ` (•••• ${payment.last4})` : ''}`
    : 'To be collected on delivery';

  const embed = {
    title: `🛍️ New Order — ${orderId || 'MF-????'}`,
    description: `A new order has been placed on **Mujtaba Fragrances**.`,
    color: 0xC9A96E, // brand gold
    timestamp: new Date().toISOString(),
    fields: [
      {
        name: '🧴 Items',
        value: itemsText,
        inline: false
      },
      {
        name: '💰 Order Summary',
        value: [
          `Subtotal: ${formatMoney(subtotal)}`,
          `Shipping: ${formatMoney(shipping)}`,
          `Tax: ${formatMoney(tax)}`,
          `**TOTAL: ${formatMoney(total)}**`
        ].join('\n'),
        inline: false
      },
      {
        name: '👤 Customer',
        value: customerText,
        inline: true
      },
      {
        name: '📍 Shipping Address',
        value: addressText,
        inline: true
      },
      {
        name: '💳 Payment',
        value: paymentText,
        inline: false
      },
      ...(customer.notes ? [{
        name: '📝 Customer Notes',
        value: customer.notes,
        inline: false
      }] : [])
    ],
    footer: {
      text: 'Mujtaba Fragrances • Order System',
      icon_url: 'https://mujtaba-fragrances.vercel.app/assets/images/logo.svg'
    }
  };

  try {
    const discordResp = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });

    if (!discordResp.ok) {
      const errText = await discordResp.text();
      console.error('Discord webhook failed:', discordResp.status, errText);
      return res.status(502).json({
        ok: false,
        error: `Discord webhook returned ${discordResp.status}: ${errText.slice(0, 200)}`
      });
    }

    return res.status(200).json({
      ok: true,
      orderId: orderId,
      message: 'Order received! We will contact you shortly.'
    });
  } catch (err) {
    console.error('Order submission error:', err);
    return res.status(500).json({
      ok: false,
      error: 'Failed to submit order: ' + (err.message || 'Unknown error')
    });
  }
}
