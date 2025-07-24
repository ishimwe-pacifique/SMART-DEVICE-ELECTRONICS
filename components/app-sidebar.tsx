"use client"

import {
  Home,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Gamepad2,
  Watch,
  Monitor,
  HardDrive,
  Keyboard,
  Mouse,
  Speaker,
  Camera,
  ShoppingCart,
  Heart,
  User,
  Settings,
  HelpCircle,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const categories = [
  { title: "Smartphones", url: "/products?category=phones", icon: Smartphone },
  { title: "Laptops", url: "/products?category=laptops", icon: Laptop },
  { title: "Tablets", url: "/products?category=tablets", icon: Tablet },
  { title: "Headphones", url: "/products?category=headphones", icon: Headphones },
  { title: "Gaming", url: "/products?category=gaming", icon: Gamepad2 },
  { title: "Smartwatches", url: "/products?category=smartwatch", icon: Watch },
  { title: "Monitors", url: "/products?category=monitors", icon: Monitor },
  { title: "Storage", url: "/products?category=storage", icon: HardDrive },
  { title: "Keyboards", url: "/products?category=keyboards", icon: Keyboard },
  { title: "Mice", url: "/products?category=mice", icon: Mouse },
  { title: "Speakers", url: "/products?category=speakers", icon: Speaker },
  { title: "Cameras", url: "/products?category=cameras", icon: Camera },
]

const brands = [
  { name: "Apple", url: "/products?brand=apple" },
  { name: "Samsung", url: "/products?brand=samsung" },
  { name: "Dell", url: "/products?brand=dell" },
  { name: "HP", url: "/products?brand=hp" },
  { name: "Lenovo", url: "/products?brand=lenovo" },
  { name: "Sony", url: "/products?brand=sony" },
  { name: "Microsoft", url: "/products?brand=microsoft" },
  { name: "Google", url: "/products?brand=google" },
]

// const accountItems = [
//   { title: "My Account", url: "/account", icon: User },
//   { title: "Wishlist", url: "/wishlist", icon: Heart },
//   { title: "Orders", url: "/orders", icon: ShoppingCart },
//   { title: "Settings", url: "/settings", icon: Settings },
//   { title: "Help", url: "/help", icon: HelpCircle },
// ]

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    setOpenMobile(false)
  }

  return (
    <Sidebar className="border-r" collapsible="offcanvas">
      

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/" onClick={handleLinkClick}>
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.title}>
                  <SidebarMenuButton asChild isActive={pathname.includes(category.url)}>
                    <Link href={category.url} onClick={handleLinkClick}>
                      <category.icon />
                      <span>{category.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Popular Brands</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {brands.map((brand) => (
                <SidebarMenuItem key={brand.name}>
                  <SidebarMenuButton asChild isActive={pathname.includes(brand.url)}>
                    <Link href={brand.url} onClick={handleLinkClick}>
                      <span>{brand.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          {/* <SidebarGroupLabel>Account</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {/* {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} onClick={handleLinkClick}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="p-4 text-center text-xs text-gray-500">
          <p>© 2024 Smart Device Electronics</p>
          <p>Your Digital Knowledge Partner</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
