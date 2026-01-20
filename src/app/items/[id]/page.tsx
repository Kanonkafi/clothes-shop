'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

// Define types
type Specification = {
  [key: string]: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  specifications: Specification;
  details: string[];
};

// Mock product data with your provided images in /assets/ folder
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Silk Evening Gown',
    price: 599,
    category: 'Evening Wear',
    image: '/assets/SilkEvening Gown.jpg',
    description: 'An elegant silk evening gown perfect for formal events. This luxurious piece combines timeless design with modern comfort, featuring delicate beadwork and a flowing silhouette that moves gracefully with every step.',
    specifications: {
      material: '100% Pure Silk',
      color: 'Deep Black',
      size: 'S, M, L, XL',
      care: 'Dry Clean Only',
      countryOfOrigin: 'Italy',
      closure: 'Zipper',
      lining: 'Silk Lining',
      sleeveLength: 'Off-Shoulder'
    },
    details: [
      'Handcrafted with premium materials',
      'Elegant silhouette for all body types',
      'Perfect for weddings, galas, and formal events',
      'Comes with a luxury dust bag for storage',
      'Limited edition piece'
    ]
  },
  {
    id: 2,
    name: 'Cashmere Sweater',
    price: 299,
    category: 'Winter Collection',
    image: '/assets/CashmereSweater.jpg',
    description: 'Luxurious cashmere sweater for cold winter days. Made from the finest Mongolian cashmere, this sweater offers unparalleled softness and warmth while maintaining a sleek, sophisticated look.',
    specifications: {
      material: '100% Cashmere',
      color: 'Slate Gray',
      size: 'S, M, L',
      care: 'Hand Wash Cold',
      countryOfOrigin: 'Scotland',
      neck: 'Round Neck',
      fit: 'Regular Fit',
      sleeveLength: 'Long Sleeve'
    },
    details: [
      'Made from premium Mongolian cashmere',
      'Breathable fabric keeps you comfortable',
      'Versatile design pairs with any outfit',
      'Machine washable on gentle cycle',
      'Designed for durability and lasting quality'
    ]
  },
  {
    id: 3,
    name: 'Leather Jacket',
    price: 499,
    category: 'Outerwear',
    image: '/assets/LeatherJacket.webp',
    description: 'Stylish leather jacket with premium finish. Crafted from genuine leather with attention to detail, this jacket combines classic design with contemporary style for a timeless look.',
    specifications: {
      material: 'Genuine Leather',
      color: 'Black',
      size: 'S, M, L, XL',
      care: 'Professional Leather Cleaning',
      countryOfOrigin: 'Spain',
      closure: 'Zipper',
      pockets: 'Multiple Interior and Exterior Pockets',
      lining: 'Polyester Lining'
    },
    details: [
      'Crafted from premium Italian leather',
      'Removable belt for versatile styling',
      'Multiple interior and exterior pockets',
      'Water-resistant coating',
      'Seasonless design suitable for year-round wear'
    ]
  },
  {
    id: 4,
    name: 'Linen Suit',
    price: 799,
    category: 'Business',
    image: '/assets/LinenSuit.jpg',
    description: 'Elegant linen suit for business meetings. Perfectly tailored for a sophisticated professional look, this suit offers breathability and comfort while maintaining a sharp appearance.',
    specifications: {
      material: '100% Linen',
      color: 'Navy Blue',
      size: '38, 40, 42, 44',
      care: 'Dry Clean Only',
      countryOfOrigin: 'Portugal',
      jacket: 'Single Breasted',
      pants: 'Flat Front',
      closure: 'Hook & Eye Closure'
    },
    details: [
      'Lightweight and breathable linen fabric',
      'Perfect for summer events and business meetings',
      'Tailored for a modern, slim fit',
      'Includes matching blazer and trousers',
      'Easy to dress up or down'
    ]
  },
  {
    id: 5,
    name: 'Velvet Blazer',
    price: 649,
    category: 'Business',
    image: '/assets/VelvetBlazer.jpg',
    description: 'Luxurious velvet blazer for special occasions. Made with premium velvet fabric, this blazer adds a touch of elegance and sophistication to any outfit.',
    specifications: {
      material: 'Premium Velvet',
      color: 'Burgundy',
      size: '36, 38, 40, 42',
      care: 'Dry Clean Only',
      countryOfOrigin: 'France',
      closure: 'Double Button Closure',
      pockets: 'Flap Pockets',
      lining: 'Silk Lining'
    },
    details: [
      'Luxurious velvet fabric with subtle sheen',
      'Perfect for evening events and special occasions',
      'Fully lined for comfort and durability',
      'Features classic lapel design',
      'Comes with luxury garment bag'
    ]
  },
  {
    id: 6,
    name: 'Wool Coat',
    price: 899,
    category: 'Outerwear',
    image: '/assets/WoolCoat.webp',
    description: 'Warm wool coat for winter season. Expertly crafted from premium merino wool, this coat provides excellent insulation while maintaining a sleek silhouette.',
    specifications: {
      material: '100% Merino Wool',
      color: 'Charcoal',
      size: 'S, M, L, XL',
      care: 'Dry Clean Only',
      countryOfOrigin: 'Australia',
      closure: 'Double Breasted',
      pockets: 'Interior and Exterior Pockets',
      hood: 'Detachable Hood'
    },
    details: [
      'Made from premium Australian merino wool',
      'Water-resistant finish for light rain',
      'Insulated for maximum warmth',
      'Detachable hood for versatility',
      'Perfect for harsh winter conditions'
    ]
  }
];

export default function ItemDetailPage() {
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useCart();
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      // In a real app, this would be an API call
      // const res = await fetch(`/api/products/${id}`);
      // const data = await res.json();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Handle the case where id might be an array or undefined
      const productId = Array.isArray(id) ? parseInt(id[0] as string) : parseInt(id as string);
      const foundProduct = mockProducts.find(p => p.id === productId);
      
      setProduct(foundProduct || null);
      setLoading(false);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      // Remove toast notification since CartContext handles it
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
      // Remove toast notification since CartContext handles it
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mb-4"></div>
          <p className="text-slate-gray">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <p className="text-slate-gray mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/items">
            <span className="px-6 py-3 bg-gold text-primary-black font-medium rounded-sm hover:bg-[#b8972c] transition-colors">
              Browse Products
            </span>
          </Link>
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
          className="bg-gradient-to-br from-[#0a0a0a] to-[#121212] rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
            {/* Product Image */}
            <div className="flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass glass-border rounded-xl p-6 max-w-lg w-full"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="rounded-lg object-contain w-full h-auto"
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <span className="text-gold text-sm">{product.category}</span>
                <h1 className="text-4xl font-bold text-white mt-2 mb-4">{product.name}</h1>
                <p className="text-2xl text-gold font-semibold">${product.price}</p>
              </div>

              <p className="text-slate-gray text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Details List */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.details.map((detail: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-gold mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-slate-gray">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="glass glass-border rounded-lg p-4">
                      <p className="text-slate-gray text-sm uppercase tracking-wide">{key}</p>
                      <p className="text-white font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className={`flex-1 min-w-[150px] py-3 font-medium rounded-sm transition-colors ${
                    isInCart(product.id)
                      ? 'bg-slate-gray text-white'
                      : 'bg-gold text-primary-black hover:bg-[#b8972c]'
                  }`}
                >
                  {isInCart(product.id) ? 'Added to Cart!' : 'Add to Cart'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToWishlist}
                  className={`flex-1 min-w-[150px] py-3 transition-colors rounded-sm ${
                    isInWishlist(product.id)
                      ? 'bg-gold text-primary-black'
                      : 'border border-gold text-gold hover:bg-gold hover:text-primary-black'
                  }`}
                >
                  {isInWishlist(product.id) ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="border-t border-slate-gray/20 mt-12 pt-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
              {mockProducts
                .filter(p => p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct) => (
                  <motion.div
                    key={relatedProduct.id}
                    whileHover={{ y: -5 }}
                    className="glass glass-border rounded-lg overflow-hidden"
                  >
                    <Link href={`/items/${relatedProduct.id}`} className="block">
                      <div className="h-48 bg-gradient-to-br from-slate-gray/10 to-gold/10 flex items-center justify-center">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          width={200}
                          height={200}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white">{relatedProduct.name}</h3>
                        <p className="text-gold font-medium">${relatedProduct.price}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))
              }
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Link href="/items">
            <span className="text-slate-gray hover:text-gold transition-colors">
              ← Back to Collection
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}