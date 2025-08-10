"use client";

import { useEffect, useMemo, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: number;
  name: string;
  image: string;
  currentPrice: number;
  priceHistory: number[];
}

interface SearchResponse {
  products: Product[];
}

export default function PriceTrackingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data: SearchResponse = await res.json();
        setProducts(data.products);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const items = useMemo(() => {
    return products.map((p) => {
      const maxPrice = Math.max(...p.priceHistory);
      const minPrice = Math.min(...p.priceHistory);
      const range = Math.max(maxPrice - minPrice, 1);
      const trend = p.priceHistory[p.priceHistory.length - 1] - p.priceHistory[0];
      return { ...p, minPrice, maxPrice, trend, range };
    });
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">Price Tracking</h1>
          <p className="text-gray-600 mt-1">Monitor price trends and decide the best time to buy</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-lg border bg-white">
                <Skeleton className="w-full aspect-[4/3]" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Button onClick={() => location.reload()} className="mt-4">Try Again</Button>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="size-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tracked products</h3>
            <p className="text-gray-600">Search for products and view their price history</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product) => (
              <Card key={product.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-indigo-50/20">
                <CardContent className="p-0">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full aspect-[4/3] object-cover" />
                    <div className={`absolute top-3 left-3 px-2 py-1 text-xs rounded ${product.trend <= 0 ? 'bg-green-600' : 'bg-red-600'} text-white shadow`}>
                      {product.trend <= 0 ? "Trending Down" : "Trending Up"}
                    </div>
                  </div>
                  <div className="p-4">
                    <CardTitle className="text-base mb-1 line-clamp-2 text-slate-900">
                      <Link href={`/product/${product.id}`} className="hover:text-indigo-700 transition-colors">
                        {product.name}
                      </Link>
                    </CardTitle>
                    <div className="text-xs text-gray-700">Range ${product.minPrice} - ${product.maxPrice}</div>
                    <div className="mt-3">
                      <div className="flex items-end gap-0.5 h-10">
                        {product.priceHistory.map((price, index) => {
                          const height = ((price - product.minPrice) / product.range) * 100;
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
      </div>

      <Footer />
    </div>
  );
}


