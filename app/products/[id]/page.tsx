"use client"

import { useState, useEffect } from "react"
import { useParams, notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  Check,
  Truck,
  Shield,
  ArrowLeft,
  ChevronLeft,
  MessageCircle,
  Eye,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { getProductById, getProducts } from "@/app/actions/upload-actions"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    if (productId) {
      loadProduct()
    }
  }, [productId])

  const loadProduct = async () => {
    setLoading(true)
    try {
      // Load main product
      const productResult = await getProductById(productId)
      if (productResult.success && productResult.product) {
        const productData = productResult.product as Product
        setProduct(productData)

        // Load related products
        const allProductsResult = await getProducts()
        if (allProductsResult.success) {
          const related = allProductsResult.products
            .filter((p: Product) => p.category === productData.category && p.id !== productData.id)
            .slice(0, 4)
          setRelatedProducts(related)
        }
      } else {
        notFound()
      }
    } catch (error) {
      console.error("Error loading product:", error)
      notFound()
    }
    setLoading(false)
  }

  const handleAddToCart = () => {
    if (!product) return

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

  const handleWhatsAppContact = () => {
    if (!product) return

    const message = `Hi! I'm interested in ${product.name} - RWF${product.price}. Can you provide more details?`
    const phoneNumber = "+250780612354" // Replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const nextImage = () => {
    if (!product) return
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    if (!product) return
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  if (loading) {
    return <ProductDetailSkeleton />
  }

  if (!product) {
    notFound()
  }

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
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-white group">
            <Image
              src={product.images[selectedImage] || product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-4 cursor-pointer"
              onClick={() => setIsImageModalOpen(true)}
            />
            {product.images.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setIsImageModalOpen(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, i) => (
                <div
                  key={i}
                  className={`aspect-square cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-gray-200 hover:border-gray-300"
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
          )}

          {/* Image Indicators */}
          {product.images.length > 1 && (
            <div className="flex justify-center gap-1">
              {product.images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                    selectedImage === i ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setSelectedImage(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.brand}</Badge>
              <Badge className="bg-green-500">In Stock</Badge>
              {product.badge && <Badge className="bg-primary">{product.badge}</Badge>}
            </div>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
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
            <span className="text-3xl font-bold text-primary">RWF{product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xl text-gray-500 line-through">RWF{product.originalPrice}</span>
                <Badge variant="destructive">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
              </>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">{product.description}</p>

            {/* Key Features */}
            {product.specs.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Key Features:</h3>
                <ul className="space-y-1">
                  {product.specs.slice(0, 4).map((spec, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
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
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={handleWhatsAppContact}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                WhatsApp
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Button>
            </div>

            {/* Shipping & Returns */}
            <div className="space-y-3 pt-4 border-t">
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
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="specifications" className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Features</h3>
                <div className="space-y-3">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Brand</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Category</span>
                    <span className="capitalize">{product.category}</span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Rating</span>
                    <span>
                      {product.rating}/5 ({product.reviews} reviews)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 py-2 border-b">
                    <span className="font-medium">Product ID</span>
                    <span className="text-sm text-gray-600">{product.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Why Choose This Product?</h3>
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
                    <span>Comprehensive warranty and support</span>
                  </li>
                </ul>
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
                  packaging. Certain items may not be eligible for return. Please contact our customer service team to
                  initiate a return.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Warranty</h3>
                <p className="text-gray-600">
                  All products come with a standard 1-year manufacturer's warranty that covers defects in materials and
                  workmanship. Extended warranty options are available. For warranty claims, please contact our customer
                  service team.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                <div className="p-0">
                  <div className="relative">
                    <Link href={`/products/${relatedProduct.id}`}>
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </Link>
                  </div>
                </div>
                <CardContent className="p-4">
                  <Link href={`/products/${relatedProduct.id}`} className="block">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">RWF{relatedProduct.price}</span>
                    {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price && (
                      <span className="text-sm text-gray-500 line-through">RWF{relatedProduct.originalPrice}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Full Screen Image Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-7xl max-h-[95vh] p-0">
          <div className="relative">
            <Image
              src={product.images[selectedImage] || product.image || "/placeholder.svg"}
              alt={product.name}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4"
              onClick={() => setIsImageModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            {product.images.length > 1 && (
              <>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Badge variant="secondary">
                {selectedImage + 1} / {product.images.length}
              </Badge>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Loading Skeleton Component
function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        {/* Breadcrumbs skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 bg-gray-200 rounded w-12"></div>
          <div className="h-4 bg-gray-200 rounded w-1"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-1"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>

        {/* Back button skeleton */}
        <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          {/* Product info skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-10 bg-gray-200 rounded w-24"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>

            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 bg-gray-200 rounded flex-1"></div>
              <div className="h-12 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>

        {/* Tabs skeleton */}
        <div className="mt-12">
          <div className="flex gap-4 mb-6">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-28"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
