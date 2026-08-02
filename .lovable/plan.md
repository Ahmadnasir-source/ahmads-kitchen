# Ahmad's Kitchen — Website Plan

A five-page site for a Nigerian restaurant, built around the gold-on-black logo, with a real online ordering flow and card checkout.

## Brand direction

- Primary: the logo's gold (deep amber → bright gold gradient for accents and buttons).
- Base: near-black background with warm charcoal surfaces; cream text.
- Type: an elegant serif for headings (matching the logo's engraved feel) paired with a clean sans for body.
- Logo: background removed from the uploaded image and hosted as a clean transparent PNG, used in the header, footer, and hero.

## Pages

1. **Home** — hero with the logo and a "Order Now" call to action, signature dishes strip (Jollof Rice + Chicken as the hero dish), why-us bar (fresh daily, fast delivery, dine-in), a taste of the menu, and a closing order banner.
2. **About Us** — the story of Ahmad's Kitchen, the kitchen philosophy, what makes the food special, hours and service types (dine-in, takeaway, delivery).
3. **Menu / Services** — full menu grouped into Rice Dishes, Soups & Swallow, Grills & Sides, with prices and short descriptions; services section for dine-in, delivery, and catering/bulk packs.
4. **Order Online** — browse dishes, add to cart with quantity, cart drawer with running total, then a checkout form (name, phone, delivery address, notes) leading to card payment. Order confirmation page after payment.
5. **Contact Us** — enquiry form, address/map area, phone, WhatsApp, email, opening hours, social links.

Shared header nav (Home, About, Menu, Order, Contact) with a cart indicator, plus a footer with the logo, contact block, and hours.

## Menu content

- Rice Dishes: Jollof Rice + Chicken (marked as the #1 pick), Fried Rice + Chicken/Beef, Basmati Coconut Rice + Grilled Fish, Banga Rice + Banga Stew + Chicken.
- Soups & Swallow: Pepper Soup (Goat, Chicken, Fish), Egusi + Pounded Yam, Ogbono + Semovita, Nsala + Fufu.
- Grills & Sides: Suya + Plantain + Sauce, Grilled Chicken + Chips, BBQ Fish + Yam.

Prices are needed from you — placeholder prices go in first and are easy to change.

## Ordering and payments

- Lovable Cloud stores the menu items and the orders (items, totals, customer details, status).
- Stripe checkout handles card payment; the order is recorded and marked paid when payment succeeds, then the customer lands on a confirmation page.
- Since this is food (physical goods), Stripe will be set up with tax calculation and collection rather than full compliance handling.
- Payments require a Lovable Pro plan; the integration starts in a test environment so the whole flow can be tried without real money.

## Technical notes

- TanStack Start routes: `/`, `/about`, `/menu`, `/order`, `/order/success`, `/contact`.
- Logo background removal via image editing, then hosted as a CDN asset pointer in `src/assets`.
- Gold/black tokens defined in `src/styles.css` (oklch) — no hardcoded colors in components.
- Cart state in React context with localStorage persistence; checkout session created in a server function.
- Cloud tables: `menu_items` (public read), `orders` + `order_items` (insert via server function, no public read of customer data).
- Per-page SEO metadata (title, description, og/twitter tags) on each route.

## Build order

1. Design system, logo asset, layout shell (header/footer).
2. Home, About, Menu, Contact pages with the real menu content.
3. Lovable Cloud setup and menu/order tables.
4. Cart + Order Online page.
5. Stripe enablement, products, checkout, and confirmation.
