import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onWishlistPress?: (productId: number) => void;
  isInWishlist?: boolean;
}

const { width } = Dimensions.get('window');

export default function ProductCard({
  product,
  onPress,
  onWishlistPress,
  isInWishlist = false,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const getPriceDropText = (priceDrop: number) => {
    if (priceDrop <= 0) return '';
    return `Save $${priceDrop.toFixed(2)}`;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(product)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        {product.priceDrop > 0 && (
          <View style={styles.priceDropBadge}>
            <Text style={styles.priceDropText}>
              {getPriceDropText(product.priceDrop)}
            </Text>
          </View>
        )}
        {onWishlistPress && (
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() => onWishlistPress(product.id)}
          >
            <Ionicons
              name={isInWishlist ? 'heart' : 'heart-outline'}
              size={20}
              color={isInWishlist ? '#ff4757' : '#666'}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>
            {formatPrice(product.currentPrice)}
          </Text>
          {product.originalPrice > product.currentPrice && (
            <Text style={styles.originalPrice}>
              {formatPrice(product.originalPrice)}
            </Text>
          )}
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#ffd700" />
            <Text style={styles.ratingText}>
              {product.rating.toFixed(1)} ({product.reviewCount})
            </Text>
          </View>
          <View style={styles.sustainability}>
            <Ionicons name="leaf" size={14} color="#4CAF50" />
            <Text style={styles.sustainabilityText}>
              {product.sustainabilityScore}%
            </Text>
          </View>
        </View>

        <View style={styles.storeInfo}>
          <Text style={styles.storeCount}>
            {product.stores.length} store{product.stores.length !== 1 ? 's' : ''}
          </Text>
          <Text style={styles.bestPrice}>
            Best: {formatPrice(product.bestPrice)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  priceDropBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ff4757',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceDropText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  brand: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0055FE',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  sustainability: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sustainabilityText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 4,
  },
  storeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeCount: {
    fontSize: 12,
    color: '#666',
  },
  bestPrice: {
    fontSize: 12,
    color: '#0055FE',
    fontWeight: '600',
  },
}); 