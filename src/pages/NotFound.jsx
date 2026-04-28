import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Package, CheckCircle2, Search } from 'lucide-react';

export default function NotFound() {
  const [position, setPosition] = useState({ top: '40%', left: '50%' });
  const [caught, setCaught] = useState(false);
  const navigate = useNavigate();

  // Moves the package to a random location every 800ms
  useEffect(() => {
    if (caught) return;
    
    const interval = setInterval(() => {
      setPosition({
        top: `${Math.floor(Math.random() * 70) + 15}%`,
        left: `${Math.floor(Math.random() * 80) + 10}%`,
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, [caught]);

  // Handle winning the mini-game
  const handleCatch = () => {
    setCaught(true);
    // Auto-redirect to dashboard after 2 seconds
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center pt-20 p-4 transition-colors duration-200 relative overflow-hidden">
      
      {/* Text Area */}
      <div className="text-center z-10 animate-in slide-in-from-top-4 duration-500">
        <div className="inline-flex items-center justify-center p-3 bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl mb-6 shadow-sm">
          <Search className="w-8 h-8" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
          SKU Not Found in Warehouse
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-md mx-auto mb-8">
          The page you are looking for has been misplaced. While you're here, help us catch this runaway inventory!
        </p>
        
        {!caught && (
          <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors shadow-sm">
            <Home className="w-4 h-4" /> Just take me home
          </Link>
        )}
      </div>

      {/* Mini-Game Area */}
      <div className="absolute inset-0 top-48 overflow-hidden pointer-events-none">
        <div 
          className="absolute transition-all duration-300 ease-in-out pointer-events-auto"
          style={{ 
            top: position.top, 
            left: position.left,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {!caught ? (
            <button 
              onClick={handleCatch}
              className="p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-xl hover:shadow-indigo-500/50 hover:scale-110 active:scale-95 transition-all animate-bounce"
            >
              <Package className="w-8 h-8" />
            </button>
          ) : (
            <div className="p-4 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 flex flex-col items-center gap-2 animate-in zoom-in spin-in-12 duration-500">
              <CheckCircle2 className="w-8 h-8" />
              <span className="text-sm font-bold whitespace-nowrap">Package Secured!</span>
              <span className="text-xs opacity-80 whitespace-nowrap">Routing to Dashboard...</span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
