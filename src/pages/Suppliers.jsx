import React from 'react';
import { Search, Star, ExternalLink, Mail, Building2 } from 'lucide-react';

const mockSuppliers = [
  { id: 'VND-001', name: 'Al Ain Farms', category: 'Dairy & Chill', rating: 4.8, activePOs: 3, spend: '$142k' },
  { id: 'VND-002', name: 'TechCorp Electronics', category: 'Electronics', rating: 4.5, activePOs: 1, spend: '$89k' },
  { id: 'VND-003', name: 'Malabar Plaza', category: 'Food & Catering', rating: 4.9, activePOs: 2, spend: '$12k' },
  { id: 'VND-004', name: 'Bismi Briyani', category: 'Food & Catering', rating: 4.7, activePOs: 0, spend: '$8k' },
  { id: 'VND-005', name: 'P&G Trading', category: 'FMCG', rating: 4.2, activePOs: 5, spend: '$450k' },
];

export default function Suppliers() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Supplier Directory</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSuppliers.map(vendor => (
          <div key={vendor.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-1 rounded text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-current" /> {vendor.rating}
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{vendor.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{vendor.category} • {vendor.id}</p>
            
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100 dark:border-slate-700/50">
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
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                <Mail className="w-4 h-4" /> Contact
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700">
                <ExternalLink className="w-4 h-4" /> Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}