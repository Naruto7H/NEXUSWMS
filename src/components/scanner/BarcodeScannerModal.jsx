import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const [error, setError] = useState('');
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    setError('');
    setIsBooting(true);
    let isUnmounted = false;
    
    // 1. --- ABSOLUTE HARDWARE KILL SWITCH ---
    // We intercept the browser's camera API to capture the exact hardware stream.
    const activeStreams = new Set();
    const originalGetUserMedia = navigator.mediaDevices?.getUserMedia ? navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices) : null;

    if (originalGetUserMedia) {
      navigator.mediaDevices.getUserMedia = async (constraints) => {
        try {
          const stream = await originalGetUserMedia(constraints);
          activeStreams.add(stream); // Steal the hardware reference
          return stream;
        } catch (err) {
          throw err;
        }
      };
    }

    // This function brutally cuts power to the hardware tracks
    const killHardware = () => {
      // A. Kill intercepted streams
      activeStreams.forEach(stream => {
        stream.getTracks().forEach(track => {
          track.stop(); // This turns off the laptop light
          track.enabled = false;
        });
      });
      activeStreams.clear();

      // B. Kill any lingering video elements
      document.querySelectorAll('#reader video').forEach(video => {
        if (video.srcObject) {
          video.srcObject.getTracks().forEach(track => {
            track.stop();
          });
          video.srcObject = null;
        }
      });
      
      // C. Restore the browser's original API
      if (originalGetUserMedia) {
        navigator.mediaDevices.getUserMedia = originalGetUserMedia;
      }
    };

    // 2. --- START SCANNER ---
    const html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        if (!isUnmounted) {
          toast.success(`Scanned: ${decodedText}`);
          onScanSuccess(decodedText);
          onClose(); // Parent component will trigger the cleanup
        }
      },
      () => { /* ignore continuous frame scanning errors */ }
    ).then(() => {
      if (isUnmounted) {
        // User closed modal while camera was still booting up
        html5QrCode.stop().then(() => {
          html5QrCode.clear();
          killHardware();
        }).catch(killHardware);
      } else {
        setIsBooting(false); // Hide the loading spinner
      }
    }).catch((err) => {
      if (!isUnmounted) {
        setError('Camera access denied or hardware locked by another app.');
        setIsBooting(false);
      }
    });

    // 3. --- CLEANUP (Runs on 'X' click or page change) ---
    return () => {
      isUnmounted = true;
      
      if (html5QrCode.isScanning) {
         html5QrCode.stop().then(() => {
           html5QrCode.clear();
           killHardware(); // Force the light off
         }).catch(killHardware); // Even if library crashes, force the light off
      } else {
         killHardware(); 
      }
    };
  }, [isOpen, onClose, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 relative z-10 animate-in zoom-in-95 duration-200">
        
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-500" /> Scan SKU
          </h3>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 relative">
          {error ? (
            <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-4 rounded-lg flex flex-col items-center text-center border border-rose-200 dark:border-rose-500/20">
              <AlertCircle className="w-8 h-8 mb-2" />
              <p className="font-bold">Hardware Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-4">
                Point your camera at the SKU barcode or QR code.
              </p>
              
              {/* Camera Container with Loading State */}
              <div className="relative rounded-lg overflow-hidden min-h-[250px] bg-black">
                {isBooting && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900">
                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                  </div>
                )}
                <div id="reader" className="w-full h-full border-none"></div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
