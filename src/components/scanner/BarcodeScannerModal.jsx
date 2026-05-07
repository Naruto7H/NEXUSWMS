import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const scannerRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  // BRUTE-FORCE HARDWARE KILL SWITCH
  // This physically searches the DOM for any active video streams and kills them at the track level.
  const killVideoStreams = () => {
    try {
      const videoElements = document.querySelectorAll('video');
      videoElements.forEach((video) => {
        if (video.srcObject) {
          const tracks = video.srcObject.getTracks();
          tracks.forEach((track) => {
            track.stop();
            track.enabled = false;
          });
          video.srcObject = null;
        }
      });
    } catch (e) {
      console.error("Failed to kill streams", e);
    }
  };

  const handleClose = async () => {
    // 1. Ask the library to stop nicely
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (error) {
        console.warn("Graceful stop failed, forcing hardware shutdown.");
      }
    }
    
    // 2. Force hardware shutdown regardless of library state
    killVideoStreams();
    scannerRef.current = null;
    setHasError(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setHasError(false);

    // Give the modal 100ms to animate in and ensure the #reader div is physically painted on the screen
    const initTimer = setTimeout(() => {
      if (!isMounted) return;

      const html5QrCode = new Html5Qrcode("reader");
      scannerRef.current = html5QrCode;

      html5QrCode.start(
        { facingMode: "environment" }, // Prefer back camera on mobile, default on laptop
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        (decodedText) => {
          // Success Callback
          if (isMounted) {
            toast.success(`Scanned: ${decodedText}`);
            onScanSuccess(decodedText);
            handleClose(); // Auto-close triggers the hardware kill
          }
        },
        (errorMessage) => {
          // Ignore continuous frame errors (normal behavior when searching for a code)
        }
      ).catch((err) => {
        console.error("Camera access denied or hardware error:", err);
        if (isMounted) setHasError(true);
      });

    }, 100);

    // CLEANUP: Runs if user navigates away (e.g., clicks Dashboard in sidebar) or modal unmounts
    return () => {
      isMounted = false;
      clearTimeout(initTimer);
      
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear();
          killVideoStreams();
        }).catch(() => {
          killVideoStreams();
        });
      } else {
        killVideoStreams();
      }
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
          {hasError ? (
            <div className="bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-4 rounded-lg flex flex-col items-center text-center">
              <AlertCircle className="w-8 h-8 mb-2" />
              <p className="font-bold">Camera Error</p>
              <p className="text-sm mt-1">Please ensure you have granted camera permissions to this site.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-4">
                Point your camera at the SKU barcode or QR code.
              </p>
              {/* Target container for the core class */}
              <div 
                id="reader" 
                className="w-full bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden border-none! min-h-[250px]"
              ></div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
