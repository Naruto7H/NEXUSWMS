import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

// Default Mock Data
const initialOrders = [
  { id: 'PO-8472', supplier: 'Al Ain Farms', date: '2026-04-28', amount: '$12,450.00', status: 'Pending' },
  { id: 'PO-8471', supplier: 'TechCorp Electronics', date: '2026-04-27', amount: '$45,000.00', status: 'Approved' },
  { id: 'PO-8470', supplier: 'Malabar Plaza', date: '2026-04-26', amount: '$3,250.00', status: 'Shipped' },
  { id: 'PO-8469', supplier: 'Nexus Packaging Co.', date: '2026-04-25', amount: '$4,120.00', status: 'Delivered' },
];

const initialTasks = {
  'scheduled': [
    { id: 'SHP-101', supplier: 'Al Ain Farms', time: '08:00 AM', items: 120, priority: 'normal' },
    { id: 'SHP-102', supplier: 'TechCorp', time: '10:30 AM', items: 45, priority: 'high' },
  ],
  'at-dock': [
    { id: 'SHP-103', supplier: 'Malabar Plaza', time: '07:15 AM', items: 85, priority: 'normal', dock: 'Dock A' },
  ],
  'unloading': [
    { id: 'SHP-104', supplier: 'P&G Trading', time: '06:00 AM', items: 340, priority: 'high', dock: 'Dock B', progress: 65 },
  ],
  'putaway': [
    { id: 'SHP-105', supplier: 'Bismi Briyani', time: 'Yesterday', items: 50, priority: 'normal', progress: 100 },
  ]
};

export const StoreProvider = ({ children }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [dockTasks, setDockTasks] = useState(initialTasks);

  // Order Actions
  const addOrder = (order) => setOrders([order, ...orders]);
  
  const updateOrderStatuses = (ids, newStatus) => {
    setOrders(orders.map(o => ids.includes(o.id) ? { ...o, status: newStatus } : o));
  };

  // Dock Actions
  const updateDockTasks = (newColumns) => setDockTasks(newColumns);

  return (
    <StoreContext.Provider value={{ 
      orders, addOrder, updateOrderStatuses, setOrders,
      dockTasks, updateDockTasks 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
