"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white select-none md:h-screen flex flex-col justify-between">
      {/* Main Content */}
      <div className="w-full flex flex-col items-center justify-center px-4 pt-8">
        <div className="w-full max-w-[1000px]">
          {/* Logo Section */}
          <div className="grid grid-cols-1 items-end gap-8 font-mono text-sm lg:grid-cols-[1fr_3fr_346px] lg:gap-0">
            <div className="flex flex-col justify-start space-y-4 lg:space-y-8 mt-4 mb-8">
              <div className="size-16 flex items-center justify-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">CM</span>
                </div>
              </div>
              <a className="text-zinc-400 hover:text-white transition-colors" download="comparison-market-logo.svg">
                └ comparison-market-logo.svg
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:gap-16 text-sm lg:grid-cols-4">
            <ul className="space-y-3">
              <li className="font-mono text-zinc-400 text-xs uppercase tracking-wider">GET STARTED</li>
              <li><Link href="/signup" className="text-zinc-300 hover:text-white transition-colors">Sign up</Link></li>
              <li><Link href="/login" className="text-zinc-300 hover:text-white transition-colors">Log in</Link></li>
              <li><Link href="/search" className="text-zinc-300 hover:text-white transition-colors">Search products</Link></li>
              <li><Link href="/deals" className="text-zinc-300 hover:text-white transition-colors">Today's deals</Link></li>
            </ul>
            <ul className="space-y-3">
              <li className="font-mono text-zinc-400 text-xs uppercase tracking-wider">FEATURES</li>
              <li><Link href="/price-tracking" className="text-zinc-300 hover:text-white transition-colors">Price tracking</Link></li>
              <li><Link href="/alerts" className="text-zinc-300 hover:text-white transition-colors">Price alerts</Link></li>
              <li><Link href="/reviews" className="text-zinc-300 hover:text-white transition-colors">Product reviews</Link></li>
              <li><Link href="/sustainability" className="text-zinc-300 hover:text-white transition-colors">Sustainability scores</Link></li>
            </ul>
            <ul className="space-y-3">
              <li className="font-mono text-zinc-400 text-xs uppercase tracking-wider">SUPPORT</li>
              <li><Link href="/help" className="text-zinc-300 hover:text-white transition-colors">Help center</Link></li>
              <li><Link href="/contact" className="text-zinc-300 hover:text-white transition-colors">Contact us</Link></li>
              <li><Link href="/feedback" className="text-zinc-300 hover:text-white transition-colors">Send feedback</Link></li>
              <li><Link href="/status" className="text-zinc-300 hover:text-white transition-colors">System status</Link></li>
            </ul>
            <ul className="space-y-3">
              <li className="font-mono text-zinc-400 text-xs uppercase tracking-wider">COMPANY</li>
              <li><Link href="/about" className="text-zinc-300 hover:text-white transition-colors">About us</Link></li>
              <li><Link href="/careers" className="text-zinc-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-zinc-300 hover:text-white transition-colors">Press</Link></li>
              <li><Link href="/partners" className="text-zinc-300 hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* Compliance Section */}
          <div className="inline-flex flex-col space-y-3.5">
            <div className="flex space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-xs text-zinc-400">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🔒</span>
                </div>
                <span className="text-xs text-zinc-400">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">♻</span>
                </div>
                <span className="text-xs text-zinc-400">Carbon Neutral</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-0 border-t border-dashed border-zinc-700 mt-6 pt-5">
            {/* Status Links */}
            <div className="grid lg:grid-cols-3 space-y-1 text-xs">
              <a className="group flex items-center space-x-2 py-1 text-white hover:text-zinc-300">
                <span className="text-green-500 group-hover:text-sky-300">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="5" cy="5" r="2" fill="currentColor"/>
                  </svg>
                </span>
                <span>Status: All Systems Operational</span>
              </a>
              <a href="/privacy" className="text-zinc-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-zinc-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-2 text-white">
              <a href="https://twitter.com/comparisonmarket" className="p-2 hover:text-blue-400 transition-colors">
                <Twitter className="size-5" />
              </a>
              <a href="https://facebook.com/comparisonmarket" className="p-2 hover:text-blue-600 transition-colors">
                <Facebook className="size-5" />
              </a>
              <a href="https://instagram.com/comparisonmarket" className="p-2 hover:text-pink-500 transition-colors">
                <Instagram className="size-5" />
              </a>
              <a href="https://linkedin.com/company/comparisonmarket" className="p-2 hover:text-blue-700 transition-colors">
                <Linkedin className="size-5" />
              </a>
              <a href="https://youtube.com/comparisonmarket" className="p-2 hover:text-red-500 transition-colors">
                <Youtube className="size-5" />
              </a>
              <a href="https://github.com/comparisonmarket" className="p-2 hover:text-gray-400 transition-colors">
                <Github className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Bottom Border */}
      <div aria-hidden="true" className="overflow-hidden h-32">
        <div className="flex flex-col">
          {Array.from({ length: 23 }, (_, i) => (
            <div
              key={i}
              className="bg-white transition-all duration-100 ease-in-out"
              style={{
                height: `${i + 1}px`,
                marginTop: '-2px',
                opacity: 0.1 + (i * 0.03)
              }}
            ></div>
          ))}
        </div>
      </div>
    </footer>
  );
} 