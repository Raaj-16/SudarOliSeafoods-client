import logo440 from '../assets/logo-440.png'
import { WHATSAPP_NUMBER } from '../config.js'

const FISH_LINKS = [
  ['Nethili Karuvadu', 'nethili'],
  ['Mathi Karuvadu', 'mathi'],
  ['Vanjaram Karuvadu', 'vanjaram'],
  ['Vaala Karuvadu', 'vaala'],
  ['Nagarai Karuvadu', 'nagarai'],
  ['Seela Karuvadu', 'seela'],
  ['Kaana Kaththai Karuvadu', 'kaanakaththai'],
  ['Chennakunni', 'chennakunni'],
]

export default function Footer({ onOpenPDP, onShowProcess, onShowBulkOrders }) {
  return (
    <footer id="footer-contact">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <img className="footer-logo" src={logo440} alt="Sudar Oli Dry Sea Foods emblem" />
          <p>
            Traditional sun-dried fish and prawns from the Tamil Nadu coast, sourced by availability and packed fresh for
            delivery across Tamil Nadu.
          </p>
          <div className="social-row">
            <a href="https://instagram.com/sudaroli_dry_sea_foods?stkn=bWZycHo1ZGV4MzNo" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EDE4D2" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} aria-label="WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EDE4D2" strokeWidth="1.8">
                <path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 20l1.1-5.3A8.5 8.5 0 1 1 21 11.5Z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/share/1DBvTVbuse/" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EDE4D2" strokeWidth="1.8">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h5>Shop</h5>
          <ul>
            {FISH_LINKS.map(([name, id]) => (
              <li key={id}>
                <a style={{ textDecoration: 'none' }}
                  href="#shop"
                  onClick={(e) => {
                    e.preventDefault()
                    onOpenPDP(id)
                  }}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>Shop info</h5>
          <ul>
            <li>
              <a style={{ textDecoration: 'none' }}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onShowProcess()
                }}
              >
                Our process
              </a>
            </li>
            <li>
              <a
                style={{ textDecoration: 'none' }}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onShowBulkOrders?.()
                }}
              >
                Bulk / wholesale orders
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li style={{ display: 'flex', flexDirection: 'column', width: '278px' }}>
              <a
                href="https://maps.app.goo.gl/GBzogvaa5pu7QbWu5"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                No 38, PH ROAD - Poonamalle Highway,<br />
                Nerkundram (Near People's Flat),<br />
                Chennai, Tamil Nadu- 600107
              </a>
            </li>
            <li>
              <a href="tel:+916379386564" style={{ textDecoration: 'none' }}>+91 63793 86564</a>,{' '}
              <a href="tel:+919941564349" style={{ textDecoration: 'none' }}>+91 99415 64349</a>
              <br />
              <a href="tel:+919790991369" style={{ textDecoration: 'none' }}>+91 97909 91369</a>,{' '}
              <a href="tel:+917299419828" style={{ textDecoration: 'none' }}>+91 72994 19828</a>
            </li>
            <li>
              <a href="mailto:SudaroliDryseafoods@gmail.com" style={{ textDecoration: 'none' }}>
                SudaroliDryseafoods@gmail.com
              </a>
            </li>
            <li>Mon–Sat, 10 AM – 9 PM</li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>© 2026 Sudar Oli Dry Sea Foods. All rights reserved.</p>
        <p className="fssai">FSSAI Lic. No. 22426246001221</p>
      </div>
    </footer>
  )
}