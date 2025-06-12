"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, ArrowRight, Zap, Shield, Truck, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { HeroSection } from "@/components/hero-section"
import { BrandsSection } from "@/components/brands-section"

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.9,
    reviews: 2847,
    image: "/placeholder.svg?height=300&width=300",
    brand: "Apple",
    category: "phones",
    badge: "Best Seller",
    specs: ["256GB Storage", "A17 Pro Chip", "Titanium Design"],
  },
  {
    id: 2,
    name: "MacBook Pro 14-inch M3",
    price: 1999.99,
    originalPrice: 2199.99,
    rating: 4.8,
    reviews: 1523,
    image: "/placeholder.svg?height=300&width=300",
    brand: "Apple",
    category: "laptops",
    badge: "New Arrival",
    specs: ["M3 Chip", "16GB RAM", "512GB SSD"],
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    price: 1099.99,
    originalPrice: 1199.99,
    rating: 4.7,
    reviews: 1876,
    image: "/placeholder.svg?height=300&width=300",
    brand: "Samsung",
    category: "phones",
    badge: "Hot Deal",
    specs: ["S Pen Included", "200MP Camera", "5000mAh Battery"],
  },
  {
    id: 4,
    name: "Dell XPS 13 Plus",
    price: 1299.99,
    originalPrice: 1499.99,
    rating: 4.6,
    reviews: 892,
    image: "/placeholder.svg?height=300&width=300",
    brand: "Dell",
    category: "laptops",
    badge: "Editor's Choice",
    specs: ["Intel i7", "16GB RAM", '13.4" OLED'],
  },
]

const categories = [
  {
    name: "Smartphones",
    count: 450,
    image: "/placeholder.svg?height=200&width=200",
    icon: "📱",
    url: "/products?category=phones",
  },
  {
    name: "Laptops",
    count: 320,
    image: "/placeholder.svg?height=200&width=200",
    icon: "💻",
    url: "/products?category=laptops",
  },
  {
    name: "Tablets",
    count: 180,
    image: "/placeholder.svg?height=200&width=200",
    icon: "📱",
    url: "/products?category=tablets",
  },
  {
    name: "Headphones",
    count: 280,
    image: "/placeholder.svg?height=200&width=200",
    icon: "🎧",
    url: "/products?category=headphones",
  },
  {
    name: "Gaming",
    count: 150,
    image: "/placeholder.svg?height=200&width=200",
    icon: "🎮",
    url: "/products?category=gaming",
  },
  {
    name: "Accessories",
    count: 520,
    image: "/placeholder.svg?height=200&width=200",
    icon: "🔌",
    url: "/products?category=accessories",
  },
]

const brands = [
  { name: "Apple", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Samsung", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Dell", logo: "/placeholder.svg?height=60&width=120" },
  { name: "HP", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Lenovo", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Sony", logo: "/placeholder.svg?height=60&width=120" },
]

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
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleAddToCart = (product: any) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <Card
              key={product.id}
              className={`group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge className="absolute top-2 left-2 bg-primary">{product.badge}</Badge>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
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
                <div className="space-y-2 mb-3">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="text-xs text-gray-600">
                      • {spec}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-primary">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 space-y-2">
                <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
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
    </div>
  )
}
