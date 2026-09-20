import Hero from './Hero.jsx'
import TrustStrip from './TrustStrip.jsx'
import Shop from './Shop.jsx'
import About from './About.jsx'

export default function Home({ onOpenPDP, onShopClick, onAboutClick, onSeeProcess, onOpenFavourites, shopFilter, setShopFilter, favoriteIds, setFavoriteIds }) {
  return (
    <div id="view-home">
      <Hero onShopClick={onShopClick} onAboutClick={onAboutClick} onOpenPDP={onOpenPDP} />
      <TrustStrip />
      <Shop
        onOpenPDP={onOpenPDP}
        filter={shopFilter}
        setFilter={setShopFilter}
        onOpenFavourites={onOpenFavourites}
        favoriteIds={favoriteIds}
        setFavoriteIds={setFavoriteIds}
      />
      <About onSeeProcess={onSeeProcess} />
    </div>
  )
}
