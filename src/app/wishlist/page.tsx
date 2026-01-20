'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useCart();

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = (product: { id: number; name: string; price: number; category: string; image: string; description: string; }) => {
    addToCart(product);
    // Remove toast notification since CartContext handles it
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Your Wishlist</h1>
          
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h2>
              <p className="text-slate-gray mb-6">Looks like you have not added any items to your wishlist yet</p>
              <Link href="/shop">
                <span className="px-6 py-3 bg-gold text-primary-black font-medium rounded-sm hover:bg-[#b8972c] transition-colors">
                  Start Shopping
                </span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="glass glass-border rounded-lg overflow-hidden"
                >
                  <div className="h-64 bg-gradient-to-br from-slate-gray/10 to-gold/10 flex items-center justify-center">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      width={300}
                      height={300}
                      unoptimized
                    />
                  </div>
                  
                  <div className="p-6">
                    <span className="text-gold text-sm">{product.category}</span>
                    <h3 className="text-lg font-semibold text-white mt-2 mb-1">{product.name}</h3>
                    <p className="text-gold font-medium">${product.price}</p>
                    
                    <div className="mt-4 space-y-3">
                      <Link href={`/items/${product.id}`}>
                        <button className="w-full py-2 text-gold hover:text-white transition-colors duration-300 text-sm">
                          View Details
                        </button>
                      </Link>
                      
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-2 font-medium rounded-sm transition-colors ${
                          isInCart(product.id)
                            ? 'bg-slate-gray text-white'
                            : 'bg-gold text-primary-black hover:bg-[#b8972c]'
                        }`}
                      >
                        {isInCart(product.id) ? 'Added to Cart!' : 'Add to Cart'}
                      </button>
                      
                      <button 
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="w-full py-2 border border-gold text-gold hover:bg-gold hover:text-primary-black transition-colors rounded-sm"
                      >
                        Remove from Wishlist
                      </button>
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