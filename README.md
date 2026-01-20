# LUXE COLLECTION - Luxury Fashion E-commerce Platform

A premium, production-ready e-commerce platform built with Next.js 15, featuring a minimalist luxury design aesthetic with glassmorphic UI elements.

## 🌟 Features

### Core Functionality
- **Authentication System**: Secure login/logout with cookie-based sessions
- **Protected Routes**: Admin dashboard and management pages with middleware protection
- **Shopping Cart**: Full cart functionality with localStorage persistence
- **Wishlist**: Save favorite items with persistent storage
- **Product Catalog**: Responsive product listings with filtering capabilities
- **Individual Product Pages**: Detailed product views with specifications
- **Collection Pages**: Curated fashion collections with category filtering
- **Consultation Booking**: Professional styling consultation scheduling

### UI/UX Features
- **Glassmorphic Design**: Modern frosted glass effect UI components
- **Smooth Animations**: Framer Motion powered page transitions and interactions
- **Responsive Layout**: Mobile-first design that works on all devices
- **Toast Notifications**: react-hot-toast for elegant success/error messaging
- **Dark Theme**: Sophisticated black/gold luxury color scheme
- **Typography**: Custom font stack with Geist and Inter fonts

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cloths-shop/clothes-shop
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🗺️ Route Structure

```
/
├── /                    # Homepage (Landing page with hero section)
├── /shop               # Product catalog with filtering
├── /collections        # Curated fashion collections
├── /items              # All products listing
├── /items/[id]         # Individual product details
├── /about              # Company information
├── /contact            # Contact page
├── /login              # Authentication (Demo: admin@luxecollection.com / luxury123)
├── /consultation       # Styling consultation booking
├── /cart               # Shopping cart management
├── /wishlist           # Saved items wishlist
├── /add-item           # Protected: Add new products (requires login)
├── /dashboard          # Protected: Admin dashboard (requires login)
└── /admin              # Protected: System administration (requires login)
```

## 🔐 Authentication

### Demo Credentials
- **Email**: `admin@luxecollection.com`
- **Password**: `luxury123`

### Protected Routes
The following routes require authentication:
- `/add-item` - Add new products to inventory
- `/dashboard` - Administrative dashboard with analytics
- `/admin` - System administration panel

Middleware automatically redirects unauthenticated users to the login page.

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript development
- **React 18** - Component-based UI library

### Styling & Design
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful SVG icon library

### State Management & Utilities
- **React Context API** - Application state management
- **react-hot-toast** - Elegant toast notifications
- **Cookies** - Client-side session management

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization

## 🎨 Design System

### Color Palette
```css
--primary-black: #000000
--slate-gray: #718096
--gold: #d4af37
--gold-hover: #b8972c
```

### Typography
- **Primary Font**: Geist Sans
- **Monospace**: Geist Mono
- **Body Text**: Inter

### UI Components
- **Glass Cards**: Frosted glass effect with borders
- **Animated Transitions**: Smooth hover and interaction effects
- **Responsive Grids**: Flexible layouts for all screen sizes

## 📱 Responsive Breakpoints

- **Mobile**: 0px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_NAME=LUXE COLLECTION
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Customization Options
- Modify color scheme in `tailwind.config.js`
- Adjust animation durations in component files
- Update typography in global CSS
- Customize toast notification styles in `layout.tsx`

## 🚨 Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
taskkill /PID <process_id> /F

# Or use a different port
npm run dev -- -p 3001
```

### Hydration Errors
The project includes proper hydration handling in the Navbar component. If you encounter issues:
1. Ensure all client components have `'use client'` directive
2. Check for server/client rendering mismatches

### Image Loading Issues
Placeholder images are used throughout the application. In production:
1. Replace with actual product images
2. Optimize images for web delivery
3. Consider using Next.js Image component optimizations

## 📈 Performance Optimizations

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Built-in Next.js image optimization
- **Font Optimization**: Preloaded Google Fonts
- **Bundle Analysis**: Use `@next/bundle-analyzer` for detailed insights

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for LUXE COLLECTION.

## 🆘 Support

For technical support or questions, please contact:
- **Email**: support@luxecollection.com
- **Phone**: +1 (555) 123-4567

---

**Built with ❤️ for luxury fashion**