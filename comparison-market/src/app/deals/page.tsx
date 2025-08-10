"use client";

import { useEffect, useMemo, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, Loader2, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
}

interface SearchResponse {
  products: Product[];
  total: number;
}

export default function DealsPage() {
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

  const deals = useMemo(() => {
    return products
      .filter((p) => p.originalPrice > p.currentPrice || p.bestPrice < p.currentPrice)
      .sort((a, b) => {
        const dropA = Math.max(a.originalPrice - a.currentPrice, a.currentPrice - a.bestPrice);
        const dropB = Math.max(b.originalPrice - b.currentPrice, b.currentPrice - b.bestPrice);
        return dropB - dropA;
      });
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">Today's Deals</h1>
          <p className="text-gray-600 mt-1">Hand-picked savings across popular products</p>
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
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Button onClick={() => location.reload()} className="mt-4">Try Again</Button>
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="size-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No deals right now</h3>
            <p className="text-gray-600">Check back later for fresh discounts</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((product) => {
              const absoluteDrop = Math.max(
                product.originalPrice - product.currentPrice,
                product.currentPrice - product.bestPrice
              );
              const percentDrop = Math.round((absoluteDrop / product.originalPrice) * 100);
              return (
                <Card key={product.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-emerald-50/20">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full aspect-[4/3] object-cover" />
                      <div className="absolute top-3 left-3 px-2 py-1 text-xs rounded bg-green-600 text-white shadow">
                        Save ${absoluteDrop} {percentDrop > 0 ? `(${percentDrop}%)` : ""}
                      </div>
                    </div>
                    <div className="p-4">
                      <CardTitle className="text-base mb-1 line-clamp-2 text-slate-900">
                        <Link href={`/product/${product.id}`} className="hover:text-indigo-700 transition-colors">
                          {product.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-xs text-gray-600 line-clamp-2 min-h-10">{product.description}</CardDescription>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-emerald-600">${product.currentPrice}</span>
                          {product.originalPrice > product.currentPrice && (
                            <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          <span>{product.rating} ({product.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}


