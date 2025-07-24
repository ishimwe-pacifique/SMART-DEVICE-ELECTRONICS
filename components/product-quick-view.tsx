"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, X, Star, ShoppingCart, MessageCircle, Heart } from "lucide-react"
import Image from "next/image"

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
}

interface ProductQuickViewProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product) => void
  onWhatsAppContact: (product: Product) => void
}

export function ProductQuickView({ product, isOpen, onClose, onAddToCart, onWhatsAppContact }: ProductQuickViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{product.name}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onWhatsAppContact(product)}
                  className="text-green-600 hover:text-green-700"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative">
                <Image
                  src={product.images[currentImageIndex] || product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-80 object-cover rounded-lg cursor-pointer"
                  onClick={() => setIsImageModalOpen(true)}
                />
                {product.images.length > 1 && (
                  <>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
                {product.badge && <Badge className="absolute top-2 left-2">{product.badge}</Badge>}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                        index === currentImageIndex ? "border-primary" : "border-gray-200"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{product.brand}</Badge>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
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

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-primary">RWF{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">RWF{product.originalPrice}</span>
                    <Badge variant="destructive">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
                  </>
                )}
              </div>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </CardContent>
              </Card>

              {product.specs.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Key Features</h3>
                    <ul className="space-y-1">
                      {product.specs.map((spec, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => onAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onWhatsAppContact(product)}
                  className="text-green-600 hover:text-green-700"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Screen Image Modal */}
      {isImageModalOpen && (
        <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
          <DialogContent className="max-w-7xl max-h-[95vh] p-0">
            <div className="relative">
              <Image
                src={product.images[currentImageIndex] || product.image || "/placeholder.svg"}
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
                  {currentImageIndex + 1} / {product.images.length}
                </Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
