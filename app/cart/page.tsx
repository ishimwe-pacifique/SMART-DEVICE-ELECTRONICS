"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
  })

  // Calculate totals manually instead of using getTotalPrice
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax - discount

  // Calculate total items manually
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const applyPromoCode = () => {
    const validCodes = {
      SAVE10: 0.1,
      WELCOME: 0.05,
      FIRST20: 0.2,
    }

    const code = promoCode.toUpperCase()
    if (validCodes[code as keyof typeof validCodes]) {
      const discountAmount = subtotal * validCodes[code as keyof typeof validCodes]
      setDiscount(discountAmount)
      toast({
        title: "Promo code applied!",
        description: `You saved RWF${discountAmount.toFixed(2)}`,
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your code and try again",
        variant: "destructive",
      })
    }
  }

  const generateWhatsAppMessage = () => {
    let message = `🛒 *New Order Request*\n\n`
    message += `👤 *Customer Details:*\n`
    message += `Name: ${customerInfo.name}\n`
    message += `Phone: ${customerInfo.phone}\n`
    message += `Address: ${customerInfo.address}\n\n`

    message += `📦 *Order Items:*\n`
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   Brand: ${item.brand}\n`
      message += `   Price: RWF${item.price}\n`
      message += `   Quantity: ${item.quantity}\n`
      message += `   Subtotal: RWF${(item.price * item.quantity).toFixed(2)}\n\n`
    })

    message += `💰 *Order Summary:*\n`
    message += `Subtotal: RWF${subtotal.toFixed(2)}\n`
    message += `Shipping: ${shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}\n`
    message += `Tax: RWF${tax.toFixed(2)}\n`
    if (discount > 0) {
      message += `Discount: -RWF${discount.toFixed(2)}\n`
    }
    message += `*Total: RWF${total.toFixed(2)}*\n\n`
    message += `Please confirm this order and provide payment details. Thank you! 🙏`

    return encodeURIComponent(message)
  }

  const handleWhatsAppCheckout = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in your name and phone number",
        variant: "destructive",
      })
      return
    }

    const message = generateWhatsAppMessage()
    const whatsappNumber = "+250780612354" // Replace with your WhatsApp business number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

    window.open(whatsappUrl, "_blank")

    toast({
      title: "Redirecting to WhatsApp",
      description: "Your order details have been prepared for WhatsApp",
    })
  }

  const handlePhoneCall = () => {
    const phoneNumber = "+250780612354" // Replace with your business phone number
    window.open(`tel:${phoneNumber}`)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto animate-fade-in">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button className="hover:scale-105 transition-transform" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold animate-fade-in">Shopping Cart</h1>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <Card
              key={`${item.id}-${index}`}
              className="transition-all duration-300 hover:shadow-lg"
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
                      <div>
                        <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.brand}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:scale-110 transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-2xl font-bold text-green-600">RWF{item.price.toFixed(2)}</p>

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
                    <p className="text-xl font-bold">RWF{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary & Customer Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Customer Information */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name *</label>
                <Input
                  placeholder="Enter your full name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone Number *</label>
                <Input
                  placeholder="Enter your phone number"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Delivery Address</label>
                <Input
                  placeholder="Enter your address (optional)"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  className="focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
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
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">RWF{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? "text-green-600" : ""}`}>
                    {shipping === 0 ? "Free" : `RWF${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold">RWF{tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-RWF{discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-green-600">RWF{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <Button onClick={applyPromoCode} variant="outline">
                    Apply
                  </Button>
                </div>
                <div className="text-xs text-gray-600">Try: SAVE10, WELCOME, FIRST20</div>
              </div>

              {shipping > 0 && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">Add RWF{(100 - subtotal).toFixed(2)} more for free shipping! 🚚</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                onClick={handleWhatsAppCheckout}
                className="w-full hover:scale-105 transition-transform bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Order via WhatsApp
              </Button>
              <Button
                onClick={handlePhoneCall}
                variant="outline"
                className="w-full hover:scale-105 transition-transform"
                size="lg"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call to Order
              </Button>
              <Button variant="outline" className="w-full hover:scale-105 transition-transform" asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
