"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  inStock: boolean
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    inStock: true,
  },
  {
    id: 3,
    name: "Portable Laptop Stand",
    price: 49.99,
    image: "/placeholder.svg?height=100&width=100",
    quantity: 1,
    inStock: false,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [removingItem, setRemovingItem] = useState<number | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setRemovingItem(id)
    setTimeout(() => {
      setCartItems((items) => items.filter((item) => item.id !== id))
      setRemovingItem(null)
    }, 300)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto animate-fade-in">
          <div className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-karolina-grabowska-5632402.jpg-3LChiNuBF7qVgtFT5YE4WoClEuw0Tl.jpeg"
              alt="Empty Shopping Cart"
              width={300}
              height={200}
              className="mx-auto mb-6 rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent rounded-lg"></div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button className="hover:scale-105 transition-transform" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 animate-fade-in">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <Card
              key={item.id}
              className={`transition-all duration-300 hover:shadow-lg ${
                removingItem === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:scale-110 transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-2xl font-bold text-green-600">${item.price}</p>

                    {!item.inStock && <p className="text-destructive text-sm animate-pulse">Out of stock</p>}

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="hover:scale-110 transition-transform"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-20 text-center focus:ring-2 focus:ring-blue-500 transition-all"
                        min="1"
                      />

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? "text-green-600" : ""}`}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                  Apply Code
                </Button>
              </div>

              {shipping > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">Add ${(100 - subtotal).toFixed(2)} more for free shipping! 🚚</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                className="w-full hover:scale-105 transition-transform bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full hover:scale-105 transition-transform" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
