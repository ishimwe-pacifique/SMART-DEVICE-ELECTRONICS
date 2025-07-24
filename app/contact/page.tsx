"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Clock, Building2, Send, MessageSquare, Star, Zap, Shield, Truck, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for contacting Smart Device Electronics. We'll get back to you within 24 hours.",
    })

    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Get in <span className="text-black">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 leading-relaxed">
              Connect with Smart Device Electronics - Rwanda's premier destination for cutting-edge technology
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl"></div>
      </section>
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Info */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-white p-8">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Building2 className="h-7 w-7" />
                  Smart Device Electronics
                </CardTitle>
                <p className="text-primary-100 mt-2">Your Technology Partner in Rwanda</p>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Headquarters</p>
                    <p className="text-gray-600 mt-1">Room E048, First Floor</p>
                    <p className="text-gray-600">Chic Building, Kigali</p>
                    <p className="text-gray-600">Rwanda</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Email Us</p>
                    <a
                      href="mailto:smartzone.nm01@gmail.com"
                      className="text-black hover:text-primary/80 transition-colors text-lg font-medium"
                    >
                      smartzone.nm01@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Business Hours</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-gray-600">
                        Monday - Saturday: <span className="font-semibold">8:00 AM - 8:00 PM</span>
                      </p>
                      <p className="text-gray-600">
                        Sunday: <span className="font-semibold">10:00 AM - 6:00 PM</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Branches */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-yellow-600 to-yellow-600 text-white p-6">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <MapPin className="h-6 w-6" />
                  Our Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Kigali Branch</p>
                    <p className="text-gray-600">Main Office & Showroom</p>
                    <p className="text-sm text-gray-500 mt-1">Chic Building, Room E048</p>
                  </div>
                  <Badge className="bg-primary text-white">Headquarters</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">Gisenyi Branch</p>
                    <p className="text-gray-600">Rubavu District</p>
                    <p className="text-sm text-gray-500 mt-1">Western Province</p>
                  </div>
                  <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                    Branch
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-white p-8">
                <CardTitle className="flex items-center gap-3 text-3xl">
                  <MessageSquare className="h-8 w-8" />
                  Send us a Message
                </CardTitle>
                <p className="text-primary-100 text-lg mt-2">
                  Have questions about our products or need technical support? We're here to help!
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700 font-semibold text-base">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        className="mt-3 h-12 border-2 border-gray-200 focus:border-primary focus:ring-primary/20 text-base"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700 font-semibold text-base">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        className="mt-3 h-12 border-2 border-gray-200 focus:border-primary focus:ring-primary/20 text-base"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-semibold text-base">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-3 h-12 border-2 border-gray-200 focus:border-primary focus:ring-primary/20 text-base"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-semibold text-base">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="mt-3 h-12 border-2 border-gray-200 focus:border-primary focus:ring-primary/20 text-base"
                        placeholder="+250 xxx xxx xxx"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-700 font-semibold text-base">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      className="mt-3 h-12 border-2 border-gray-200 focus:border-primary focus:ring-primary/20 text-base"
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-semibold text-base">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="mt-3 border-2 border-gray-200 focus:border-primary focus:ring-primary/20 text-base resize-none"
                      placeholder="Tell us about your inquiry, product questions, or how we can assist you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-4 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Sending Your Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-6 w-6 mr-3" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Us in Kigali</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visit our showroom to experience our latest electronics collection in person
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Map */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127576.23123456789!2d30.0588!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0x4a87a383a7b87b23!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                      width="100%"
                      height="500"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-gray-800">Smart Device Electronics</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location Details */}
            <div className="space-y-6">
              <Card className="shadow-xl border-0">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MapPin className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Visit Our Showroom</h3>
                    <div className="space-y-3 text-gray-600">
                      <p className="font-semibold text-lg text-gray-800">Room E048, First Floor</p>
                      <p className="text-lg">Chic Building</p>
                      <p className="text-lg">Kigali, Rwanda</p>
                    </div>

                    <div className="mt-8 p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">🚗 Easy parking available</p>
                      <p className="text-sm text-gray-600 mb-2">🏢 First floor location</p>
                      <p className="text-sm text-gray-600">📱 Call ahead for product availability</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-br from-primary to-primary/90 text-white">
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">Why Visit Us?</h4>
                  <p className="text-primary-100">
                    Experience hands-on demos, get expert advice, and see our complete product range in person.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
