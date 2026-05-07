import React, { useState, useMemo, useEffect } from 'react';
import { 
  Map, AlertTriangle, Info, Package, ChevronRight, X, 
  Search, Sparkles, ArrowRightLeft, ClipboardCheck, Activity 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const initialWarehouseData = [
  { id: 'A', name: 'Aisle A (Dry Goods)', congestionRisk: 15, racks: [
    { id: 'A1', capacity: 95, items: 142, status: 'critical', inventory: [{ sku: 'SKU-2291', name: 'Basmati Rice Premium 5kg', qty: 142 }] },
    { id: 'A2', capacity: 80, items: 110, status: 'warning', inventory: [{ sku: 'SKU-1092', name: 'Ariel Matic Front Load', qty: 110 }] },
    { id: 'A3', capacity: 45, items: 65, status: 'good', inventory: [] },
    { id: 'A4', capacity: 20, items: 30, status: 'good', inventory: [] },
    { id: 'A5', capacity: 10, items: 15, status: 'empty', inventory: [] },
  ]},
  { id: 'B', name: 'Aisle B (FMCG)', congestionRisk: 85, racks: [
    { id: 'B1', capacity: 100, items: 150, status: 'critical', inventory: [{ sku: 'SKU-4431', name: 'OnePlus Nord 5', qty: 150 }] },
    { id: 'B2', capacity: 90, items: 135, status: 'warning', inventory: [] },
    { id: 'B3', capacity: 85, items: 120, status: 'warning', inventory: [] },
    { id: 'B4', capacity: 60, items: 85, status: 'good', inventory: [] },
    { id: 'B5', capacity: 50, items: 70, status: 'good', inventory: [] },
  ]},
  { id: 'C', name: 'Aisle C (Cold Storage)', congestionRisk: 40, racks: [
    { id: 'C1', capacity: 88, items: 112, status: 'warning', inventory: [{ sku: 'SKU-7721', name: 'Al Ain Fresh Milk 2L', qty: 112 }] },
    { id: 'C2', capacity: 92, items: 125, status: 'critical', inventory: [{ sku: 'SKU-8922', name: 'Fresh Norwegian Salmon', qty: 125 }] },
    { id: 'C3', capacity: 75, items: 95, status: 'warning', inventory: [] },
    { id: 'C4', capacity: 40, items: 50, status: 'good', inventory: [] },
    { id: 'C5', capacity: 15, items: 20, status: 'empty', inventory: [] },
  ]}
];

export default function WarehouseMap() {
  const [warehouseData, setWarehouseData] = useState(initialWarehouseData);
  const [selectedRack, setSelectedRack] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTransferMode, setIsTransferMode] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setWarehouseData(prev => prev.map(aisle => ({
        ...aisle,
        congestionRisk: Math.max(10, Math.min(95, aisle.congestionRisk + (Math.random() > 0.5 ? 5 : -5)))
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRackClick = (rack) => {
    if (isTransferMode && selectedRack) {
      if (rack.id === selectedRack.id) {
        setIsTransferMode(false);
        return;
      }
      toast.success(`Transferred inventory from ${selectedRack.id} to ${rack.id}`);
      setIsTransferMode(false);
      setSelectedRack(null);
    } else {
      setSelectedRack(rack);
    }
  };

  const handleAudit = () => {
    toast.success(`Audit task created for Location ${selectedRack?.id}`);
  };

  const getRackColor = (capacity, isHighlighted, isTransferTarget) => {
    if (isTransferTarget) return 'bg-indigo-500 text-white animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]';
    if (isHighlighted) return 'bg-purple-500 text-white ring-4 ring-purple-300 dark:ring-purple-900 shadow-[0_0_20px_rgba(168,85,247,0.6)] scale-110 z-20';
    if (capacity >= 90) return 'bg-rose-500 hover:bg-rose-600 text-white';
    if (capacity >= 70) return 'bg-amber-400 hover:bg-amber-500 text-slate-900';
    if (capacity > 15) return 'bg-emerald-400 hover:bg-emerald-500 text-slate-900';
    return 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400';
  };

  const query = searchQuery.toLowerCase();
  const searchResults = useMemo(() => {
    if (!query) return new Set();
    const results = new Set();
    warehouseData.forEach(aisle => {
      aisle.racks.forEach(rack => {
        if (rack.id.toLowerCase().includes(query)) results.add(rack.id);
        if (rack.inventory.some(item => item.name.toLowerCase().includes(query) || item.sku.toLowerCase().includes(query))) {
          results.add(rack.id);
        }
      });
    });
    return results;
  }, [query, warehouseData]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[calc(100vh-10rem)] w-full">
      
      {/* Left Side: Map UI - ADDED min-w-0 HERE */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ${selectedRack ? 'lg:mr-0' : ''}`}>
        
        {/* Header & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="min-w-[250px]">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Map className="w-6 h-6 text-indigo-500" /> Live Heatmap
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time spatial utilization & AI congestion mapping.</p>
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-auto shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Find SKU or Rack ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white shadow-sm transition-all"
              />
            </div>
            <button 
              onClick={() => setAiEnabled(!aiEnabled)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm border ${aiEnabled ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`}
            >
              <Sparkles className="w-4 h-4" /> AI Insights {aiEnabled ? 'On' : 'Off'}
            </button>
          </div>
        </div>

        {/* AI Insight Banner */}
        <AnimatePresence>
          {aiEnabled && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl text-white shadow-md flex items-start sm:items-center gap-4">
                <div className="p-2 bg-white/20 rounded-lg shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Predictive Logistics Alert</h4>
                  <p className="text-xs text-purple-100 mt-0.5 leading-snug">
                    <strong>Aisle B</strong> is predicted to reach 95% congestion in 45 minutes due to 3 scheduled FMCG dock arrivals. Suggest routing put-away tasks to Aisle A.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Warehouse Grid - ADDED overflow-x-auto HERE */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 flex-1 overflow-x-auto relative">
          
          {isTransferMode && (
             <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-xl z-50 animate-pulse">
               <ArrowRightLeft className="w-4 h-4" /> Select destination rack for transfer
               <button onClick={() => setIsTransferMode(false)} className="ml-2 hover:text-rose-400 transition-colors"><X className="w-4 h-4" /></button>
             </div>
          )}

          <div className="min-w-[600px] pb-10">
            <div className="w-full h-12 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center text-slate-400 font-bold tracking-widest uppercase mb-10 bg-slate-50 dark:bg-slate-900/40">
              Receiving Docks
            </div>

            <div className="flex justify-around gap-6">
              {warehouseData.map((aisle, idx) => (
                <motion.div 
                  key={aisle.id} 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center flex-1 max-w-[200px]"
                >
                  <div className="relative w-full">
                    {/* AI Congestion Heatmap Overlay */}
                    {aiEnabled && aisle.congestionRisk > 70 && (
                      <div className="absolute -inset-4 bg-rose-500/10 dark:bg-rose-500/20 blur-xl rounded-full z-0 animate-pulse"></div>
                    )}
                    
                    <div className={`relative z-10 px-4 py-2 rounded-t-xl border-b-4 text-xs font-black mb-6 text-center w-full uppercase tracking-widest ${aiEnabled && aisle.congestionRisk > 70 ? 'border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : 'border-indigo-500 bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400'}`}>
                      {aisle.name}
                      {aiEnabled && <div className="text-[9px] mt-1 opacity-80">Traffic Risk: {aisle.congestionRisk}%</div>}
                    </div>
                  </div>
                  
                  <div className="space-y-3 w-full px-2 relative z-10">
                    {aisle.racks.map((rack) => {
                      const isHighlighted = searchResults.has(rack.id);
                      const isTransferTarget = isTransferMode && selectedRack?.id !== rack.id;
                      
                      return (
                        <button 
                          key={rack.id}
                          onClick={() => handleRackClick(rack)}
                          disabled={isTransferMode && selectedRack?.id === rack.id}
                          className={`w-full h-16 rounded-lg shadow-sm border border-black/5 dark:border-white/5 flex flex-col items-center justify-center transition-all duration-300 group relative
                            ${getRackColor(rack.capacity, isHighlighted, isTransferTarget)}
                            ${selectedRack?.id === rack.id && !isTransferMode ? 'ring-4 ring-indigo-500 scale-105 z-10' : 'hover:scale-105'}
                            ${isTransferMode && selectedRack?.id === rack.id ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                        >
                          <span className="font-black text-xl tracking-tighter">{rack.id}</span>
                          <span className="text-[10px] font-bold opacity-80 uppercase">{rack.capacity}% Full</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Detail Drawer - ENSURED max-h so it stays in viewport */}
      <AnimatePresence>
        {selectedRack && !isTransferMode && (
          <motion.div 
            initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}
            className="w-full lg:w-96 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden shrink-0 lg:sticky lg:top-0 h-auto lg:max-h-[calc(100vh-8rem)]"
          >
            <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30 shrink-0">
              <div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">Location {selectedRack.id}</h3>
                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-0.5">Physical Zone Analytics</p>
              </div>
              <button onClick={() => setSelectedRack(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-400 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Utilization</span>
                  <span className={`text-2xl font-black ${selectedRack.capacity >= 90 ? 'text-rose-500' : 'text-slate-900 dark:text-white'}`}>
                    {selectedRack.capacity}%
                  </span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${selectedRack.capacity}%` }}
                    className={`h-full ${selectedRack.capacity >= 90 ? 'bg-rose-500' : selectedRack.capacity >= 70 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <Package className="w-5 h-5 text-indigo-500 mb-2" />
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{selectedRack.items}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black">Stock Units</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <Info className="w-5 h-5 text-emerald-500 mb-2" />
                  <p className="text-lg font-black text-slate-900 dark:text-white mt-1 capitalize">{selectedRack.status}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black">Status</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest border-b border-slate-100 dark:border-slate-700 pb-2">Stored SKUs</h4>
                {selectedRack.inventory && selectedRack.inventory.length > 0 ? (
                  selectedRack.inventory.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
                      <div className="min-w-0 pr-3">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{item.sku}</p>
                      </div>
                      <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 whitespace-nowrap">{item.qty} units</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 text-center py-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">No active SKUs in this rack.</p>
                )}
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 grid grid-cols-2 gap-3 shrink-0">
              <button onClick={handleAudit} className="flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm">
                <ClipboardCheck className="w-4 h-4" /> Audit
              </button>
              <button onClick={() => setIsTransferMode(true)} className="flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white text-xs font-bold uppercase rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20">
                <ArrowRightLeft className="w-4 h-4" /> Transfer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
