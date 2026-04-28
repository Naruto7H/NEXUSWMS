// Mock Backend Layer for Hypermarket Procurement
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockInventory = [
  { id: 'SKU-7721', name: 'Al Ain Fresh Milk 2L', category: 'Dairy & Chill', stock: 1450, capacity: 2000, shelfLifeDays: 4, vendor: 'Al Ain Farms', margin: '12%', speed: 'Fast', status: 'Optimal' },
  { id: 'SKU-8922', name: 'Fresh Norwegian Salmon (Whole)', category: 'Fresh Produce', stock: 45, capacity: 100, shelfLifeDays: 2, vendor: 'Oceanic Catch', margin: '18%', speed: 'Fast', status: 'Low Stock' },
  { id: 'SKU-1092', name: 'Ariel Matic Front Load 2kg', category: 'FMCG', stock: 8500, capacity: 10000, shelfLifeDays: 730, vendor: 'P&G Trading', margin: '8%', speed: 'Steady', status: 'Optimal' },
  { id: 'SKU-4431', name: 'OnePlus Nord 5 - 256GB', category: 'Electronics', stock: 12, capacity: 50, shelfLifeDays: null, vendor: 'TechCorp Electronics', margin: '15%', speed: 'Slow', status: 'Reorder' },
  { id: 'SKU-2291', name: 'Basmati Rice Premium 5kg', category: 'Grocery', stock: 0, capacity: 500, shelfLifeDays: 365, vendor: 'AgriFoods Global', margin: '10%', speed: 'Fast', status: 'Out of Stock' },
];

export const inventoryApi = {
  getInventory: async () => {
    await delay(600);
    return [...mockInventory];
  },
  exportToCSV: async () => {
    await delay(800);
    return { success: true, url: '/downloads/inventory-report.csv' };
  }
};

export const kpiApi = {
  getMetrics: async () => {
    await delay(400);
    return {
      procurement: { value: '$3.45M', change: '+14.2%', isPositive: true },
      expiringSoon: { value: '124', change: '+12', isPositive: false }, // Critical for retail
      vendorFillRate: { value: '94.2%', change: '+1.5%', isPositive: true },
      stockAgeing: { value: '18 Days', change: '-2', isPositive: true }
    };
  }
};