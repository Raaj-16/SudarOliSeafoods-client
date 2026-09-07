import { useState } from 'react'
import { ICONS } from '../data/products.js'

export default function ProductIcon({ icon, image, alt = '', viewBox = '0 0 120 80', className }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (image && !imageFailed) {
    return <img className={className} src={image} alt={alt} onError={() => setImageFailed(true)} />
  }

  return (
    <svg
      viewBox={viewBox}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: ICONS[icon] }}
    />
  )
}
