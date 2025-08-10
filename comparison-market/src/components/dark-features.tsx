"use client";

import { Bell, BarChart3, Shield, Zap, Users, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DarkFeatures() {
  return (
    <div className="bg-[#181B20]">
      <div className="mx-auto max-w-6xl sm:text-center pt-18 lg:pt-26 px-4">
        {/* Header */}
        <div className="max-w-80 mx-auto lg:max-w-6xl">
          <h2 className="mt-2 text-3xl lg:text-5xl font-medium tracking-tight text-white sm:text-5xl sm:text-balance">
            Advanced features for smart shoppers.
          </h2>
          <p className="mt-4 text-lg lg:text-xl max-w-lg mx-auto font-base tracking-tight text-zinc-400 leading-6">
            Get personalized alerts, sustainability insights, and comprehensive price analysis to make the best purchasing decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-12 select-none pointer-events-none">
          {/* Feature 1 - Price Alerts */}
          <div className="py-16 mx-auto grid grid-cols-1 gap-x-12 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5 items-center">
            <div className="lg:pr-8 pl-8 lg:pl-0 col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="size-6 text-blue-400" />
                <Badge variant="secondary" className="bg-blue-900/20 text-blue-400 border-blue-800">
                  New
                </Badge>
              </div>
              <h2 className="text-2xl font-medium tracking-tight text-white mb-4">Smart Price Alerts</h2>
              <p className="text-base text-zinc-300 mb-6">
                Set custom price thresholds and get instant notifications when your desired items drop to your target price. 
                Never miss a deal again with intelligent price tracking.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Real-time price monitoring</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Custom price thresholds</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Email & push notifications</span>
                </div>
              </div>
            </div>
            <div className="lg:order-2 col-span-3 p-8 lg:p-0 -mt-14 lg:mt-0">
              <div className="bg-[#1D2025] rounded-[18px] w-full max-w-none ring-1 ring-white/5 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#282828] rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">iPhone 15 Pro</h3>
                      <p className="text-zinc-400 text-sm">Target: $899</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-bold">$899</p>
                      <p className="text-zinc-400 text-sm">Alert triggered!</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#282828] rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Sony WH-1000XM5</h3>
                      <p className="text-zinc-400 text-sm">Target: $299</p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-400">$349</p>
                      <p className="text-zinc-500 text-sm">Monitoring...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 - Analytics */}
          <div className="py-16 mx-auto grid grid-cols-1 gap-x-12 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5 items-center">
            <div className="lg:order-2 lg:pr-8 pl-8 lg:pl-0 col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="size-6 text-purple-400" />
                <Badge variant="secondary" className="bg-purple-900/20 text-purple-400 border-purple-800">
                  Pro
                </Badge>
              </div>
              <h2 className="text-2xl font-medium tracking-tight text-white mb-4">Price Analytics</h2>
              <p className="text-base text-zinc-300 mb-6">
                Advanced price analysis with historical data, trend predictions, and market insights to help you 
                understand when to buy and when to wait.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Historical price charts</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Price trend predictions</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Market analysis reports</span>
                </div>
              </div>
            </div>
            <div className="lg:order-1 col-span-3 p-8 lg:p-0 -mt-14 lg:mt-0">
              <div className="bg-[#1D2025] rounded-[18px] w-full max-w-none ring-1 ring-white/5 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">Price Trend</h3>
                    <span className="text-green-400 text-sm">↓ 12% this month</span>
                  </div>
                  <div className="h-32 bg-[#282828] rounded-lg flex items-end justify-between p-4">
                    {[40, 35, 45, 30, 38, 42, 28].map((height, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div 
                          className="w-4 bg-gradient-to-t from-blue-500 to-purple-500 rounded-sm"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs text-zinc-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-[#282828] p-3 rounded-lg">
                      <p className="text-zinc-400">Best Price</p>
                      <p className="text-white font-bold">$899</p>
                    </div>
                    <div className="bg-[#282828] p-3 rounded-lg">
                      <p className="text-zinc-400">Average</p>
                      <p className="text-white font-bold">$1,099</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3 - Sustainability */}
          <div className="py-16 mx-auto grid grid-cols-1 gap-x-12 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5 items-center">
            <div className="lg:pr-8 pl-8 lg:pl-0 col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="size-6 text-green-400" />
                <Badge variant="secondary" className="bg-green-900/20 text-green-400 border-green-800">
                  Eco
                </Badge>
              </div>
              <h2 className="text-2xl font-medium tracking-tight text-white mb-4">Sustainability Score</h2>
              <p className="text-base text-zinc-300 mb-6">
                Make environmentally conscious decisions with our sustainability scoring system. 
                Learn about product materials, manufacturing practices, and company ethics.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Environmental impact ratings</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Ethical manufacturing info</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Carbon footprint data</span>
                </div>
              </div>
            </div>
            <div className="lg:order-2 col-span-3 p-8 lg:p-0 -mt-14 lg:mt-0">
              <div className="bg-[#1D2025] rounded-[18px] w-full max-w-none ring-1 ring-white/5 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">Sustainability Score</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-green-400 font-bold">75/100</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#282828] p-3 rounded-lg">
                      <p className="text-zinc-400 text-sm">Materials</p>
                      <p className="text-green-400 font-medium">Recycled</p>
                    </div>
                    <div className="bg-[#282828] p-3 rounded-lg">
                      <p className="text-zinc-400 text-sm">Manufacturing</p>
                      <p className="text-yellow-400 font-medium">Fair Trade</p>
                    </div>
                    <div className="bg-[#282828] p-3 rounded-lg">
                      <p className="text-zinc-400 text-sm">Packaging</p>
                      <p className="text-green-400 font-medium">Biodegradable</p>
                    </div>
                    <div className="bg-[#282828] p-3 rounded-lg">
                      <p className="text-zinc-400 text-sm">Carbon Footprint</p>
                      <p className="text-blue-400 font-medium">Low</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 