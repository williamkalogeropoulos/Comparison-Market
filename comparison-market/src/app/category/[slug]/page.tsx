"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Loader2, Star } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
}

interface SearchResponse {
  products: Product[];
  total: number;
}

const slugToLabel: Record<string, string> = {
  electronics: "Electronics",
  clothing: "Clothing",
  home: "Home & Garden",
  books: "Books & Media",
};

export default function CategoryPage() {
  const params = useParams();
  const slug = (params.slug as string) || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search?category=${encodeURIComponent(slugToLabel[slug] || slug)}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data: SearchResponse = await res.json();
        setProducts(data.products);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    if (slug) run();
  }, [slug]);

  const title = slugToLabel[slug] || slug;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">Browse products in {title}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-600">No products found.</div>
        ) : (
          <div className="grid gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <CardTitle className="text-lg mb-1">
                            <Link href={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
                              {product.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-sm mb-2">{product.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-green-600">${product.currentPrice}</span>
                          {product.originalPrice > product.currentPrice && (
                            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
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


