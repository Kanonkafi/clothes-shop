'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateQuantity(productId, quantity);
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Your Shopping Cart</h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
              <p className="text-slate-gray mb-6">Looks like you haven't added anything to your cart yet</p>
              <Link href="/shop">
                <span className="px-6 py-3 bg-gold text-primary-black font-medium rounded-sm hover:bg-[#b8972c] transition-colors">
                  Continue Shopping
                </span>
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                {cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass glass-border rounded-lg p-6 flex flex-col sm:flex-row items-center"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-gray/10 to-gold/10 rounded-lg flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-white">{item.product.name}</h3>
                      <p className="text-slate-gray text-sm">{item.product.category}</p>
                      <p className="text-gold font-medium">${item.product.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <div className="flex items-center border border-slate-gray/30 rounded-sm">
                        <button 
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-2 text-slate-gray hover:text-gold transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-2 text-white">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-2 text-slate-gray hover:text-gold transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-slate-gray hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="glass glass-border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white">Subtotal</span>
                  <span className="text-gold font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white">Shipping</span>
                  <span className="text-gold font-medium">Free</span>
                </div>
                <div className="border-t border-slate-gray/30 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Total</span>
                    <span className="text-xl font-bold text-gold">${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/shop">
                    <span className="w-full py-3 border border-gold text-gold hover:bg-gold hover:text-primary-black transition-colors rounded-sm text-center block">
                      Continue Shopping
                    </span>
                  </Link>
                  <button className="w-full py-3 bg-gold text-primary-black font-medium rounded-sm hover:bg-[#b8972c] transition-colors">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}