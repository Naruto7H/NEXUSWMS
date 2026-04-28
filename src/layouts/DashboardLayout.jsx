import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Truck, Settings, Search, Bell, Sun, Moon, Menu, ChevronLeft, X, FileText, Layers, Calendar, Map } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Map } from 'lucide-react';

export default function DashboardLayout() {
  // Start closed on mobile, open on desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  
  const location = useLocation();
  const navigate = useNavigate();

  // Close the sidebar automatically when changing pages on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

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
      
      {/* Mobile Overlay Background */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-30 flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 shadow-2xl md:shadow-none
        ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'}
      `}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
          
          {/* Expanded Logo */}
          <div className={`flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl tracking-tight ${!isSidebarOpen ? 'md:hidden' : ''}`}>
            <div className="bg-indigo-600 text-white p-1 rounded-lg shadow-sm"><Package className="w-5 h-5" /></div>
            <span>NexaWMS</span>
          </div>
          
          {/* Collapsed Logo (Desktop Only) */}
          <div className={`hidden md:flex justify-center w-full ${isSidebarOpen ? 'hidden' : ''}`}>
            <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm"><Package className="w-5 h-5" /></div>
          </div>

          {/* Desktop Toggle Button */}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden md:block p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors">
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Mobile Close Button */}
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        <header className="h-16 flex-shrink-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 z-10">
          
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Mobile Menu Button */}
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 -ml-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Search Bar */}
            <div className="relative w-full sm:w-64 lg:w-80 flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search SKU, PO..." className="pl-9 pr-4 py-2 w-full bg-slate-100 dark:bg-slate-900 border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg text-sm outline-none transition-all dark:text-white" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 relative ml-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Notification Dropdown */}
            <div className="relative">
              <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 relative transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800"></span>
              </button>
              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden animate-in slide-in-from-top-2">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                      <span className="font-semibold text-slate-900 dark:text-white">Notifications</span>
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer">Mark all read</span>
                    </div>
                    <div className="p-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="mb-3 border-b border-slate-100 dark:border-slate-700 pb-3">
                        <p className="text-slate-900 dark:text-slate-100 font-medium mb-0.5">PO-8472 Approved</p>
                        <p className="text-xs">Your purchase order for Al Ain Farms has been approved.</p>
                      </div>
                      <div>
                        <p className="text-rose-600 dark:text-rose-400 font-medium mb-0.5">Low Stock Alert</p>
                        <p className="text-xs">Fresh Norwegian Salmon is below minimum threshold.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative border-l border-slate-200 dark:border-slate-700 pl-4 ml-2">
              <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer hover:ring-2 ring-indigo-200 dark:ring-indigo-900 transition-all">
                SN
              </div>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden animate-in slide-in-from-top-2">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Suhail Nizar</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">suhail.nizar@nexawms.com</p>
                    </div>
                    <div className="p-1.5">
                      <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="block w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors">
                        Account Settings
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-md transition-colors mt-1">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative bg-slate-50 dark:bg-slate-900">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
