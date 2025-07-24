import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/components/cart-provider"
import { Footer } from "@/components/footer"
import { WhatsAppWidget } from "@/components/whatsapp-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Device Electronics - Premium Electronics Store",
  description:
    "Your trusted source for computers, phones, and electronics accessories. Shop the latest technology from top brands.",
  generator: "paccy dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <SidebarProvider defaultOpen={false}>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <SidebarInset className="flex-1">
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </SidebarInset>
            </div>
            <Toaster />
            <WhatsAppWidget
              phoneNumber="+250780612354"
              welcomeMessage="Hello! Need help with electronics? Chat with our product specialists now!"
            />
          </SidebarProvider>
        </CartProvider>
      </body>
    </html>
  )
}
