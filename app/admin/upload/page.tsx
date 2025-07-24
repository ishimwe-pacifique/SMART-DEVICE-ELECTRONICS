"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, Loader2 } from "lucide-react"
import Image from "next/image"
import { uploadProduct } from "@/app/actions/upload-actions"
import { useToast } from "@/hooks/use-toast"

const categories = ["phones", "laptops", "tablets", "headphones", "gaming", "accessories"]

const brands = ["Apple", "Samsung", "Dell", "HP", "Lenovo", "Sony", "Microsoft", "Google", "OnePlus", "Xiaomi"]

const badges = ["Best Seller", "New Arrival", "Hot Deal", "Editor's Choice", "Limited Edition", "Premium"]

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [specs, setSpecs] = useState<string[]>([""])
  const { toast } = useToast()

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Limit to 5 images
    const newFiles = [...selectedImages, ...files].slice(0, 5)
    setSelectedImages(newFiles)

    // Create preview URLs
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
    setPreviewUrls(newPreviewUrls)
  }

  const removeImage = (index: number) => {
    const newFiles = selectedImages.filter((_, i) => i !== index)
    const newPreviews = previewUrls.filter((_, i) => i !== index)

    setSelectedImages(newFiles)
    setPreviewUrls(newPreviews)
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
    if (selectedImages.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one image",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Add images to form data
      selectedImages.forEach((file, index) => {
        formData.append(`image_${index}`, file)
      })

      // Add specs to form data
      const validSpecs = specs.filter((spec) => spec.trim() !== "")
      formData.append("specs", JSON.stringify(validSpecs))

      const result = await uploadProduct(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: "Product uploaded successfully!",
        })

        // Reset form
        setSelectedImages([])
        setPreviewUrls([])
        setSpecs([""])

        // Reset form fields
        const form = document.getElementById("upload-form") as HTMLFormElement
        form?.reset()
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload product",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Upload New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="upload-form" action={handleSubmit} className="space-y-6">
            {/* Product Images */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Product Images (Max 5)</Label>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                  disabled={selectedImages.length >= 5}
                />
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer ${selectedImages.length >= 5 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {selectedImages.length >= 5
                      ? "Maximum 5 images selected"
                      : "Click to upload images or drag and drop"}
                  </p>
                </label>
              </div>

              {/* Image Previews */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {index === 0 && <Badge className="absolute bottom-2 left-2 text-xs">Main</Badge>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" name="name" required />
                </div>

                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Select name="brand" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
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
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <Select name="badge">
                    <SelectTrigger>
                      <SelectValue placeholder="Select badge" />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" name="price" type="number" step="0.01" min="0" required />
                </div>

                <div>
                  <Label htmlFor="originalPrice">Original Price ($) - Optional</Label>
                  <Input id="originalPrice" name="originalPrice" type="number" step="0.01" min="0" />
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
                    defaultValue="4.5"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="reviews">Number of Reviews</Label>
                  <Input id="reviews" name="reviews" type="number" min="0" defaultValue="0" required />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Enter product description..."
                required
              />
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
            <Button type="submit" className="w-full" disabled={isUploading || selectedImages.length === 0}>
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload Product"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
