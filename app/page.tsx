"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  ShoppingCart,
  Heart,
  Zap,
  Shield,
  Truck,
  Award,
  MessageCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { HeroSection } from "@/components/hero-section"
import { BrandsSection } from "@/components/brands-section"
import { getProducts } from "@/app/actions/upload-actions"
import { ProductQuickView } from "@/components/product-quick-view"
import { WhatsAppWidget } from "@/components/whatsapp-widget"

interface Product {
  id: string
  name: string
  brand: string
  category: string
  badge?: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  description: string
  specs: string[]
  images: string[]
  image: string
  createdAt: string
}

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over $100",
  },
  {
    icon: Shield,
    title: "Warranty Protection",
    description: "Extended warranty on all products",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Same day delivery available",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "100% authentic products guaranteed",
  },
]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    setIsVisible(true)
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const result = await getProducts()
      if (result.success) {
        const allProducts = result.products
        setProducts(allProducts)

        // Get featured products (first 8 products)
        setFeaturedProducts(allProducts.slice(0, 8))

        // Generate categories from products
        const categoryMap = new Map()
        allProducts.forEach((product: Product) => {
          const category = product.category
          if (categoryMap.has(category)) {
            categoryMap.set(category, categoryMap.get(category) + 1)
          } else {
            categoryMap.set(category, 1)
          }
        })

        const dynamicCategories = Array.from(categoryMap.entries()).map(([name, count]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          count,
          icon: getCategoryIcon(name),
          url: `/products?category=${name}`,
        }))

        setCategories(dynamicCategories)
      }
    } catch (error) {
      console.error("Error loading products:", error)
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      phones: "📱",
      laptops: "💻",
      tablets: "📱",
      headphones: "🎧",
      gaming: "🎮",
      accessories: "🔌",
    }
    return icons[category] || "📦"
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      category: product.category,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWhatsAppContact = (product: Product) => {
    const message = `Hi! I'm interested in ${product.name} - $${product.price}. Can you provide more details?`
    const phoneNumber = "+250780612354" // Replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of electronics across different categories
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link key={category.name} href={category.url}>
                <Card
                  className={`hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-600">Handpicked premium electronics just for you</p>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isVisible={isVisible}
                onAddToCart={handleAddToCart}
                onWhatsAppContact={handleWhatsAppContact}
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* Brands Section */}
      <BrandsSection />

      {/* Newsletter Section */}
      <section className="bg-primary text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-primary-100 mb-6">
                Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and tech
                insights.
              </p>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button className="bg-white text-primary hover:bg-gray-100">Subscribe</Button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <p className="text-primary-100">Join 50,000+ tech enthusiasts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onWhatsAppContact={handleWhatsAppContact}
        />
      )}

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  )
}

// Enhanced Product Card Component
interface ProductCardProps {
  product: Product
  index: number
  isVisible: boolean
  onAddToCart: (product: Product) => void
  onWhatsAppContact: (product: Product) => void
  onQuickView: (product: Product) => void
}

function ProductCard({ product, index, isVisible, onAddToCart, onWhatsAppContact, onQuickView }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <Card
      className={`group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden group">
          <Image
            src={product.images[currentImageIndex] || product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
          />
          {product.badge && <Badge className="absolute top-2 left-2 bg-primary">{product.badge}</Badge>}

          {/* Image Navigation */}
          {product.images.length > 1 && isHovered && (
            <>
              <Button
                size="icon"
                variant="secondary"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 opacity-80 hover:opacity-100"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 opacity-80 hover:opacity-100"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation()
                onQuickView(product)
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Image Indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {product.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {product.brand}
          </Badge>
        </div>
        <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        {/* Specs Preview */}
        <div className="space-y-1 mb-3">
          {product.specs.slice(0, 2).map((spec, i) => (
            <div key={i} className="text-xs text-gray-600">
              • {spec}
            </div>
          ))}
          {product.specs.length > 2 && (
            <div className="text-xs text-gray-500">+{product.specs.length - 2} more features</div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-primary">RWF{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">RWF{product.originalPrice}</span>
          )}
          {product.originalPrice && (
            <Badge variant="destructive" className="text-xs">
              Save ${(product.originalPrice - product.price).toFixed(2)}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart(product)
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
            onClick={(e) => {
              e.stopPropagation()
              onWhatsAppContact(product)
            }}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
