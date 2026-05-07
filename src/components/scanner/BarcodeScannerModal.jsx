import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    setError('');
    const html5QrCode = new Html5Qrcode("reader");
    let isUnmounted = false;

    // Start the camera (This takes 1-2 seconds to resolve)
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        // Success Callback
        if (!isUnmounted) {
          toast.success(`Scanned: ${decodedText}`);
          onScanSuccess(decodedText);
          onClose();
        }
      },
      (errorMessage) => {
        // Ignore normal background parsing errors
      }
    ).then(() => {
      // The camera has successfully turned on.
      if (isUnmounted) {
        // CRITICAL FIX: The user closed the modal while the camera was still booting up!
        // We must kill it immediately to prevent a background zombie camera.
        html5QrCode.stop().then(() => html5QrCode.clear()).catch(console.error);
      }
    }).catch((err) => {
      if (!isUnmounted) {
        setError('Camera access denied or no camera found.');
        console.error(err);
      }
    });

    // Cleanup function: Runs when you click 'X' or change pages
    return () => {
      isUnmounted = true;
      // If it finished booting before we unmounted, gracefully stop it.
      if (html5QrCode.isScanning) {
         html5QrCode.stop().then(() => html5QrCode.clear()).catch(console.error);
      }
    };
  }, [isOpen, onClose, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 relative z-10 animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-500" /> Scan SKU
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {error ? (
            <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-4 rounded-lg flex flex-col items-center text-center">
              <AlertCircle className="w-8 h-8 mb-2" />
              <p className="font-bold">Camera Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-4">Point your camera at the SKU barcode or QR code.</p>
              {/* Ensure a black background so it doesn't flash white while booting */}
              <div id="reader" className="w-full bg-black rounded-lg overflow-hidden border-none min-h-[250px]"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
