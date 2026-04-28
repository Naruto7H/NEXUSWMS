import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MoreVertical, Plus, ArrowUpDown, CheckCircle2, X, Download } from 'lucide-react';
import toast from 'react-hot-toast';

import StatusBadge from '../components/ui/StatusBadge';
import RequireRole from '../components/auth/RequireRole';
import { DownloadPOButton } from '../components/pdf/PurchaseOrderPDF';
import Pagination from '../components/ui/Pagination';

const initialOrders = [
  { id: 'PO-8472', supplier: 'Al Ain Farms', date: '2026-04-28', amount: '$12,450', status: 'Pending' },
  { id: 'PO-8471', supplier: 'TechCorp Electronics', date: '2026-04-27', amount: '$45,000', status: 'Approved' },
  { id: 'PO-8470', supplier: 'Malabar Plaza', date: '2026-04-26', amount: '$3,250', status: 'Shipped' },
  { id: 'PO-8469', supplier: 'Nexus Packaging Co.', date: '2026-04-25', amount: '$4,120', status: 'Delivered' },
];

export default function PurchaseOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedIds, setSelectedIds] = useState([]);

  // --- Bulk Selection Logic ---
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(orders.map(o => o.id));
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

  const handleBulkApprove = () => {
    setOrders(orders.map(o => selectedIds.includes(o.id) ? { ...o, status: 'Approved' } : o));
    toast.success(`${selectedIds.length} purchase orders approved successfully.`);
    setSelectedIds([]); // Clear selection after action
  };

  const handleApprove = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: 'Approved' } : o));
    toast.success(`Purchase Order ${id} approved.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 relative">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Purchase Orders</h1>
        </div>
        <Link to="/po/new" className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Create PO
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
        
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search PO Number or Supplier..." className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white transition-all" />
          </div>
          <button className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors">
            <Filter className="w-4 h-4" /> Filter Status
          </button>
        </div>
        
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
              <tr>
                {/* Master Checkbox */}
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedIds.length === orders.length && orders.length > 0}
                    className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-slate-800 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center justify-between">PO Number <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" /></div>
                </th>
                <th className="px-6 py-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center justify-between">Supplier Name <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" /></div>
                </th>
                <th className="px-6 py-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center justify-between">Date <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" /></div>
                </th>
                <th className="px-6 py-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center justify-between">Amount <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-colors" /></div>
                </th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
              {orders.map((order) => (
                <tr key={order.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${selectedIds.includes(order.id) ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : ''}`}>
                  {/* Row Checkbox */}
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(order.id)}
                      onChange={() => handleSelectOne(order.id)}
                      className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-slate-800 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{order.id}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{order.supplier}</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{order.date}</td>
                  <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">{order.amount}</td>
                  <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                  
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                    {order.status === 'Pending' ? (
                      <RequireRole allowedRoles={['Central Buyer', 'Admin']}>
                        <button onClick={() => handleApprove(order.id)} className="text-xs font-medium bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 px-3 py-1.5 rounded-md transition-colors border border-indigo-200 dark:border-indigo-500/20">
                          Quick Approve
                        </button>
                      </RequireRole>
                    ) : (
                      <DownloadPOButton order={order} />
                    )}
                    <button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-1">
                      <MoreVertical className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
          <Pagination totalItems={32} itemsPerPage={orders.length} />
        </div>
      </div>

      {/* Floating Action Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 shadow-2xl rounded-2xl px-5 py-3 flex items-center gap-4 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="flex items-center gap-3 border-r border-slate-700 pr-5">
            <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-inner">
              {selectedIds.length}
            </span>
            <span className="text-sm font-medium text-slate-200">Selected</span>
          </div>
          
          <div className="flex items-center gap-2 pr-2">
            <button onClick={handleBulkApprove} className="text-sm font-medium text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Bulk Approve
            </button>
            <button onClick={() => toast.success('Exporting selected records...')} className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
          
          <button onClick={() => setSelectedIds([])} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border-l border-slate-700 pl-4 ml-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
