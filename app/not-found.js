'use client';

import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl opacity-50" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="mb-6 flex justify-center">
           <div className="w-24 h-24 bg-pink-600/10 rounded-full flex items-center justify-center ring-4 ring-pink-600/20">
             <AlertTriangle size={48} className="text-pink-500" />
           </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
          4<span className="text-pink-600">0</span>4
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-4">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          Maaf, halaman yang kamu cari mungkin telah dihapus, dipindahkan, atau tidak tersedia saat ini.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-pink-600/20 hover:scale-105 active:scale-95"
        >
          <Home size={20} />
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
}
