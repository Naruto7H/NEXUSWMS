import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, FileText, Building, Calendar, Package, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreatePO() {
  const navigate = useNavigate();
  
  // Form State
  const [vendor, setVendor] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [expectedDate, setExpectedDate] = useState('');
  
  // Dynamic Items State
  const [items, setItems] = useState([
    { id: 1, description: '', sku: '', qty: 1, price: 0 }
  ]);

  // Derived Totals
  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const tax = subtotal * 0.05; // 5% mock tax
  const total = subtotal + tax;

  const handleAddItem = () => {
    const newItem = { id: Date.now(), description: '', sku: '', qty: 1, price: 0 };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id) => {
    if (items.length === 1) return toast.error("You must have at least one item.");
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vendor) return toast.error("Please select a vendor.");
    if (items.some(i => !i.description || i.qty <= 0)) return toast.error("Please fill out all item fields correctly.");
    
    // Mock submission
    const toastId = toast.loading('Creating Purchase Order...');
    setTimeout(() => {
      toast.success('Purchase Order PO-8473 Created!', { id: toastId });
      navigate('/po');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/po" className="text-slate-500 hover:text-indigo-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-sm font-medium text-slate-500">Back to Orders</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-500" /> Create Purchase Order
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Submit Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Vendor & Details */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Building className="w-4 h-4 text-slate-400" /> Vendor Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Select Supplier *</label>
                <select 
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
                >
                  <option value="">-- Choose Supplier --</option>
                  <option value="VND-001">Al Ain Farms</option>
                  <option value="VND-002">TechCorp Electronics</option>
                  <option value="VND-003">Malabar Plaza</option>
                  <option value="VND-005">P&G Trading</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Supplier Reference / Quote #</label>
                <input type="text" placeholder="e.g. QTE-99381" className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-slate-400" /> Schedule
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Order Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Expected Delivery Date *</label>
                <input type="date" value={expectedDate} onChange={(e) => setExpectedDate(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Line Items & Totals */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-400" /> Line Items
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-5 py-3 font-medium w-10"></th>
                    <th className="px-5 py-3 font-medium">Item Description & SKU</th>
                    <th className="px-5 py-3 font-medium w-24">Qty</th>
                    <th className="px-5 py-3 font-medium w-32">Unit Price ($)</th>
                    <th className="px-5 py-3 font-medium w-24 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                      <td className="px-5 py-3 text-slate-400">
                        <button onClick={() => handleRemoveItem(item.id)} className="p-1.5 text-rose-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 rounded-md transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex flex-col gap-1.5">
                          <input type="text" placeholder="Item description" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} className="w-full bg-transparent border border-slate-200 dark:border-slate-700 rounded-md p-1.5 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white placeholder-slate-400" />
                          <input type="text" placeholder="SKU/Code" value={item.sku} onChange={(e) => handleItemChange(item.id, 'sku', e.target.value)} className="w-full bg-transparent border border-slate-200 dark:border-slate-700 rounded-md p-1.5 text-xs outline-none focus:border-indigo-500 text-slate-500 placeholder-slate-400" />
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <input type="number" min="1" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-1.5 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
                      </td>
                      <td className="px-5 py-3">
                        <input type="number" min="0" step="0.01" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md p-1.5 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white" />
                      </td>
                      <td className="px-5 py-3 text-right font-medium text-slate-900 dark:text-white">
                        ${(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
              <button onClick={handleAddItem} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                <Plus className="w-4 h-4" /> Add another item
              </button>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-8">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">Order Notes & Terms</label>
              <textarea placeholder="Special instructions for delivery..." rows={4} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white resize-none"></textarea>
            </div>
            <div className="w-full sm:w-64 space-y-3 pt-2 sm:pt-0">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Tax (5%)</span>
                <span className="font-medium text-slate-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-slate-900 dark:text-white">Total Amount</span>
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
