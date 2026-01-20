'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, LogOut, User, PlusCircle, ShoppingCart, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const { getCartCount, getWishlistCount } = useCart();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect to handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect to check auth status on mount
  useEffect(() => {
    // Function to check authentication status
    const checkAuthStatus = () => {
      if (typeof window !== 'undefined') {
        const cookies = document.cookie.split('; ');
        const authCookie = cookies.find(cookie => cookie.startsWith('auth-token='));
        return !!authCookie;
      }
      return false;
    };

    // Set initial auth status
    setIsAuthenticated(() => checkAuthStatus());
  }, []);

  // Effect to set up polling for auth status changes
  useEffect(() => {
    // Function to check authentication status
    const checkAuthStatus = () => {
      if (typeof window !== 'undefined') {
        const cookies = document.cookie.split('; ');
        const authCookie = cookies.find(cookie => cookie.startsWith('auth-token='));
        return !!authCookie;
      }
      return false;
    };

    // Set up polling for auth status changes
    let intervalId: NodeJS.Timeout;

    const startPolling = () => {
      intervalId = setInterval(() => {
        const currentAuthStatus = checkAuthStatus();
        if (currentAuthStatus !== isAuthenticated) {
          setIsAuthenticated(currentAuthStatus);
        }
      }, 500); // Check every 500ms
    };

    startPolling();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    // Remove auth token
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    setIsAuthenticated(false);
    router.push('/login');
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass glass-border py-3 backdrop-blur-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <div className="w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-full h-full">
                  <rect width="32" height="32" rx="8" fill="#0a0a0a"/>
                  <path d="M10 8 L10 24 L22 24" 
                        stroke="#D4AF37" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        fill="none"/>
                  <circle cx="24" cy="12" r="2" fill="#D4AF37"/>
                </svg>
              </div>
            </motion.div>
            <motion.span
              className="text-2xl font-bold text-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              LUXE
            </motion.span>
            <motion.div
              className="h-1 w-8 bg-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <motion.span
              className="text-lg text-slate-gray"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              COLLECTION
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-slate-gray hover:text-gold transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
            
            {/* Add Item Link - Only show when authenticated */}
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/add-item"
                  className="text-slate-gray hover:text-gold transition-colors duration-300 flex items-center space-x-1"
                >
                  <PlusCircle size={16} />
                  <span>Add Item</span>
                </Link>
              </motion.div>
            )}
            
            {/* Authentication Button */}
            {isAuthenticated ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={handleLogout}
                  className="text-slate-gray hover:text-gold transition-colors duration-300 flex items-center space-x-1"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/login"
                  className="text-slate-gray hover:text-gold transition-colors duration-300 flex items-center space-x-1"
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/consultation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-primary-black transition-colors duration-300 rounded-sm"
              >
                Book Consultation
              </motion.button>
            </Link>
          </div>

          {/* Cart and Wishlist Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/wishlist" className="relative text-slate-gray hover:text-gold transition-colors">
              <Heart size={20} />
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-primary-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative text-slate-gray hover:text-gold transition-colors">
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-primary-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-gray focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 glass glass-border rounded-lg overflow-hidden"
          >
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-gray hover:text-gold py-2 px-4 rounded transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Add Item Link - Only show when authenticated */}
              {isAuthenticated && (
                <Link
                  href="/add-item"
                  className="text-slate-gray hover:text-gold py-2 px-4 rounded transition-colors duration-300 flex items-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PlusCircle size={16} />
                  <span>Add Item</span>
                </Link>
              )}
              
              {/* Mobile Auth Button */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-slate-gray hover:text-gold py-2 px-4 rounded transition-colors duration-300 flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-slate-gray hover:text-gold py-2 px-4 rounded transition-colors duration-300 flex items-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
              )}
              
              <Link href="/consultation">
                <button 
                  className="w-full py-2 border border-gold text-gold hover:bg-gold hover:text-primary-black transition-colors duration-300 rounded-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Consultation
                </button>
              </Link>
              
              {/* Mobile Cart and Wishlist Icons */}
              <div className="flex justify-around py-2">
                <Link href="/wishlist" className="flex items-center space-x-2 text-slate-gray hover:text-gold transition-colors">
                  <Heart size={20} />
                  <span>Wishlist</span>
                  {getWishlistCount() > 0 && (
                    <span className="bg-gold text-primary-black text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                      {getWishlistCount()}
                    </span>
                  )}
                </Link>
                <Link href="/cart" className="flex items-center space-x-2 text-slate-gray hover:text-gold transition-colors">
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                  {getCartCount() > 0 && (
                    <span className="bg-gold text-primary-black text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;