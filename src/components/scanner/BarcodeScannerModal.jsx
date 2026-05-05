import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const scannerRef = useRef(null);
  const streamRef = useRef(null); // Stores the raw hardware stream reference

  // 1. Graceful Shutdown Function
  // Shuts down the camera BEFORE telling the parent to remove the DOM.
  const handleGracefulClose = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.clear();
      } catch (error) {
        // Ignore clear errors if it's already clearing
      }
      scannerRef.current = null;
    }
    
    // Backup hardware kill just in case
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    onClose(); // Now tell the parent it is safe to unmount
  };

  useEffect(() => {
    if (!isOpen) return;

    // Prevent duplicate initializations in React Strict Mode
    if (scannerRef.current) return;

    // Clear any zombie DOM elements from the library
    const readerElement = document.getElementById('reader');
    if (readerElement) readerElement.innerHTML = '';

    // Initialize Scanner
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
        handleGracefulClose(); // Close automatically and safely on successful scan
      },
      (error) => {
        // Ignore constant background scanning errors
      }
    );

    // 2. Hardware Stream Sniffer
    // We continuously check the DOM to grab the raw MediaStream from the video tag.
    // If the user navigates to a new page, the DOM is destroyed instantly, but because
    // we saved the stream to `streamRef`, we can still turn off the green camera light!
    const streamPoller = setInterval(() => {
      const videoElement = document.querySelector('#reader video');
      if (videoElement && videoElement.srcObject) {
        streamRef.current = videoElement.srcObject;
        clearInterval(streamPoller); // Stop polling once we caught it
      }
    }, 200);

    // 3. Emergency Cleanup (Runs on Page Navigation or Hard Unmount)
    return () => {
      clearInterval(streamPoller);
      
      // Attempt soft kill
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }

      // Execute Hard Kill directly from hardware memory reference
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
        streamRef.current = null;
      }
    };
  }, [isOpen, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Click overlay to close gracefully */}
      <div className="absolute inset-0" onClick={handleGracefulClose}></div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 relative z-10">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-500" /> Scan SKU
          </h3>
          <button 
            onClick={handleGracefulClose} 
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
