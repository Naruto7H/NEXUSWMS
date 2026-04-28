import React, { useState } from 'react';
import { Search, Star, ExternalLink, Mail, Building2, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const mockSuppliers = [
  { id: 'VND-001', name: 'Al Ain Farms', category: 'Dairy & Chill', rating: 4.8, activePOs: 3, spend: '$142k' },
  { id: 'VND-002', name: 'TechCorp Electronics', category: 'Electronics', rating: 4.5, activePOs: 1, spend: '$89k' },
  { id: 'VND-003', name: 'Malabar Plaza', category: 'Food & Catering', rating: 4.9, activePOs: 2, spend: '$12k' },
  { id: 'VND-004', name: 'Bismi Briyani', category: 'Food & Catering', rating: 4.7, activePOs: 0, spend: '$8k' },
  { id: 'VND-005', name: 'P&G Trading', category: 'FMCG', rating: 4.2, activePOs: 5, spend: '$450k' },
];

export default function Suppliers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const categories = ['All Categories', ...new Set(mockSuppliers.map(s => s.category))];

  const filteredSuppliers = mockSuppliers.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vendor.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || vendor.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Supplier Directory</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and contact your approved vendors.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-4 relative z-10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by supplier name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all"
          />
        </div>

        <div className="relative min-w-[200px]">
          <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all appearance-none cursor-pointer"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0">
        {filteredSuppliers.length > 0 ? (
          filteredSuppliers.map(vendor => (
            <div key={vendor.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 hover:shadow-md transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-1 rounded text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-current" /> {vendor.rating}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{vendor.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{vendor.category} • {vendor.id}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100 dark:border-slate-700/50 mt-auto">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Active POs</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{vendor.activePOs}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">YTD Spend</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{vendor.spend}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                  <Mail className="w-4 h-4" /> Contact
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                  <ExternalLink className="w-4 h-4" /> Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4">
              <Building2 className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No suppliers found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              We couldn't find any suppliers matching "{searchQuery}" in the "{selectedCategory}" category.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); }}
              className="mt-4 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Grid Pagination Footer (Only visible if there are results) */}
      {filteredSuppliers.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-medium text-slate-900 dark:text-white">1</span> to <span className="font-medium text-slate-900 dark:text-white">{filteredSuppliers.length}</span> of <span className="font-medium text-slate-900 dark:text-white">45</span> vendors
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-medium text-sm flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm flex items-center justify-center transition-colors">2</button>
            <button className="w-8 h-8 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm flex items-center justify-center transition-colors">3</button>
            <span className="text-slate-400 px-1">...</span>
            <button className="w-8 h-8 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm flex items-center justify-center transition-colors">5</button>
            <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
