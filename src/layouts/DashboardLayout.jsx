import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingCart, Truck, Settings, Search, 
  Bell, Sun, Moon, Menu, ChevronLeft, X, FileText, Layers, Calendar, Map,
  AlertTriangle, CheckCircle, Info, Clock 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  const location = useLocation();
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Low Stock Alert', desc: 'FMCG Category: SKU-8492 is below minimum threshold.', time: '10 mins ago', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 2, title: 'PO Approved', desc: 'Purchase Order #4092 for Fresh Produce has been approved.', time: '1 hour ago', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { id: 3, title: 'Dock Update', desc: 'Supplier delivery at Dock B rescheduled to 14:00.', time: '2 hours ago', icon: Info, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];
  
  const unreadCount = notifications.length;

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location?.pathname]); // Added optional chaining[cite: 6]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search');
        if (searchInput) searchInput.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Inventory (WMS)', path: '/inventory' },
    { icon: ShoppingCart, label: 'Purchase Orders', path: '/po' },
    { icon: Truck, label: 'Suppliers', path: '/suppliers' },
    { icon: Calendar, label: 'Dock Schedule', path: '/schedule' },
    { icon: Map, label: 'Warehouse Map', path: '/map' },
    { icon: FileText, label: 'Blank Page', path: '/blank' },
    { icon: Layers, label: 'UI Toolkit', path: '/uikit' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-200">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[55] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`fixed md:relative inset-y-0 left-0 z-[60] md:z-30 flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 shadow-2xl md:shadow-none
        ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'}
      `}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className={`flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl tracking-tight ${!isSidebarOpen ? 'md:hidden' : ''}`}>
            <div className="bg-indigo-600 text-white p-1 rounded-lg shadow-sm"><Package className="w-5 h-5" /></div>
            <span>NexaWMS</span>
          </div>
          
          <div className={`hidden md:flex justify-center w-full ${isSidebarOpen ? 'hidden' : ''}`}>
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm"><Package className="w-5 h-5" /></div>
          </div>

          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden md:block p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors focus:outline-none">
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors focus:outline-none flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5 bg-white dark:bg-slate-800">
          {navItems.map((item) => {
            // Defensive optional chaining applied to location.pathname[cite: 6]
            const isActive = location?.pathname?.includes(item.path) || false; 
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-500/20 dark:to-slate-800 border-l-4 border-indigo-600 text-indigo-700 dark:text-indigo-300 font-medium' : 'border-l-4 border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                <span className={`${!isSidebarOpen ? 'md:hidden' : ''}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        <header className="h-16 flex-shrink-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 relative z-50">
          
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 -ml-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors flex-shrink-0">
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="relative w-full sm:w-64 lg:w-80 flex-1 min-w-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 flex-shrink-0" />
              <input 
                id="global-search"
                type="text" 
                placeholder="Search SKU, PO... (Ctrl+K)" 
                className="pl-9 pr-4 py-2 w-full bg-slate-100 dark:bg-slate-900 border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg text-sm outline-none transition-all dark:text-white" 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 relative ml-2 sm:ml-4 flex-shrink-0">
            
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors focus:outline-none flex-shrink-0">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="relative flex-shrink-0">
              <button 
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors focus:outline-none"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800"></span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-3 w-80 md:w-96 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl z-[100] overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</p>
                    <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors">Mark all read</button>
                  </div>
                  
                  <div className="max-h-[28rem] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="px-4 py-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors flex gap-3">
                        <div className={`mt-1 p-2 rounded-full ${notif.bg} flex-shrink-0 h-fit`}>
                          <notif.icon className={`w-4 h-4 ${notif.color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{notif.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{notif.desc}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3" /> {notif.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-2 text-center border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <Link to="/notifications" className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline block py-1">View all activity</Link>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block mx-1 flex-shrink-0"></div>

            <div className="relative flex-shrink-0">
              <button 
                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                className="flex items-center gap-2 focus:outline-none rounded-full ring-2 ring-transparent hover:ring-indigo-500 transition-all flex-shrink-0"
              >
                <img 
                  className="w-8 h-8 min-w-[2rem] rounded-full object-cover bg-slate-200 dark:bg-slate-700 flex-shrink-0" 
                  src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff" 
                  alt="Profile Avatar" 
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl z-[100]">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Admin User</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">admin@nexawms.com</p>
                  </div>
                  <div className="py-1">
                    <Link to="/settings" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      Account Settings
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 dark:border-slate-700 py-1">
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900 relative z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location?.pathname} // Optional chaining[cite: 6]
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
