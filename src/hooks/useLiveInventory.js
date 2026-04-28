import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

export function useLiveInventory(url) {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    // Connect to the WebSocket server
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setIsConnected(true);
      console.log('WMS Live Feed Connected');
    };

    ws.current.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      
      // Update state with new live data
      setData(parsedData);

      // Trigger global alerts for critical WMS events
      if (parsedData.type === 'LOW_STOCK_ALERT') {
        toast.error(`Low Stock: ${parsedData.skuName} (${parsedData.qty} remaining)`);
      }
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      console.log('WMS Live Feed Disconnected');
      // In a production app, you would add reconnection logic here
    };

    // Cleanup on unmount
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [url]);

  return { data, isConnected };
}