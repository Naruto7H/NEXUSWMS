import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const scannerRef = useRef(null);
  
  // We use a Set to aggressively track EVERY stream the camera library creates,
  // preventing orphaned HD streams from keeping the camera light on.
  const hardwareStreams = useRef(new Set());

  // Universal hardware kill-switch
  const killCameraHardware = () => {
    hardwareStreams.current.forEach(stream => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();       // Stop the hardware
          track.enabled = false; // Disable it just in case
        });
      }
    });
    hardwareStreams.current.clear();
  };

  const handleGracefulClose = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.clear();
      } catch (error) {
        // Suppress expected crashes from the library during teardown
      }
      scannerRef.current = null;
    }
    
    killCameraHardware(); // Force hardware off
    onClose();            // Tell React to close the modal
  };

  useEffect(() => {
    if (!isOpen) return;

    let isCancelled = false;
    let streamPoller = null;

    // React 18 Strict Mode Bypass (50ms delay)
    const initTimer = setTimeout(() => {
      if (isCancelled) return;

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
          handleGracefulClose(); // Auto-close on successful scan
        },
        (error) => {
          // Ignore frequent scanning errors
        }
      );

      // AGGRESSIVE HARDWARE SNIFFER
      // We check constantly (every 250ms). If the library swaps streams 
      // for higher resolution, we catch them all and add them to the hit-list.
      streamPoller = setInterval(() => {
        const videoElements = document.querySelectorAll('#reader video');
        videoElements.forEach(video => {
          if (video.srcObject) {
            hardwareStreams.current.add(video.srcObject);
          }
        });
      }, 250);

    }, 50);

    // Emergency Cleanup (Triggered if user navigates to a new page via Sidebar)
    return () => {
      isCancelled = true;
      clearTimeout(initTimer);
      if (streamPoller) clearInterval(streamPoller);
      
      // Soft kill
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }

      // Hard kill hardware if user navigated away without clicking "X"
      killCameraHardware();
    };
  }, [isOpen, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Click overlay to close gracefully */}
      <div className="absolute inset-0" onClick={handleGracefulClose}></div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 relative z-10 animate-in zoom-in-95 duration-200">
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
