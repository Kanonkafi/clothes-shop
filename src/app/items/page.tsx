'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

// Mock product data with your provided images in /assets/ folder
const mockProducts = [
  {
    id: 1,
    name: 'Silk Evening Gown',
    price: 599,
    category: 'Evening Wear',
    image: '/assets/SilkEvening Gown.jpg',
    description: 'An elegant silk evening gown perfect for formal events.',
    specifications: {
      material: '100% Pure Silk',
      color: 'Deep Black',
      size: 'S, M, L, XL',
      care: 'Dry Clean Only'
    }
  },
  {
    id: 2,
    name: 'Cashmere Sweater',
    price: 299,
    category: 'Winter Collection',
    image: '/assets/CashmereSweater.jpg',
    description: 'Luxurious cashmere sweater for cold winter days.',
    specifications: {
      material: '100% Cashmere',
      color: 'Slate Gray',
      size: 'S, M, L',
      care: 'Hand Wash Cold'
    }
  },
  {
    id: 3,
    name: 'Leather Jacket',
    price: 499,
    category: 'Outerwear',
    image: '/assets/LeatherJacket.webp',
    description: 'Stylish leather jacket with premium finish.',
    specifications: {
      material: 'Genuine Leather',
      color: 'Black',
      size: 'S, M, L, XL',
      care: 'Professional Leather Cleaning'
    }
  },
  {
    id: 4,
    name: 'Linen Suit',
    price: 799,
    category: 'Business',
    image: '/assets/LinenSuit.jpg',
    description: 'Elegant linen suit for business meetings.',
    specifications: {
      material: '100% Linen',
      color: 'Navy Blue',
      size: '38, 40, 42, 44',
      care: 'Dry Clean Only'
    }
  },
  {
    id: 5,
    name: 'Velvet Blazer',
    price: 649,
    category: 'Business',
    image: '/assets/VelvetBlazer.jpg',
    description: 'Luxurious velvet blazer for special occasions.',
    specifications: {
      material: 'Premium Velvet',
      color: 'Burgundy',
      size: '36, 38, 40, 42',
      care: 'Dry Clean Only'
    }
  },
  {
    id: 6,
    name: 'Wool Coat',
    price: 899,
    category: 'Outerwear',
    image: '/assets/WoolCoat.webp',
    description: 'Warm wool coat for winter season.',
    specifications: {
      material: '100% Merino Wool',
      color: 'Charcoal',
      size: 'S, M, L, XL',
      care: 'Dry Clean Only'
    }
  }
];

// Product Card Component
const ProductCard = ({ product }: { product: typeof mockProducts[0] }) => {
  const { addToWishlist, isInWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToWishlist = () => {
    addToWishlist(product);
    // Remove toast notification since CartContext handles it
  };

  return (
    <motion.div
      className="glass glass-border rounded-lg overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        
        {/* Quick View Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href={`/items/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gold text-primary-black font-medium rounded-sm hover:bg-[#b8972c] transition-colors"
            >
              Quick View
            </motion.button>
          </Link>
        </motion.div>
      </div>
      
      <div className="p-6">
        <span className="text-gold text-sm">{product.category}</span>
        <h3 className="text-lg font-semibold text-white mt-2 mb-1">{product.name}</h3>
        <p className="text-gold font-medium">${product.price}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <Link href={`/items/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-2 text-gold hover:text-white transition-colors duration-300 text-sm"
            >
              View Details
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToWishlist}
            className={`p-2 border text-gold transition-colors duration-300 rounded-sm ${
              isInWishlist(product.id) 
                ? 'bg-gold text-primary-black border-gold' 
                : 'border-gold hover:bg-gold hover:text-primary-black'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default function ItemsPage() {
  const [products, setProducts] = useState<typeof mockProducts>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      // In a real app, this would be an API call
      // const res = await fetch('/api/products');
      // const data = await res.json();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

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
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Collection
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-gray max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover our premium selection of luxury apparel
          </motion.p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-gray">No products available at the moment.</p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}