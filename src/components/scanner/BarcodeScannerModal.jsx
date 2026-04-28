import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const onScanSuccessRef = useRef(onScanSuccess);
  const onCloseRef = useRef(onClose);
  const scannerRef = useRef(null);

  useEffect(() => {
    onScanSuccessRef.current = onScanSuccess;
    onCloseRef.current = onClose;
  }, [onScanSuccess, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const readerElement = document.getElementById('reader');
    if (readerElement && readerElement.innerHTML !== '') {
       return; 
    }

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
    
    scannerRef.current = scanner;

    scanner.render(
      (decodedText) => {
        toast.success(`Scanned: ${decodedText}`);
        onScanSuccessRef.current(decodedText);
        
        scanner.clear().then(() => {
          onCloseRef.current();
        }).catch(console.error);
      },
      (error) => {
        // Ignore background scanning errors
      }
    );

    // THE FIX: The Hardware Stream Catcher
    // This constantly polls to find the raw video feed injected by the library.
    // Once found, we save it to memory so we can forcefully shut it down later.
    let hardwareStream = null;
    const streamCatcher = setInterval(() => {
      const videoElement = document.querySelector('#reader video');
      if (videoElement && videoElement.srcObject) {
        hardwareStream = videoElement.srcObject;
        clearInterval(streamCatcher); // Stop polling once we caught the stream
      }
    }, 300);

    // This cleanup runs the microsecond you hit "Back", switch pages, or close the modal
    return () => {
      clearInterval(streamCatcher);
      
      // 1. FORCE KILL: We physically stop the hardware tracks directly from memory.
      // This guarantees the camera light turns off even if React deleted the HTML.
      if (hardwareStream) {
        hardwareStream.getTracks().forEach(track => {
          track.stop();
        });
      }

      // 2. Soft Kill: Tell the library to clean up.
      // We use a silent catch block because if React deleted the HTML, this will 
      // crash, but we don't care because we already killed the hardware above!
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {
          // Suppress the console error completely
        });
      }
    };
  }, [isOpen]); 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-500" /> Receive Stock
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-500">
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
