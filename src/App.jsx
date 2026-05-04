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
const Suppliers = lazy(() => import('./pages/Suppliers'));
const DockSchedule = lazy(() => import('./pages/DockSchedule'));
const WarehouseMap = lazy(() => import('./pages/WarehouseMap'));
const BlankPage = lazy(() => import('./pages/BlankPage'));
const UIKit = lazy(() => import('./pages/UIKit'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFound = lazy(() => import('./pages/NotFound'));

// A reusable loading fallback utilizing your existing skeleton component
const PageLoader = () => (
  <div className="w-full h-full flex flex-col gap-4">
    <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-4"></div>
    <TableSkeleton />
  </div>
);

export default function App() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Dashboard Routes */}
      <Route path="/" element={<RequireRole><DashboardLayout /></RequireRole>}>
        
        {/* Redirect root to dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Lazy Loaded Routes wrapped in Suspense */}
        <Route path="dashboard" element={
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        } />
        
        <Route path="inventory" element={
          <Suspense fallback={<PageLoader />}>
            <Inventory />
          </Suspense>
        } />
        
        <Route path="po" element={
          <Suspense fallback={<PageLoader />}>
            <PurchaseOrders />
          </Suspense>
        } />
        
        <Route path="suppliers" element={
          <Suspense fallback={<PageLoader />}>
            <Suppliers />
          </Suspense>
        } />
        
        <Route path="schedule" element={
          <Suspense fallback={<PageLoader />}>
            <DockSchedule />
          </Suspense>
        } />
        
        <Route path="map" element={
          <Suspense fallback={<PageLoader />}>
            <WarehouseMap />
          </Suspense>
        } />
        
        <Route path="blank" element={
          <Suspense fallback={<PageLoader />}>
            <BlankPage />
          </Suspense>
        } />
        
        <Route path="uikit" element={
          <Suspense fallback={<PageLoader />}>
            <UIKit />
          </Suspense>
        } />
        
        <Route path="settings" element={
          <Suspense fallback={<PageLoader />}>
            <Settings />
          </Suspense>
        } />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={
        <Suspense fallback={<div className="h-screen w-screen bg-slate-900" />}>
          <NotFound />
        </Suspense>
      } />
    </Routes>
  );
}
</Suspense>
