"use client"

import type React from "react"
import { useState } from "react"
import { Search, ShoppingCart, User, Facebook, Twitter, Instagram, Youtube, Linkedin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { useRouter } from "next/navigation"

export function Header() {
  const { totalItems } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      {/* Promotional Top Bar */}
      <div className="bg-primary text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center flex-wrap gap-4">
          
          {/* Left: Shipping Info */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">🚚 Free shipping on orders over $100!</span>
            <span className="sm:hidden">🚚 Free shipping $100+</span>
          </div>

          {/* Center: Social Media */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline">Follow us:</span>
            <Link href="https://facebook.com/smartdeviceelectronics" target="_blank" aria-label="Facebook"
              className="hover:text-blue-400 transition-colors p-1">
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href="https://twitter.com/smartdevicetech" target="_blank" aria-label="Twitter"
              className="hover:text-blue-400 transition-colors p-1">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="https://instagram.com/smartdeviceelectronics" target="_blank" aria-label="Instagram"
              className="hover:text-pink-400 transition-colors p-1">
              <Instagram className="h-4 w-4" />
            </Link>
            <Link href="https://youtube.com/smartdeviceelectronics" target="_blank" aria-label="YouTube"
              className="hover:text-red-400 transition-colors p-1">
              <Youtube className="h-4 w-4" />
            </Link>
            <Link href="https://linkedin.com/company/smartdeviceelectronics" target="_blank" aria-label="LinkedIn"
              className="hover:text-blue-500 transition-colors p-1">
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: Contact Info */}
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">📞 +250 780 612 354</span>
            <span className="hidden lg:inline">📧 smartzone.nm01@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-25 items-center gap-4">
          {/* Custom Menu Icon */}
          <SidebarTrigger className="group relative h-12 w-12 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-md flex items-center justify-center">
            <img 
              src="/menu.png" 
              alt="Menu" 
              className="w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:opacity-80"
            />
          </SidebarTrigger>

          {/* Enhanced Logo */}
          <Link href="/" className="group flex items-center gap-3 py-2 px-1 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:shadow-lg">
            <div className="relative">
              {/* Logo Container with Enhanced Styling */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-gray-200 group-hover:border-gray-300">
                  <img 
                    src="/SDE_page-0001 (1).jpg" 
                    alt="SMART DEVICE Logo" 
                    className="w-full h-full object-cover rounded-full scale-105 group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
              </div>
              
              {/* Animated Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gray-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md -z-10"></div>
              
              {/* Pulse Animation */}
              <div className="absolute inset-0 rounded-full border-2 border-gray-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
            </div>
            
            {/* Brand Text with Enhanced Typography */}
            <div className="hidden sm:block group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="font-bold text-lg lg:text-xl text-black uppercase tracking-wide group-hover:text-gray-800 transition-all duration-300">
                SMART DEVICE
              </h1>
              <p className="text-xs lg:text-sm text-gray-600 font-medium tracking-wider group-hover:text-gray-800 transition-colors duration-300">
                Electronics & Technology
              </p>
              
              {/* Underline Animation */}
              <div className="h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1 rounded-full"></div>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 ml-8">
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Enhanced Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Search for iPhone, MacBook, Samsung..."
                className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-primary transition-all duration-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* About & Contact for Mobile/Tablet */}
            <div className="flex lg:hidden items-center gap-1">
              <Button variant="ghost" size="sm" className="text-xs px-2 hover:bg-primary/10 transition-colors" asChild>
                <Link href="/about">About</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-xs px-2 hover:bg-primary/10 transition-colors" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-gray-100 rounded-lg transition-all hover:scale-105" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-lg transition-all hover:scale-105" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Categories */}
      <div className="border-t bg-gradient-to-r from-gray-50 to-blue-50 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-3 overflow-x-auto">
            <Link
              href="/products?category=phones"
              className="text-sm hover:text-primary transition-all duration-300 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white hover:shadow-md transform hover:scale-105"
            >
              📱 Phones
            </Link>
            <Link
              href="/products?category=laptops"
              className="text-sm hover:text-primary transition-all duration-300 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white hover:shadow-md transform hover:scale-105"
            >
              💻 Laptops
            </Link>
            <Link
              href="/products?category=tablets"
              className="text-sm hover:text-primary transition-all duration-300 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white hover:shadow-md transform hover:scale-105"
            >
              📱 Tablets
            </Link>
            <Link
              href="/products?category=accessories"
              className="text-sm hover:text-primary transition-all duration-300 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white hover:shadow-md transform hover:scale-105"
            >
              🎧 Accessories
            </Link>
            <Link
              href="/products?category=gaming"
              className="text-sm hover:text-primary transition-all duration-300 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white hover:shadow-md transform hover:scale-105"
            >
              🎮 Gaming
            </Link>
            <Link
              href="/products?category=smartwatch"
              className="text-sm hover:text-primary transition-all duration-300 whitespace-nowrap px-3 py-1 rounded-full hover:bg-white hover:shadow-md transform hover:scale-105"
            >
              ⌚ Smartwatches
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}