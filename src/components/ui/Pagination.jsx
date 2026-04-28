import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage = 1, totalItems = 0, itemsPerPage = 10 }) {
  // Note: This is purely a UI component for the template. 
  // Buyers will wire up the actual logic themselves.
  
  return (
    <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-slate-500 dark:text-slate-400">
        Showing <span className="font-medium text-slate-900 dark:text-white">1</span> to <span className="font-medium text-slate-900 dark:text-white">{Math.min(itemsPerPage, totalItems)}</span> of <span className="font-medium text-slate-900 dark:text-white">{totalItems}</span> results
      </div>
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled={currentPage === 1}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-medium text-sm flex items-center justify-center">1</button>
        <button className="w-8 h-8 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm flex items-center justify-center transition-colors">2</button>
        <button className="w-8 h-8 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm flex items-center justify-center transition-colors">3</button>
        <span className="text-slate-400 px-1">...</span>
        <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
