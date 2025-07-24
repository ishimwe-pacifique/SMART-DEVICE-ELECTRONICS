"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, Loader2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getProductById, updateProduct } from "@/app/actions/upload-actions"
import { useToast } from "@/hooks/use-toast"

const categories = ["phones", "laptops", "tablets", "headphones", "gaming", "accessories"]
const brands = ["Apple", "Samsung", "Dell", "HP", "Lenovo", "Sony", "Microsoft", "Google", "OnePlus", "Xiaomi"]
const badges = ["Best Seller", "New Arrival", "Hot Deal", "Editor's Choice", "Limited Edition", "Premium"]

interface Product {
  id: string
  name: string
  brand: string
  category: string
  badge?: string | null
  price: number
  originalPrice?: number | null
  rating: number
  reviews: number
  description: string
  specs: string[]
  images: string[]
  image: string
  createdAt: string
}

export default function EditProductPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [specs, setSpecs] = useState<string[]>([""])

  const productId = searchParams.get("id")

  useEffect(() => {
    if (productId) {
      loadProduct()
    } else {
      toast({
        title: "Error",
        description: "No product ID provided",
        variant: "destructive",
      })
      router.push("/admin/product")
    }
  }, [productId])

  const loadProduct = async () => {
    if (!productId) return

    setLoading(true)
    try {
      console.log("Loading product with ID:", productId)
      const result = await getProductById(productId)

      if (result.success && result.product) {
        const productData = result.product as Product
        console.log("Product loaded:", productData)
        setProduct(productData)
        setExistingImages(productData.images || [productData.image])
        setSpecs(productData.specs && productData.specs.length > 0 ? productData.specs : [""])
      } else {
        console.error("Failed to load product:", result.error)
        toast({
          title: "Error",
          description: result.error || "Product not found",
          variant: "destructive",
        })
        router.push("/admin/product")
      }
    } catch (error) {
      console.error("Error loading product:", error)
      toast({
        title: "Error",
        description: "Failed to load product",
        variant: "destructive",
      })
      router.push("/admin/product")
    }
    setLoading(false)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const totalImages = existingImages.length + selectedImages.length + files.length
    if (totalImages > 5) {
      toast({
        title: "Too many images",
        description: "Maximum 5 images allowed per product",
        variant: "destructive",
      })
      return
    }

    const newFiles = [...selectedImages, ...files]
    setSelectedImages(newFiles)

    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
    setPreviewUrls(newPreviewUrls)
  }

  const removeNewImage = (index: number) => {
    const newFiles = selectedImages.filter((_, i) => i !== index)
    const newPreviews = previewUrls.filter((_, i) => i !== index)
    setSelectedImages(newFiles)
    setPreviewUrls(newPreviews)
  }

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index))
  }

  const addSpec = () => {
    setSpecs([...specs, ""])
  }

  const updateSpec = (index: number, value: string) => {
    const newSpecs = [...specs]
    newSpecs[index] = value
    setSpecs(newSpecs)
  }

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index))
  }

  const handleSubmit = async (formData: FormData) => {
    if (!productId) return

    if (existingImages.length === 0 && selectedImages.length === 0) {
      toast({
        title: "Error",
        description: "Please keep at least one image",
        variant: "destructive",
      })
      return
    }

    setIsUpdating(true)

    try {
      // Add new images to form data
      selectedImages.forEach((file, index) => {
        formData.append(`new_image_${index}`, file)
      })

      // Add existing images to form data
      formData.append("existing_images", JSON.stringify(existingImages))

      // Add specs to form data
      const validSpecs = specs.filter((spec) => spec.trim() !== "")
      formData.append("specs", JSON.stringify(validSpecs))

      // Add product ID
      formData.append("id", productId)

      const result = await updateProduct(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Product updated successfully!",
        })
        router.push("/admin/product")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update product",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading product...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Product not found</h2>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been deleted.</p>
            <Button asChild>
              <Link href="/admin/product">Back to Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/admin/product">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Product: {product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {/* Product Images */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Product Images (Max 5)</Label>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">Current Images</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
                    {existingImages.map((url, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`Current ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeExistingImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        {index === 0 && <Badge className="absolute bottom-2 left-2 text-xs">Main</Badge>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Images Upload */}
              {existingImages.length + selectedImages.length < 5 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Click to add more images</p>
                  </label>
                </div>
              )}

              {/* New Image Previews */}
              {previewUrls.length > 0 && (
                <div>
                  <Label className="text-sm text-gray-600 mb-2 block">New Images</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={url || "/placeholder.svg"}
                          alt={`New ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeNewImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <Badge className="absolute bottom-2 left-2 text-xs bg-green-600">New</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" defaultValue={product.name} required />
                </div>

                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Select name="brand" defaultValue={product.brand} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={product.category} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="badge">Badge (Optional)</Label>
                  <Select name="badge" defaultValue={product.badge || "none"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select badge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Badge</SelectItem>
                      {badges.map((badge) => (
                        <SelectItem key={badge} value={badge}>
                          {badge}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="price">Price (RWF)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={product.price}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="originalPrice">Original Price (RWF) - Optional</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={product.originalPrice || ""}
                  />
                </div>

                <div>
                  <Label htmlFor="rating">Rating (1-5)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    defaultValue={product.rating}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="reviews">Number of Reviews</Label>
                  <Input id="reviews" name="reviews" type="number" min="0" defaultValue={product.reviews} required />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={4} defaultValue={product.description} required />
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Specifications</Label>
                <Button type="button" variant="outline" size="sm" onClick={addSpec}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Spec
                </Button>
              </div>

              {specs.map((spec, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={spec}
                    onChange={(e) => updateSpec(index, e.target.value)}
                    placeholder="e.g., 256GB Storage"
                    className="flex-1"
                  />
                  {specs.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => removeSpec(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Product"
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/product">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
