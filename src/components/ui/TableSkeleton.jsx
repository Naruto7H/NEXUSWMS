import React from 'react';

export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="w-full animate-pulse p-4">
      {/* Header Skeleton */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/5"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/6"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/6"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/6"></div>
      </div>
      
      {/* Row Skeletons */}
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-4 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex flex-col gap-2 w-1/4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2"></div>
          </div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/5"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/6"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/6"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16 ml-auto"></div>
        </div>
      ))}
    </div>
  );
}