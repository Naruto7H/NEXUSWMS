import React, { useEffect, useState } from 'react';
import { kpiApi } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, DollarSign, AlertCircle, PackageCheck, Clock } from 'lucide-react';

// Import our new UI components
import KPICard from '../components/ui/KPICard';
import InventoryAgeingChart from '../components/charts/InventoryAgeingChart';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    kpiApi.getMetrics().then(setMetrics);
  }, []);

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

      {/* Replaced hardcoded cards with KPICard component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Procurement" value={metrics.procurement.value} change={metrics.procurement.change} isPositive={metrics.procurement.isPositive} icon={DollarSign} data={[{value: 10}, {value: 20}, {value: 15}, {value: 30}, {value: 25}]} />
        <KPICard title="Expiring < 7 Days" value={metrics.expiringSoon.value + ' SKUs'} change={metrics.expiringSoon.change} isPositive={metrics.expiringSoon.isPositive} icon={AlertCircle} data={[{value: 5}, {value: 8}, {value: 12}, {value: 15}, {value: 10}]} />
        <KPICard title="Vendor Fill Rate" value={metrics.vendorFillRate.value} change={metrics.vendorFillRate.change} isPositive={metrics.vendorFillRate.isPositive} icon={PackageCheck} data={[{value: 90}, {value: 92}, {value: 91}, {value: 94}, {value: 94}]} />
        <KPICard title="Avg Stock Ageing" value={metrics.stockAgeing.value} change={metrics.stockAgeing.change} isPositive={metrics.stockAgeing.isPositive} icon={Clock} data={[{value: 20}, {value: 19}, {value: 21}, {value: 18}, {value: 18}]} />
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
        
        {/* Added the connected Ageing Chart component here */}
        <InventoryAgeingChart />
      </div>
    </div>
  );
}
