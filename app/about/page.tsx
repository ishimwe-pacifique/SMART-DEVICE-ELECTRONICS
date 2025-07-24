"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Award,
  Target,
  Eye,
  Users,
  Building2,
  Calendar,
  CheckCircle,
  TrendingUp,
  Globe,
  Shield,
  Mail,
  Briefcase,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { number: "5+", label: "Years of Excellence", icon: Calendar },
    { number: "1000+", label: "Happy Customers", icon: Users },
    { number: "2", label: "Store Locations", icon: MapPin },
    { number: "500+", label: "Products Available", icon: Building2 },
  ]

  const achievements = [
    "Rwanda's Leading Electronics Retailer",
    "Authorized Dealer for Premium Brands",
    "Award-Winning Customer Service",
    "Fastest Growing Tech Store Chain",
    "Expert Technical Support Team",
    "Comprehensive Warranty Coverage",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              About <span className="text-white/90">Smart Device</span>
              <br />
              Electronics
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-3xl mx-auto">
              Rwanda's premier destination for cutting-edge technology, exceptional service, and unwavering commitment
              to innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-white/20 text-white border-white/20 px-6 py-3 text-base backdrop-blur-sm">
                🏆 5+ Years of Excellence
              </Badge>
              <Badge className="bg-white/20 text-white border-white/20 px-6 py-3 text-base backdrop-blur-sm">
                🌍 Serving All Rwanda
              </Badge>
              <Badge className="bg-white/20 text-white border-white/20 px-6 py-3 text-base backdrop-blur-sm">
                💎 Premium Quality
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className={`text-center hover:shadow-xl transition-all duration-500 transform hover:scale-105 border-0 shadow-lg bg-white ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              From a small vision to Rwanda's leading electronics destination
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <Card className="shadow-xl border-0 overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To democratize access to premium technology across Rwanda by providing authentic, high-quality
                    electronics with exceptional customer service and expert technical support.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To be Rwanda's most trusted technology partner, empowering individuals and businesses with
                    cutting-edge electronics that enhance productivity, connectivity, and quality of life.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-xl border-0 bg-primary text-white overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Why Choose Smart Device Electronics?</h3>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                        <span className="text-white/90">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The visionary leaders driving Smart Device Electronics' success across Rwanda
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* CEO */}
            <Card className="shadow-2xl border-0 overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-105 bg-white">
              <CardContent className="p-0">
                <div className="bg-primary p-8 text-white text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20">
                    <Image
                      src="/team/patrick-nkubito.jpg"
                      alt="Patrick NKUBITO - CEO & Founder"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image doesn't exist
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                        const parent = target.parentElement
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <span class="text-4xl font-bold text-white">PN</span>
                            </div>
                          `
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Patrick NKUBITO</h3>
                  <Badge className="bg-white/20 text-white border-white/20 mb-4">CEO & Founder</Badge>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Visionary leader and technology enthusiast who founded Smart Device Electronics with a mission to
                    transform Rwanda's electronics retail landscape. Patrick brings extensive experience in technology
                    and business development.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="text-gray-700">Technology Innovation Leader</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span className="text-gray-700">Business Strategy Expert</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="text-gray-700">International Partnerships</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accountant */}
            <Card className="shadow-2xl border-0 overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-105 bg-white">
              <CardContent className="p-0">
                <div className="bg-black p-8 text-white text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20">
                    <Image
                      src="/team/deborah-nisingizwe.jpg"
                      alt="Deborah Nisingizwe - Chief Accountant"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image doesn't exist
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                        const parent = target.parentElement
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <span class="text-4xl font-bold text-white">DN</span>
                            </div>
                          `
                        }
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Deborah Nisingizwe</h3>
                  <Badge className="bg-white/20 text-white border-white/20 mb-4">Chief Accountant</Badge>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Financial expert ensuring Smart Device Electronics maintains the highest standards of fiscal
                    responsibility and transparency. Deborah oversees all financial operations and strategic planning
                    with precision and expertise.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-black" />
                      <span className="text-gray-700">Certified Public Accountant</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-black" />
                      <span className="text-gray-700">Financial Risk Management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-black" />
                      <span className="text-gray-700">Strategic Financial Planning</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Direct Contact</p>
                      <a
                        href="tel:0798764526"
                        className="font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        +250 780 612 354
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Locations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Locations</h2>
            <p className="text-xl text-gray-600">Serving customers across Rwanda with premium electronics</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-xl border-0 overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Kigali Headquarters</h3>
                    <Badge className="bg-primary text-white mt-1">Main Office</Badge>
                  </div>
                </div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Room E048, First Floor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span>Chic Building, Kigali</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a
                      href="mailto:smartzone.nm01@gmail.com"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      smartzone.nm01@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Gisenyi Branch</h3>
                    <Badge variant="outline" className="border-black text-black mt-1">
                      Branch Office
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-black" />
                    <span>Rubavu District</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-black" />
                    <span>Western Province, Rwanda</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-black" />
                    <span>Full Service Location</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Excellence?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust Smart Device Electronics for their technology needs. Visit
            us today and discover the difference.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/contact">Visit Our Stores</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link href="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
