import React, { useEffect, useState } from 'react';
import { kpiApi } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    kpiApi.getMetrics().then(setMetrics);
  }, []);

  // Supermarket specific mock data
  const categorySales = [
    { name: 'FMCG', sales: 4000, margin: 8 },
    { name: 'Fresh Produce', sales: 3000, margin: 18 },
    { name: 'Dairy & Chill', sales: 2000, margin: 12 },
    { name: 'Electronics', sales: 2780, margin: 15 },
    { name: 'Apparel', sales: 1890, margin: 25 },
  ];

  if (!metrics) return <div className="animate-pulse space-y-4"><div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl w-full"></div></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Central Procurement Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Supermarket Division Metrics & Shelf-Life Alerts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI Cards */}
        <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Procurement (MTD)</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{metrics.procurement.value}</h3>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mt-2 inline-block">{metrics.procurement.change}</span>
        </div>
        <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-rose-200 dark:border-rose-900 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><AlertCircle className="w-16 h-16 text-rose-500" /></div>
          <p className="text-sm font-medium text-slate-500">Expiring in &lt; 7 Days</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">{metrics.expiringSoon.value} SKUs</h3>
          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-1 rounded-md mt-2 inline-block">{metrics.expiringSoon.change} from yesterday</span>
        </div>
        <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Vendor Fill Rate</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{metrics.vendorFillRate.value}</h3>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mt-2 inline-block">{metrics.vendorFillRate.change}</span>
        </div>
        <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Avg Stock Ageing</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{metrics.stockAgeing.value}</h3>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md mt-2 inline-block">{metrics.stockAgeing.change} Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2"><TrendingUp className="w-5 h-5 text-indigo-500" /> Category Performance</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySales} layout="vertical" margin={{ top: 0, right: 0, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={100} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="sales" radius={[0, 4, 4, 0]} barSize={24}>
                  {categorySales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.margin > 15 ? '#10b981' : '#4f46e5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}