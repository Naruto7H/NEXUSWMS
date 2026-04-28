import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import PurchaseOrders from './pages/PurchaseOrders';
import CreatePO from './pages/CreatePO'; // ADDED IMPORT
import Suppliers from './pages/Suppliers';
import WarehouseMap from './pages/WarehouseMap';
import DockSchedule from './pages/DockSchedule';
import Settings from './pages/Settings';
import BlankPage from './pages/BlankPage';
import UIKit from './pages/UIKit';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="po" element={<PurchaseOrders />} />
            <Route path="po/new" element={<CreatePO />} /> {/* ADDED ROUTE */}
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="map" element={<WarehouseMap />} />
            <Route path="schedule" element={<DockSchedule />} />
            <Route path="blank" element={<BlankPage />} />
            <Route path="settings" element={<Settings />} />
            <Route path="uikit" element={<UIKit />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
}
