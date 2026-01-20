'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: 'styling',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to your backend
    console.log('Consultation booking:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
        preferredTime: '',
        consultationType: 'styling',
        message: ''
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass glass-border rounded-xl p-12 text-center max-w-md w-full mx-4"
        >
          <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Booking Confirmed!</h2>
          <p className="text-slate-gray mb-6">
            Thank you for booking your consultation. We'll contact you shortly to confirm your appointment details.
          </p>
          <Link href="/">
            <span className="px-6 py-3 bg-gold text-primary-black font-medium rounded-sm hover:bg-[#b8972c] transition-colors">
              Return Home
            </span>
          </Link>
        </motion.div>
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
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Book a Consultation</h1>
            <p className="text-xl text-slate-gray max-w-2xl mx-auto">
              Schedule a personalized styling session with our luxury fashion experts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Information Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass glass-border rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Consultation Services</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-gold font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Personal Styling</h3>
                    <p className="text-slate-gray text-sm">Get expert advice on building your perfect wardrobe</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-gold font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Special Occasion</h3>
                    <p className="text-slate-gray text-sm">Find the perfect outfit for weddings, galas, and events</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-gold font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Wardrobe Audit</h3>
                    <p className="text-slate-gray text-sm">Optimize your existing collection with professional guidance</p>
                  </div>
                </div>
              </div>

              <div className="glass glass-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">What to Expect</h3>
                <ul className="text-slate-gray space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>60-minute personalized session</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Professional styling recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Follow-up support included</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass glass-border rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Schedule Your Session</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-gray mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-white placeholder:text-slate-gray/50"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-gray mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-white placeholder:text-slate-gray/50"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-gray mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-white placeholder:text-slate-gray/50"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="consultationType" className="block text-sm font-medium text-slate-gray mb-2">
                      Consultation Type *
                    </label>
                    <select
                      id="consultationType"
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-white"
                      required
                    >
                      <option value="styling" className="bg-primary-black">Personal Styling</option>
                      <option value="occasion" className="bg-primary-black">Special Occasion</option>
                      <option value="audit" className="bg-primary-black">Wardrobe Audit</option>
                      <option value="custom" className="bg-primary-black">Custom Design Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-slate-gray mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-slate-gray mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-white"
                      required
                    >
                      <option value="" className="bg-primary-black">Select time</option>
                      <option value="09:00" className="bg-primary-black">9:00 AM</option>
                      <option value="11:00" className="bg-primary-black">11:00 AM</option>
                      <option value="14:00" className="bg-primary-black">2:00 PM</option>
                      <option value="16:00" className="bg-primary-black">4:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-gray mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-white placeholder:text-slate-gray/50 resize-none"
                    placeholder="Any specific requirements or questions..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gold text-primary-black font-medium rounded-sm hover:bg-[#b8972c] transition-colors duration-300"
                >
                  Book Consultation
                </motion.button>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <p className="text-slate-gray">
              Prefer to speak with us directly? Call us at{' '}
              <span className="text-gold font-medium">+1 (555) 123-4567</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}