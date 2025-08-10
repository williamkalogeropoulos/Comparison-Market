import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps, Product, WishlistItem } from '../types';
import ProductCard from '../components/ProductCard';
import { ApiService } from '../services/api';

export default function WishlistScreen({ navigation }: NavigationProps) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const userData = await ApiService.getWishlist();
      setWishlistItems(userData.wishlist);

      // Load product details for each wishlist item
      const productDetails: Record<number, Product> = {};
      for (const item of userData.wishlist) {
        try {
          const product = await ApiService.getProductDetails(item.productId);
          productDetails[item.productId] = product;
        } catch (error) {
          console.error(`Error loading product ${item.productId}:`, error);
          // Fallback to mock data
          const mockProducts = ApiService.getMockProducts();
          const mockProduct = mockProducts.find(p => p.id === item.productId);
          if (mockProduct) {
            productDetails[item.productId] = mockProduct;
          }
        }
      }
      setProducts(productDetails);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      // Fallback to mock data
      const mockWishlist: WishlistItem[] = [
        { productId: 1, addedAt: '2024-01-15' },
        { productId: 2, addedAt: '2024-01-10' },
      ];
      setWishlistItems(mockWishlist);
      
      const mockProducts = ApiService.getMockProducts();
      const productDetails: Record<number, Product> = {};
      mockProducts.forEach(product => {
        if (mockWishlist.some(item => item.productId === product.id)) {
          productDetails[product.id] = product;
        }
      });
      setProducts(productDetails);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: number) => {
    Alert.alert(
      'Remove from Wishlist',
      'Are you sure you want to remove this item from your wishlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await ApiService.removeFromWishlist(productId);
              setWishlistItems(prev => prev.filter(item => item.productId !== productId));
              const newProducts = { ...products };
              delete newProducts[productId];
              setProducts(newProducts);
              Alert.alert('Success', 'Item removed from wishlist');
            } catch (error) {
              console.error('Error removing from wishlist:', error);
              Alert.alert('Error', 'Failed to remove from wishlist');
            }
          },
        },
      ]
    );
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const getPriceChangeIcon = (priceDrop: number) => {
    if (priceDrop > 0) {
      return 'trending-down';
    } else if (priceDrop < 0) {
      return 'trending-up';
    }
    return 'remove';
  };

  const getPriceChangeText = (priceDrop: number) => {
    if (priceDrop > 0) {
      return `Price dropped by $${Math.abs(priceDrop).toFixed(2)}`;
    } else if (priceDrop < 0) {
      return `Price increased by $${Math.abs(priceDrop).toFixed(2)}`;
    }
    return 'No price change';
  };

  const renderWishlistItem = ({ item }: { item: WishlistItem }) => {
    const product = products[item.productId];
    
    if (!product) {
      return null;
    }

    return (
      <View style={styles.wishlistItem}>
        <ProductCard
          product={product}
          onPress={handleProductPress}
          onWishlistPress={handleRemoveFromWishlist}
          isInWishlist={true}
        />
        
        <View style={styles.priceChangeContainer}>
          <View style={styles.priceChangeInfo}>
            <Ionicons
              name={getPriceChangeIcon(product.priceDrop) as any}
              size={16}
              color={product.priceDrop > 0 ? '#4CAF50' : product.priceDrop < 0 ? '#ff4757' : '#666'}
            />
            <Text style={[
              styles.priceChangeText,
              { color: product.priceDrop > 0 ? '#4CAF50' : product.priceDrop < 0 ? '#ff4757' : '#666' }
            ]}>
              {getPriceChangeText(product.priceDrop)}
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveFromWishlist(product.id)}
          >
            <Ionicons name="trash-outline" size={20} color="#ff4757" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
      <Text style={styles.emptySubtitle}>
        Start adding products to your wishlist to track prices and get alerts
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.browseButtonText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0055FE" />
          <Text style={styles.loadingText}>Loading your wishlist...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Wishlist</Text>
        <Text style={styles.subtitle}>
          {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {wishlistItems.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={wishlistItems}
          renderItem={renderWishlistItem}
          keyExtractor={(item) => item.productId.toString()}
          contentContainerStyle={styles.wishlistList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  wishlistList: {
    paddingVertical: 8,
  },
  wishlistItem: {
    marginBottom: 16,
  },
  priceChangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  priceChangeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceChangeText: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#0055FE',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
}); 