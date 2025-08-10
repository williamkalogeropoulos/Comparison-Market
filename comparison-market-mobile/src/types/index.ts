export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  category: string;
  brand: string;
  currentPrice: number;
  bestPrice: number;
  averagePrice: number;
  originalPrice: number;
  priceDrop: number;
  rating: number;
  reviewCount: number;
  sustainabilityScore: number;
  image: string;
  stores: Store[];
  specifications?: ProductSpecifications;
  reviews?: Review[];
  alerts?: Alert[];
  priceHistory?: PriceHistoryPoint[];
}

export interface Store {
  id: number;
  name: string;
  price: number;
  availability: 'in-stock' | 'limited' | 'out-of-stock';
  location: string;
  distance?: number;
  rating: number;
  reviewCount: number;
  shipping: string;
  returnPolicy: string;
  website: string;
}

export interface ProductSpecifications {
  dimensions?: string;
  weight?: string;
  color?: string;
  material?: string;
  warranty?: string;
  [key: string]: string | undefined;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  verified: boolean;
}

export interface Alert {
  id: number;
  type: 'price-drop' | 'back-in-stock' | 'new-store';
  message: string;
  date: string;
  read: boolean;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  store: string;
}

export interface SearchFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  availability?: string;
}

export interface SearchResponse {
  products: Product[];
  total: number;
  query: string;
  filters: SearchFilters;
}

export interface WishlistItem {
  productId: number;
  addedAt: string;
  targetPrice?: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  wishlist: WishlistItem[];
  alerts: Alert[];
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
} 