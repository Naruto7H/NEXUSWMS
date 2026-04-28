import React, { useEffect, useState } from 'react';
import { inventoryApi } from '../services/api';
import { Search, Filter, Download, AlertTriangle, ScanLine } from 'lucide-react';
import toast from 'react-hot-toast';

import StatusBadge from '../components/ui/StatusBadge';
import TableSkeleton from '../components/ui/TableSkeleton';
import BarcodeScannerModal from '../components/scanner/BarcodeScannerModal';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);

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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Master Inventory</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsScannerOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 rounded-lg text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors">
            <ScanLine className="w-4 h-4" /> Scan SKU
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by SKU or Item Name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
          </div>
          <button className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Category Filter
          </button>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
             <TableSkeleton rows={5} />
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">SKU & Item Name</th>
                  <th className="px-6 py-3.5 font-semibold">Category</th>
                  <th className="px-6 py-3.5 font-semibold">Shelf Life</th>
                  <th className="px-6 py-3.5 font-semibold">Stock Level</th>
                  <th className="px-6 py-3.5 font-semibold">Velocity</th>
                  <th className="px-6 py-3.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
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
          )}
        </div>
      </div>

      <BarcodeScannerModal 
        isOpen={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)} 
        onScanSuccess={handleScanSuccess} 
      />
    </div>
  );
}