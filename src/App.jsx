import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import PDP from './components/PDP.jsx'
import Process from './components/Process.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import CheckoutModal from './components/CheckoutModal.jsx'
import Toast from './components/Toast.jsx'
import Footer from './components/Footer.jsx'
import { WHATSAPP_NUMBER } from './config.js'

export default function App() {
  const [view, setView] = useState('home') // 'home' | 'pdp' | 'process'
  const [currentProductId, setCurrentProductId] = useState(null)
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

  function goHome() {
    setView('home')
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }

  function openPDP(id) {
    setCurrentProductId(id)
    setView('pdp')
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }

  function showProcess() {
    setView('process')
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }

  /* Works from any view: jumps home (if needed) then scrolls to the shop grid */
  function scrollToShop() {
    if (view !== 'home') {
      pendingScroll.current = 'shop'
      setView('home')
    } else {
      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function scrollToAbout() {
    if (view !== 'home') {
      pendingScroll.current = 'about'
      setView('home')
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function goToContact() {
    document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth' })
  }

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
    setCartOpen(true)
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
        onNavContact={goToContact}
        onOpenPDP={openPDP}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
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

      <CartDrawer
        open={cartOpen}
        cart={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onCheckout={checkoutFromCart}
        onBrowse={() => {
          setCartOpen(false)
          scrollToShop()
        }}
        onPayOnline={() => setCheckoutOpen(true)}
      />

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
        onFilterAndShop={() => scrollToShop()}
        onShowProcess={showProcess}
      />
    </>
  )
}
