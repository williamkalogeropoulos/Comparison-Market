import { NextRequest, NextResponse } from 'next/server';

// Mock product database
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
    currentPrice: 999,
    originalPrice: 1199,
    bestPrice: 899,
    averagePrice: 1099,
    rating: 4.5,
    reviewCount: 1247,
    stores: [
      { name: "Apple Store", price: 999, inStock: true, distance: "0.5 miles", location: "123 Main St" },
      { name: "Best Buy", price: 899, inStock: true, distance: "1.2 miles", location: "456 Oak Ave" },
      { name: "Target", price: 1099, inStock: false, distance: "2.1 miles", location: "789 Pine Rd" },
    ],
    priceHistory: [1199, 1099, 999, 899, 999, 899, 999],
    sustainabilityScore: 75,
    category: "Electronics",
    brand: "Apple",
    barcode: "1234567890123"
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    description: "Premium noise-canceling headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
    currentPrice: 349,
    originalPrice: 399,
    bestPrice: 299,
    averagePrice: 349,
    rating: 4.8,
    reviewCount: 892,
    stores: [
      { name: "Amazon", price: 349, inStock: true, distance: "Online", location: "Online" },
      { name: "Best Buy", price: 299, inStock: true, distance: "1.2 miles", location: "456 Oak Ave" },
      { name: "Walmart", price: 399, inStock: true, distance: "3.5 miles", location: "321 Elm St" },
    ],
    priceHistory: [399, 349, 299, 349, 299, 349, 299],
    sustainabilityScore: 82,
    category: "Electronics",
    brand: "Sony",
    barcode: "1234567890124"
  },
  {
    id: 3,
    name: "MacBook Air M2",
    description: "13-inch laptop with M2 chip",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop",
    currentPrice: 1199,
    originalPrice: 1299,
    bestPrice: 1099,
    averagePrice: 1199,
    rating: 4.7,
    reviewCount: 567,
    stores: [
      { name: "Apple Store", price: 1199, inStock: true, distance: "0.5 miles", location: "123 Main St" },
      { name: "Amazon", price: 1099, inStock: true, distance: "Online", location: "Online" },
      { name: "Best Buy", price: 1199, inStock: false, distance: "1.2 miles", location: "456 Oak Ave" },
    ],
    priceHistory: [1299, 1199, 1099, 1199, 1099, 1199, 1099],
    sustainabilityScore: 88,
    category: "Electronics",
    brand: "Apple",
    barcode: "1234567890125"
  },
  {
    id: 4,
    name: "Nike Air Max 270",
    description: "Comfortable running shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop",
    currentPrice: 150,
    originalPrice: 180,
    bestPrice: 120,
    averagePrice: 150,
    rating: 4.3,
    reviewCount: 2341,
    stores: [
      { name: "Nike Store", price: 150, inStock: true, distance: "0.8 miles", location: "555 Sport Way" },
      { name: "Foot Locker", price: 120, inStock: true, distance: "1.5 miles", location: "777 Athletic Blvd" },
      { name: "Amazon", price: 140, inStock: true, distance: "Online", location: "Online" },
    ],
    priceHistory: [180, 160, 140, 120, 150, 120, 150],
    sustainabilityScore: 65,
    category: "Fashion",
    brand: "Nike",
    barcode: "1234567890126"
  },
  {
    id: 5,
    name: "Samsung 65\" QLED 4K TV",
    description: "Smart TV with Quantum Dot technology",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=200&fit=crop",
    currentPrice: 1299,
    originalPrice: 1599,
    bestPrice: 1199,
    averagePrice: 1399,
    rating: 4.6,
    reviewCount: 892,
    stores: [
      { name: "Best Buy", price: 1299, inStock: true, distance: "1.2 miles", location: "456 Oak Ave" },
      { name: "Amazon", price: 1199, inStock: true, distance: "Online", location: "Online" },
      { name: "Walmart", price: 1399, inStock: true, distance: "3.5 miles", location: "321 Elm St" },
    ],
    priceHistory: [1599, 1499, 1399, 1299, 1199, 1299, 1199],
    sustainabilityScore: 72,
    category: "Electronics",
    brand: "Samsung",
    barcode: "1234567890127"
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sortBy = searchParams.get('sortBy') || 'relevance';

  // Filter products based on search criteria
  let filteredProducts = mockProducts.filter(product => {
    const matchesQuery = query === '' || 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.barcode.includes(query);
    
    const matchesCategory = category === '' || product.category === category;
    const matchesBrand = brand === '' || product.brand === brand;
    const matchesMinPrice = minPrice === '' || product.currentPrice >= parseInt(minPrice);
    const matchesMaxPrice = maxPrice === '' || product.currentPrice <= parseInt(maxPrice);

    return matchesQuery && matchesCategory && matchesBrand && matchesMinPrice && matchesMaxPrice;
  });

  // Sort products
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.currentPrice - b.currentPrice);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.currentPrice - a.currentPrice);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'reviews':
      filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'sustainability':
      filteredProducts.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);
      break;
    default:
      // Relevance sorting (default)
      break;
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
    query,
    filters: { category, brand, minPrice, maxPrice, sortBy }
  });
} 