import React from 'react';
import { User, Building, Shield, Mail, Upload } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">System Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your account preferences and application configurations.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 p-4 space-y-1 bg-slate-50/50 dark:bg-slate-800/50">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg text-sm transition-colors text-left">
            <User className="w-4 h-4" /> Profile Details
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg text-sm transition-colors text-left">
            <Building className="w-4 h-4" /> Company Info
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg text-sm transition-colors text-left">
            <Shield className="w-4 h-4" /> Security
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg text-sm transition-colors text-left">
            <Mail className="w-4 h-4" /> Notifications
          </button>
        </div>
        
        {/* Settings Form Content */}
        <div className="flex-1 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Profile Details</h3>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-2xl shadow-md border-4 border-white dark:border-slate-800">
              SN
            </div>
            <div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Upload Avatar
                </button>
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  Remove
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">First Name</label>
              <input type="text" defaultValue="Suhail" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Last Name</label>
              <input type="text" defaultValue="Nizar" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow text-slate-900 dark:text-white" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
              <input type="email" defaultValue="suhail.nizar@nexawms.com" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow text-slate-900 dark:text-white" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Role</label>
              <select defaultValue="Central Buyer" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow text-slate-900 dark:text-white">
                <option>Central Buyer</option>
                <option>Procurement Manager</option>
                <option>Warehouse Supervisor</option>
                <option>Administrator</option>
              </select>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
            <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}