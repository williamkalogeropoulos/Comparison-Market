import { NextRequest, NextResponse } from 'next/server';

// Mock product database with detailed information for IDs 1-5
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    description: "Latest iPhone with A17 Pro chip and titanium design",
    longDescription:
      "The iPhone 15 Pro features the A17 Pro chip, the most advanced chip ever in a smartphone. With a titanium design, 48MP main camera, and USB-C connectivity, it's the most powerful iPhone yet.",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=400&fit=crop",
    currentPrice: 999,
    originalPrice: 1199,
    bestPrice: 899,
    averagePrice: 1099,
    rating: 4.5,
    reviewCount: 1247,
    stores: [
      {
        name: "Apple Store",
        price: 999,
        inStock: true,
        distance: "0.5 miles",
        location: "123 Main St",
        rating: 4.8,
        deliveryTime: "Same day pickup",
        returnPolicy: "14 days",
      },
      {
        name: "Best Buy",
        price: 899,
        inStock: true,
        distance: "1.2 miles",
        location: "456 Oak Ave",
        rating: 4.2,
        deliveryTime: "2-3 days",
        returnPolicy: "15 days",
      },
      {
        name: "Target",
        price: 1099,
        inStock: false,
        distance: "2.1 miles",
        location: "789 Pine Rd",
        rating: 4.0,
        deliveryTime: "Out of stock",
        returnPolicy: "90 days",
      },
    ],
    priceHistory: [
      { date: "2024-01-01", price: 1199 },
      { date: "2024-02-01", price: 1099 },
      { date: "2024-03-01", price: 999 },
      { date: "2024-04-01", price: 899 },
      { date: "2024-05-01", price: 999 },
      { date: "2024-06-01", price: 899 },
      { date: "2024-07-01", price: 999 },
    ],
    sustainabilityScore: 75,
    category: "Electronics",
    brand: "Apple",
    barcode: "1234567890123",
    specifications: {
      "Screen Size": "6.1 inches",
      Storage: "128GB, 256GB, 512GB, 1TB",
      Color: "Natural Titanium, Blue Titanium, White Titanium, Black Titanium",
      Chip: "A17 Pro chip",
      Camera: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      Battery: "Up to 23 hours video playback",
    },
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        title: "Excellent phone!",
        comment:
          "The A17 Pro chip is incredibly fast and the camera quality is outstanding.",
        date: "2024-07-15",
        helpful: 23,
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 4,
        title: "Great but expensive",
        comment:
          "Love the titanium design and performance, but it's quite pricey.",
        date: "2024-07-10",
        helpful: 15,
      },
      {
        id: 3,
        user: "Mike R.",
        rating: 5,
        title: "Best iPhone yet",
        comment:
          "The USB-C port is a game changer and the battery life is impressive.",
        date: "2024-07-05",
        helpful: 31,
      },
    ],
    alerts: [
      {
        id: 1,
        type: "price_drop",
        message: "Price dropped by $100 at Best Buy",
        date: "2024-07-20",
      },
      {
        id: 2,
        type: "restock",
        message: "Back in stock at Apple Store",
        date: "2024-07-18",
      },
    ],
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    description: "Premium noise-canceling headphones",
    longDescription:
      "Sony's flagship ANC headphones with industry-leading noise cancellation and comfortable fit.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
    currentPrice: 349,
    originalPrice: 399,
    bestPrice: 299,
    averagePrice: 349,
    rating: 4.8,
    reviewCount: 892,
    stores: [
      {
        name: "Amazon",
        price: 349,
        inStock: true,
        distance: "Online",
        location: "Online",
        rating: 4.7,
        deliveryTime: "2 days",
        returnPolicy: "30 days",
      },
      {
        name: "Best Buy",
        price: 299,
        inStock: true,
        distance: "1.2 miles",
        location: "456 Oak Ave",
        rating: 4.3,
        deliveryTime: "Same day pickup",
        returnPolicy: "15 days",
      },
      {
        name: "Walmart",
        price: 399,
        inStock: true,
        distance: "3.5 miles",
        location: "321 Elm St",
        rating: 4.1,
        deliveryTime: "3-5 days",
        returnPolicy: "30 days",
      },
    ],
    priceHistory: [
      { date: "2024-01-01", price: 399 },
      { date: "2024-02-01", price: 349 },
      { date: "2024-03-01", price: 299 },
      { date: "2024-04-01", price: 349 },
      { date: "2024-05-01", price: 299 },
      { date: "2024-06-01", price: 349 },
      { date: "2024-07-01", price: 299 },
    ],
    sustainabilityScore: 82,
    category: "Electronics",
    brand: "Sony",
    barcode: "1234567890124",
    specifications: {
      "Driver Size": "30mm",
      Battery: "Up to 30 hours",
      Connectivity: "Bluetooth 5.2, USB-C",
      Weight: "250g",
      Colors: "Black, Silver",
    },
    reviews: [],
    alerts: [],
  },
  {
    id: 3,
    name: "MacBook Air M2",
    description: "13-inch laptop with M2 chip",
    longDescription:
      "Apple's ultra-portable laptop with M2 chip delivers excellent performance and battery life.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop",
    currentPrice: 1199,
    originalPrice: 1299,
    bestPrice: 1099,
    averagePrice: 1199,
    rating: 4.7,
    reviewCount: 567,
    stores: [
      {
        name: "Apple Store",
        price: 1199,
        inStock: true,
        distance: "0.5 miles",
        location: "123 Main St",
        rating: 4.8,
        deliveryTime: "Same day pickup",
        returnPolicy: "14 days",
      },
      {
        name: "Amazon",
        price: 1099,
        inStock: true,
        distance: "Online",
        location: "Online",
        rating: 4.6,
        deliveryTime: "2 days",
        returnPolicy: "30 days",
      },
      {
        name: "Best Buy",
        price: 1199,
        inStock: false,
        distance: "1.2 miles",
        location: "456 Oak Ave",
        rating: 4.2,
        deliveryTime: "Out of stock",
        returnPolicy: "15 days",
      },
    ],
    priceHistory: [
      { date: "2024-01-01", price: 1299 },
      { date: "2024-02-01", price: 1199 },
      { date: "2024-03-01", price: 1099 },
      { date: "2024-04-01", price: 1199 },
      { date: "2024-05-01", price: 1099 },
      { date: "2024-06-01", price: 1199 },
      { date: "2024-07-01", price: 1099 },
    ],
    sustainabilityScore: 88,
    category: "Electronics",
    brand: "Apple",
    barcode: "1234567890125",
    specifications: {
      "Screen Size": "13.6 inches",
      Chip: "Apple M2",
      Memory: "8GB, 16GB, 24GB",
      Storage: "256GB, 512GB, 1TB, 2TB",
      Weight: "1.24 kg",
    },
    reviews: [],
    alerts: [],
  },
  {
    id: 4,
    name: "Nike Air Max 270",
    description: "Comfortable running shoes",
    longDescription:
      "Nike Air Max 270 combines comfort and style with a large Air unit for all-day wear.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
    currentPrice: 150,
    originalPrice: 180,
    bestPrice: 120,
    averagePrice: 150,
    rating: 4.3,
    reviewCount: 2341,
    stores: [
      {
        name: "Nike Store",
        price: 150,
        inStock: true,
        distance: "0.8 miles",
        location: "555 Sport Way",
        rating: 4.6,
        deliveryTime: "2-3 days",
        returnPolicy: "60 days",
      },
      {
        name: "Foot Locker",
        price: 120,
        inStock: true,
        distance: "1.5 miles",
        location: "777 Athletic Blvd",
        rating: 4.1,
        deliveryTime: "Same day pickup",
        returnPolicy: "30 days",
      },
      {
        name: "Amazon",
        price: 140,
        inStock: true,
        distance: "Online",
        location: "Online",
        rating: 4.2,
        deliveryTime: "2 days",
        returnPolicy: "30 days",
      },
    ],
    priceHistory: [
      { date: "2024-01-01", price: 180 },
      { date: "2024-02-01", price: 160 },
      { date: "2024-03-01", price: 140 },
      { date: "2024-04-01", price: 120 },
      { date: "2024-05-01", price: 150 },
      { date: "2024-06-01", price: 120 },
      { date: "2024-07-01", price: 150 },
    ],
    sustainabilityScore: 65,
    category: "Fashion",
    brand: "Nike",
    barcode: "1234567890126",
    specifications: {
      Material: "Mesh, Rubber",
      Sizes: "US 6-12",
      Colors: "Multiple",
      Weight: "255g",
    },
    reviews: [],
    alerts: [],
  },
  {
    id: 5,
    name: "Samsung 65\" QLED 4K TV",
    description: "Smart TV with Quantum Dot technology",
    longDescription:
      "Vivid colors and sharp contrast with Samsung's QLED panel and smart TV features.",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop",
    currentPrice: 1299,
    originalPrice: 1599,
    bestPrice: 1199,
    averagePrice: 1399,
    rating: 4.6,
    reviewCount: 892,
    stores: [
      {
        name: "Best Buy",
        price: 1299,
        inStock: true,
        distance: "1.2 miles",
        location: "456 Oak Ave",
        rating: 4.4,
        deliveryTime: "Next day",
        returnPolicy: "15 days",
      },
      {
        name: "Amazon",
        price: 1199,
        inStock: true,
        distance: "Online",
        location: "Online",
        rating: 4.5,
        deliveryTime: "2 days",
        returnPolicy: "30 days",
      },
      {
        name: "Walmart",
        price: 1399,
        inStock: true,
        distance: "3.5 miles",
        location: "321 Elm St",
        rating: 4.0,
        deliveryTime: "2-4 days",
        returnPolicy: "90 days",
      },
    ],
    priceHistory: [
      { date: "2024-01-01", price: 1599 },
      { date: "2024-02-01", price: 1499 },
      { date: "2024-03-01", price: 1399 },
      { date: "2024-04-01", price: 1299 },
      { date: "2024-05-01", price: 1199 },
      { date: "2024-06-01", price: 1299 },
      { date: "2024-07-01", price: 1199 },
    ],
    sustainabilityScore: 72,
    category: "Electronics",
    brand: "Samsung",
    barcode: "1234567890127",
    specifications: {
      Size: "65 inches",
      Resolution: "4K UHD",
      Panel: "QLED",
      HDMI: "4 ports",
      OS: "Tizen",
    },
    reviews: [],
    alerts: [],
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  // Normalize to include fields expected by both web and mobile
  const normalizedStores = product.stores.map((store, index) => ({
    id: index + 1,
    availability: store.inStock ? 'in-stock' : 'out-of-stock',
    website: `https://${store.name.replace(/\s+/g, '').toLowerCase()}.com`,
    shipping: store.deliveryTime?.toLowerCase().includes('day') ? 'Free' : store.deliveryTime || 'Varies',
    reviewCount: Math.floor((store.rating || 4) * 100),
    ...store,
  }));

  const normalizedReviews = (product.reviews || []).map((r) => ({
    author: r.user,
    content: r.comment,
    verified: true,
    ...r,
  }));

  const normalizedPriceHistory = (product.priceHistory || []).map((p) => ({
    store: 'Average',
    ...p,
  }));

  const responseBody = {
    ...product,
    stores: normalizedStores,
    reviews: normalizedReviews,
    priceHistory: normalizedPriceHistory,
  };

  return NextResponse.json(responseBody);
} 