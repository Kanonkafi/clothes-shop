"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(`Thank you for subscribing with: ${email}`);
      setIsSubscribed(true);
      setEmail('');
      // Reset subscription status after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  // Mock data for best sellers with your provided images in /assets/ folder
  const bestSellers = [
    {
      id: 1,
      name: "Silk Evening Gown",
      price: "$599",
      category: "Evening Wear",
      image: '/assets/SilkEvening Gown.jpg'
    },
    {
      id: 2,
      name: "Cashmere Sweater",
      price: "$299",
      category: "Winter Collection",
      image: '/assets/CashmereSweater.jpg'
    },
    {
      id: 3,
      name: "Leather Jacket",
      price: "$499",
      category: "Outerwear",
      image: '/assets/LeatherJacket.webp'
    },
    {
      id: 4,
      name: "Linen Suit",
      price: "$799",
      category: "Business",
      image: '/assets/LinenSuit.jpg'
    },
  ];

  // Mock testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sophia Williams",
      role: "Fashion Director",
      content: "The quality and craftsmanship of LUXE clothing is unmatched. It's become my go-to brand for special occasions.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Style Consultant",
      content: "The attention to detail is extraordinary. Every piece feels tailored specifically for the wearer.",
      rating: 5
    },
    {
      id: 3,
      name: "Isabella Rodriguez",
      role: "Luxury Buyer",
      content: "I've never experienced such exceptional service and quality. Worth every penny.",
      rating: 5
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-primary-black text-slate-gray">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#121212] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="block text-gold">LUXE</span>
              <span className="block text-white mt-2">ELEGANCE REDEFINED</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-gray max-w-2xl mx-auto mb-10">
              Experience unparalleled sophistication with our curated collection of premium apparel.
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gold text-primary-black font-medium text-lg rounded-sm hover:bg-[#b8972c] transition-colors duration-300"
              >
                Explore Collection
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-primary-black"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Evening Wear", desc: "Elegant gowns and formal wear" },
              { title: "Casual Luxury", desc: "Premium everyday essentials" },
              { title: "Outerwear", desc: "Sophisticated jackets and coats" },
              { title: "Accessories", desc: "Statement pieces and fine jewelry" },
            ].map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="glass glass-border rounded-lg p-6 cursor-pointer group"
              >
                <Link href={`/shop?category=${category.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <h3 className="text-xl font-semibold text-gold mb-2 group-hover:text-white transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-slate-gray">{category.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Best Sellers */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-20 bg-gradient-to-b from-primary-black to-[#0f0f0f]"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Best Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass glass-border rounded-lg overflow-hidden group"
              >
                <div className="h-64 bg-gradient-to-br from-slate-gray/10 to-gold/10 flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <span className="text-gold text-sm">{item.category}</span>
                  <h3 className="text-lg font-semibold text-white mt-2 mb-1">{item.name}</h3>
                  <p className="text-gold font-medium">{item.price}</p>
                  <Link href={`/items/${item.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full py-2 border border-gold text-gold hover:bg-gold hover:text-primary-black transition-colors duration-300 rounded-sm"
                    >
                      View Details
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Brand Story */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-br from-[#0a0a0a] to-[#121212] relative"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-black to-slate-gray/10 opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Our Story</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-slate-gray text-xl mb-6 leading-relaxed">
                Founded in 2010, LUXE began with a vision to redefine contemporary fashion through exceptional craftsmanship and timeless design.
              </p>
              <p className="text-slate-gray text-xl mb-6 leading-relaxed">
                Each piece is meticulously crafted using the finest materials sourced globally, combining traditional techniques with innovative approaches.
              </p>
              <p className="text-slate-gray text-xl leading-relaxed">
                Today, LUXE stands as a beacon of sophistication, dressing discerning individuals who appreciate the artistry of premium fashion.
              </p>
            </div>
            <Link href="/about">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-12 inline-block px-8 py-4 bg-gold text-primary-black font-medium rounded-sm cursor-pointer hover:bg-[#b8972c] transition-colors"
              >
                Discover Our Craftsmanship
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-primary-black"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Client Testimonials</h2>
          <div className="max-w-3xl mx-auto relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="glass glass-border rounded-xl p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-gray text-lg italic mb-6">{`"${testimonials[currentTestimonial].content}"`}</p>
              <h4 className="text-white font-semibold">{testimonials[currentTestimonial].name}</h4>
              <p className="text-slate-gray text-sm">{testimonials[currentTestimonial].role}</p>
            </motion.div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${currentTestimonial === index ? 'bg-gold' : 'bg-slate-gray/30'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex justify-center mt-6 space-x-4">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full glass glass-border text-gold hover:bg-gold hover:text-primary-black transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full glass glass-border text-gold hover:bg-gold hover:text-primary-black transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Promotion Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-r from-gold to-[#b8972c] relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold text-primary-black mb-4"
            >
              SEASONAL SALE
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-primary-black mb-8"
            >
              UP TO 40% OFF SELECTED ITEMS
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-primary-black mb-8"
            >
              Limited Time Offer - Ends Soon
            </motion.div>
            <Link href="/shop">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary-black text-gold font-medium text-lg rounded-sm hover:bg-slate-gray transition-colors duration-300"
              >
                Shop Sale
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gradient-to-b from-[#0f0f0f] to-primary-black"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Exclusive Circle</h2>
            <p className="text-slate-gray mb-8 max-w-md mx-auto">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="glass glass-border rounded-full p-1 flex overflow-hidden">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow bg-transparent border-0 focus:ring-0 text-slate-gray px-6 py-4 focus:outline-none"
                  required
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-gold text-primary-black font-medium rounded-full hover:bg-[#b8972c] transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.section>
    </div>
  );
}