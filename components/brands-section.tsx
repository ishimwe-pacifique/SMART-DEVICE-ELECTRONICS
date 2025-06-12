"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const brands = [
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Sony_logo.svg" },
  { name: "Google Pixel", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Dell", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" },
  { name: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/HP_logo_2012.svg" },
  { name: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Lenovo_logo_2015.svg" },
  { name: "Asus", logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/ASUS_Logo.svg" },
  { name: "Acer", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Acer_2011.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/LG_logo_%282015%29.svg" },
  { name: "OnePlus", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f4/OnePlus_logo.svg" },
]

export function BrandsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleImageError = (brandName: string) => {
    setImageErrors((prev) => ({ ...prev, [brandName]: true }))
  }

  const generateFallbackLogo = (brandName: string) => {
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="60" fill="#f3f4f6" rx="8"/>
        <text x="60" y="35" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#6b7280">${brandName}</text>
      </svg>
    `)}`
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            Authorized Partners
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Trusted Brands
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We partner with the world's leading technology brands to bring you the latest innovations and premium
            quality products
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className={`group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-gray-100 hover:border-orange-200 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/5 to-orange-400/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative flex items-center justify-center h-16">
                <Image
                  src={imageErrors[brand.name] ? generateFallbackLogo(brand.name) : brand.logo}
                  alt={`${brand.name} logo`}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  onError={() => handleImageError(brand.name)}
                  unoptimized={true}
                />
              </div>

              {/* Brand Name on Hover */}
              <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-medium text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">12+</div>
            <div className="text-sm text-gray-600 font-medium">Premium Brands</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
            <div className="text-sm text-gray-600 font-medium">Product Models</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">10K+</div>
            <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600 font-medium">Expert Support</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Discover premium electronics from these trusted brands and more</p>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Explore All Brands
          </button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200/30 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-float-delayed"></div>
    </section>
  )
}
