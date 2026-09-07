# Sudar Oli Dry Sea Foods — React + Vite

This is a straight React + Vite conversion of the original single-file HTML site.
No functionality was changed — same product data, cart, search, "How We Dry It" page,
and the WhatsApp checkout handoff.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  main.jsx              entry point
  App.jsx                top-level state (view routing, cart, toast)
  index.css               all site styles (unchanged from the original)
  data/products.js        product catalog + stock helpers + icon SVG defs
  assets/                 the real logo, extracted from the original embedded base64
  components/
    Header.jsx             logo, nav, live header search
    Hero.jsx                hero section + the "drying line" signature element
    TrustStrip.jsx
    Shop.jsx                category chips + search + product grid (PLP)
    ProductCard.jsx
    About.jsx
    Home.jsx                composes Hero + TrustStrip + Shop + About
    PDP.jsx                 product detail page
    Process.jsx             "How We Dry It" page
    CartDrawer.jsx
    Toast.jsx
    Footer.jsx
    ProductIcon.jsx         shared SVG icon renderer
```

## Notes

- View switching (Home / PDP / Process) is done with React state instead of toggling
  `display:none` on DOM nodes.
- The WhatsApp checkout link (`wa.me/919840012345`) and contact details are placeholders —
  update them in `App.jsx` and `Footer.jsx` before going live.

## Online payments (Razorpay)

The cart drawer has a **"Pay online (UPI / Card)"** button alongside the WhatsApp checkout,
wired up to the companion `sudaroli-backend` project.

1. Copy `.env.example` to `.env` and point it at your running backend:
   ```
   VITE_API_BASE_URL=http://localhost:4000
   ```
2. Start the backend (see its own README) and this frontend (`npm run dev`).
3. Add an item to the cart → open the cart → **Pay online** → enter name + phone →
   Razorpay Checkout opens with UPI/card/netbanking options.

Relevant files:
- `src/config.js` — reads `VITE_API_BASE_URL`
- `src/utils/payments.js` — calls the backend's create-order/verify endpoints and
  opens Razorpay Checkout
- `src/components/CheckoutModal.jsx` — collects name/phone before paying
- `index.html` — includes the Razorpay Checkout script
