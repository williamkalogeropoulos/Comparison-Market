"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  Star, 
  Heart, 
  MapPin, 
  TrendingUp, 
  Bell, 
  Share2, 
  ShoppingCart,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Shield
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
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
    rating: number;
    deliveryTime: string;
    returnPolicy: string;
  }>;
  priceHistory: Array<{
    date: string;
    price: number;
  }>;
  sustainabilityScore: number;
  category: string;
  brand: string;
  barcode: string;
  specifications: Record<string, string>;
  reviews: Array<{
    id: number;
    user: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    helpful: number;
  }>;
  alerts: Array<{
    id: number;
    type: string;
    message: string;
    date: string;
  }>;
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const { show } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }

        const data: Product = await response.json();
        setProduct(data);
        // Set the first available store as selected
        const firstAvailableStore = data.stores.findIndex(store => store.inStock);
        setSelectedStore(firstAvailableStore >= 0 ? firstAvailableStore : 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const addToWishlist = async () => {
    if (!product) return;

    try {
      const response = await fetch('/api/user/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': 'user123' // Mock user ID
        },
        body: JSON.stringify({ productId: product.id })
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg" />
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
                  <div className="h-8 w-1/2 bg-gray-200 animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
                    <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
                  </div>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-12 bg-gray-100 animate-pulse rounded" />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-4" />
                  <div className="grid grid-cols-4 gap-2 h-24">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="bg-gray-200 animate-pulse rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-24 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => window.history.back()}>
                Go Back
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
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><a href="/" className="hover:text-gray-700">Home</a></li>
              <li>/</li>
              <li><a href="/search" className="hover:text-gray-700">Search</a></li>
              <li>/</li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="size-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.rating}</span>
                        <span className="text-gray-500">({product.reviewCount} reviews)</span>
                      </div>
                      <Badge variant="secondary">
                        {product.sustainabilityScore}/100 Sustainability
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={addToWishlist}>
                      <Heart className="size-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                </div>

                {/* Price */}
                  <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-green-600">
                      ${product.currentPrice}
                    </span>
                    {product.originalPrice > product.currentPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                    <p className="text-sm text-gray-700">
                    Best price: <span className="font-medium text-blue-600">${product.bestPrice}</span> • 
                    Average: <span className="font-medium">${product.averagePrice}</span>
                  </p>
                </div>

                {/* Store Selection */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">Available at:</h3>
                  <div className="space-y-3">
                    {product.stores.map((store, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedStore === index
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedStore(index)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{store.name}</span>
                              <div className="flex items-center gap-1">
                                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{store.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <MapPin className="size-3" />
                                {store.distance}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="size-3" />
                                {store.deliveryTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <Shield className="size-3" />
                                {store.returnPolicy}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              ${store.price}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              {store.inStock ? (
                                <>
                                  <CheckCircle className="size-3 text-green-500" />
                                  <span className="text-green-600">In Stock</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="size-3 text-red-500" />
                                  <span className="text-red-600">Out of Stock</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1" size="lg">
                    <ShoppingCart className="size-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" size="lg">
                    <Bell className="size-4 mr-2" />
                    Price Alert
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="bg-white rounded-lg shadow-sm border">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="history">Price History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-6">
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                    <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
                  </div>
                </TabsContent>

                <TabsContent value="specifications" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
                      <div className="space-y-6">
                        {product.reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`size-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.user}</span>
                          <span className="text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <h4 className="font-medium mb-1">{review.title}</h4>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                            <div className="flex items-center gap-2 mt-3">
                          <Button variant="ghost" size="sm" className="text-xs">
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Price History</h3>
                  <div className="h-64 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-end justify-between h-full">
                      {product.priceHistory.map((point, index) => {
                        const maxPrice = Math.max(...product.priceHistory.map(p => p.price));
                        const minPrice = Math.min(...product.priceHistory.map(p => p.price));
                        const height = ((point.price - minPrice) / (maxPrice - minPrice)) * 100;
                        const isCurrent = index === product.priceHistory.length - 1;
                        
                        return (
                          <div key={index} className="flex flex-col items-center">
                            <div 
                              className={`w-4 rounded-sm ${
                                isCurrent ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                              style={{ height: `${Math.max(height, 10)}%` }}
                            />
                            <span className="text-xs text-gray-500 mt-1">${point.price}</span>
                            <span className="text-xs text-gray-400">{point.date}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 