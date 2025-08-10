import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProps, Product, Store } from '../types';
import { ApiService } from '../services/api';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ navigation, route }: NavigationProps) {
  const { productId } = route.params as { productId: number };
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews' | 'history'>('overview');

  useEffect(() => {
    loadProductDetails();
  }, [productId]);

  const loadProductDetails = async () => {
    try {
      setLoading(true);
      const productData = await ApiService.getProductDetails(productId);
      setProduct(productData);
      if (productData.stores.length > 0) {
        setSelectedStore(productData.stores[0]);
      }
    } catch (error) {
      console.error('Error loading product details:', error);
      // Fallback to mock data
      const mockProducts = ApiService.getMockProducts();
      const mockProduct = mockProducts.find(p => p.id === productId);
      if (mockProduct) {
        setProduct(mockProduct);
        if (mockProduct.stores.length > 0) {
          setSelectedStore(mockProduct.stores[0]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      await ApiService.addToWishlist(productId);
      Alert.alert('Success', 'Product added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      Alert.alert('Error', 'Failed to add to wishlist');
    }
  };

  const handleBuyNow = (store: Store) => {
    Alert.alert(
      'Open Store',
      `Would you like to open ${store.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open', onPress: () => console.log('Opening store:', store.website) }
      ]
    );
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const renderTabButton = (title: string, tab: 'overview' | 'specs' | 'reviews' | 'history') => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[styles.tabButtonText, activeTab === tab && styles.tabButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderStoreCard = (store: Store) => (
    <TouchableOpacity
      key={store.id}
      style={[
        styles.storeCard,
        selectedStore?.id === store.id && styles.storeCardSelected
      ]}
      onPress={() => setSelectedStore(store)}
    >
      <View style={styles.storeHeader}>
        <Text style={styles.storeName}>{store.name}</Text>
        <View style={styles.storeRating}>
          <Ionicons name="star" size={14} color="#ffd700" />
          <Text style={styles.storeRatingText}>{store.rating.toFixed(1)}</Text>
        </View>
      </View>
      
      <View style={styles.storePrice}>
        <Text style={styles.storePriceText}>{formatPrice(store.price)}</Text>
        <View style={styles.storeAvailability}>
          <View style={[
            styles.availabilityDot,
            { backgroundColor: store.availability === 'in-stock' ? '#4CAF50' : '#ff9800' }
          ]} />
          <Text style={styles.availabilityText}>
            {store.availability === 'in-stock' ? 'In Stock' : 'Limited'}
          </Text>
        </View>
      </View>

      <View style={styles.storeDetails}>
        <Text style={styles.storeLocation}>{store.location}</Text>
        <Text style={styles.storeShipping}>{store.shipping}</Text>
      </View>

      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => handleBuyNow(store)}
      >
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0055FE" />
          <Text style={styles.loadingText}>Loading product details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#ff4757" />
          <Text style={styles.errorTitle}>Product not found</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadProductDetails}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.productImage} />

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color="#ffd700" />
              <Text style={styles.ratingText}>
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </Text>
            </View>
            <View style={styles.sustainability}>
              <Ionicons name="leaf" size={16} color="#4CAF50" />
              <Text style={styles.sustainabilityText}>
                {product.sustainabilityScore}% sustainable
              </Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>{formatPrice(product.currentPrice)}</Text>
            {product.originalPrice > product.currentPrice && (
              <Text style={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </Text>
            )}
            {product.priceDrop > 0 && (
              <View style={styles.priceDropBadge}>
                <Text style={styles.priceDropText}>
                  Save ${product.priceDrop.toFixed(2)}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Store Selection */}
        <View style={styles.storesSection}>
          <Text style={styles.sectionTitle}>Available Stores</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storesContainer}
          >
            {product.stores.map(renderStoreCard)}
          </ScrollView>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabButtons}>
            {renderTabButton('Overview', 'overview')}
            {renderTabButton('Specs', 'specs')}
            {renderTabButton('Reviews', 'reviews')}
            {renderTabButton('History', 'history')}
          </View>

          <View style={styles.tabContent}>
            {activeTab === 'overview' && (
              <View style={styles.overviewContent}>
                <Text style={styles.overviewText}>{product.longDescription || product.description}</Text>
              </View>
            )}

            {activeTab === 'specs' && product.specifications && (
              <View style={styles.specsContent}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <View key={key} style={styles.specItem}>
                    <Text style={styles.specKey}>{key}</Text>
                    <Text style={styles.specValue}>{value}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'reviews' && product.reviews && (
              <View style={styles.reviewsContent}>
                {product.reviews.map((review) => (
                  <View key={review.id} style={styles.reviewItem}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewAuthor}>{review.author}</Text>
                      <View style={styles.reviewRating}>
                        {[...Array(5)].map((_, i) => (
                          <Ionicons
                            key={i}
                            name={i < review.rating ? 'star' : 'star-outline'}
                            size={14}
                            color="#ffd700"
                          />
                        ))}
                      </View>
                    </View>
                    <Text style={styles.reviewTitle}>{review.title}</Text>
                    <Text style={styles.reviewContent}>{review.content}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'history' && product.priceHistory && (
              <View style={styles.historyContent}>
                {product.priceHistory.map((point, index) => (
                  <View key={index} style={styles.historyItem}>
                    <Text style={styles.historyDate}>{point.date}</Text>
                    <Text style={styles.historyPrice}>{formatPrice(point.price)}</Text>
                    <Text style={styles.historyStore}>{point.store}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleAddToWishlist}
        >
          <Ionicons name="heart-outline" size={24} color="#ff4757" />
          <Text style={styles.wishlistButtonText}>Wishlist</Text>
        </TouchableOpacity>

        {selectedStore && (
          <TouchableOpacity
            style={styles.buyNowButton}
            onPress={() => handleBuyNow(selectedStore)}
          >
            <Text style={styles.buyNowButtonText}>Buy Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  productImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 16,
    backgroundColor: '#fff',
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  sustainability: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sustainabilityText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0055FE',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  priceDropBadge: {
    backgroundColor: '#ff4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  priceDropText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  storesSection: {
    marginTop: 16,
    backgroundColor: '#fff',
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  storesContainer: {
    paddingHorizontal: 16,
  },
  storeCard: {
    width: 200,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  storeCardSelected: {
    borderColor: '#0055FE',
    backgroundColor: '#fff',
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  storeRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeRatingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  storePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  storePriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0055FE',
  },
  storeAvailability: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  availabilityText: {
    fontSize: 12,
    color: '#666',
  },
  storeDetails: {
    marginBottom: 8,
  },
  storeLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  storeShipping: {
    fontSize: 12,
    color: '#666',
  },
  buyButton: {
    backgroundColor: '#0055FE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabsContainer: {
    backgroundColor: '#fff',
    marginTop: 16,
  },
  tabButtons: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#0055FE',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#0055FE',
    fontWeight: 'bold',
  },
  tabContent: {
    padding: 16,
  },
  overviewContent: {
    // Content styles
  },
  overviewText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  specsContent: {
    // Content styles
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  specKey: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  specValue: {
    fontSize: 14,
    color: '#333',
  },
  reviewsContent: {
    // Content styles
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  reviewContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  historyContent: {
    // Content styles
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
  },
  historyPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0055FE',
  },
  historyStore: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
  },
  wishlistButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff4757',
  },
  wishlistButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#ff4757',
    fontWeight: '600',
  },
  buyNowButton: {
    flex: 2,
    backgroundColor: '#0055FE',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyNowButtonText: {
    fontSize: 16,
    color: '#fff',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#0055FE',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 