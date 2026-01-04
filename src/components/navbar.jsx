'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Heart, User, Sparkles, X, Play, Trash2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useFavorites } from '../hooks/useFavorites';

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  
  const { favorites, removeFavorite } = useFavorites();

  const { scrollY } = useScroll();
  
  // Transform background opacity based on scroll position - ... existing code ...
  const backgroundColor = useTransform(
    scrollY,
    [0, 250],
    ['rgba(2, 6, 23, 0)', 'rgba(2, 6, 23, 0.8)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 250],
    ['blur(0px)', 'blur(12px)']
  );

  const borderBottomColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.05)']
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 50],
    ['none', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)']
  );

  // Sync state with URL param if it changes (e.g. back button)
  useEffect(() => {
    setSearchQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
    <motion.nav 
      style={{ 
        backgroundColor, 
        backdropFilter: backdropBlur,
        borderBottomColor,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        boxShadow
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 text-white"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group z-20 relative">
          <div className="bg-pink-600 p-1.5 rounded-lg text-white group-hover:bg-pink-500 transition-colors shadow-lg shadow-pink-500/20">
            <Play size={20} fill="currentColor" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent tracking-tight">
            Meki-Cin
          </span>
        </Link>



        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center bg-transparent z-50"
            >
              <div className="w-full max-w-2xl px-4 flex items-center gap-3">
                 <form onSubmit={handleSearch} className="flex-1 relative">
                    <input
                       type="text"
                       placeholder="Search drama..."
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       autoFocus
                       className="w-full bg-slate-900 border border-white/10 rounded-full pl-6 pr-12 py-2 text-base text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all shadow-lg"
                    />
                    
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-12 top-1/2 -translate-y-1/2 text-white hover:text-white transition-colors p-1"
                      >
                        <X size={16} />
                      </button>
                    )}
       
                    <button 
                      type="submit" 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-pink-500 transition-colors"
                    >
                      <Search size={20} />
                    </button>
                 </form>

                 <motion.button 
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={() => setIsSearchOpen(false)}
                   className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
                 >
                   <X size={20} />
                 </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        {!isSearchOpen && (
          <div className="flex items-center gap-3 z-40 relative">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full text-white hover:text-pink-500 transition-colors"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => setIsFavoritesOpen(true)}
              className="p-2 hover:bg-white/10 rounded-full text-white hover:text-pink-500 transition-colors relative"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-slate-950"></span>
              )}
            </button>
          </div>
        )}
      </div>
    </motion.nav>

    {/* Favorites Modal */}
    <AnimatePresence>
      {isFavoritesOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute inset-0 bg-black/80 backdrop-blur-sm"
             onClick={() => setIsFavoritesOpen(false)}
           />
           
           {/* Modal Content */}
           <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-slate-900 border border-white/10 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl flex flex-col"
           >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                   <Heart className="text-pink-500 fill-current" size={24} />
                   <h2 className="text-2xl font-bold text-white">My List <span className="text-gray-500 text-lg font-normal ml-2">({favorites.length})</span></h2>
                </div>
                <button 
                  onClick={() => setIsFavoritesOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-6">
                 {favorites.length === 0 ? (
                   <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                      <Heart size={48} className="mb-4 opacity-20" />
                      <p className="text-lg">Your list is empty.</p>
                      <p className="text-sm mt-2">Start adding movies and dramas to watch them later!</p>
                   </div>
                 ) : (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {favorites.map((item) => (
                        <div key={item.book_id} className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                           <div className="w-16 h-24 shrink-0 rounded-lg overflow-hidden relative">
                             <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                              <div>
                                <h3 className="font-bold text-white truncate pr-4">{item.title}</h3>
                                <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                                   <span>{item.episodes ? `${item.episodes} eps` : 'Drama'}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <Link 
                                   href={`/detail/${item.book_id}`} 
                                   onClick={() => setIsFavoritesOpen(false)}
                                   className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1"
                                 >
                                    Watch <Play size={10} fill="currentColor" />
                                 </Link>
                                 <button 
                                   onClick={() => removeFavorite(item.book_id)}
                                   className="text-xs text-gray-500 hover:text-red-400 flex items-center gap-1"
                                 >
                                   Remove
                                 </button>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                 )}
              </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}

