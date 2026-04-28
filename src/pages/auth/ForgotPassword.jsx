import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
        <div className="p-8 text-center border-b border-slate-100 dark:border-slate-700/50">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-xl mb-4 shadow-sm">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reset Password</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">We'll send you a link to reset your password.</p>
        </div>
        
        <div className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="email" placeholder="you@company.com" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white" />
            </div>
          </div>

          <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm mt-2">
            Send Reset Link
          </button>
        </div>
        
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 text-center border-t border-slate-100 dark:border-slate-700/50">
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
}