import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { Clock } from 'lucide-react';

// Mock data representing stock valuation segmented by age
const ageingData = [
  { bucket: '0-15 Days', freshProduce: 45000, fmcg: 120000, dairy: 35000 },
  { bucket: '16-30 Days', freshProduce: 12000, fmcg: 95000, dairy: 8000 },
  { bucket: '31-60 Days', freshProduce: 0, fmcg: 65000, dairy: 1200 },
  { bucket: '61-90 Days', freshProduce: 0, fmcg: 30000, dairy: 0 },
  { bucket: '> 90 Days', freshProduce: 0, fmcg: 15000, dairy: 0 }, // Dead stock risk
];

const InventoryAgeingChart = () => {
  const { isDark } = useTheme();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-lg shadow-lg">
          <p className="font-semibold text-slate-900 dark:text-white mb-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            {label}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-sm mt-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="text-slate-600 dark:text-slate-300 capitalize">
                  {entry.name.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <span className="font-medium text-slate-900 dark:text-white">
                ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" /> Stock Ageing Profile
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Inventory valuation by days in warehouse
          </p>
        </div>
      </div>
      
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ageingData}
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
            <XAxis 
              dataKey="bucket" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} 
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? '#1e293b' : '#f8fafc' }} />
            <Legend 
              iconType="circle" 
              wrapperStyle={{ paddingTop: '20px', fontSize: '13px', color: isDark ? '#cbd5e1' : '#475569' }} 
            />
            
            {/* Stacked Bars representing different categories */}
            <Bar dataKey="freshProduce" name="Fresh Produce" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} maxBarSize={48} />
            <Bar dataKey="dairy" name="Dairy & Chill" stackId="a" fill="#3b82f6" maxBarSize={48} />
            <Bar dataKey="fmcg" name="FMCG" stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryAgeingChart;