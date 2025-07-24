"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, ShoppingCart, Heart, Filter, X, SlidersHorizontal, MessageCircle, Eye } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { Pagination } from "@/components/pagination"
import Link from "next/link"
import { getProducts } from "@/app/actions/upload-actions"
import { ProductQuickView } from "@/components/product-quick-view"

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

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const { addItem } = useCart()
  const { toast } = useToast()

  // State
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  const [initialized, setInitialized] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Dynamic categories and brands from loaded products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))]
    return uniqueCategories.map((cat) => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }))
  }, [products])

  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(products.map((p) => p.brand))]
    return uniqueBrands.map((brand) => ({
      id: brand.toLowerCase(),
      label: brand,
    }))
  }, [products])

  // Load products
  useEffect(() => {
    loadProducts()
  }, [])

  // Initialize filters from URL params
  useEffect(() => {
    if (!initialized && products.length > 0) {
      const category = searchParams.get("category")
      const brand = searchParams.get("brand")
      const search = searchParams.get("search")
      const page = searchParams.get("page")

      if (category) {
        setSelectedCategories([category])
      }

      if (brand) {
        setSelectedBrands([brand.toLowerCase()])
      }

      if (search) {
        setSearchTerm(search)
      }

      if (page) {
        const pageNum = Number.parseInt(page)
        if (pageNum > 0) {
          setCurrentPage(pageNum)
        }
      }

      setInitialized(true)
    }
  }, [searchParams, initialized, products.length])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const result = await getProducts()
      if (result.success) {
        setProducts(result.products)
        // Set price range based on actual product prices
        const prices = result.products.map((p: Product) => p.price)
        const maxPrice = Math.max(...prices)
        setPriceRange([0, Math.ceil(maxPrice / 100) * 100])
      } else {
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        })
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

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand.toLowerCase())
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice
    })
  }, [products, searchTerm, selectedCategories, selectedBrands, priceRange])

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })
  }, [filteredProducts, sortBy])

  // Pagination
  const { currentProducts, totalPages } = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const products = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    const pages = Math.ceil(sortedProducts.length / productsPerPage)
    return { currentProducts: products, totalPages: pages }
  }, [sortedProducts, currentPage, productsPerPage])

  const handleCategoryChange = useCallback((category: string, checked: boolean) => {
    setSelectedCategories((prev) => {
      const newCategories = checked
        ? prev.includes(category)
          ? prev
          : [...prev, category]
        : prev.filter((c) => c !== category)
      return newCategories
    })
    setCurrentPage(1)
  }, [])

  const handleBrandChange = useCallback((brand: string, checked: boolean) => {
    setSelectedBrands((prev) => {
      const newBrands = checked ? (prev.includes(brand) ? prev : [...prev, brand]) : prev.filter((b) => b !== brand)
      return newBrands
    })
    setCurrentPage(1)
  }, [])

  const handleAddToCart = useCallback(
    (product: Product) => {
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
    },
    [addItem, toast],
  )

  const handleWhatsAppContact = useCallback((product: Product) => {
    const message = `Hi! I'm interested in ${product.name} - RWF${product.price}. Can you provide more details?`
    const phoneNumber = "+250780612354" // Replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }, [])

  const clearFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedBrands([])
    const maxPrice = Math.max(...products.map((p) => p.price))
    setPriceRange([0, Math.ceil(maxPrice / 100) * 100])
    setSortBy("featured")
    setCurrentPage(1)
  }, [products])

  const removeFilter = useCallback(
    (type: string, value: string) => {
      switch (type) {
        case "search":
          setSearchTerm("")
          break
        case "category":
          setSelectedCategories((prev) => prev.filter((c) => c !== value))
          break
        case "brand":
          setSelectedBrands((prev) => prev.filter((b) => b !== value))
          break
        case "price":
          const maxPrice = Math.max(...products.map((p) => p.price))
          setPriceRange([0, Math.ceil(maxPrice / 100) * 100])
          break
      }
      setCurrentPage(1)
    },
    [products],
  )

  if (loading) {
    return <ProductsPageSkeleton />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
      
        <div
          className={`lg:w-64 space-y-6 ${
            showFilters
              ? "fixed inset-0 z-50 bg-white p-4 overflow-y-auto lg:static lg:p-0 lg:bg-transparent"
              : "hidden lg:block"
          }`}
        >
          {showFilters && (
            <div className="flex justify-between items-center lg:hidden mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}

          <div className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label>Search Products</Label>
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>

       
            <div className="space-y-2">
              <Label>Price Range</Label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value)
                    setCurrentPage(1)
                  }}
                  max={Math.max(...products.map((p) => p.price)) || 2000}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>RWF{priceRange[0]}</span>
                  <span>RWF{priceRange[1]}</span>
                </div>
              </div>
            </div>

          
            {categories.length > 0 && (
              <div className="space-y-2">
                <Label>Categories</Label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                      />
                      <Label htmlFor={`category-${category.id}`} className="text-sm font-normal">
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {brands.length > 0 && (
              <div className="space-y-2">
                <Label>Brands</Label>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand.id}`}
                        checked={selectedBrands.includes(brand.id)}
                        onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                      />
                      <Label htmlFor={`brand-${brand.id}`} className="text-sm font-normal">
                        {brand.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

         
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        </div>

      
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Products</h1>
              <p className="text-muted-foreground">{filteredProducts.length} products found</p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex-1 sm:flex-none"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          
          {(selectedCategories.length > 0 ||
            selectedBrands.length > 0 ||
            searchTerm ||
            priceRange[0] > 0 ||
            priceRange[1] < (Math.max(...products.map((p) => p.price)) || 2000)) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchTerm}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                    onClick={() => removeFilter("search", "")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {categories.find((c) => c.id === category)?.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                    onClick={() => removeFilter("category", category)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {selectedBrands.map((brand) => (
                <Badge key={brand} variant="secondary" className="flex items-center gap-1">
                  {brands.find((b) => b.id === brand)?.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                    onClick={() => removeFilter("brand", brand)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}

              {(priceRange[0] > 0 || priceRange[1] < (Math.max(...products.map((p) => p.price)) || 2000)) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Price: RWF{priceRange[0]} - RWF{priceRange[1]}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-transparent"
                    onClick={() => removeFilter("price", "")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}

          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden">
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-480 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>
                      {product.badge && <Badge className="absolute top-2 left-2 bg-primary">{product.badge}</Badge>}
                      <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-1">
                      <Badge variant="outline" className="text-xs">
                        {product.brand}
                      </Badge>
                    </div>
                    <Link href={`/products/${product.id}`} className="block">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-primary">RWF{product.price}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <>
                          <span className="text-sm text-muted-foreground line-through">RWF{product.originalPrice}</span>
                          <Badge variant="destructive" className="text-xs">
                            Save RWF{(product.originalPrice - product.price).toFixed(2)}
                          </Badge>
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 space-y-2">
                    <div className="flex gap-2 w-full">
                      <Button
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() => handleWhatsAppContact(product)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <SlidersHorizontal className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your filters or search term</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}

          
          {filteredProducts.length > 0 && totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      </div>

     
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onWhatsAppContact={handleWhatsAppContact}
        />
      )}
    </div>
  )
}


function ProductsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 space-y-6 hidden lg:block">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>

       
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-48"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
