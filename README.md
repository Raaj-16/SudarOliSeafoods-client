# Sudar Oli Dry Sea Foods — React + Vite

React + Vite storefront for Sudar Oli Dry Sea Foods. The catalog in
`src/data/products.js` is the current storefront catalog; inventory and orders should
be replaced with backend data before production launch.

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
- WhatsApp contact routing is configured in `src/config.js`.

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

### Backend contract

The frontend expects the backend configured by `VITE_API_BASE_URL` to provide:

- `POST /api/payment/create-order` with `{ items, customer }`, returning
  `{ ok, keyId, amount, currency, orderId }`.
- `POST /api/payment/verify` with Razorpay's payment response, returning `{ ok }`.

The backend must calculate the payable amount from its own product and inventory records,
validate every item and quantity, create the Razorpay order with the server-side secret,
and verify the signature before marking an order paid. Keep Razorpay keys and webhook
secrets on the backend only. Use Razorpay test keys locally, then configure live keys
and HTTPS in production. Do not put API secrets, Razorpay secret keys, database credentials,
or webhook secrets in this repository or in any `VITE_*` variable: Vite embeds those values
in the browser bundle.

### Production security checklist

- Serve the frontend and backend only over HTTPS and redirect HTTP to HTTPS.
- Configure the backend CORS allowlist to the exact storefront origin.
- Add authentication, rate limiting, request size limits, input validation, and server-side
  inventory and price checks to the backend.
- Verify Razorpay signatures and webhooks on the backend, and make payment/order writes idempotent.
- Deploy `public/_headers` with a host that supports it, or copy its headers to your reverse proxy.
