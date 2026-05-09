import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import RequireRole from './components/auth/RequireRole';
import TableSkeleton from './components/ui/TableSkeleton';

// Auth Pages (Not lazy loaded, usually needed immediately on first visit)
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Lazy Loaded Application Pages for Performance Code-Splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Inventory = lazy(() => import('./pages/Inventory'));
const PurchaseOrders = lazy(() => import('./pages/PurchaseOrders'));
const CreatePO = lazy(() => import('./pages/CreatePO'));
const Suppliers = lazy(() => import('./pages/Suppliers'));
const DockSchedule = lazy(() => import('./pages/DockSchedule'));
const WarehouseMap = lazy(() => import('./pages/WarehouseMap'));
const BlankPage = lazy(() => import('./pages/BlankPage'));
const UIKit = lazy(() => import('./pages/UIKit'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

// A reusable loading fallback utilizing your existing skeleton component
const PageLoader = () => (
  <div className="w-full h-full flex flex-col gap-4 p-6 animate-in fade-in duration-300">
    <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-4"></div>
    <TableSkeleton rows={5} />
  </div>
);

// HIGH-ORDER COMPONENT: Wraps lazy components in Suspense automatically
const Loadable = (Component) => (props) => (
  <Suspense fallback={<PageLoader />}>
    <Component {...props} />
  </Suspense>
);

export default function App() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Dashboard Routes */}
      <Route path="/" element={
        <RequireRole allowedRoles={['Admin', 'Central Buyer', 'Warehouse Supervisor']}>
          <DashboardLayout />
        </RequireRole>
      }>
        
        {/* Redirect root to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Clean, DRY Lazy Loaded Routes using the Loadable wrapper */}
        <Route path="dashboard" element={Loadable(Dashboard)()} />
        <Route path="inventory" element={Loadable(Inventory)()} />
        <Route path="po" element={Loadable(PurchaseOrders)()} />
        <Route path="po/new" element={Loadable(CreatePO)()} />
        <Route path="suppliers" element={Loadable(Suppliers)()} />
        <Route path="schedule" element={Loadable(DockSchedule)()} />
        <Route path="map" element={Loadable(WarehouseMap)()} />
        <Route path="blank" element={Loadable(BlankPage)()} />
        <Route path="uikit" element={Loadable(UIKit)()} />
        <Route path="settings" element={Loadable(Settings)()} />
      </Route>

      {/* 404 Catch-All - FIXED: Respects Light/Dark mode to prevent black flash */}
      <Route path="*" element={
        <Suspense fallback={<div className="h-screen w-screen bg-slate-50 dark:bg-slate-900" />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  );
}
