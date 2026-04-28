import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  // We use a ref to prevent React from creating duplicate scanners during fast navigation
  const scannerRef = useRef(null);

  useEffect(() => {
    // If the modal is closed, make sure the camera is completely powered off
    if (!isOpen) {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
      return;
    }

    // If a scanner is already running, don't start a second one (prevents the UI glitch)
    if (scannerRef.current) return;

    // Initialize the scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
        supportedScanTypes: [0] // Prioritize back camera on mobile
      },
      false
    );
    
    scannerRef.current = scanner;

    scanner.render(
      (decodedText) => {
        // 1. Stop the camera feed instantly on successful scan
        if (scannerRef.current) {
          scannerRef.current.clear().catch(console.error);
          scannerRef.current = null;
        }
        
        // 2. Trigger notifications and close the modal
        toast.success(`Scanned: ${decodedText}`);
        onScanSuccess(decodedText);
        onClose();
      },
      (error) => {
        // Ignore the continuous background scanning errors
      }
    );

    // Cleanup function that runs when the user clicks the "X" to close the modal
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [isOpen, onClose, onScanSuccess]);

  // Keep the DOM element hidden completely when not in use to prevent lingering elements
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-500" /> Receive Stock
          </h3>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-4">
            Point your camera at the SKU barcode or QR code.
          </p>
          
          {/* The html5-qrcode library will inject the video feed here */}
          <div id="reader" className="w-full bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border-none!"></div>
          
        </div>
      </div>
    </div>
  );
}
