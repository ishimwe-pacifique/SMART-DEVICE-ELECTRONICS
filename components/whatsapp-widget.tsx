"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface WhatsAppWidgetProps {
  phoneNumber: string
  welcomeMessage?: string
  position?: "bottom-right" | "bottom-left"
}

export function WhatsAppWidget({
  phoneNumber = "+250780612354",
  welcomeMessage = "Hello! How can we help you today?",
  position = "bottom-right",
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent("Hi! I'm interested in Smart Device Electronics products.")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <>
      {/* WhatsApp Button */}
      <div
        className={cn(
          "fixed z-50 flex flex-col items-end gap-3",
          position === "bottom-right" ? "bottom-6 right-6" : "bottom-6 left-6",
        )}
      >
        {/* Popup Card */}
        {isOpen && (
          <Card className="w-72 shadow-lg animate-fade-in mb-3">
            <CardHeader className="bg-green-500 text-white p-3 flex flex-row justify-between items-center rounded-t-lg">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">WhatsApp Chat</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-green-600 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm">{welcomeMessage}</p>
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white" onClick={handleWhatsAppRedirect}>
                Start Chat
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* WhatsApp Button */}
        <Button
          className={cn(
            "rounded-full h-14 w-14 bg-green-500 hover:bg-green-600 shadow-lg transition-all duration-300",
            isHovered && !isOpen && "scale-110",
          )}
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MessageCircle className="h-6 w-6 text-white" />
          {isHovered && !isOpen && (
            <span className="absolute right-16 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              Chat with us
            </span>
          )}
        </Button>
      </div>
    </>
  )
}
