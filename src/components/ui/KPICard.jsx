import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const KPICard = ({ title, value, change, isPositive, data, icon: Icon }) => {
  const { isDark } = useTheme();
  
  // Dynamic color variables based on performance
  const strokeColor = isPositive ? (isDark ? '#34d399' : '#10b981') : (isDark ? '#fb7185' : '#e11d48');
  const gradientId = `kpi-gradient-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {Icon && <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />}
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</h3>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-4 h-4" />
          </button>
          <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-md ${
            isPositive 
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
              : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
          }`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {change}
          </div>
        </div>
      </div>

      {/* Sparkline Chart */}
      {data && data.length > 0 && (
        <div className="h-14 w-full -mx-1 mt-2 relative z-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={strokeColor} 
                strokeWidth={2} 
                fill={`url(#${gradientId})`} 
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default KPICard;