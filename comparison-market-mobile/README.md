# Comparison Market Mobile App

A React Native & Expo mobile application for smart price comparison and shopping. This mobile app complements the web application and provides a native mobile experience for users to search, compare, and track product prices across multiple retailers.

## Features

### Core Features
- **Smart Search Engine**: Search products with filters and sorting options
- **Price History Tracking**: View price trends and historical data
- **Store Availability & Location**: Find nearby stores and check availability
- **User Reviews Aggregation**: Read aggregated reviews from multiple sources
- **Wishlist Management**: Save products and track price changes
- **Personalized Alerts**: Get notified of price drops and deals
- **Comparison Filters**: Filter by price, brand, rating, and sustainability
- **Sustainability Score**: Eco-friendly shopping insights

### Mobile-Specific Features
- **Native Performance**: Optimized for mobile devices
- **Offline Support**: Basic offline functionality with cached data
- **Push Notifications**: Price drop alerts and deal notifications
- **Location Services**: Store locator with GPS integration
- **Camera Integration**: Scan barcodes for quick product lookup
- **Share Functionality**: Share products and deals with friends

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **Icons**: Expo Vector Icons (Ionicons)
- **State Management**: React Hooks
- **API Integration**: RESTful API with fetch
- **Platform**: iOS and Android

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ProductCard.tsx # Product display component
├── screens/            # Screen components
│   ├── HomeScreen.tsx      # Home screen with featured products
│   ├── SearchScreen.tsx    # Search and filter functionality
│   ├── ProductDetailScreen.tsx # Detailed product view
│   ├── WishlistScreen.tsx  # Wishlist management
│   └── ProfileScreen.tsx   # User profile and settings
├── navigation/         # Navigation configuration
│   └── index.tsx       # Main navigation setup
├── services/           # API and external services
│   └── api.ts          # API service functions
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types and interfaces
└── utils/              # Utility functions
```

## Installation

1. **Prerequisites**
   - Node.js (v16 or higher)
   - npm or yarn
   - Expo CLI: `npm install -g @expo/cli`

2. **Clone and Install**
   ```bash
   cd comparison-market-mobile
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Run on Device/Simulator**
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

## Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run build` - Build for production

### API Integration

The mobile app connects to the same API endpoints as the web application:

- `GET /api/search` - Search products with filters
- `GET /api/products/[id]` - Get product details
- `GET /api/user/wishlist` - Get user wishlist
- `POST /api/user/wishlist` - Add to wishlist
- `DELETE /api/user/wishlist` - Remove from wishlist

### Environment Configuration

Create a `.env` file in the root directory:

```env
API_BASE_URL=http://localhost:3000/api
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

## Key Components

### Navigation Structure

The app uses a bottom tab navigation with the following tabs:

1. **Home** - Featured products, deals, and quick actions
2. **Search** - Product search with filters
3. **Wishlist** - Saved products and price tracking
4. **Profile** - User account and settings

### ProductCard Component

A reusable component for displaying products with:
- Product image and basic info
- Price comparison and savings
- Rating and sustainability score
- Wishlist integration
- Store availability

### API Service

Centralized API service with:
- Error handling and fallbacks
- Mock data for development
- Type-safe API calls
- Request/response caching

## Design System

### Colors
- **Primary**: #0055FE (Blue)
- **Secondary**: #ff4757 (Red)
- **Success**: #4CAF50 (Green)
- **Warning**: #ff9800 (Orange)
- **Background**: #f8f9fa (Light Gray)
- **Text**: #333 (Dark Gray)

### Typography
- **Headings**: Bold, 18-24px
- **Body**: Regular, 14-16px
- **Captions**: Light, 12-14px

### Spacing
- **Small**: 8px
- **Medium**: 16px
- **Large**: 24px
- **Extra Large**: 32px

## Performance Optimizations

- **Image Optimization**: Lazy loading and caching
- **List Performance**: FlatList with proper key extraction
- **Memory Management**: Proper component cleanup
- **Network**: Request caching and error handling

## Testing

### Manual Testing Checklist

- [ ] App launches without errors
- [ ] Navigation between screens works
- [ ] Search functionality works
- [ ] Product details load correctly
- [ ] Wishlist add/remove works
- [ ] Profile screen displays correctly
- [ ] Offline functionality works
- [ ] Performance is smooth

### Automated Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Deployment

### Building for Production

1. **Configure app.json**
   ```json
   {
     "expo": {
       "name": "Comparison Market",
       "slug": "comparison-market",
       "version": "1.0.0",
       "platforms": ["ios", "android"],
       "icon": "./assets/icon.png",
       "splash": {
         "image": "./assets/splash.png",
         "resizeMode": "contain",
         "backgroundColor": "#0055FE"
       }
     }
   }
   ```

2. **Build for Platforms**
   ```bash
   # iOS
   expo build:ios

   # Android
   expo build:android
   ```

### App Store Deployment

1. **iOS App Store**
   - Build with Expo Application Services (EAS)
   - Submit through App Store Connect

2. **Google Play Store**
   - Build with EAS
   - Submit through Google Play Console

## Future Enhancements

### Planned Features
- **Push Notifications**: Price drop alerts
- **Barcode Scanner**: Quick product lookup
- **AR Product Preview**: Virtual try-on
- **Social Features**: Share deals and reviews
- **Advanced Analytics**: Shopping insights
- **Voice Search**: Hands-free product search

### Technical Improvements
- **State Management**: Redux or Zustand
- **Offline Database**: SQLite or Realm
- **Performance**: React Native Reanimated
- **Testing**: Jest and Detox
- **CI/CD**: Automated testing and deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Comparison Market Mobile App** - Smart shopping made simple. 