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
      <span className="hidden md:inline">📞 1-800-SMART-DEV</span>
      <span className="hidden lg:inline">📧 support@smartdevice.com</span>
    </div>
  </div>
</div>



      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-4">
          {/* Hamburger Menu */}
          <SidebarTrigger className="hover:bg-gray-100 transition-colors h-10 w-10" />

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SD</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-secondary">Smart Device</h1>
              <p className="text-xs text-gray-600">Electronics</p>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 ml-8">
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for iPhone, MacBook, Samsung..."
                className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-primary transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* About & Contact for Mobile/Tablet */}
            <div className="flex lg:hidden items-center gap-1">
              <Button variant="ghost" size="sm" className="text-xs px-2" asChild>
                <Link href="/about">About</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-xs px-2" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-gray-100" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Categories - Hidden on mobile when sidebar is available */}
      <div className="border-t bg-gray-50 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 py-2 overflow-x-auto">
            <Link
              href="/products?category=phones"
              className="text-sm hover:text-primary transition-colors whitespace-nowrap"
            >
              📱 Phones
            </Link>
            <Link
              href="/products?category=laptops"
              className="text-sm hover:text-primary transition-colors whitespace-nowrap"
            >
              💻 Laptops
            </Link>
            <Link
              href="/products?category=tablets"
              className="text-sm hover:text-primary transition-colors whitespace-nowrap"
            >
              📱 Tablets
            </Link>
            <Link
              href="/products?category=accessories"
              className="text-sm hover:text-primary transition-colors whitespace-nowrap"
            >
              🎧 Accessories
            </Link>
            <Link
              href="/products?category=gaming"
              className="text-sm hover:text-primary transition-colors whitespace-nowrap"
            >
              🎮 Gaming
            </Link>
            <Link
              href="/products?category=smartwatch"
              className="text-sm hover:text-primary transition-colors whitespace-nowrap"
            >
              ⌚ Smartwatches
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
