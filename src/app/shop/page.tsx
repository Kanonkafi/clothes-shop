'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

// Mock product data with your provided images in /assets/ folder
const mockProducts = [
  {
    id: 1,
    name: 'Silk Evening Gown',
    price: 599,
    category: 'Evening Wear',
    categoryId: 'evening-wear',
    image: '/assets/SilkEvening Gown.jpg',
    description: 'An elegant silk evening gown perfect for formal events.'
  },
  {
    id: 2,
    name: 'Cashmere Sweater',
    price: 299,
    category: 'Winter Collection',
    categoryId: 'winter-collection',
    image: '/assets/CashmereSweater.jpg',
    description: 'Luxurious cashmere sweater for cold winter days.'
  },
  {
    id: 3,
    name: 'Leather Jacket',
    price: 499,
    category: 'Outerwear',
    categoryId: 'outerwear',
    image: '/assets/LeatherJacket.webp',
    description: 'Stylish leather jacket with premium finish.'
  },
  {
    id: 4,
    name: 'Linen Suit',
    price: 799,
    category: 'Business',
    categoryId: 'business',
    image: '/assets/LinenSuit.jpg',
    description: 'Elegant linen suit for business meetings.'
  },
  {
    id: 5,
    name: 'Velvet Blazer',
    price: 649,
    category: 'Business',
    categoryId: 'business',
    image: '/assets/VelvetBlazer.jpg',
    description: 'Luxurious velvet blazer for special occasions.'
  },
  {
    id: 6,
    name: 'Wool Coat',
    price: 899,
    category: 'Outerwear',
    categoryId: 'outerwear',
    image: '/assets/WoolCoat.webp',
    description: 'Warm wool coat for winter season.'
  }
];

export default function ShopPage() {
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useCart();
  const [products, setProducts] = useState<typeof mockProducts>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<typeof mockProducts>([]);
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      // In a real app, this would be an API call
      // const res = await fetch('/api/products');
      // const data = await res.json();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProducts(mockProducts);
      
      // Apply category filter if present
      if (categoryFilter) {
        const filtered = mockProducts.filter(product => 
          product.categoryId === categoryFilter
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(mockProducts);
      }
      
      setLoading(false);
    };

    fetchProducts();
  }, [categoryFilter]);

  const clearFilters = () => {
    setFilteredProducts(products);
    // In a real app, you'd update the URL to remove the category parameter
  };

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addToCart(product);
    // Remove toast notification since CartContext handles it
  };

  const handleAddToWishlist = (product: typeof mockProducts[0]) => {
    addToWishlist(product);
    // Remove toast notification since CartContext handles it
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mb-4"></div>
          <p className="text-slate-gray">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {categoryFilter ? `${categoryFilter.replace('-', ' ')} Collection` : 'Our Collection'}
          </h1>
          
          <p className="text-xl text-slate-gray max-w-2xl mx-auto mb-6">
            {categoryFilter 
              ? `Discover our premium ${categoryFilter.replace('-', ' ')} selection`
              : 'Discover our premium selection of luxury apparel crafted with the finest materials'
            }
          </p>
          
          {categoryFilter && (
            <button 
              onClick={clearFilters}
              className="mb-8 px-4 py-2 border border-slate-gray/30 text-slate-gray hover:border-gold hover:text-gold transition-colors rounded-sm"
            >
              Clear Filters
            </button>
          )}
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-gray text-xl">No products found in this category.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 px-6 py-3 bg-gold text-primary-black font-medium rounded-sm hover:bg-[#b8972c] transition-colors"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass glass-border rounded-lg overflow-hidden group"
                >
                  <div className="h-64 bg-gradient-to-br from-slate-gray/10 to-gold/10 flex items-center justify-center overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-gold text-sm">{product.category}</span>
                      <button 
                        onClick={() => handleAddToWishlist(product)}
                        className={`p-2 border text-gold transition-colors duration-300 rounded-sm ${
                          isInWishlist(product.id) 
                            ? 'bg-gold text-primary-black border-gold' 
                            : 'border-gold hover:bg-gold hover:text-primary-black'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                    <p className="text-slate-gray text-sm mb-4 line-clamp-2">{product.description}</p>
                    <p className="text-gold font-medium text-xl mb-4">${product.price}</p>
                    
                    <div className="flex justify-between items-center">
                      <Link href={`/items/${product.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="py-2 text-gold hover:text-white transition-colors duration-300 text-sm font-medium"
                        >
                          View Details →
                        </motion.button>
                      </Link>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        className={`px-4 py-2 font-medium rounded-sm transition-colors duration-300 text-sm ${
                          isInCart(product.id)
                            ? 'bg-slate-gray text-white'
                            : 'bg-gold text-primary-black hover:bg-[#b8972c]'
                        }`}
                      >
                        {isInCart(product.id) ? 'Added!' : 'Add to Cart'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}