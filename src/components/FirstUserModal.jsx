'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook, X, Heart } from 'lucide-react'; // Lucide doesn't always have TikTok, using SVG for it

export default function FirstUserModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if modal has been shown in this session
    const hasShown = sessionStorage.getItem('welcome_modal_shown');
    
    if (!hasShown) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('welcome_modal_shown', 'true');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const TikTokIcon = ({ size = 24, className = "" }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-slate-900 border border-pink-500/30 p-8 rounded-2xl max-w-md w-full shadow-2xl shadow-pink-600/20 overflow-hidden text-center z-[101]"
          >
             {/* Decorative Background */ }
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
             <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

             {/* Close Button */}
             <button 
               onClick={handleClose}
               className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
             >
               <X size={20} />
             </button>

             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.2, type: "spring" }}
               className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/40"
             >
               <Heart size={40} className="text-white fill-current" />
             </motion.div>

             <h2 className="text-2xl font-bold text-white mb-2">Welcome to Meki-Cin!</h2>
             <p className="text-gray-300 mb-6 leading-relaxed">
               Platform streaming drakor china gratis untukmu. <br/>
               <span className="text-pink-400 font-semibold block mt-1">Dibuat oleh Ahmad Rizal</span>
             </p>

             <div className="flex flex-col gap-3">
                <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Follow My Socials</p>
                <div className="flex items-center justify-center gap-4 mt-2">
                   <a 
                     href="https://www.instagram.com/ahmdrizaalll/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="p-3 bg-white/5 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 rounded-xl transition-all hover:scale-110 group border border-white/5 hover:border-transparent"
                     title="Instagram"
                   >
                     <Instagram size={24} className="text-gray-300 group-hover:text-white" />
                   </a>
                   <a 
                     href="https://web.facebook.com/cyrzll/?locale=id_ID" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="p-3 bg-white/5 hover:bg-[#1877F2] rounded-xl transition-all hover:scale-110 group border border-white/5 hover:border-transparent"
                     title="Facebook"
                   >
                     <Facebook size={24} className="text-gray-300 group-hover:text-white" />
                   </a>
                   <a 
                     href="https://www.tiktok.com/@xnxx.rzll" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="p-3 bg-white/5 hover:bg-black rounded-xl transition-all hover:scale-110 group border border-white/5 hover:border-transparent"
                     title="TikTok"
                   >
                     <TikTokIcon size={24} className="text-gray-300 group-hover:text-white" />
                   </a>
                </div>
             </div>
             
             <button
                onClick={handleClose}
                className="mt-8 w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-pink-600/20 active:scale-95"
             >
                Mulai Menonton
             </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
