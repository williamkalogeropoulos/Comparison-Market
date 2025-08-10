import { Product, SearchResponse, User } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export class ApiService {
  static async searchProducts(
    query: string,
    filters: {
      category?: string;
      brand?: string;
      minPrice?: number;
      maxPrice?: number;
      sortBy?: string;
    } = {}
  ): Promise<SearchResponse> {
    const params = new URLSearchParams({
      q: query,
      ...filters,
    });

    const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    return response.json();
  }

  static async getProductDetails(productId: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    return response.json();
  }

  static async getWishlist(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/user/wishlist`, {
      headers: {
        'user-id': 'user123',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch wishlist: ${response.statusText}`);
    }

    return response.json();
  }

  static async addToWishlist(productId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/user/wishlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': 'user123',
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add to wishlist: ${response.statusText}`);
    }
  }

  static async removeFromWishlist(productId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/user/wishlist?productId=${productId}`, {
      method: 'DELETE',
      headers: {
        'user-id': 'user123',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to remove from wishlist: ${response.statusText}`);
    }
  }

  // Mock data for development when API is not available
  static getMockProducts(): Product[] {
    return [
      {
        id: 1,
        name: "iPhone 15 Pro",
        description: "Latest iPhone with advanced camera system",
        category: "Electronics",
        brand: "Apple",
        currentPrice: 999,
        bestPrice: 949,
        averagePrice: 999,
        originalPrice: 1099,
        priceDrop: 150,
        rating: 4.8,
        reviewCount: 1247,
        sustainabilityScore: 85,
        image: "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
        stores: [
          {
            id: 1,
            name: "Apple Store",
            price: 999,
            availability: "in-stock",
            location: "Downtown Mall",
            distance: 2.5,
            rating: 4.9,
            reviewCount: 1250,
            shipping: "Free",
            returnPolicy: "30 days",
            website: "https://apple.com"
          },
          {
            id: 2,
            name: "Best Buy",
            price: 949,
            availability: "in-stock",
            location: "Tech Plaza",
            distance: 5.2,
            rating: 4.7,
            reviewCount: 890,
            shipping: "$10",
            returnPolicy: "15 days",
            website: "https://bestbuy.com"
          }
        ]
      },
      {
        id: 2,
        name: "Sony WH-1000XM5",
        description: "Premium noise-canceling headphones",
        category: "Electronics",
        brand: "Sony",
        currentPrice: 349,
        bestPrice: 299,
        averagePrice: 349,
        originalPrice: 399,
        priceDrop: 100,
        rating: 4.9,
        reviewCount: 892,
        sustainabilityScore: 78,
        image: "https://via.placeholder.com/300x300?text=Sony+WH-1000XM5",
        stores: [
          {
            id: 3,
            name: "Amazon",
            price: 299,
            availability: "in-stock",
            location: "Online",
            rating: 4.8,
            reviewCount: 1200,
            shipping: "Free",
            returnPolicy: "30 days",
            website: "https://amazon.com"
          }
        ]
      }
    ];
  }
} 