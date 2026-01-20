'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Settings, Shield, Database, Monitor, Bell, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

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

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'monitoring', name: 'Monitoring', icon: Monitor },
  ];

  const settings = {
    general: [
      { name: 'Store Name', value: 'LUXE COLLECTION', type: 'text' },
      { name: 'Email Notifications', value: true, type: 'toggle' },
      { name: 'Maintenance Mode', value: false, type: 'toggle' },
      { name: 'Currency', value: 'USD', type: 'select', options: ['USD', 'EUR', 'GBP'] },
    ],
    security: [
      { name: 'Two-Factor Authentication', value: true, type: 'toggle' },
      { name: 'Session Timeout', value: '30 minutes', type: 'select', options: ['15 minutes', '30 minutes', '1 hour', '2 hours'] },
      { name: 'Failed Login Attempts', value: '5', type: 'number' },
      { name: 'Password Expiry', value: '90 days', type: 'select', options: ['30 days', '60 days', '90 days', 'Never'] },
    ],
    database: [
      { name: 'Database Status', value: 'Connected', type: 'status' },
      { name: 'Last Backup', value: '2 hours ago', type: 'text' },
      { name: 'Storage Used', value: '2.4 GB', type: 'text' },
      { name: 'Auto Backup', value: true, type: 'toggle' },
    ],
    monitoring: [
      { name: 'Server Uptime', value: '99.9%', type: 'text' },
      { name: 'Response Time', value: '120ms', type: 'text' },
      { name: 'Active Users', value: '24', type: 'number' },
      { name: 'Error Rate', value: '0.1%', type: 'text' },
    ],
  };

  const renderSettingField = (setting: any) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-white">{setting.name}</span>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only"
                defaultChecked={setting.value}
                onChange={(e) => toast.success(`${setting.name} updated`)}
              />
              <div className="block bg-slate-gray/30 w-14 h-8 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-slate-gray w-6 h-6 rounded-full transition transform"></div>
            </div>
          </label>
        );
      case 'select':
        return (
          <div className="flex items-center justify-between">
            <span className="text-white">{setting.name}</span>
            <select 
              className="bg-transparent border border-slate-gray/30 rounded px-3 py-2 text-white"
              defaultValue={setting.value}
              onChange={(e) => toast.success(`${setting.name} updated to ${e.target.value}`)}
            >
              {setting.options.map((option: string) => (
                <option key={option} value={option} className="bg-primary-black">
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case 'number':
        return (
          <div className="flex items-center justify-between">
            <span className="text-white">{setting.name}</span>
            <input 
              type="number" 
              className="bg-transparent border border-slate-gray/30 rounded px-3 py-2 text-white w-24 text-right"
              defaultValue={setting.value}
              onChange={(e) => toast.success(`${setting.name} updated`)}
            />
          </div>
        );
      case 'status':
        return (
          <div className="flex items-center justify-between">
            <span className="text-white">{setting.name}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              setting.value === 'Connected' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {setting.value}
            </span>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-between">
            <span className="text-white">{setting.name}</span>
            <input 
              type="text" 
              className="bg-transparent border border-slate-gray/30 rounded px-3 py-2 text-white"
              defaultValue={setting.value}
              onChange={(e) => toast.success(`${setting.name} updated`)}
            />
          </div>
        );
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black to-[#121212] pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
                <Shield className="h-8 w-8 text-gold mr-3" />
                System Administration
              </h1>
              <p className="text-slate-gray">Configure and monitor your luxury fashion platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-slate-gray hover:text-gold cursor-pointer transition-colors" />
              <Lock className="h-6 w-6 text-slate-gray hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64">
              <div className="glass glass-border rounded-lg p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-gold text-primary-black'
                          : 'text-slate-gray hover:bg-slate-gray/10 hover:text-white'
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-3" />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="glass glass-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-6 capitalize">{activeTab} Settings</h2>
                
                <div className="space-y-6">
                  {settings[activeTab as keyof typeof settings]?.map((setting, index) => (
                    <motion.div
                      key={setting.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="glass glass-border rounded-lg p-4"
                    >
                      {renderSettingField(setting)}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-gray/20">
                  <div className="flex justify-end space-x-4">
                    <button className="px-6 py-2 border border-slate-gray/30 text-slate-gray hover:border-gold hover:text-gold transition-colors rounded-sm">
                      Cancel
                    </button>
                    <button 
                      onClick={() => toast.success('Settings saved successfully')}
                      className="px-6 py-2 bg-gold text-primary-black font-medium rounded-sm hover:bg-[#b8972c] transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}