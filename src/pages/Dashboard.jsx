import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { kpiApi } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, DollarSign, AlertCircle, PackageCheck, Clock, Plus, ScanLine, ArrowRight, BellRing } from 'lucide-react';

import KPICard from '../components/ui/KPICard';
import InventoryAgeingChart from '../components/charts/InventoryAgeingChart';
import StatusBadge from '../components/ui/StatusBadge';

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

  const recentPOs = [
    { id: 'PO-8472', supplier: 'Al Ain Farms', amount: '$12,450', status: 'Pending' },
    { id: 'PO-8471', supplier: 'TechCorp Electronics', amount: '$45,000', status: 'Approved' },
    { id: 'PO-8470', supplier: 'Malabar Plaza', amount: '$3,250', status: 'Shipped' },
  ];

  const criticalAlerts = [
    { id: 1, text: 'Fresh Norwegian Salmon dropping below minimum threshold.', time: '10 mins ago', type: 'critical' },
    { id: 2, text: 'Al Ain Fresh Milk 2L batch expiring in 48 hours.', time: '1 hour ago', type: 'warning' },
    { id: 3, text: 'Pending PO-8472 requires Central Buyer approval.', time: '2 hours ago', type: 'action' },
  ];

  if (!metrics) return <div className="animate-pulse space-y-4"><div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl w-full"></div></div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Central Procurement Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Supermarket Division Metrics & Shelf-Life Alerts.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {/* Linked with state to auto-open scanner on the Inventory page */}
          <Link 
            to="/inventory" 
            state={{ openScanner: true }} 
            className="flex-1 md:flex-none flex justify-center items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ScanLine className="w-4 h-4" /> Scan
          </Link>
          <Link to="/po" className="flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Create PO
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Procurement" value={metrics.procurement.value} change={metrics.procurement.change} isPositive={metrics.procurement.isPositive} icon={DollarSign} data={[{value: 10}, {value: 20}, {value: 15}, {value: 30}, {value: 25}]} />
        <KPICard title="Expiring < 7 Days" value={metrics.expiringSoon.value + ' SKUs'} change={metrics.expiringSoon.change} isPositive={metrics.expiringSoon.isPositive} icon={AlertCircle} data={[{value: 5}, {value: 8}, {value: 12}, {value: 15}, {value: 10}]} />
        <KPICard title="Vendor Fill Rate" value={metrics.vendorFillRate.value} change={metrics.vendorFillRate.change} isPositive={metrics.vendorFillRate.isPositive} icon={PackageCheck} data={[{value: 90}, {value: 92}, {value: 91}, {value: 94}, {value: 94}]} />
        <KPICard title="Avg Stock Ageing" value={metrics.stockAgeing.value} change={metrics.stockAgeing.change} isPositive={metrics.stockAgeing.isPositive} icon={Clock} data={[{value: 20}, {value: 19}, {value: 21}, {value: 18}, {value: 18}]} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" /> Category Performance
            </h2>
          </div>
          <div className="h-[300px]">
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
        
        {/* Inventory Ageing Chart */}
        <InventoryAgeingChart />
        
      </div>

      {/* Bottom Row: Actions & Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent POs Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Purchase Orders</h2>
            <Link to="/po" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3 font-semibold">PO Number</th>
                  <th className="px-6 py-3 font-semibold">Supplier</th>
                  <th className="px-6 py-3 font-semibold">Amount</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                {recentPOs.map((po) => (
                  <tr key={po.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-3 font-medium text-slate-900 dark:text-white">{po.id}</td>
                    <td className="px-6 py-3 text-slate-600 dark:text-slate-300">{po.supplier}</td>
                    <td className="px-6 py-3 text-slate-900 dark:text-white font-medium">{po.amount}</td>
                    <td className="px-6 py-3"><StatusBadge status={po.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Critical Alerts Feed */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <BellRing className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">System Alerts</h2>
          </div>
          <div className="p-5 flex-1 space-y-4">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className="flex gap-3 items-start border-b border-slate-100 dark:border-slate-700/50 pb-4 last:border-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  alert.type === 'critical' ? 'bg-rose-500' : 
                  alert.type === 'warning' ? 'bg-amber-500' : 'bg-indigo-500'
                }`}></div>
                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-snug">{alert.text}</p>
                  <span className="text-xs text-slate-400 mt-1 block">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
