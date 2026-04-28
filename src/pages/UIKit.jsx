import React from 'react';
import { Package, Search, Plus, Trash2, Mail, Bell, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import StatusBadge from '../components/ui/StatusBadge';
import TableSkeleton from '../components/ui/TableSkeleton';

export default function UIKit() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">UI Components</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          A showcase of all reusable design system components. Copy and paste these into your own pages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* BUTTONS */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Buttons</h2>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">Primary</button>
              <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Secondary</button>
              <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">Danger</button>
              <button className="px-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">Ghost</button>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                <Plus className="w-4 h-4" /> With Icon
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Search className="w-4 h-4" /> Search
              </button>
              <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500 rounded-lg shadow-sm transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* BADGES & PILLS */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Status Badges</h2>
          
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <p className="text-xs text-slate-500 mb-2">System Status</p>
              <div className="flex flex-col gap-2 items-start">
                <StatusBadge status="Delivered" />
                <StatusBadge status="Pending" />
                <StatusBadge status="Approved" />
                <StatusBadge status="Shipped" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-500 mb-2">Notification Pills</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Success
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400">
                  <AlertTriangle className="w-3.5 h-3.5" /> Error
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                  <Info className="w-3.5 h-3.5" /> Info
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FORM INPUTS */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 space-y-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Form Elements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Standard Input</label>
              <input type="text" placeholder="Enter your text here..." className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Input with Icon</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" placeholder="you@company.com" className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Select Dropdown</label>
              <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all appearance-none">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
        </div>

        {/* LOADING STATES */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2 mb-6">Loading States (Skeleton)</h2>
          <div className="border border-slate-100 dark:border-slate-700/50 rounded-lg p-2">
            <TableSkeleton rows={3} />
          </div>
        </div>

      </div>
    </div>
  );
}
