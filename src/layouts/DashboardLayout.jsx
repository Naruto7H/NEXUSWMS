import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Truck, Settings, Search, Bell, Sun, Moon, Menu, ChevronLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Package, label: 'Inventory (WMS)', path: '/inventory' },
    { icon: ShoppingCart, label: 'Purchase Orders', path: '/po' },
    { icon: Truck, label: 'Suppliers', path: '/suppliers' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-hidden transition-colors duration-200">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col z-20`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
          {isSidebarOpen && (
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl tracking-tight">
              <div className="bg-indigo-600 text-white p-1 rounded-lg shadow-sm"><Package className="w-5 h-5" /></div>
              <span>NexaRetail WMS</span>
            </div>
          )}
          {!isSidebarOpen && <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm mx-auto"><Package className="w-5 h-5" /></div>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hidden md:block transition-colors">
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link key={item.path} to={item.path} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive ? 'bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-500/20 dark:to-slate-800 border-l-4 border-indigo-600 text-indigo-700 dark:text-indigo-300 font-medium' : 'border-l-4 border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'}`}>
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex-shrink-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search SKU, PO, or Vendor..." className="pl-9 pr-4 py-2 w-64 lg:w-80 bg-slate-100 dark:bg-slate-900 border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg text-sm outline-none transition-all" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm ml-2 cursor-pointer">
              SN
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