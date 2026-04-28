import React from 'react';
import { FilePlus } from 'lucide-react';

export default function BlankPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Blank Page</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Start building your custom view here.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
          Primary Action
        </button>
      </div>

      {/* Empty Canvas Area */}
      <div className="bg-white dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl min-h-[500px] flex flex-col items-center justify-center p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900/50 rounded-full flex items-center justify-center mb-4">
          <FilePlus className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Clean Canvas</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm">
          This is a blank page layout. It inherits all the padding, dark mode settings, and mobile responsiveness from the Dashboard Layout. Use this to build your own custom features.
        </p>
      </div>
      
    </div>
  );
}
