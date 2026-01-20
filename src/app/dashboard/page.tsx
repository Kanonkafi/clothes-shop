'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BarChart3, ShoppingCart, Heart, Users, TrendingUp, Package } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 24,
    totalOrders: 142,
    totalRevenue: 89500,
    totalCustomers: 87,
    wishlistItems: 56,
    cartItems: 23
  });

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const cookies = document.cookie.split('; ');
      const authCookie = cookies.find(cookie => cookie.startsWith('auth-token='));
      if (!authCookie) {
        router.push('/login');
        return false;
      }
      return true;
    };

    const authStatus = checkAuth();
    setIsAuthenticated(authStatus);
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    toast.success('Logged out successfully');
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-slate-gray">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      title: 'Wishlist Items',
      value: stats.wishlistItems,
      icon: Heart,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10'
    },
    {
      title: 'Cart Items',
      value: stats.cartItems,
      icon: ShoppingCart,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-slate-gray">Manage your luxury fashion store</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 sm:mt-0 px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-primary-black transition-colors rounded-sm"
            >
              Logout
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass glass-border rounded-lg p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-gray text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass glass-border rounded-lg p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 text-gold mr-2" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center justify-between py-3 border-b border-slate-gray/20 last:border-0">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gold rounded-full mr-3"></div>
                      <div>
                        <p className="text-white text-sm">New order received</p>
                        <p className="text-slate-gray text-xs">2 hours ago</p>
                      </div>
                    </div>
                    <span className="text-gold text-sm">+$299</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass glass-border rounded-lg p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    toast.success('Navigating to add item page...');
                    router.push('/add-item');
                  }}
                  className="p-4 glass glass-border rounded-lg text-center hover:bg-gold/10 transition-colors"
                >
                  <Package className="h-6 w-6 text-gold mx-auto mb-2" />
                  <span className="text-white text-sm">Add Product</span>
                </button>
                <button className="p-4 glass glass-border rounded-lg text-center hover:bg-gold/10 transition-colors">
                  <ShoppingCart className="h-6 w-6 text-gold mx-auto mb-2" />
                  <span className="text-white text-sm">View Orders</span>
                </button>
                <button className="p-4 glass glass-border rounded-lg text-center hover:bg-gold/10 transition-colors">
                  <Users className="h-6 w-6 text-gold mx-auto mb-2" />
                  <span className="text-white text-sm">Customers</span>
                </button>
                <button className="p-4 glass glass-border rounded-lg text-center hover:bg-gold/10 transition-colors">
                  <BarChart3 className="h-6 w-6 text-gold mx-auto mb-2" />
                  <span className="text-white text-sm">Analytics</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}