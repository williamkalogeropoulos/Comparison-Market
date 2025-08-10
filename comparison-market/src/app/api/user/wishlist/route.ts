import { NextRequest, NextResponse } from 'next/server';

// Mock user database
const mockUsers = {
  "user123": {
    id: "user123",
    email: "user@example.com",
    name: "John Doe",
    wishlist: [
      {
        productId: 1,
        addedAt: "2024-07-20T10:30:00Z",
        priceWhenAdded: 999,
        currentPrice: 999,
        priceDrop: 0
      },
      {
        productId: 2,
        addedAt: "2024-07-15T14:20:00Z",
        priceWhenAdded: 399,
        currentPrice: 349,
        priceDrop: 50
      }
    ],
    alerts: [
      {
        id: 1,
        productId: 1,
        type: "price_drop",
        targetPrice: 899,
        active: true
      }
    ]
  }
};

export async function GET(request: NextRequest) {
  const userId = request.headers.get('user-id') || 'user123';
  const user = mockUsers[userId as keyof typeof mockUsers];

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return NextResponse.json({
    wishlist: user.wishlist,
    total: user.wishlist.length
  });
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get('user-id') || 'user123';
  const user = mockUsers[userId as keyof typeof mockUsers];

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  const body = await request.json();
  const { productId } = body;

  if (!productId) {
    return NextResponse.json(
      { error: 'Product ID is required' },
      { status: 400 }
    );
  }

  // Check if product is already in wishlist
  const existingItem = user.wishlist.find(item => item.productId === productId);
  if (existingItem) {
    return NextResponse.json(
      { error: 'Product already in wishlist' },
      { status: 409 }
    );
  }

  // Mock product data for price
  const mockProductPrices = {
    1: 999,
    2: 349,
    3: 1199,
    4: 150,
    5: 1299
  };

  const newWishlistItem = {
    productId,
    addedAt: new Date().toISOString(),
    priceWhenAdded: mockProductPrices[productId as keyof typeof mockProductPrices] || 0,
    currentPrice: mockProductPrices[productId as keyof typeof mockProductPrices] || 0,
    priceDrop: 0
  };

  user.wishlist.push(newWishlistItem);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return NextResponse.json({
    message: 'Product added to wishlist',
    item: newWishlistItem
  });
}

export async function DELETE(request: NextRequest) {
  const userId = request.headers.get('user-id') || 'user123';
  const user = mockUsers[userId as keyof typeof mockUsers];

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json(
      { error: 'Product ID is required' },
      { status: 400 }
    );
  }

  const initialLength = user.wishlist.length;
  user.wishlist = user.wishlist.filter(item => item.productId !== parseInt(productId));

  if (user.wishlist.length === initialLength) {
    return NextResponse.json(
      { error: 'Product not found in wishlist' },
      { status: 404 }
    );
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return NextResponse.json({
    message: 'Product removed from wishlist'
  });
} 