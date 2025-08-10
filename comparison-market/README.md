# Comparison Market

A modern, intelligent price comparison platform that helps users find the best deals, track price history, and make informed purchasing decisions.

## 🚀 Features

### Core Functionality
- **Smart Search Engine**: Search by product name, brand, or barcode
- **Price History Tracking**: Visual representation of price changes over time
- **Store Availability**: Find products at local stores with real-time inventory
- **Aggregated Reviews**: Consolidated reviews from multiple platforms
- **Price Alerts**: Get notified when prices drop to your target
- **Sustainability Scoring**: Make environmentally conscious decisions

### Advanced Features
- **Price Analytics**: Historical data and trend predictions
- **Store Locator**: Find nearby stores with Google Maps integration
- **Wishlist Management**: Save and track your desired products
- **Cross-Platform Sync**: Access your data across all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Custom CSS animations and transitions

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/comparison-market.git
   cd comparison-market
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
comparison-market/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and animations
│   │   ├── layout.tsx           # Root layout component
│   │   ├── page.tsx             # Home page
│   │   └── search/
│   │       └── page.tsx         # Search results page
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── navigation.tsx       # Main navigation
│   │   ├── hero-section.tsx     # Hero section
│   │   ├── feature-showcase.tsx # Feature showcase
│   │   ├── dark-features.tsx    # Dark theme features
│   │   └── footer.tsx           # Footer component
│   └── lib/
│       └── utils.ts             # Utility functions
├── public/                      # Static assets
├── components.json              # shadcn/ui configuration
└── package.json                 # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#0055FE` - Brand color for CTAs and highlights
- **Neutral Grays**: `zinc-200` to `zinc-900` - Text and backgrounds
- **Dark Theme**: `#181B20` and `#1D2025` - Dark mode backgrounds
- **Accent Colors**: Green for success, yellow for ratings, red for alerts

### Typography
- **Font**: Inter (Google Fonts)
- **Sizes**: Responsive scale from `text-xs` to `text-7xl`
- **Weights**: 400 (normal), 500 (medium), 600 (semibold)

### Components
All UI components are built using shadcn/ui for consistency and accessibility:
- Buttons, Cards, Forms, Navigation, Dialogs
- Badges, Avatars, Dropdowns, Sheets, Tabs

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **CSS Optimization**: Tailwind CSS purging and minification
- **Animation Performance**: GPU-accelerated transforms and opacity changes

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Adding New Components

1. **Install shadcn/ui components**
   ```bash
   npx shadcn@latest add [component-name]
   ```

2. **Create custom components**
   ```bash
   # Create in src/components/
   touch src/components/my-component.tsx
   ```

## 🎯 Key Features Implementation

### 1. Smart Search
- Real-time search suggestions
- Barcode scanning capability
- Product name and brand matching

### 2. Price Tracking
- Historical price charts
- Price drop alerts
- Best price recommendations

### 3. Store Integration
- Real-time inventory checking
- Store locator with distance
- In-store pickup options

### 4. Review Aggregation
- Multi-platform review collection
- Sentiment analysis
- Verified purchase badges

## 🔮 Future Enhancements

### Phase 2 Features
- **Mobile App**: React Native implementation
- **AI Recommendations**: Machine learning for personalized suggestions
- **Social Features**: Share deals and create shopping lists
- **Advanced Analytics**: Premium insights and market trends

### Phase 3 Features
- **AR Product Visualization**: Try products virtually
- **Voice Search**: Hands-free product search
- **Blockchain Integration**: Transparent supply chain tracking
- **International Expansion**: Multi-language and currency support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first styling
- **Lucide** for the comprehensive icon set
- **Next.js** for the amazing React framework

---

Built with ❤️ for smart shoppers everywhere.
