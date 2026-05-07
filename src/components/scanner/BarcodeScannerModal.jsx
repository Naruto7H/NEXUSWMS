import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const scannerRef = useRef(null);
  
  // Guard to prevent React 18 Strict Mode from double-mounting the camera
  const isInitialized = useRef(false);

  const handleClose = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.clear();
      } catch (error) {
        // Suppress expected cleanup errors from the library
      }
      scannerRef.current = null;
    }
    isInitialized.current = false;
    onClose(); 
  };

  useEffect(() => {
    if (!isOpen) return;

    // Strict Mode Guard: If already initializing, abort.
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Ensure the container is totally empty before mounting
    const readerElement = document.getElementById('reader');
    if (readerElement) readerElement.innerHTML = '';

    const scanner = new Html5QrcodeScanner(
      "reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true 
      },
      false
    );
    
    scannerRef.current = scanner;

    scanner.render(
      (decodedText) => {
        toast.success(`Scanned: ${decodedText}`);
        onScanSuccess(decodedText);
        handleClose(); // Auto-close on successful scan
      },
      (error) => {
        // Ignore normal, continuous scanning errors
      }
    );

    // Cleanup function when modal unmounts
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
      isInitialized.current = false;
    };
  }, [isOpen, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      {/* Click overlay to close gracefully */}
      <div className="absolute inset-0" onClick={handleClose}></div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 relative z-10 animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-500" /> Scan SKU
          </h3>
          <button 
            onClick={handleClose} 
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-4">Point your camera at the SKU barcode or QR code.</p>
          <div id="reader" className="w-full bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border-none!"></div>
        </div>
      </div>
    </div>
  );
}
