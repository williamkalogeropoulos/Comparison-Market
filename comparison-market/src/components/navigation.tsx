"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@/lib/hooks/use-debounce";
import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [hasSession, setHasSession] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const debounced = useDebouncedValue(searchText, 400);
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--nav-height", `${Math.ceil(h)}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Check authentication status
  useEffect(() => {
    const hasSessionCookie = document.cookie.includes("session=");
    console.log("Session cookie found:", hasSessionCookie);
    setHasSession(hasSessionCookie);
    
    if (hasSessionCookie) {
      fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => {
          console.log("Auth /me response:", data);
          if (data.user) {
            setUserName(data.user.name || data.user.email.split('@')[0]);
          }
        })
        .catch((error) => {
          console.error("Auth /me error:", error);
          setHasSession(true);
        });
    }
  }, []);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const query = debounced.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <div ref={headerRef} id="app-nav" className="fixed inset-x-0 top-0 z-[50] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200 shadow-sm">
        <header className="mx-auto w-full max-w-7xl">
        <nav className="flex items-center justify-between p-3 lg:p-2">
          {/* Logo Section */}
          <div className="flex lg:flex-1 ml-2 -mt-0.5">
            <Link href="/" className="flex items-center gap-x-2 transition border-b border-transparent hover:border-black">
              <Logo size={28} />
              <span className="mt-1 text-lg font-medium transition text-slate-900">CompareThat.com</span>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700">
                  <Menu className="size-5.5 mr-1 outline-none" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/search" className="text-sm font-semibold text-zinc-900 hover:text-blue-600 transition">
                    Search Products
                  </Link>
                  <Link href="/deals" className="text-sm font-semibold text-zinc-900 hover:text-blue-600 transition">
                    Today's Deals
                  </Link>
                  <Link href="/price-tracking" className="text-sm font-semibold text-zinc-900 hover:text-blue-600 transition">
                    Price Tracking
                  </Link>
                  <Link href="/wishlist" className="text-sm font-semibold text-zinc-900 hover:text-blue-600 transition">
                    Wishlist
                  </Link>
                  <div className="pt-4 border-t">
                    {!hasSession ? (
                      <>
                        <Link href="/login">
                          <Button className="w-full mb-2">Sign In</Button>
                        </Link>
                        <Link href="/signup">
                          <Button variant="outline" className="w-full">Sign Up</Button>
                        </Link>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <div className="px-2 py-1.5 text-sm text-gray-500 border-b">
                          {userName || 'User'}
                        </div>
                        <Link href="/account" className="block px-2 py-1.5 text-sm rounded hover:bg-gray-50">
                          Profile
                        </Link>
                        <Link href="/protected" className="block px-2 py-1.5 text-sm rounded hover:bg-gray-50">
                          Protected Page
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-gray-50 text-left"
                        >
                          <LogOut className="size-4" /> Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-12 -ml-12">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <div className="grid grid-cols-2 gap-4">
                        <Link href="/category/electronics" className="block p-3 rounded-lg hover:bg-gray-50">
                          <div className="font-medium">Electronics</div>
                          <div className="text-sm text-gray-500">Phones, laptops, gadgets</div>
                        </Link>
                        <Link href="/category/clothing" className="block p-3 rounded-lg hover:bg-gray-50">
                          <div className="font-medium">Clothing</div>
                          <div className="text-sm text-gray-500">Fashion & accessories</div>
                        </Link>
                        <Link href="/category/home" className="block p-3 rounded-lg hover:bg-gray-50">
                          <div className="font-medium">Home & Garden</div>
                          <div className="text-sm text-gray-500">Furniture, decor, tools</div>
                        </Link>
                        <Link href="/category/books" className="block p-3 rounded-lg hover:bg-gray-50">
                          <div className="font-medium">Books & Media</div>
                          <div className="text-sm text-gray-500">Books, movies, music</div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="text-sm/6 font-semibold text-zinc-900 transition border-b border-transparent hover:border-black cursor-pointer">
                    <Link href="/deals">Today's Deals</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="text-sm/6 font-semibold text-zinc-900 transition border-b border-transparent hover:border-black cursor-pointer">
                    <Link href="/price-tracking">Price Tracking</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form className="relative w-full" onSubmit={onSearchSubmit}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-100/60 via-purple-100/60 to-pink-100/60 blur-md -z-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
              <Input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search products, brands, or barcodes..."
                className="pl-10 pr-4 py-2 bg-white/90 backdrop-blur border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-full"
              />
              {searchText.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSearchText("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </form>
          </div>

          {/* CTA Section */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-x-5">
            <Link href="/wishlist" className="relative p-2 text-zinc-900 hover:text-blue-600 transition">
              <Heart className="size-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
            <Link href="/cart" className="relative p-2 text-zinc-900 hover:text-blue-600 transition">
              <ShoppingCart className="size-5" />
              <span className="sr-only">Cart</span>
            </Link>
            {/* Auth section */}
            <UserMenu hasSession={hasSession} userName={userName} />
          </div>
        </nav>
      </header>
      </div>
      {/* Spacer to offset fixed header height */}
      <div aria-hidden style={{ height: "var(--nav-height, 64px)" }} />
    </div>
  );
} 

function UserMenu({ hasSession, userName }: { hasSession: boolean; userName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!hasSession) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login" className="text-sm/6 font-semibold text-zinc-900 transition border-b border-transparent hover:border-black">
          Log in
        </Link>
        <Link href="/signup">
          <Button className="flex px-2 py-1 gap-x-1 text-sm/6 font-semibold rounded-full text-white bg-black hover:opacity-86">
            Sign up
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" className="ml-1">
              <path d="M10.5 3.5L17.5 10.5L10.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.5 10.5H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
      >
        <Avatar>
          <AvatarFallback>{userName ? userName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
        </Avatar>
        <span className="text-sm text-slate-800 hidden md:inline">
          {userName || 'Account'}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white p-2 shadow-lg z-50">
          <div className="px-2 py-1.5 text-sm text-gray-500 border-b mb-1">
            {userName || 'User'}
          </div>
          <Link 
            href="/account" 
            className="block px-2 py-1.5 text-sm rounded hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link 
            href="/protected" 
            className="block px-2 py-1.5 text-sm rounded hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Protected Page
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-gray-50 text-left"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      )}
      
      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}