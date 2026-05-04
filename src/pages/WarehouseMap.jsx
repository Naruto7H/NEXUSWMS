import React, { useState } from 'react';
import { Map, AlertTriangle, Info, Package, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const warehouseData = [
  { id: 'A', name: 'Aisle A (Dry Goods)', racks: [
    { id: 'A1', capacity: 95, items: 142, status: 'critical' },
    { id: 'A2', capacity: 80, items: 110, status: 'warning' },
    { id: 'A3', capacity: 45, items: 65, status: 'good' },
    { id: 'A4', capacity: 20, items: 30, status: 'good' },
    { id: 'A5', capacity: 10, items: 15, status: 'empty' },
  ]},
  { id: 'B', name: 'Aisle B (FMCG)', racks: [
    { id: 'B1', capacity: 100, items: 150, status: 'critical' },
    { id: 'B2', capacity: 90, items: 135, status: 'warning' },
    { id: 'B3', capacity: 85, items: 120, status: 'warning' },
    { id: 'B4', capacity: 60, items: 85, status: 'good' },
    { id: 'B5', capacity: 50, items: 70, status: 'good' },
  ]},
  { id: 'C', name: 'Aisle C (Electronics)', racks: [
    { id: 'C1', capacity: 30, items: 40, status: 'good' },
    { id: 'C2', capacity: 25, items: 35, status: 'good' },
    { id: 'C3', capacity: 5, items: 5, status: 'empty' },
    { id: 'C4', capacity: 0, items: 0, status: 'empty' },
    { id: 'C5', capacity: 0, items: 0, status: 'empty' },
  ]},
  { id: 'D', name: 'Aisle D (Cold Storage)', racks: [
    { id: 'D1', capacity: 88, items: 112, status: 'warning' },
    { id: 'D2', capacity: 92, items: 125, status: 'critical' },
    { id: 'D3', capacity: 75, items: 95, status: 'warning' },
    { id: 'D4', capacity: 40, items: 50, status: 'good' },
    { id: 'D5', capacity: 15, items: 20, status: 'empty' },
  ]}
];

export default function WarehouseMap() {
  const [selectedRack, setSelectedRack] = useState(null);

  const getRackColor = (capacity) => {
    if (capacity >= 90) return 'bg-rose-500 hover:bg-rose-600 text-white';
    if (capacity >= 70) return 'bg-amber-400 hover:bg-amber-500 text-slate-900';
    if (capacity > 15) return 'bg-emerald-400 hover:bg-emerald-500 text-slate-900';
    return 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400';
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[calc(100vh-10rem)]">
      
      {/* Left Side: The Map Grid */}
      <div className={`flex-1 flex flex-col transition-all duration-500 ${selectedRack ? 'lg:mr-0' : ''}`}>
        
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Map className="w-6 h-6 text-indigo-500" /> Location Heatmap
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time capacity tracking across all warehouse zones.</p>
          </div>
          
          {/* Legend - FIXED: HTML entities used for symbols */}
          <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-slate-800 p-3 px-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-rose-500"></div> &gt;90% Full</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-amber-400"></div> 70-89%</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-emerald-400"></div> &lt;70%</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-700"></div> Empty</div>
          </div>
        </div>

        {/* Interactive Warehouse Grid */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 sm:p-10 flex-1 overflow-auto">
          
          <div className="min-w-[600px]">
            {/* Dock Area */}
            <div className="w-full h-16 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase mb-12 bg-slate-50 dark:bg-slate-900/40">
              Receiving & Dispatch Docks
            </div>

            <div className="grid grid-cols-4 gap-6 xl:gap-12">
              {warehouseData.map((aisle, idx) => (
                <motion.div 
                  key={aisle.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-t-xl border-b-2 border-indigo-500 text-xs font-black text-slate-600 dark:text-slate-400 mb-6 text-center w-full uppercase tracking-widest">
                    {aisle.name}
                  </div>
                  
                  <div className="space-y-4 w-full px-2">
                    {aisle.racks.map((rack) => (
                      <button 
                        key={rack.id}
                        onClick={() => setSelectedRack(rack)}
                        className={`w-full h-16 rounded-lg shadow-sm border border-black/5 dark:border-white/5 flex flex-col items-center justify-center transition-all group relative
                          ${getRackColor(rack.capacity)}
                          ${selectedRack?.id === rack.id ? 'ring-4 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900 scale-105 z-10' : 'hover:scale-105'}
                        `}
                      >
                        <span className="font-black text-xl tracking-tighter">{rack.id}</span>
                        <span className="text-[10px] font-bold opacity-70 uppercase">{rack.capacity}%</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Detail Drawer */}
      <AnimatePresence>
        {selectedRack && (
          <motion.div 
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-full lg:w-96 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
              <div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
                  Location {selectedRack.id}
                </h3>
                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-0.5">Physical Zone Analytics</p>
              </div>
              <button onClick={() => setSelectedRack(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-all text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 flex-1 overflow-y-auto space-y-8">
              
              {/* Animated Capacity Meter */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Utilization</span>
                  <span className={`text-2xl font-black ${selectedRack.capacity >= 90 ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                    {selectedRack.capacity}%
                  </span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden p-0.5 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedRack.capacity}%` }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className={`h-full rounded-full ${selectedRack.capacity >= 90 ? 'bg-rose-500' : selectedRack.capacity >= 70 ? 'bg-amber-400' : 'bg-emerald-400'} shadow-sm`}
                  />
                </div>
                {selectedRack.capacity >= 90 && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 mt-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 font-bold leading-tight">CRITICAL: Storage density exceeds safety thresholds for this zone.</p>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <Package className="w-5 h-5 text-indigo-500 mb-2" />
                  <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{selectedRack.items}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Stock Units</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <Info className="w-5 h-5 text-emerald-500 mb-2" />
                  <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Active</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Bin Status</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Inventory Manifest</h4>
                {selectedRack.items > 0 ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center justify-between p-3.5 border border-slate-100 dark:border-slate-700 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer bg-white dark:bg-slate-800 shadow-sm hover:shadow-md group">
                        <div className="flex gap-3 items-center">
                          <div className="w-8 h-8 rounded bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-[10px] font-black text-indigo-500 border border-slate-100 dark:border-slate-800 italic">SKU</div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">SKU-994{item}2</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">FMCG Division</p>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <p className="text-xs font-black text-slate-700 dark:text-slate-300">{Math.floor(selectedRack.items / 3)} u</p>
                          <ChevronRight className="w-4 h-4 text-slate-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center opacity-50">
                    <X className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="text-xs text-slate-500 font-black uppercase tracking-widest">Zone Empty</p>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-3">
                <button className="py-3 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700">
                  Audit
                </button>
                <button className="py-3 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                  Transfer
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
