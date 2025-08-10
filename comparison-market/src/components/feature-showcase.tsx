"use client";

import { TrendingUp, MapPin, Star, Bell, BarChart3, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureShowcase() {
  return (
    <div className="mx-auto max-w-7xl pt-20 lg:pt-65 select-none lg:border-x border-slate-200 overflow-hidden">
      {/* Section Header */}
      <div className="mx-auto max-w-2xl sm:text-center px-5 lg:px-0">
        <h2 className="text-lg/10 font-base text-slate-500 uppercase">Smart Shopping Features</h2>
        <p className="mt-2 text-4xl font-medium tracking-tight text-pretty text-slate-900 sm:text-5xl sm:text-balance">
          Everything you need to make informed purchasing decisions.
        </p>
      </div>

      {/* Two Column Grid */}
      <div className="grid lg:grid-cols-2 mt-20 mb-16 lg:mb-0 pointer-events-none lg:border-y border-zinc-200 lg:divide-x divide-zinc-200">
        {/* Feature 1 - Price Tracking */}
        <div className="relative">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 pb-24 lg:pb-28 rounded-2xl ring-1 ring-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="size-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Price History Tracking</h3>
                <p className="text-sm text-slate-600">Monitor price changes over time</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <span className="text-sm font-medium">Current Price</span>
                <span className="font-bold text-emerald-600">$299</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <span className="text-sm font-medium">Lowest Price</span>
                <span className="font-bold text-indigo-600">$249</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <span className="text-sm font-medium">Price Drop Alert</span>
                <span className="text-xs text-slate-500">Set at $250</span>
              </div>
            </div>
          </div>
          <div className="lg:absolute lg:pl-0 lg:bottom-4 left-6 right-6 z-10">
            <div className="inline-block bg-white/95 backdrop-blur rounded-xl ring-1 ring-black/5 shadow px-5 py-3">
              <h2 className="text-2xl font-medium text-slate-900">Track price history</h2>
              <p className="mt-1 text-sm leading-5 text-slate-700">
                See how prices have changed over time and get notified when your desired items drop to your target price.
              </p>
            </div>
          </div>
          <div className="hidden lg:block absolute bg-[#0055FE] w-1 h-8.5 bottom-28.5 -left-[1px]"></div>
        </div>

        {/* Feature 2 - Store Locator */}
        <div className="relative">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 pb-24 lg:pb-28 rounded-2xl ring-1 ring-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <MapPin className="size-6 text-indigo-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Store Availability</h3>
                <p className="text-sm text-slate-600">Find products near you</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium">Best Buy</span>
                </div>
                <span className="text-sm text-slate-600">0.8 miles</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium">Target</span>
                </div>
                <span className="text-sm text-slate-600">1.2 miles</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                  <span className="text-sm font-medium">Walmart</span>
                </div>
                <span className="text-sm text-slate-600">2.1 miles</span>
              </div>
            </div>
          </div>
          <div className="lg:absolute lg:bottom-4 left-6 right-6 z-10">
            <div className="inline-block bg-white/95 backdrop-blur rounded-xl ring-1 ring-black/5 shadow px-5 py-3">
              <h2 className="text-2xl font-medium text-slate-900">Find local stores</h2>
              <p className="mt-1 text-sm leading-5 text-slate-700">
                Discover which stores have your items in stock and get directions to the nearest location.
              </p>
            </div>
          </div>
          <div className="hidden lg:block absolute bg-[#0055FE] w-1 h-8.5 bottom-28.5 -left-[1px]"></div>
        </div>
      </div>

      {/* Full Width Feature - Reviews */}
      <div className="relative lg:border-b border-slate-200">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 pb-24 lg:pb-28 rounded-2xl ring-1 ring-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Star className="size-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Aggregated Reviews</h3>
              <p className="text-sm text-slate-600">Real customer feedback from multiple sources</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`size-4 ${i < 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium">4.2/5</span>
              </div>
              <p className="text-sm text-slate-600">"Great product, fast shipping, highly recommend!"</p>
              <p className="text-xs text-slate-500 mt-2">- Amazon Customer</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`size-4 ${i < 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium">4.0/5</span>
              </div>
              <p className="text-sm text-slate-600">"Good quality for the price, meets expectations."</p>
              <p className="text-xs text-slate-500 mt-2">- Best Buy Customer</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`size-4 ${i < 3 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm font-medium">3.8/5</span>
              </div>
              <p className="text-sm text-slate-600">"Decent product, could be better for the price."</p>
              <p className="text-xs text-slate-500 mt-2">- Walmart Customer</p>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:bottom-4 left-6 right-6 z-10">
          <div className="inline-block bg-white/95 backdrop-blur rounded-xl ring-1 ring-black/5 shadow px-5 py-3">
            <h2 className="text-2xl font-medium text-slate-900">Read verified reviews</h2>
            <p className="mt-1 text-sm leading-5 text-slate-700">
              Get insights from real customers across multiple platforms to make confident purchasing decisions.
            </p>
          </div>
        </div>
        <div className="hidden lg:block absolute bg-[#0055FE] w-1 h-8.5 bottom-28.5 -left-[1px]"></div>
      </div>
    </div>
  );
} 