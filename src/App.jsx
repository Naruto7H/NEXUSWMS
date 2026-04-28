import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import PurchaseOrders from './pages/PurchaseOrders';
import Suppliers from './pages/Suppliers';
import Settings from './pages/Settings';
import RequireRole from './components/auth/RequireRole';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="po" element={<PurchaseOrders />} />
            <Route path="suppliers" element={<Suppliers />} />
            
            {/* Protected Route: Only Admins and Central Buyers can access Settings */}
            <Route path="settings" element={
              <RequireRole allowedRoles={['Admin', 'Central Buyer']} fallback="redirect">
                <Settings />
              </RequireRole>
            } />
          </Route>
        </Routes>
      </Router>

      {/* Global Toast Container for System Alerts */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: 'dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700',
          style: { borderRadius: '10px', background: '#fff', color: '#0f172a' }
        }} 
      />
    </ThemeProvider>
  );
}