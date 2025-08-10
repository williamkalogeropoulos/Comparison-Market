"use client";

import { useState, useEffect } from "react";
import { 
  Heart, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  MapPin,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface WishlistItem {
  productId: number;
  addedAt: string;
  priceWhenAdded: number;
  currentPrice: number;
  priceDrop: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  stores: Array<{
    name: string;
    price: number;
    inStock: boolean;
    distance: string;
  }>;
  sustainabilityScore: number;
}

interface WishlistResponse {
  wishlist: WishlistItem[];
  total: number;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { show } = useToast();

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/user/wishlist', {
          headers: {
            'user-id': 'user123' // Mock user ID
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }

        const data: WishlistResponse = await response.json();
        setWishlistItems(data.wishlist);

        // Fetch product details for each wishlist item
        const productPromises = data.wishlist.map(async (item) => {
          const productResponse = await fetch(`/api/products/${item.productId}`);
          if (productResponse.ok) {
            const product: Product = await productResponse.json();
            return { [item.productId]: product };
          }
          return {};
        });

        const productResults = await Promise.all(productPromises);
        const productsMap = productResults.reduce((acc, product) => ({ ...acc, ...product }), {});
        setProducts(productsMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId: number) => {
    try {
      const response = await fetch(`/api/user/wishlist?productId=${productId}`, {
        method: 'DELETE',
        headers: {
          'user-id': 'user123' // Mock user ID
        }
      });

      if (response.ok) {
        setWishlistItems(prev => prev.filter(item => item.productId !== productId));
        const newProducts = { ...products };
        delete newProducts[productId];
        setProducts(newProducts);
        show({ type: 'success', title: 'Wishlist', message: 'Removed from wishlist' });
      } else {
        show({ type: 'error', title: 'Wishlist', message: 'Failed to remove from wishlist' });
      }
    } catch (error) {
      show({ type: 'error', title: 'Wishlist', message: 'Error removing from wishlist' });
    }
  };

  const getPriceChangeIcon = (priceDrop: number) => {
    if (priceDrop > 0) {
      return <TrendingDown className="size-4 text-green-500" />;
    } else if (priceDrop < 0) {
      return <TrendingUp className="size-4 text-red-500" />;
    }
    return null;
  };

  const getPriceChangeText = (priceDrop: number) => {
    if (priceDrop > 0) {
      return `Price dropped by $${priceDrop}`;
    } else if (priceDrop < 0) {
      return `Price increased by $${Math.abs(priceDrop)}`;
    }
    return 'No price change';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Loading wishlist...</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-12">
              <AlertCircle className="size-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Wishlist</h1>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="size-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Start adding products to your wishlist to track prices and get alerts
              </p>
              <Button asChild>
                <a href="/search">Browse Products</a>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {wishlistItems.map((item) => {
                const product = products[item.productId];
                if (!product) return null;

                return (
                  <Card key={item.productId} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="w-32 h-32 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <CardTitle className="text-lg mb-1">
                                <Link 
                                  href={`/product/${product.id}`}
                                  className="hover:text-blue-600 transition-colors"
                                >
                                  {product.name}
                                </Link>
                              </CardTitle>
                              <CardDescription className="text-sm mb-2">
                                {product.description}
                              </CardDescription>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromWishlist(item.productId)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="size-5" />
                            </Button>
                          </div>

                          {/* Price and Rating */}
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-emerald-600">
                                ${product.currentPrice}
                              </span>
                              {product.originalPrice > product.currentPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="size-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-slate-700">
                                {product.rating} ({product.reviewCount})
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {product.sustainabilityScore}/100 Sustainability
                            </Badge>
                          </div>

                          {/* Price Tracking */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              {getPriceChangeIcon(item.priceDrop)}
                              <span className={`text-sm font-medium ${
                                item.priceDrop > 0 ? 'text-green-600' : 
                                item.priceDrop < 0 ? 'text-red-600' : 'text-gray-600'
                              }`}>
                                {getPriceChangeText(item.priceDrop)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Added on {new Date(item.addedAt).toLocaleDateString()} at ${item.priceWhenAdded}
                            </div>
                          </div>

                          {/* Store Availability */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-slate-800">Available at:</h4>
                            <div className="flex flex-wrap gap-2">
                              {product.stores.slice(0, 3).map((store, index) => (
                                <div
                                  key={index}
                                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                                    store.inStock
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  <MapPin className="size-3" />
                                  <span className="font-medium">{store.name}</span>
                                  <span>${store.price}</span>
                                  <span className="text-xs opacity-75">
                                    {store.distance}
                                  </span>
                                  {store.inStock ? (
                                    <CheckCircle className="size-3 text-green-500" />
                                  ) : (
                                    <span className="text-red-500">Out</span>
                                  )}
                                </div>
                              ))}
                            </div>
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
      </div>

      <Footer />
    </div>
  );
} 