import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import PDP from './components/PDP.jsx'
import Process from './components/Process.jsx'
import BulkOrders from './components/BulkOrders.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import CheckoutModal from './components/CheckoutModal.jsx'
import Toast from './components/Toast.jsx'
import Footer from './components/Footer.jsx'
import { PRODUCTS } from './data/products.js'
import { WHATSAPP_NUMBER } from './config.js'

function getPathRoute() {
  const raw = (window.location.hash ? window.location.hash.replace(/^#/, '') : window.location.pathname)
    .replace(/^\/+/, '')
    .trim()

  if (!raw || raw === '/' || raw === 'home') return 'home'
  const parts = raw.split('/')
  if (parts[0] === 'product' && parts[1]) return 'pdp'
  if (parts[0] === 'process') return 'process'
  if (parts[0] === 'bulk') return 'bulk'
  if (parts[0] === 'cart') return 'cart'
  return 'home'
}

function getProductIdFromPath() {
  const raw = (window.location.hash ? window.location.hash.replace(/^#/, '') : window.location.pathname)
    .replace(/^\/+/, '')
    .trim()

  const parts = raw.split('/')
  if (parts[0] !== 'product' || !parts[1]) return null
  return decodeURIComponent(parts.slice(1).join('/'))
}

export default function App() {
  const [view, setView] = useState(getPathRoute)
  const [currentProductId, setCurrentProductId] = useState(() => getProductIdFromPath())
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [toast, setToast] = useState({ message: '', show: false })
  const toastTimer = useRef(null)
  const pendingScroll = useRef(null)

  function showToast(message) {
    setToast({ message, show: true })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2600)
  }

  function setRoute(nextView, productId = null) {
    const nextPath = (() => {
      switch (nextView) {
        case 'home':
          return '/'
        case 'pdp':
          return productId ? `/product/${encodeURIComponent(productId)}` : '/'
        case 'process':
          return '/process'
        case 'bulk':
          return '/bulk'
        case 'cart':
          return '/cart'
        default:
          return '/'
      }
    })()

    const currentPath = window.location.hash ? window.location.hash.replace(/^#/, '') : window.location.pathname
    if (currentPath !== nextPath) {
      window.history.pushState({}, '', nextPath)
    }

    setView(nextView)
    if (nextView === 'pdp') {
      setCurrentProductId(productId)
      setCartOpen(false)
    } else {
      setCurrentProductId(null)
      setCartOpen(nextView === 'cart')
    }

    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }

  function goHome() {
    setRoute('home')
  }

  function openPDP(id) {
    setRoute('pdp', id)
  }

  function showProcess() {
    setRoute('process')
  }

  function showBulkOrders() {
    setRoute('bulk')
  }

  function openCart() {
    setRoute('cart')
  }

  function scrollToShop() {
    if (view !== 'home') {
      pendingScroll.current = 'shop'
      setRoute('home')
    } else {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function scrollToAbout() {
    if (view !== 'home') {
      pendingScroll.current = 'about'
      setRoute('home')
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function goToContact() {
    document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    function syncFromRoute() {
      const raw = (window.location.hash ? window.location.hash.replace(/^#/, '') : window.location.pathname)
        .replace(/^\/+/, '')
        .trim()
      const route = getPathRoute()

      if (route === 'pdp') {
        const productId = getProductIdFromPath()
        if (!productId || !PRODUCTS.some((p) => p.id === productId)) {
          setRoute('home')
          return
        }
        setCurrentProductId(productId)
        setView('pdp')
        setCartOpen(false)
        return
      }

      if (route === 'home') {
        setView('home')
        setCurrentProductId(null)
        setCartOpen(false)
        return
      }

      if (route === 'process') {
        setView('process')
        setCurrentProductId(null)
        setCartOpen(false)
        return
      }

      if (route === 'bulk') {
        setView('bulk')
        setCurrentProductId(null)
        setCartOpen(false)
        return
      }

      if (route === 'cart') {
        setView('cart')
        setCurrentProductId(null)
        setCartOpen(true)
        return
      }

      setRoute('home')
    }

    syncFromRoute()
    window.addEventListener('popstate', syncFromRoute)
    window.addEventListener('hashchange', syncFromRoute)
    return () => {
      window.removeEventListener('popstate', syncFromRoute)
      window.removeEventListener('hashchange', syncFromRoute)
    }
  }, [])

  useEffect(() => {
    if (view === 'home' && pendingScroll.current) {
      const id = pendingScroll.current
      pendingScroll.current = null
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant' in window ? 'instant' : 'auto' })
      })
    }
  }, [view])

  function addToCart(product, weight, qty) {
    setCart((prev) => {
      const idx = prev.findIndex((c) => c.id === product.id && c.weight === weight.label)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + qty }
        return next
      }
      return [
        ...prev,
        { id: product.id, name: product.name, icon: product.icon, image: product.image, weight: weight.label, price: weight.price, qty },
      ]
    })
    showToast(`Added ${product.name} (${weight.label}) × ${qty} to cart`)
    setRoute('cart')
  }

  function removeFromCart(idx) {
    setCart((prev) => prev.filter((_, i) => i !== idx))
  }

  function buyOnWhatsapp(product, weight, qty) {
    const lines = ["Hi Sudar Oli, I'd like to order:"]
    if (product && weight) {
      lines.push(`- ${product.name} (${weight.label}) x${qty} — ₹${weight.price * qty}`)
    } else if (cart.length) {
      cart.forEach((c) => {
        lines.push(`- ${c.name} (${c.weight}) x${c.qty} — ₹${c.price * c.qty}`)
      })
      const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0)
      lines.push(`Subtotal: ₹${subtotal}`)
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
  }

  function checkoutFromCart() {
    buyOnWhatsapp(null, null, null)
  }

  function handlePaymentSuccess({ paymentId, orderId }) {
    setCheckoutOpen(false)
    setCartOpen(false)
    setCart([])
    showToast(`Payment successful! Payment ID: ${paymentId}`)
    setRoute('home')
  }

  function handlePaymentError(message) {
    showToast(message)
  }

  const cartCount = cart.reduce((a, c) => a + c.qty, 0)
  const cartSubtotal = cart.reduce((a, c) => a + c.price * c.qty, 0)

  return (
    <>
      <Header
        view={view}
        onNavHome={goHome}
        onNavShop={scrollToShop}
        onNavProcess={showProcess}
        onNavBulk={showBulkOrders}
        onNavContact={goToContact}
        onOpenPDP={openPDP}
        cartCount={cartCount}
        onOpenCart={openCart}
      />

      {view === 'home' && (
        <Home onOpenPDP={openPDP} onShopClick={scrollToShop} onAboutClick={scrollToAbout} onSeeProcess={showProcess} />
      )}

      {view === 'pdp' && currentProductId && (
        <PDP
          key={currentProductId}
          productId={currentProductId}
          onBackHome={goHome}
          onBackShop={scrollToShop}
          onOpenPDP={openPDP}
          onAddToCart={addToCart}
          onBuyOnWhatsapp={buyOnWhatsapp}
        />
      )}

      {view === 'process' && <Process onBackHome={goHome} onShopClick={scrollToShop} />}
      {view === 'bulk' && <BulkOrders onBackHome={goHome} onBackShop={scrollToShop} />}

      {view === 'cart' && (
        <CartDrawer
          open={cartOpen}
          cart={cart}
          onClose={() => {
            setCartOpen(false)
            setRoute('home')
          }}
          onRemove={removeFromCart}
          onCheckout={checkoutFromCart}
          onBrowse={() => {
            setCartOpen(false)
            setRoute('home')
            scrollToShop()
          }}
          onPayOnline={() => setCheckoutOpen(true)}
        />
      )}

      {checkoutOpen && (
        <CheckoutModal
          amount={cartSubtotal}
          items={cart}
          onClose={() => setCheckoutOpen(false)}
          onPaid={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}

      <Toast message={toast.message} show={toast.show} />

      <Footer
        onOpenPDP={openPDP}
        onShowProcess={showProcess}
        onShowBulkOrders={showBulkOrders}
      />
    </>
  )
}
