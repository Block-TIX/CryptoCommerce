"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Upload, Zap, Bitcoin, Wallet, ArrowRight, Sparkles, Globe, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function HomeClient() {
  const [searchValue, setSearchValue] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  // Only run on client side
  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const productImages = [
    "/images/watch.jpg",
    "/images/sneakers.jpg",
    "/images/headphones.jpg",
    "/images/laptop.jpg",
    "/images/handbag.jpg",
    "/images/chair.jpg",
    "/images/smart-device.jpg",
    "/images/sunglasses.jpg",
    "/images/coffee-machine.jpg",
    "/images/earbuds.jpg",
    "/images/keyboard.jpg",
    "/images/smartphone.jpg",
  ]

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchValue) return

    setIsSearching(true)

    // In a real implementation, you would:
    // 1. Call your API to parse the URL
    // 2. Extract product data
    // 3. Find crypto alternatives
    // 4. Store results in state/context/store

    // For now, we'll just simulate a delay and redirect
    setTimeout(() => {
      // Pass the URL as a query parameter
      router.push(`/search?url=${encodeURIComponent(searchValue)}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 h-full p-4">
          {productImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl transition-all duration-1000 ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                transform: isLoaded ? `translateY(${Math.sin((mousePosition.x + i * 100) * 0.001) * 5}px)` : "none",
              }}
            >
              <img
                src={img || "/placeholder.svg"}
                alt=""
                className="w-full h-full object-cover filter brightness-90 hover:brightness-100 transition-all duration-500 rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 mix-blend-overlay rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-cyan-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Bitcoin className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 via-cyan-500 to-pink-500 rounded-xl blur opacity-20" />
            </div>
            <span className="text-2xl font-light bg-gradient-to-r from-slate-700 via-purple-600 to-cyan-600 bg-clip-text text-transparent tracking-wide">
              cryptofind
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {["Discover", "Markets", "Wallets", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-600 hover:text-slate-900 transition-all duration-300 relative group font-light"
              >
                {item}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-light">
              <Wallet className="w-4 h-4 mr-2" />
              Connect
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-purple-500/20 font-light">
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-40 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-full px-6 py-3 mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-slate-600 font-light">Powered by AI • Secured by Blockchain</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl font-extralight mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent">
              Buy it with
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 bg-clip-text text-transparent font-light">
              Crypto
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed font-light">
            Find the same products from crypto-accepting stores.
            <br />
            <span className="text-purple-600 font-normal">Discover • Compare • Purchase with digital assets</span>
          </p>
        </div>

        {/* Search Interface */}
        <div className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative group">
            {/* Glassmorphism Container */}
            <div className="relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl p-8 shadow-xl shadow-slate-200/50">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 rounded-3xl" />
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="relative space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Paste product URL or describe what you're looking for..."
                      className="pl-12 pr-4 py-6 bg-white/50 border-slate-200/50 rounded-2xl text-slate-700 placeholder-slate-400 text-lg focus:bg-white/70 focus:border-purple-300 transition-all duration-300 font-light"
                    />
                  </div>

                  <Button
                    type="button"
                    className="bg-white/50 hover:bg-white/70 border border-slate-200/50 rounded-2xl p-6 transition-all duration-300"
                  >
                    <Upload className="w-5 h-5 text-slate-500" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" />
                        <div className="w-6 h-6 bg-white/50 border border-slate-300 rounded-lg group-hover:bg-white/70 transition-all duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-400 rounded opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>
                      </div>
                      <span className="text-slate-600 text-sm font-light">AI-powered search</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" />
                        <div className="w-6 h-6 bg-white/50 border border-slate-300 rounded-lg group-hover:bg-white/70 transition-all duration-300" />
                      </div>
                      <span className="text-slate-600 text-sm font-light">Include DeFi markets</span>
                    </label>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-slate-500">
                    <Globe className="w-4 h-4" />
                    <span className="font-light">Also search</span>
                    <span className="text-purple-600 font-normal">OpenSea • Crypto.com</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSearching || !searchValue}
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-700 hover:via-purple-600 hover:to-cyan-600 text-white py-6 rounded-2xl text-lg font-light shadow-lg shadow-purple-500/20 transition-all duration-300 group disabled:opacity-70"
                >
                  {isSearching ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Finding Crypto Alternatives...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Find Crypto Alternatives
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          {[
            { icon: Shield, text: "Secure Payments", color: "from-green-400 to-emerald-500" },
            { icon: Zap, text: "Instant Matching", color: "from-yellow-400 to-orange-500" },
            { icon: TrendingUp, text: "Best Prices", color: "from-blue-400 to-purple-500" },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex items-center space-x-2 bg-white/60 backdrop-blur-xl border border-slate-200/50 rounded-full px-6 py-3 hover:bg-white/80 transition-all duration-300 cursor-pointer group shadow-sm"
            >
              <feature.icon className={`w-4 h-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
              <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-300 font-light">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
