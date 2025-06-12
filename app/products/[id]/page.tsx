"use client"

import { useState } from "react"
import { useParams, notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Check, Truck, Shield, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

// Mock product data - in a real app, this would come from an API or database
const allProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: [
    "iPhone 15 Pro Max",
    "Samsung Galaxy S24 Ultra",
    "MacBook Pro M3",
    "Dell XPS 13 Plus",
    "Sony WH-1000XM5",
    "iPad Pro 12.9",
    "Google Pixel 8 Pro",
    "Lenovo ThinkPad X1",
    "Bose QuietComfort",
    "Microsoft Surface Pro",
  ][i % 10],
  price: Math.floor(Math.random() * 1500) + 299,
  originalPrice: Math.floor(Math.random() * 2000) + 399,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 1000) + 50,
  images: Array(4).fill("/placeholder.svg?height=600&width=600"),
  category: ["phones", "laptops", "tablets", "headphones", "accessories", "smartwatch", "gaming", "cameras"][i % 8],
  brand: ["Apple", "Samsung", "Dell", "Sony", "Google", "Microsoft", "Lenovo", "HP"][i % 8],
  inStock: Math.random() > 0.2,
  description:
    "This premium device offers cutting-edge technology and exceptional performance. Featuring a sleek design, powerful internals, and the latest innovations, it's designed to enhance your digital experience.",
  specs: {
    Display: `${Math.floor(Math.random() * 6) + 5}" ${["OLED", "LCD", "AMOLED", "Retina", "Super AMOLED"][i % 5]} Display`,
    Processor: `${["A17 Pro", "Snapdragon 8 Gen 3", "M3", "Intel Core i7", "AMD Ryzen 9"][i % 5]} Processor`,
    Memory: `${Math.floor(Math.random() * 16) + 4}GB RAM`,
    Storage: `${Math.floor(Math.random() * 512) + 64}GB Storage`,
    Battery: `${Math.floor(Math.random() * 5000) + 2000}mAh Battery`,
    Camera: `${Math.floor(Math.random() * 108) + 12}MP Camera`,
    "Operating System": `${["iOS 17", "Android 14", "macOS Sonoma", "Windows 11", "ChromeOS"][i % 5]}`,
  },
  colors: ["Black", "Silver", "Gold", "Blue", "Green"].slice(0, Math.floor(Math.random() * 4) + 1),
  variants: ["64GB", "128GB", "256GB", "512GB", "1TB"].slice(0, Math.floor(Math.random() * 4) + 1),
}))

// Mock reviews
const reviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    date: "2024-05-15",
    comment: "Absolutely love this product! The quality is outstanding and it works perfectly.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    date: "2024-05-10",
    comment: "Great product overall. The only minor issue is the battery life could be better.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Robert Johnson",
    rating: 5,
    date: "2024-05-05",
    comment: "Exceeded my expectations. Fast delivery and the product is exactly as described.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number(params.id)
  const product = allProducts.find((p) => p.id === productId)

  const { addItem } = useCart()
  const { toast } = useToast()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0] || "")
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      brand: product.brand,
      category: product.category,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  // Related products (just a few random ones)
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/products?category=${product.category}`} className="hover:text-primary transition-colors">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 font-medium truncate">{product.name}</span>
      </div>

      <div className="mb-6">
        <Button variant="ghost" size="sm" className="text-gray-500" asChild>
          <Link href="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, i) => (
              <div
                key={i}
                className={`aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${
                  selectedImage === i ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(i)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${i + 1}`}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.brand}</Badge>
              {product.inStock ? (
                <Badge className="bg-green-500">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(Number.parseFloat(product.rating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-primary">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
            )}
            <Badge className="bg-primary ml-2">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">{product.description}</p>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium">
                  Color: <span className="font-normal">{selectedColor}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      type="button"
                      variant={selectedColor === color ? "default" : "outline"}
                      className={`h-10 px-4 ${selectedColor === color ? "bg-primary" : ""}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Selection */}
            {product.variants.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium">
                  Storage: <span className="font-normal">{selectedVariant}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant}
                      type="button"
                      variant={selectedVariant === variant ? "default" : "outline"}
                      className={`h-10 px-4 ${selectedVariant === variant ? "bg-primary" : ""}`}
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <p className="font-medium">Quantity:</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 flex-1"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            {/* Shipping & Returns */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>1 year warranty included</span>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-sm text-gray-500">Share:</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="specifications">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="specifications" className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 py-2 border-b">
                      <span className="font-medium">{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Premium build quality with durable materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Advanced technology for optimal performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Energy efficient design for extended usage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Compatible with a wide range of accessories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>Intuitive user interface for seamless experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
                <p className="text-gray-600">
                  We offer free standard shipping on all orders over $100. For orders under $100, standard shipping
                  costs $8.99. Express shipping is available for an additional fee. Most orders are processed and
                  shipped within 1-2 business days.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Return Policy</h3>
                <p className="text-gray-600">
                  We accept returns within 30 days of delivery for most products in their original condition and
                  packaging. Certain items, including opened software, customized products, and personal care items, may
                  not be eligible for return. Please contact our customer service team to initiate a return.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Warranty</h3>
                <p className="text-gray-600">
                  All products come with a standard 1-year manufacturer's warranty that covers defects in materials and
                  workmanship. Extended warranty options are available for purchase at checkout. For warranty claims,
                  please contact our customer service team.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
              <div className="p-0">
                <div className="relative">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <Link href={`/products/${relatedProduct.id}`} className="block">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {relatedProduct.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">${relatedProduct.price}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
