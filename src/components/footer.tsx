'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin, Star, Award } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'New Arrivals', href: '#' },
    { name: 'Best Sellers', href: '#' },
    { name: 'Collections', href: '#' },
    { name: 'Sale', href: '#' },
  ];

  const companyInfo = [
    { name: 'About Us', href: '#' },
    { name: 'Our Story', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ];

  return (
    <footer className="bg-primary-black pt-16 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6">
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
              <h3 className="text-xl font-bold text-gold tracking-wider">LUXE</h3>
            </div>
            <p className="text-slate-gray text-sm mb-4 max-w-xs">
              Crafting timeless pieces with premium materials and meticulous attention to detail.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-gray hover:text-gold transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="text-slate-gray hover:text-gold transition-colors">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="text-slate-gray hover:text-gold transition-colors">
                <Facebook size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-gold mb-4">Shop</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-gray/80 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-gold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyInfo.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-gray/80 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-gold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={14} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-slate-gray text-sm">123 Fashion Ave</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <span className="text-slate-gray text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={14} className="text-gold flex-shrink-0" />
                <span className="text-slate-gray text-sm">info@luxeclothing.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold text-gold mb-2">Join Our Circle</h4>
            <p className="text-slate-gray text-sm mb-4">
              Subscribe for exclusive updates and offers.
            </p>
            <div className="flex gap-2 max-w-xs mx-auto">
              <input
                type="email"
                placeholder="Email"
                className="flex-grow px-3 py-2 bg-transparent border border-slate-gray/30 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold text-slate-gray text-sm placeholder:text-slate-gray/50"
              />
              <button className="px-4 py-2 bg-gold text-primary-black text-sm font-medium rounded-sm hover:bg-[#b8972c] transition-colors duration-300">
                Join
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-6 border-t border-slate-gray/20 text-slate-gray/70 text-xs text-center"
        >
          <p>&copy; {new Date().getFullYear()} LUXE. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;