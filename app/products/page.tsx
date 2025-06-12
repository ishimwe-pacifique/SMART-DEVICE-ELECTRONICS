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
import { Star, ShoppingCart, Heart, Filter, X, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { Pagination } from "@/components/pagination"
import Link from "next/link"

// Mock product data
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
  image: "/placeholder.svg?height=300&width=300",
  category: ["phones", "laptops", "tablets", "headphones", "accessories", "smartwatch", "gaming", "cameras"][i % 8],
  brand: ["Apple", "Samsung", "Dell", "Sony", "Google", "Microsoft", "Lenovo", "HP"][i % 8],
  inStock: Math.random() > 0.2,
  specs: [
    `${Math.floor(Math.random() * 512) + 64}GB Storage`,
    `${Math.floor(Math.random() * 16) + 4}GB RAM`,
    `${Math.floor(Math.random() * 6) + 1} inch Display`,
  ],
}))

const categories = [
  { id: "phones", label: "Smartphones" },
  { id: "laptops", label: "Laptops" },
  { id: "tablets", label: "Tablets" },
  { id: "headphones", label: "Headphones" },
  { id: "accessories", label: "Accessories" },
  { id: "smartwatch", label: "Smartwatches" },
  { id: "gaming", label: "Gaming" },
  { id: "cameras", label: "Cameras" },
]

const brands = [
  { id: "apple", label: "Apple" },
  { id: "samsung", label: "Samsung" },
  { id: "dell", label: "Dell" },
  { id: "sony", label: "Sony" },
  { id: "google", label: "Google" },
  { id: "microsoft", label: "Microsoft" },
  { id: "lenovo", label: "Lenovo" },
  { id: "hp", label: "HP" },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const { addItem } = useCart()
  const { toast } = useToast()

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  const [initialized, setInitialized] = useState(false)

  // Initialize filters from URL params only once
  useEffect(() => {
    if (!initialized) {
      const category = searchParams.get("category")
      const brand = searchParams.get("brand")
      const search = searchParams.get("search")
      const page = searchParams.get("page")

      if (category) {
        setSelectedCategories([category])
      }

      if (brand) {
        setSelectedBrands([brand])
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
  }, [searchParams, initialized])

  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand.toLowerCase())
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice
    })
  }, [searchTerm, selectedCategories, selectedBrands, priceRange])

  // Memoize sorted products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return Number.parseFloat(b.rating) - Number.parseFloat(a.rating)
        case "newest":
          return b.id - a.id
        default:
          return 0
      }
    })
  }, [filteredProducts, sortBy])

  // Memoize pagination
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

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }, [])

  const handlePriceChange = useCallback((value: number[]) => {
    setPriceRange(value)
    setCurrentPage(1)
  }, [])

  const handleAddToCart = useCallback(
    (product: any) => {
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

  const clearFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 2000])
    setSortBy("featured")
    setCurrentPage(1)
  }, [])

  const removeFilter = useCallback((type: string, value: string) => {
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
        setPriceRange([0, 2000])
        break
    }
    setCurrentPage(1)
  }, [])

  // Don't render until initialized to prevent hydration issues
  if (!initialized) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
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
              <Input placeholder="Search..." value={searchTerm} onChange={(e) => handleSearchChange(e.target.value)} />
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <Label>Price Range</Label>
              <div className="px-2">
                <Slider value={priceRange} onValueChange={handlePriceChange} max={2000} step={50} className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Categories */}
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

            {/* Brands */}
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

            {/* Clear Filters */}
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Header */}
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

          {/* Active Filters */}
          {(selectedCategories.length > 0 ||
            selectedBrands.length > 0 ||
            searchTerm ||
            priceRange[0] > 0 ||
            priceRange[1] < 2000) && (
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

              {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Price: ${priceRange[0]} - ${priceRange[1]}
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

          {/* Products Grid */}
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      </Link>
                      {!product.inStock && (
                        <Badge variant="secondary" className="absolute top-2 left-2">
                          Out of Stock
                        </Badge>
                      )}
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
                              i < Math.floor(Number.parseFloat(product.rating))
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
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

          {/* Pagination */}
          {filteredProducts.length > 0 && totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/products" />
          )}
        </div>
      </div>
    </div>
  )
}
