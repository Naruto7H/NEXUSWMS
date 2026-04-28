import React, { useState } from 'react';
import { Map, AlertTriangle, Info, Package, Search, ChevronRight, X } from 'lucide-react';

// Mock Data for Warehouse Aisles & Racks
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

  // Helper function to color the racks based on capacity
  const getRackColor = (capacity) => {
    if (capacity >= 90) return 'bg-rose-500 hover:bg-rose-600 text-white';
    if (capacity >= 70) return 'bg-amber-400 hover:bg-amber-500 text-slate-900';
    if (capacity > 15) return 'bg-emerald-400 hover:bg-emerald-500 text-slate-900';
    return 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 flex h-[calc(100vh-8rem)]">
      
      {/* Left Side: The Map */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${selectedRack ? 'pr-6 hidden lg:flex' : ''}`}>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Map className="w-6 h-6 text-indigo-500" /> Location Heatmap
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time capacity tracking across all warehouse zones.</p>
          </div>
          
          {/* Map Legend */}
          <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-2 px-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-rose-500"></div> >90% Full</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-amber-400"></div> 70-89%</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-400"></div> <span className="font-sans">&lt;</span>70%</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700"></div> Empty</div>
          </div>
        </div>

        {/* The Grid Map */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-8 flex-1 overflow-auto relative min-h-[500px]">
          
          {/* Dock Area Representation */}
          <div className="w-full h-16 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex items-center justify-center text-slate-400 font-bold tracking-widest uppercase mb-12 bg-slate-50 dark:bg-slate-900/50">
            Loading Docks / Receiving Area
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {warehouseData.map((aisle) => (
              <div key={aisle.id} className="flex flex-col items-center">
                <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-t-lg border-b-2 border-indigo-500 text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 text-center w-full">
                  {aisle.name}
                </div>
                
                {/* Racks in the aisle */}
                <div className="space-y-3 w-full max-w-[120px]">
                  {aisle.racks.map((rack) => (
                    <button 
                      key={rack.id}
                      onClick={() => setSelectedRack(rack)}
                      className={`w-full h-16 rounded-md shadow-sm border border-black/5 dark:border-white/5 flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-md
                        ${getRackColor(rack.capacity)}
                        ${selectedRack?.id === rack.id ? 'ring-4 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-800 scale-105 shadow-lg' : ''}
                      `}
                    >
                      <span className="font-black text-lg">{rack.id}</span>
                      <span className="text-[10px] font-medium opacity-80">{rack.capacity}%</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Right Side: Detail Drawer (Shows when a rack is clicked) */}
      {selectedRack && (
        <div className="w-full lg:w-96 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl flex flex-col animate-in slide-in-from-right-8 duration-300">
          
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 rounded-t-xl">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                Location {selectedRack.id}
              </h3>
              <p className="text-xs text-slate-500">Zone Details</p>
            </div>
            <button onClick={() => setSelectedRack(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            
            {/* Capacity Meter */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Total Capacity</span>
                <span className={`text-xl font-black ${selectedRack.capacity >= 90 ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                  {selectedRack.capacity}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${selectedRack.capacity >= 90 ? 'bg-rose-500' : selectedRack.capacity >= 70 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                  style={{ width: `${selectedRack.capacity}%` }}
                ></div>
              </div>
              {selectedRack.capacity >= 90 && (
                <p className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium">
                  <AlertTriangle className="w-3 h-3" /> Location at maximum safe capacity.
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700/50">
                <Package className="w-5 h-5 text-indigo-500 mb-2" />
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedRack.items}</p>
                <p className="text-xs text-slate-500 font-medium">Total Items</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700/50">
                <Info className="w-5 h-5 text-emerald-500 mb-2" />
                <p className="text-2xl font-bold text-slate-900 dark:text-white">Active</p>
                <p className="text-xs text-slate-500 font-medium">Bin Status</p>
              </div>
            </div>

            {/* Current Inventory List (Mock) */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Stored Items</h4>
              {selectedRack.items > 0 ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-300 transition-colors cursor-pointer group">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">SKU-994{item}2</p>
                        <p className="text-xs text-slate-500">FMCG Category</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{Math.floor(selectedRack.items / 3)} units</p>
                        <ChevronRight className="w-4 h-4 text-slate-400 inline" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-center">
                  <p className="text-sm text-slate-500 font-medium">This location is entirely empty.</p>
                </div>
              )}
            </div>

          </div>

          {/* Drawer Actions */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-b-xl gap-2 flex">
            <button className="flex-1 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
              Cycle Count
            </button>
            <button className="flex-1 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              Move Stock
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
