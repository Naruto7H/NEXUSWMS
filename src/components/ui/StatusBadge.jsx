import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    // Procurement / PO Statuses
    Pending: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20',
    Approved: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200/60 dark:border-blue-500/20',
    Shipped: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-500/20',
    Delivered: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/20',
    
    // Inventory Statuses
    Optimal: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/20',
    'Low Stock': 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20',
    'Out of Stock': 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200/60 dark:border-rose-500/20',
    Reorder: 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border-purple-200/60 dark:border-purple-500/20',
  };

  const defaultStyle = 'bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';

  return (
    <span className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-md border ${styles[status] || defaultStyle}`}>
      {status}
    </span>
  );
};

export default StatusBadge;