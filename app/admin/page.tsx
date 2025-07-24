import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Package, Eye, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getProducts } from "@/app/actions/upload-actions"

export default async function AdminPage() {
  const result = await getProducts(8) // Get latest 8 products
  const products = result.success ? result.products : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your product catalog</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Upload Product</h3>
            <p className="text-gray-600 mb-4">Add new products to your catalog</p>
            <Button asChild className="w-full">
              <Link href="/admin/upload">
                <Plus className="h-4 w-4 mr-2" />
                Upload New Product
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Manage Products</h3>
            <p className="text-gray-600 mb-4">Edit and organize your products</p>
            <Button variant="outline" asChild className="w-full">
              <Link href="/admin/product">
                <Eye className="h-4 w-4 mr-2" />
                View All Products and Manage
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-semibold text-lg mb-2">Analytics</h3>
            <p className="text-gray-600 mb-4">View sales and performance</p>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No products uploaded yet</p>
              <Button asChild>
                <Link href="/admin/upload">Upload Your First Product</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product: any) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover"
                    />
                    {product.badge && <Badge className="absolute top-2 left-2 text-xs">{product.badge}</Badge>}
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{product.brand}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">RWF{product.price}</span>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
