"use server"

import { connectToDatabase } from "@/lib/mongodb"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { revalidatePath } from "next/cache"

export async function uploadProduct(formData: FormData) {
  try {
    console.log("Starting product upload...")

    // Extract form data
    const name = formData.get("name") as string
    const brand = formData.get("brand") as string
    const category = formData.get("category") as string
    const badge = formData.get("badge") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const originalPrice = formData.get("originalPrice")
      ? Number.parseFloat(formData.get("originalPrice") as string)
      : null
    const rating = Number.parseFloat(formData.get("rating") as string)
    const reviews = Number.parseInt(formData.get("reviews") as string)
    const description = formData.get("description") as string
    const specs = JSON.parse(formData.get("specs") as string)

    console.log("Form data extracted:", { name, brand, category })

    // Upload images to Cloudinary
    const imageUrls: string[] = []
    let imageIndex = 0

    console.log("Starting image uploads...")

    while (formData.get(`image_${imageIndex}`)) {
      const file = formData.get(`image_${imageIndex}`) as File
      if (file && file.size > 0) {
        console.log(`Uploading image ${imageIndex + 1}:`, file.name, file.size)
        try {
          const imageUrl = await uploadToCloudinary(file)
          imageUrls.push(imageUrl)
          console.log(`Image ${imageIndex + 1} uploaded successfully:`, imageUrl)
        } catch (uploadError) {
          console.error(`Failed to upload image ${imageIndex + 1}:`, uploadError)
          throw new Error(`Failed to upload image ${file.name}: ${uploadError}`)
        }
      }
      imageIndex++
    }

    if (imageUrls.length === 0) {
      throw new Error("No images were uploaded successfully")
    }

    console.log("All images uploaded:", imageUrls)

    // Connect to MongoDB
    console.log("Connecting to MongoDB...")
    const { db } = await connectToDatabase()

    // Create product document
    const product = {
      name,
      brand,
      category,
      badge: badge || null,
      price,
      originalPrice,
      rating,
      reviews,
      description,
      specs,
      images: imageUrls,
      image: imageUrls[0], // Main image
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log("Saving product to database...")

    // Insert product into database
    const result = await db.collection("products").insertOne(product)

    if (!result.insertedId) {
      throw new Error("Failed to save product to database")
    }

    console.log("Product saved successfully:", result.insertedId)

    // Revalidate relevant pages
    revalidatePath("/")
    revalidatePath("/products")
    revalidatePath("/admin")

    return {
      success: true,
      productId: result.insertedId.toString(),
      message: "Product uploaded successfully",
    }
  } catch (error) {
    console.error("Upload error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

export async function getProducts(limit?: number) {
  try {
    const { db } = await connectToDatabase()

    const products = await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit || 0)
      .toArray()

    return {
      success: true,
      products: products.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        brand: product.brand,
        category: product.category,
        badge: product.badge,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        reviews: product.reviews,
        description: product.description,
        specs: product.specs || [],
        images: product.images || [product.image],
        image: product.image,
        createdAt: product.createdAt?.toISOString() || new Date().toISOString(),
      })),
    }
  } catch (error) {
    console.error("Get products error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch products",
    }
  }
}

export async function getProductById(id: string) {
  try {
    console.log("Fetching product with ID:", id)

    const { db } = await connectToDatabase()
    const { ObjectId } = await import("mongodb")

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      console.log("Invalid ObjectId format:", id)
      return {
        success: false,
        error: "Invalid product ID format",
      }
    }

    const product = await db.collection("products").findOne({ _id: new ObjectId(id) })

    if (!product) {
      console.log("Product not found for ID:", id)
      return {
        success: false,
        error: "Product not found",
      }
    }

    console.log("Product found:", product.name)

    // Return properly structured product data
    const productData = {
      id: product._id.toString(),
      name: product.name,
      brand: product.brand,
      category: product.category,
      badge: product.badge,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviews: product.reviews,
      description: product.description,
      specs: product.specs || [],
      images: product.images || [product.image],
      image: product.image,
      createdAt: product.createdAt?.toISOString() || new Date().toISOString(),
    }

    return {
      success: true,
      product: productData,
    }
  } catch (error) {
    console.error("Get product by ID error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch product",
    }
  }
}

export async function updateProduct(formData: FormData) {
  try {
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const brand = formData.get("brand") as string
    const category = formData.get("category") as string
    const badge = formData.get("badge") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const originalPrice = formData.get("originalPrice")
      ? Number.parseFloat(formData.get("originalPrice") as string)
      : null
    const rating = Number.parseFloat(formData.get("rating") as string)
    const reviews = Number.parseInt(formData.get("reviews") as string)
    const description = formData.get("description") as string
    const specs = JSON.parse(formData.get("specs") as string)
    const existingImages = JSON.parse(formData.get("existing_images") as string)

    console.log("Updating product:", id, name)

    // Upload new images to Cloudinary
    const newImageUrls: string[] = []
    let imageIndex = 0

    while (formData.get(`new_image_${imageIndex}`)) {
      const file = formData.get(`new_image_${imageIndex}`) as File
      if (file && file.size > 0) {
        console.log(`Uploading new image ${imageIndex + 1}`)
        const imageUrl = await uploadToCloudinary(file)
        newImageUrls.push(imageUrl)
      }
      imageIndex++
    }

    // Combine existing and new images
    const allImages = [...existingImages, ...newImageUrls]

    if (allImages.length === 0) {
      throw new Error("At least one image is required")
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase()
    const { ObjectId } = await import("mongodb")

    // Update product document
    const updateData = {
      name,
      brand,
      category,
      badge: badge === "none" ? null : badge || null,
      price,
      originalPrice,
      rating,
      reviews,
      description,
      specs,
      images: allImages,
      image: allImages[0], // Main image
      updatedAt: new Date(),
    }

    const result = await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      throw new Error("Product not found")
    }

    console.log("Product updated successfully")

    // Revalidate relevant pages
    revalidatePath("/")
    revalidatePath("/products")
    revalidatePath("/admin")
    revalidatePath("/admin/products")

    return {
      success: true,
      message: "Product updated successfully",
    }
  } catch (error) {
    console.error("Update product error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update product",
    }
  }
}

export async function deleteProduct(id: string) {
  try {
    const { db } = await connectToDatabase()
    const { ObjectId } = await import("mongodb")

    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      throw new Error("Product not found")
    }

    // Revalidate relevant pages
    revalidatePath("/")
    revalidatePath("/products")
    revalidatePath("/admin")
    revalidatePath("/admin/products")

    return {
      success: true,
      message: "Product deleted successfully",
    }
  } catch (error) {
    console.error("Delete product error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete product",
    }
  }
}
