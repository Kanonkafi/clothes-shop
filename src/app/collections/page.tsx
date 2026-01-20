'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CollectionsPage() {
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useCart();
  
  const collections = [
    {
      id: 1,
      title: 'Evening Collection',
      description: 'Elegant gowns and formal wear for special occasions',
      image: '/assets/EveningWear.png',
      category: 'evening-wear'
    },
    {
      id: 2,
      title: 'Winter Essentials',
      description: 'Premium outerwear and cozy knits for cold seasons',
      image: '/assets/WinterEssentials.jpg',
      category: 'winter-collection'
    },
    {
      id: 3,
      title: 'Business Attire',
      description: 'Sophisticated suits and professional wear',
      image: '/assets/BusinessAttire.jpg',
      category: 'business'
    },
    {
      id: 4,
      title: 'Summer Luxe',
      description: 'Lightweight fabrics and breezy designs',
      image: '/assets/SummerLuxe.webp',
      category: 'summer'
    }
  ];

  const limitedEditionPieces = [
    {
      id: 1,
      name: 'Limited Edition Tuxedo',
      price: 1200,
      image: '/assets/SilkEvening Gown.jpg',
      description: 'Handcrafted tuxedo with exclusive details'
    },
    {
      id: 2,
      name: 'Artisanal Leather Boots',
      price: 750,
      image: '/assets/LeatherJacket.webp',
      description: 'Premium leather boots made by master craftsmen'
    },
    {
      id: 3,
      name: 'Silk Scarf Collection',
      price: 350,
      image: '/assets/VelvetBlazer.jpg',
      description: 'Limited edition silk scarves with unique patterns'
    }
  ];

  const handleAddToCart = (product: typeof limitedEditionPieces[0]) => {
    // Create a product object that matches the expected format
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: 'Limited Edition',
      image: product.image,
      description: product.description
    };
    
    addToCart(cartProduct);
    // Remove toast notification since CartContext handles it
  };

  const handleAddToWishlist = (product: typeof limitedEditionPieces[0]) => {
    // Create a product object that matches the expected format
    const wishlistProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: 'Limited Edition',
      image: product.image,
      description: product.description
    };
    
    addToWishlist(wishlistProduct);
    // Remove toast notification since CartContext handles it
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Collections</h1>
          <p className="text-xl text-slate-gray max-w-3xl mx-auto">
            Curated collections showcasing our finest craftsmanship and timeless design philosophy
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass glass-border rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="h-80 bg-gradient-to-br from-slate-gray/10 to-gold/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="relative z-10 text-center px-6">
                  <h2 className="text-2xl font-bold text-white mb-4">{collection.title}</h2>
                  <p className="text-slate-gray mb-6">{collection.description}</p>
                  <Link href={`/shop?category=${collection.category}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-primary-black transition-colors duration-300 rounded-sm"
                    >
                      Explore Collection
                    </motion.button>
                  </Link>
                </div>
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Limited Edition Pieces</h2>
          <p className="text-slate-gray mb-8 max-w-2xl mx-auto">
            Discover our exclusive limited edition collection featuring one-of-a-kind pieces crafted by master artisans
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {limitedEditionPieces.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="glass glass-border rounded-lg p-6"
              >
                <div className="h-32 bg-gradient-to-br from-gold/20 to-slate-gray/20 rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.name}</h3>
                <p className="text-slate-gray text-sm mb-4">Handcrafted with rare materials and intricate detailing</p>
                <div className="space-y-3">
                  <Link href={`/items/${item.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 bg-gold text-primary-black font-medium rounded-sm hover:bg-[#b8972c] transition-colors"
                    >
                      View Details
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(item)}
                    className={`w-full py-2 font-medium rounded-sm transition-colors ${
                      isInCart(item.id)
                        ? 'bg-slate-gray text-white'
                        : 'bg-gold text-primary-black hover:bg-[#b8972c]'
                    }`}
                  >
                    {isInCart(item.id) ? 'Added!' : 'Add to Cart'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}