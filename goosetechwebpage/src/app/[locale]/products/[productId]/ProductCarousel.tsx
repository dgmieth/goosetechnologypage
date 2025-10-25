'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductCarouselProps {
  productId: string
  title: string
  totalImages: number
}

export default function ProductCarousel({
  productId,
  title,
  totalImages,
}: ProductCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
  }

  return (
    <div className="product-carousel">
      <div className="carousel-container">
        <Image
          src={`https://via.placeholder.com/600x400?text=${productId}+${currentImageIndex + 1}`}
          alt={`${title} - Screenshot ${currentImageIndex + 1}`}
          width={600}
          height={400}
          className="carousel-image"
          unoptimized
        />
      </div>

      <button onClick={prevImage} className="carousel-btn carousel-btn-prev">
        ←
      </button>
      <button onClick={nextImage} className="carousel-btn carousel-btn-next">
        →
      </button>

      {/* Indicators */}
      <div className="carousel-indicators">
        {Array.from({ length: totalImages }).map((_, idx) => (
          <button
            key={idx}
            className={`indicator ${idx === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(idx)}
          />
        ))}
      </div>
    </div>
  )
}
