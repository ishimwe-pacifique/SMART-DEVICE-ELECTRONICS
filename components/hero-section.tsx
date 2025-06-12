"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Smartphone, Laptop, Star, Monitor, Camera } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Define your background images - including your brand banner
const backgroundImages = [
  "/images/brand-banner.jpg", // Your brand banner
  "/images/product1.jpg",
  "/images/product2.webp",
  "/images/product3.webp",
  "/images/product4.webp",
  "/images/product5.jpg",
]

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    // Background image rotation every 3 seconds
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-black overflow-hidden">
      {/* Rotating Background Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBgIndex ? "opacity-30" : "opacity-0"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Electronics Background ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Orange Overlay Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/85 via-orange-600/75 to-black/90"></div>

      {/* Tech Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Floating Product Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-orange-300/30">
            <Smartphone className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-orange-300/30">
            <Laptop className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/6 animate-float-slow">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-orange-300/30">
            <Monitor className="w-8 h-8 text-orange-200" />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/6 animate-float-delayed-slow">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-orange-300/30">
            <Camera className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div
            className={`space-y-8 transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-orange-300/50 backdrop-blur-sm text-lg px-4 py-2">
                <Star className="w-5 h-5 mr-2 text-orange-300" />
                Your Digital Knowledge Partner
              </Badge>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                  <span className="text-orange-300">SMART</span>
                  <span className="block text-white">DEVICE</span>
                  <span className="block text-black font-black text-5xl md:text-7xl">ELECTRONICS</span>
                </h1>
              </div>

              <div className="space-y-4">
                <p className="text-xl text-orange-100 leading-relaxed max-w-2xl font-medium">
                  We are your trusted digital knowledge partner, specializing in premium electronics and cutting-edge
                  technology solutions.
                </p>
                <p className="text-lg text-orange-200 leading-relaxed max-w-2xl">
                  From the latest smartphones and laptops to professional gaming setups and smart accessories - we bring
                  you the world's most innovative technology brands under one roof.
                </p>
                <p className="text-lg text-orange-200 leading-relaxed max-w-2xl">
                  Experience excellence in technology retail with our expert guidance, premium product selection, and
                  commitment to bringing you tomorrow's innovations today.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-200 border-2 border-white"
                asChild
              >
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-black hover:bg-white/10 backdrop-blur-sm font-semibold text-lg px-8 py-4"
                asChild
              >
                <Link href="/about">About Us</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-300">10K+</div>
                <div className="text-sm text-orange-200 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-300">500+</div>
                <div className="text-sm text-orange-200 font-medium">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-300">15+</div>
                <div className="text-sm text-orange-200 font-medium">Top Brands</div>
              </div>
            </div>
          </div>

          <div
            className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            <div className="relative">
              {/* Main Brand Showcase - This will also rotate with your background images */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-2 border-orange-300/30 shadow-2xl">
                <Image
                  src={backgroundImages[currentBgIndex] || "/placeholder.svg"}
                  alt="Smart Device Electronics - Premium Technology"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />

                {/* Floating Excellence Badge */}
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl animate-float border-4 border-orange-500">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">★★★★★</div>
                    <div className="text-sm text-gray-600 font-semibold">Excellence</div>
                  </div>
                </div>

                {/* Premium Service Badge */}
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-2xl animate-float-delayed">
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm font-medium">Premium Service</div>
                  </div>
                </div>

                {/* Digital Knowledge Badge */}
                <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-orange-500/50">
                  <div className="text-orange-400 font-bold text-sm">DIGITAL</div>
                  <div className="text-white text-xs">KNOWLEDGE</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-orange-400/30 to-black/30 rounded-3xl blur-xl"></div>
              <div className="absolute -z-20 top-16 left-16 w-full h-full bg-gradient-to-br from-orange-300/20 to-orange-600/20 rounded-3xl blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {backgroundImages.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentBgIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentBgIndex ? "bg-orange-300 scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="white"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  )
}
