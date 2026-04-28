import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors duration-200 text-center">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 max-w-md w-full animate-in zoom-in-95">
        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-rose-500" />
        </div>
        <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">Page not found</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been removed or renamed.
        </p>
        <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm">
          <Home className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}