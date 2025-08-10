"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Filter, Star, TrendingUp, MapPin, Heart, Loader2 } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Replaced missing shadcn Select with native select elements

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  bestPrice: number;
  averagePrice: number;
  rating: number;
  reviewCount: number;
  stores: Array<{
    name: string;
    price: number;
    inStock: boolean;
    distance: string;
    location: string;
  }>;
  priceHistory: number[];
  sustainabilityScore: number;
  category: string;
  brand: string;
  barcode: string;
}

interface SearchResponse {
  products: Product[];
  total: number;
  query: string;
  filters: {
    category: string;
    brand: string;
    minPrice: string;
    maxPrice: string;
    sortBy: string;
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'relevance');
  const [filterPrice, setFilterPrice] = useState(searchParams.get('price') || 'all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [typingQuery, setTypingQuery] = useState(searchQuery);
  const { show } = useToast();

  // Debounce search text input
  useEffect(() => {
    const id = setTimeout(() => setSearchQuery(typingQuery), 400);
    return () => clearTimeout(id);
  }, [typingQuery]);

  // Fetch products when search parameters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('q', searchQuery);
        if (sortBy !== 'relevance') params.append('sortBy', sortBy);
        if (filterPrice !== 'all') {
          const [min, max] = filterPrice.split('-');
          if (min) params.append('minPrice', min);
          if (max) params.append('maxPrice', max);
        }

        const response = await fetch(`/api/search?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: SearchResponse = await response.json();
        setProducts(data.products);
        setTotalResults(data.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, sortBy, filterPrice]);

  // Update URL when search parameters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (sortBy !== 'relevance') params.append('sortBy', sortBy);
    if (filterPrice !== 'all') params.append('price', filterPrice);
    
    const newUrl = `/search${params.toString() ? `?${params.toString()}` : ''}`;
    router.replace(newUrl);
  }, [searchQuery, sortBy, filterPrice, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by useEffect
  };

  const addToWishlist = async (productId: number) => {
    try {
      const response = await fetch('/api/user/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': 'user123' // Mock user ID
        },
        body: JSON.stringify({ productId })
      });

      if (response.ok) {
        show({ type: 'success', title: 'Wishlist', message: 'Added to wishlist' });
      } else {
        show({ type: 'error', title: 'Wishlist', message: 'Failed to add to wishlist' });
      }
    } catch (error) {
      show({ type: 'error', title: 'Wishlist', message: 'Error adding to wishlist' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Search Header */}
      <div className="pt-24 pb-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
              <Input
                value={typingQuery}
                onChange={(e) => setTypingQuery(e.target.value)}
                placeholder="Search for products, brands, or scan a barcode..."
                className="pl-12 pr-4 py-4 text-lg bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Filters and Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-lg mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="sustainability">Sustainability Score</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={filterPrice}
                    onChange={(e) => setFilterPrice(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-100">Under $100</option>
                    <option value="100-500">$100 - $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-">Over $1,000</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-lg border bg-white">
                    <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                      <div className="h-3 w-full bg-gray-200 animate-pulse rounded" />
                      <div className="flex items-center justify-between">
                        <div className="h-5 w-24 bg-gray-200 animate-pulse rounded" />
                        <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    {totalResults} results found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="size-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search terms or filters
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Card key={product.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/20">
                        <CardContent className="p-0">
                          <div className="relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full aspect-[4/3] object-cover"
                            />
                            <Button
                              variant="secondary"
                              size="icon"
                              onClick={() => addToWishlist(product.id)}
                              className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white shadow-md"
                              aria-label="Add to wishlist"
                            >
                              <Heart className="size-4 text-red-500" />
                            </Button>
                          </div>
                          <div className="p-4">
                            <CardTitle className="text-base mb-1 line-clamp-2">
                                  <Link href={`/product/${product.id}`} className="hover:text-indigo-700 text-slate-900 transition-colors">
                                {product.name}
                              </Link>
                            </CardTitle>
                            <CardDescription className="text-xs text-slate-600 line-clamp-2 min-h-10">
                              {product.description}
                            </CardDescription>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-emerald-600">${product.currentPrice}</span>
                                {product.originalPrice > product.currentPrice && (
                                  <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                                <span>{product.rating} ({product.reviewCount})</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="flex items-end gap-0.5 h-10">
                                {product.priceHistory.map((price, index) => {
                                  const maxPrice = Math.max(...product.priceHistory);
                                  const minPrice = Math.min(...product.priceHistory);
                                  const range = Math.max(maxPrice - minPrice, 1);
                                  const height = ((price - minPrice) / range) * 100;
                                  const isCurrent = index === product.priceHistory.length - 1;
                                  return (
                                    <div
                                      key={index}
                                      className={`flex-1 rounded-sm ${isCurrent ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                      style={{ height: `${Math.max(height, 8)}%` }}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 