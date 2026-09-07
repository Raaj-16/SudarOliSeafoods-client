import Hero from './Hero.jsx'
import TrustStrip from './TrustStrip.jsx'
import Shop from './Shop.jsx'
import About from './About.jsx'

export default function Home({ onOpenPDP, onShopClick, onAboutClick, onSeeProcess }) {
  return (
    <div id="view-home">
      <Hero onShopClick={onShopClick} onAboutClick={onAboutClick} onOpenPDP={onOpenPDP} />
      <TrustStrip />
      <Shop onOpenPDP={onOpenPDP} />
      <About onSeeProcess={onSeeProcess} />
    </div>
  )
}
