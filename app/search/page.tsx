"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Filter, Heart, ExternalLink, Bitcoin, Zap, Shield, Star, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function SearchResultsPage() {
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedCryptos, setSelectedCryptos] = useState<string[]>(["BTC", "ETH"])
  const [sortBy, setSortBy] = useState("similarity")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const searchUrl = searchParams.get("url")

  useEffect(() => {
    // In a real implementation, you would:
    // 1. Call your API to parse the URL
    // 2. Extract product data
    // 3. Find crypto alternatives
    // 4. Update state with real data

    // For now, we'll just simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [searchUrl])

  // Mock data - this would come from your API
  const originalProduct = {
    title: searchUrl ? `Product from ${new URL(searchUrl).hostname}` : "Apple MacBook Pro 14-inch M3 Chip",
    price: 1999,
    image: "/images/laptop.jpg",
    source: searchUrl ? new URL(searchUrl).hostname : "apple.com",
    description: "14-inch MacBook Pro with M3 chip, 8GB RAM, 512GB SSD",
  }

  const cryptoMatches = [
    {
      id: 1,
      title: 'MacBook Pro 14" M3 - 8GB/512GB',
      price: 1899,
      cryptoPrice: { BTC: 0.0285, ETH: 0.542 },
      image: "/images/laptop.jpg",
      merchant: {
        name: "Newegg",
        logo: "/placeholder.svg?height=40&width=120&query=newegg logo",
        rating: 4.5,
        cryptos: ["BTC", "ETH", "LTC"],
      },
      similarity: 98,
      inStock: true,
      shipping: "Free shipping",
      savings: 100,
      features: ["Same model", "Authorized dealer", "1-year warranty"],
    },
    {
      id: 2,
      title: "Apple MacBook Pro 14-inch with M3 Chip",
      price: 1949,
      cryptoPrice: { BTC: 0.0293, ETH: 0.556 },
      image: "/images/laptop.jpg",
      merchant: {
        name: "Overstock",
        logo: "/placeholder.svg?height=40&width=120&query=overstock logo",
        rating: 4.3,
        cryptos: ["BTC"],
      },
      similarity: 95,
      inStock: true,
      shipping: "Free shipping over $45",
      savings: 50,
      features: ["Exact match", "Crypto pioneer", "Extended warranty available"],
    },
    {
      id: 3,
      title: 'MacBook Pro 14" M3 Chip - Space Gray',
      price: 1999,
      cryptoPrice: { BTC: 0.0301, ETH: 0.571 },
      image: "/images/laptop.jpg",
      merchant: {
        name: "BitPay Store",
        logo: "/placeholder.svg?height=40&width=120&query=bitpay logo",
        rating: 4.7,
        cryptos: ["BTC", "ETH", "BCH", "LTC"],
      },
      similarity: 100,
      inStock: true,
      shipping: "Express shipping available",
      savings: 0,
      features: ["Perfect match", "Multiple crypto options", "Instant payment"],
    },
  ]

  const cryptoRates = {
    BTC: 66500,
    ETH: 3500,
    LTC: 95,
    BCH: 420,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-light text-slate-700">
            Analyzing product from {searchUrl && new URL(searchUrl).hostname}
          </h2>
          <p className="text-slate-500 mt-2 font-light">Finding crypto alternatives...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to search
                </Button>
              </Link>
              <div className="h-6 w-px bg-slate-300" />
              <h1 className="text-lg font-light text-slate-800">
                Found <span className="font-medium text-purple-600">{cryptoMatches.length} crypto alternatives</span>
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="text-slate-600 border-slate-300"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="similarity">Best match</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="savings">Best savings</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Original Product & Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Original Product */}
            <Card className="p-6 bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-sm">
              <h3 className="text-sm font-medium text-slate-500 mb-4">Original Product</h3>
              <div className="space-y-4">
                <img
                  src={originalProduct.image || "/placeholder.svg"}
                  alt={originalProduct.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-slate-800 text-sm leading-tight">{originalProduct.title}</h4>
                  <p className="text-slate-500 text-xs mt-1">{originalProduct.source}</p>
                  <p className="text-lg font-semibold text-slate-900 mt-2">${originalProduct.price.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            {/* Filters */}
            {showFilters && (
              <Card className="p-6 bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-sm">
                <h3 className="text-sm font-medium text-slate-800 mb-4">Filters</h3>

                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm text-slate-600 mb-3 block">
                      Price Range: ${priceRange[0]} - ${priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={3000}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                  </div>

                  {/* Crypto Types */}
                  <div>
                    <label className="text-sm text-slate-600 mb-3 block">Accepted Cryptocurrencies</label>
                    <div className="space-y-2">
                      {["BTC", "ETH", "LTC", "BCH"].map((crypto) => (
                        <div key={crypto} className="flex items-center space-x-2">
                          <Switch
                            checked={selectedCryptos.includes(crypto)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCryptos([...selectedCryptos, crypto])
                              } else {
                                setSelectedCryptos(selectedCryptos.filter((c) => c !== crypto))
                              }
                            }}
                          />
                          <span className="text-sm text-slate-600">{crypto}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* In Stock Only */}
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <span className="text-sm text-slate-600">In stock only</span>
                  </div>
                </div>
              </Card>
            )}

            {/* Crypto Rates */}
            <Card className="p-6 bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-sm">
              <h3 className="text-sm font-medium text-slate-800 mb-4">Current Crypto Rates</h3>
              <div className="space-y-3">
                {Object.entries(cryptoRates).map(([crypto, rate]) => (
                  <div key={crypto} className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">{crypto}</span>
                    <span className="text-sm font-medium text-slate-800">${rate.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {cryptoMatches.map((match) => (
                <Card
                  key={match.id}
                  className="p-6 bg-white/70 backdrop-blur-xl border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={match.image || "/placeholder.svg"}
                        alt={match.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute top-3 right-3">
                        <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      {match.savings > 0 && (
                        <Badge className="absolute bottom-3 left-3 bg-green-500 text-white">
                          Save ${match.savings}
                        </Badge>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h3 className="font-medium text-slate-800 text-lg leading-tight group-hover:text-purple-600 transition-colors">
                          {match.title}
                        </h3>

                        {/* Merchant Info */}
                        <div className="flex items-center space-x-3 mt-2">
                          <img
                            src={match.merchant.logo || "/placeholder.svg"}
                            alt={match.merchant.name}
                            className="h-6 w-auto"
                          />
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-slate-600">{match.merchant.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-slate-500">Verified</span>
                          </div>
                        </div>

                        {/* Similarity Score */}
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex items-center space-x-1">
                            <Zap className="w-4 h-4 text-purple-500" />
                            <span className="text-sm text-slate-600">{match.similarity}% match</span>
                          </div>
                          <div className="w-20 bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                              style={{ width: `${match.similarity}%` }}
                            />
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {match.features.map((feature, i) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        {/* Shipping & Stock */}
                        <div className="flex items-center space-x-4 mt-3 text-sm text-slate-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{match.shipping}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-green-600">In stock</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Actions */}
                    <div className="space-y-4">
                      <div className="text-right">
                        <div className="text-2xl font-semibold text-slate-900">${match.price.toLocaleString()}</div>
                        {match.savings > 0 && (
                          <div className="text-sm text-green-600 font-medium">${match.savings} less than original</div>
                        )}
                      </div>

                      {/* Crypto Prices */}
                      <div className="space-y-2">
                        {Object.entries(match.cryptoPrice).map(([crypto, amount]) => (
                          <div key={crypto} className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">{crypto}</span>
                            <span className="font-medium text-slate-800">{amount}</span>
                          </div>
                        ))}
                      </div>

                      {/* Supported Cryptos */}
                      <div className="flex flex-wrap gap-1">
                        {match.merchant.cryptos.map((crypto) => (
                          <Badge
                            key={crypto}
                            className="text-xs bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                          >
                            {crypto}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                          <Bitcoin className="w-4 h-4 mr-2" />
                          Buy with Crypto
                        </Button>
                        <Button variant="outline" className="w-full text-slate-600 border-slate-300">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="text-slate-600 border-slate-300">
                Load more results
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
