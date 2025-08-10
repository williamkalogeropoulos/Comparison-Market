"use client";

import { Search, TrendingUp, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDebouncedValue } from "@/lib/hooks/use-debounce";

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const debounced = useDebouncedValue(query, 400);

  const goToSearch = () => {
    const q = debounced.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };

  return (
    <div className="relative py-32 sm:py-48 lg:py-60 select-none bg-gradient-to-t from-slate-200 via-slate-100 to-slate-50">
      {/* Background Effects */}
      <div className="hidden lg:block">
        <div className="absolute inset-0 overflow-hidden contain-paint">
          <div className="absolute inset-[0.5rem] rounded-[12rem] bg-white/2 shadow-[0_0_40px_rgba(173,216,255,0.5)] blur-[4px]"></div>
          <div className="absolute inset-[3rem] rounded-[12rem] bg-white/2 shadow-[0_0_30px_rgba(173,216,255,0.4)] blur-[3px]"></div>
          <div className="absolute inset-[6rem] rounded-[12rem] bg-white/2 shadow-[0_0_20px_rgba(173,216,255,0.3)] blur-[2px]"></div>
          <div className="absolute inset-[10rem] rounded-[8rem] bg-white/2 shadow-[inset_0_0_30px_rgba(255,255,255,0.4)] blur-[1px]"></div>
        </div>
      </div>

      {/* Organic Shape Overlay */}
      <div aria-hidden="true" className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 overflow-hidden blur-3xl">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 animate-pulse sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative text-center z-[1] mx-auto max-w-3xl lg:pb-16 px-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-7xl">
          <span className="px-2 -mx-2 rounded-xl bg-white/90 backdrop-blur shadow-sm ring-1 ring-black/5">Find the best deals,</span>{" "}
          <span className="px-2 -mx-2 rounded-xl bg-slate-900 text-white shadow-sm">every time.</span>
        </h1>
        <p className="mx-auto max-w-xl mt-5 text-lg/6 lg:text-xl/6 font-medium text-balance text-zinc-500">
          Compare prices across hundreds of retailers, track price history, and never overpay again. 
          Your smart shopping companion for the best deals.
        </p>

        {/* Search Bar */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  goToSearch();
                }
              }}
              placeholder="Search for products, brands, or scan a barcode..."
              className="pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-lg rounded-full transition group-hover:shadow-xl"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-28 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
            <Button onClick={goToSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-full">
              Search
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-600">
            <TrendingUp className="size-4 text-emerald-600" />
            <span>Price Tracking</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-600">
            <MapPin className="size-4 text-indigo-600" />
            <span>Store Locator</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-zinc-600">
            <Star className="size-4 text-amber-500" />
            <span>Verified Reviews</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="grid items-center justify-center gap-y-2.5 mt-10">
          <Button onClick={() => router.push("/search")} className="flex group items-center gap-x-2 rounded-full bg-black px-7.5 py-3 text-md font-semibold text-white shadow-xs outline-none hover:-translate-y-0.5 transition hover:scale-[100.5%] hover:bg-black/90">
            <span className="group-hover:text-sky-50 transition">Start Comparing Prices</span>
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" className="group-hover:text-sky-50 transition">
              <path d="M10.5 3.5L17.5 10.5L10.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.5 10.5H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          <a href="#features" className="text-sm/6 font-semibold text-zinc-900/60 hover:text-blue-600/80 underline">
            Learn how it works
          </a>
        </div>
      </div>

      {/* UI Mockup */}
      <div className="hidden z-[11] lg:block absolute -bottom-[11.5rem] left-1/2 transform -translate-x-1/2 z-[1] max-w-2xl pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Search className="size-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">iPhone 15 Pro</h3>
              <p className="text-sm text-gray-500">Compare prices across 12 stores</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Best Price</span>
              <span className="font-bold text-green-600">$999</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Average Price</span>
              <span className="font-bold text-gray-600">$1,099</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 