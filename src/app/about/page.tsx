'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About LUXE</h1>
            <p className="text-xl text-slate-gray">
              Redefining luxury fashion through exceptional craftsmanship and timeless design
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass glass-border rounded-xl p-8 h-full">
                <h2 className="text-2xl font-bold text-gold mb-4">Our Heritage</h2>
                <p className="text-slate-gray mb-4 leading-relaxed">
                  Founded in 2010, LUXE began with a vision to redefine contemporary fashion through exceptional craftsmanship and timeless design. Each piece is meticulously crafted using the finest materials sourced globally.
                </p>
                <p className="text-slate-gray leading-relaxed">
                  Combining traditional techniques with innovative approaches, we create apparel that transcends seasonal trends and becomes a lasting investment in personal style.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="glass glass-border rounded-xl p-8 h-full">
                <h2 className="text-2xl font-bold text-gold mb-4">Craftsmanship</h2>
                <p className="text-slate-gray mb-4 leading-relaxed">
                  Every garment is handcrafted by master artisans who have perfected their skills over decades. We believe that true luxury lies in the details – from the precision of each stitch to the quality of every button.
                </p>
                <p className="text-slate-gray leading-relaxed">
                  Our commitment to excellence means that each piece undergoes rigorous quality control before reaching our discerning clientele.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass glass-border rounded-xl p-8 mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gold">✦</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Quality First</h3>
                <p className="text-slate-gray">We never compromise on materials or construction. Only the finest components make it into our collections.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gold">✧</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Timeless Design</h3>
                <p className="text-slate-gray">Creating pieces that transcend seasonal trends and remain relevant for years to come.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-gold">✩</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Sustainable Luxury</h3>
                <p className="text-slate-gray">Ethical sourcing and responsible production practices that respect both people and planet.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-slate-gray mb-12 max-w-2xl mx-auto">
              Behind every LUXE creation is a team of passionate designers, skilled artisans, and dedicated professionals who share our commitment to excellence.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[1, 2, 3].map((member) => (
                <div key={member} className="glass glass-border rounded-lg p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-slate-gray/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gold font-medium">Team</span>
                  </div>
                  <h3 className="text-white font-semibold mb-1">Creative Director</h3>
                  <p className="text-slate-gray text-sm mb-4">Leading our design vision with over 15 years of industry experience</p>
                  <button className="text-gold hover:text-white transition-colors text-sm">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}