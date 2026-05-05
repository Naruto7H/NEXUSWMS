import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const onScanSuccessRef = useRef(onScanSuccess);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onScanSuccessRef.current = onScanSuccess;
    onCloseRef.current = onClose;
  }, [onScanSuccess, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    let scanner = null;
    let isCancelled = false;

    // React 18 Strict Mode double-mount fix:
    // A small 50ms timeout ensures that if React mounts/unmounts/remounts instantly,
    // the first instance is cancelled before it requests the camera.
    const timer = setTimeout(() => {
      if (isCancelled) return;

      // Ensure a clean slate in the DOM
      const readerElement = document.getElementById('reader');
      if (readerElement) {
        readerElement.innerHTML = '';
      }

      scanner = new Html5QrcodeScanner(
        "reader",
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true
        },
        false
      );

      scanner.render(
        (decodedText) => {
          toast.success(`Scanned: ${decodedText}`);
          onScanSuccessRef.current(decodedText);
          
          if (scanner) {
            scanner.clear().then(() => {
              onCloseRef.current();
            }).catch(console.error);
          }
        },
        (error) => {
          // Ignore frequent background scanning errors
        }
      );
    }, 50);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      
      // Soft kill the library
      if (scanner) {
        scanner.clear().catch(() => {
          // Suppress errors during unmount
        });
      }
      
      // HARD KILL: Forcefully stop the hardware track directly from memory.
      // This guarantees the camera light turns off immediately on closing the modal.
      setTimeout(() => {
        const videoElement = document.querySelector('#reader video');
        if (videoElement && videoElement.srcObject) {
          videoElement.srcObject.getTracks().forEach(track => track.stop());
        }
      }, 100);
    };
  }, [isOpen]); 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-500" /> Scan SKU
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
