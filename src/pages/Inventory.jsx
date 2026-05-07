import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { inventoryApi } from '../services/api';
import { Search, Filter, Download, AlertTriangle, ScanLine, ArrowUpDown, MoreHorizontal, X, Edit3, Package } from 'lucide-react';
import toast from 'react-hot-toast';

import StatusBadge from '../components/ui/StatusBadge';
import TableSkeleton from '../components/ui/TableSkeleton';
import BarcodeScannerModal from '../components/scanner/BarcodeScannerModal';
import Pagination from '../components/ui/Pagination';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  
  const location = useLocation();
  const scannerTriggered = useRef(false); // Memory lock

  useEffect(() => {
    // If we came from the Dashboard "Scan" button AND haven't triggered it yet during this visit...
    if (location.state?.openScanner && !scannerTriggered.current) {
      scannerTriggered.current = true; // Lock it so it doesn't re-trigger if React re-renders
      setIsScannerOpen(true);
    }
  }, [location.state]);

  useEffect(() => {
    inventoryApi.getInventory().then(data => {
      setInventory(data);
      setLoading(false);
    });
  }, []);

  const handleExport = async () => {
    const loadingToast = toast.loading('Generating CSV report...');
    const res = await inventoryApi.exportToCSV();
    if(res.success) {
      toast.success('Inventory report downloaded successfully!', { id: loadingToast });
    }
  };

  const handleScanSuccess = (decodedText) => {
    setSearch(decodedText);
  };

  const filteredData = inventory.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredData.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Master Inventory</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setIsScannerOpen(true)} className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors shadow-sm">
            <ScanLine className="w-4 h-4" /> Scan SKU
          </button>
          <button onClick={handleExport} className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search SKU or Item Name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-colors dark:text-white" 
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 sm:flex-none justify-center px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-4"><TableSkeleton rows={5} /></div>
        ) : (
          <>
            {/* DESKTOP VIEW */}
            <div className="hidden md:block overflow-x-auto min-h-[400px]">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-4 w-12">
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll}
                        checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                        className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-slate-800 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
                      />
                    </th>
                    <th className="px-6 py-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                      <div className="flex items-center justify-between">SKU & Item Name <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" /></div>
                    </th>
                    <th className="px-6 py-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                      <div className="flex items-center justify-between">Category <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" /></div>
                    </th>
                    <th className="px-6 py-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                      <div className="flex items-center justify-between">Shelf Life <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" /></div>
                    </th>
                    <th className="px-6 py-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                      <div className="flex items-center justify-between">Stock Level <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" /></div>
                    </th>
                    <th className="px-6 py-4 font-semibold">Velocity</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                  {filteredData.map((item) => (
                    <tr key={item.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${selectedIds.includes(item.id) ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : ''}`}>
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelectOne(item.id)}
                          className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-slate-800 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 dark:text-slate-100">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.id} • {item.vendor}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{item.category}</td>
                      <td className="px-6 py-4">
                        {item.shelfLifeDays ? (
                          <div className={`flex items-center gap-1 ${item.shelfLifeDays < 5 ? 'text-rose-600 font-bold' : 'text-slate-600 dark:text-slate-400'}`}>
                            {item.shelfLifeDays < 5 && <AlertTriangle className="w-3.5 h-3.5" />}
                            {item.shelfLifeDays} Days
                          </div>
                        ) : <span className="text-slate-400">N/A</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(item.stock / item.capacity) * 100}%` }}></div>
                          </div>
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{item.stock}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{item.speed}</td>
                      <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE VIEW */}
            <div className="md:hidden flex flex-col gap-4 p-4 min-h-[400px] bg-slate-50/50 dark:bg-slate-900/10">
              <div className="flex items-center gap-2 mb-2 px-1">
                <input 
                  type="checkbox" 
                  onChange={handleSelectAll}
                  checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                  className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 dark:bg-slate-700"
                />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Select All</span>
              </div>
              
              {filteredData.map((item) => (
                <div key={item.id} className={`bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border transition-all ${selectedIds.includes(item.id) ? 'border-indigo-500 ring-1 ring-indigo-500/50' : 'border-slate-200 dark:border-slate-700'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleSelectOne(item.id)}
                        className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 dark:bg-slate-700"
                      />
                      <StatusBadge status={item.status} />
                    </div>
                    {item.shelfLifeDays && item.shelfLifeDays < 5 && (
                      <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-1 rounded-md text-xs font-bold">
                        <AlertTriangle className="w-3 h-3" /> {item.shelfLifeDays}d left
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{item.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.id} • {item.vendor}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg mb-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Category</p>
                      <p className="font-medium text-slate-700 dark:text-slate-300 truncate">{item.category}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Velocity</p>
                      <p className="font-medium text-slate-700 dark:text-slate-300">{item.speed}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Stock</span>
                      <span className="text-sm font-black text-slate-700 dark:text-slate-300">{item.stock} <span className="text-xs font-medium text-slate-400">/ {item.capacity}</span></span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.stock < 20 ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${(item.stock / item.capacity) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
          <Pagination totalItems={142} itemsPerPage={filteredData.length} />
        </div>
      </div>

      {/* Floating Action Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 shadow-2xl rounded-2xl px-3 py-2 sm:px-5 sm:py-3 flex items-center gap-3 sm:gap-4 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300 w-max max-w-[95vw]">
          <div className="flex items-center gap-2 sm:gap-3 border-r border-slate-700 pr-3 sm:pr-5">
            <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-inner flex-shrink-0">
              {selectedIds.length}
            </span>
            <span className="text-sm font-medium text-slate-200 hidden sm:block">Selected</span>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => {toast.success('Inventory adjustments initiated.'); setSelectedIds([])}} className="text-xs sm:text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-400/10 px-2 sm:px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
              <Edit3 className="w-4 h-4" /> <span className="hidden sm:inline">Bulk Adjust</span><span className="sm:hidden">Adjust</span>
            </button>
            <button onClick={() => {handleExport(); setSelectedIds([])}} className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-2 sm:px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5">
              <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export Selected</span><span className="sm:hidden">Export</span>
            </button>
          </div>
          
          <button onClick={() => setSelectedIds([])} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border-l border-slate-700 pl-3 sm:pl-4 flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Conditionally Render the Scanner Modal */}
      {isScannerOpen && (
        <BarcodeScannerModal 
          isOpen={isScannerOpen} 
          onClose={() => setIsScannerOpen(false)} 
          onScanSuccess={handleScanSuccess} 
        />
      )}
    </div>
  );
}
