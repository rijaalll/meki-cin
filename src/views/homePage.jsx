'use client';

import { motion } from 'framer-motion';
import { Play, Eye, BookOpen, Clock, Star, TrendingUp, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useFavorites } from '../hooks/useFavorites';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HomePage({ latest = [], trending = [] }) {
  // Use the first trending item as the Hero
  const heroData = trending[0] || latest[0];
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      {heroData && (
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
             {/* Use a placeholder or the actual image with a blur effect for background */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900/40 to-transparent z-10" />
            <img 
              src={heroData.image} 
              alt={heroData.title}
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-8 text-white">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="max-w-3xl"
             >
               <span className="inline-block px-3 py-1 bg-pink-600/90 backdrop-blur-sm rounded-lg text-xs font-semibold tracking-wider mb-4 uppercase text-white shadow-lg shadow-pink-500/20">
                 Top Trending
               </span>
               <h1 className="text-4xl md:text-7xl font-bold mb-4 leading-tight tracking-tight text-white">
                 {heroData.title}
               </h1>
               <div className="flex items-center gap-6 mb-8 text-gray-200">
                 <div className="flex items-center gap-2">
                   <Eye size={18} />
                   <span>{heroData.views} Views</span>
                 </div>
                 {heroData.episodes && (
                   <div className="flex items-center gap-2">
                     <BookOpen size={18} />
                     <span>{heroData.episodes} Episodes</span>
                   </div>
                 )}
                 <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={18} fill="currentColor" />
                    <span>4.9</span>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <Link href={`/detail/${heroData.book_id}`} className="bg-pink-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all transform hover:scale-105 hover:bg-pink-700 shadow-lg shadow-pink-600/20">
                   <Play size={20} fill="currentColor" />
                   Watch Now
                 </Link>
                 <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all hover:border-pink-500/50">
                   Details
                 </button>
               </div>
             </motion.div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Trending Section */}
        {trending.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                <h2 className="text-3xl font-bold text-white tracking-tight">Trending Now</h2>
              </div>
            </div>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
            >
              {trending.map((drama, idx) => {
                  const isFav = isFavorite(drama.book_id);
                  return (
                    <motion.div 
                      key={`${drama.book_id}-${idx}`}
                      variants={item}
                      className="group relative"
                    >
                      <div className="relative">
                          {/* Heart Button - Sibling to Link */}
                          <div className="absolute top-0 right-0 p-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div 
                                  onClick={(e) => {
                                      e.preventDefault();
                                      toggleFavorite(drama);
                                  }}
                                  className={`backdrop-blur-md p-2 rounded-full text-white transition-colors cursor-pointer ${
                                      isFav ? 'bg-pink-600 text-white' : 'bg-black/40 hover:bg-pink-600'
                                  }`}
                              >
                                  <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                              </div>
                          </div>

                          <Link href={`/detail/${drama.book_id}`}>
                            <div className="aspect-3/4 rounded-2xl overflow-hidden relative shadow-lg group-hover:shadow-pink-500/20 transition-all duration-300 border border-white/5 group-hover:border-pink-500/30">
                                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-lg z-10 border border-white/10">
                                #{idx + 1}
                                </div>
                                <img 
                                src={drama.image} 
                                alt={drama.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-pink-600/90 backdrop-blur-sm rounded-full p-4 text-white transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-lg shadow-pink-600/20">
                                    <Play size={24} fill="currentColor" />
                                </div>
                                </div>
                            </div>
                            <h3 className="mt-4 font-bold text-gray-100 group-hover:text-pink-500 transition-colors line-clamp-1 text-lg">
                                {drama.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                <span className="flex items-center gap-1">
                                    <Eye size={14} /> {drama.views}
                                </span>
                                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                <span>Drama</span>
                            </div>
                          </Link>
                      </div>
                    </motion.div>
              )})}
            </motion.div>
          </section>
        )}

        {/* Latest Updates Section */}
        {latest.length > 0 && (
          <section>
             <div className="flex items-center gap-3 mb-8">
               <div className="w-1 h-8 bg-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
               <h2 className="text-3xl font-bold text-white tracking-tight">Latest Updates</h2>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-6 gap-6"
            >
              {latest.map((drama, idx) => {
                const isFav = isFavorite(drama.book_id);
                return (
                  <motion.div 
                    key={`${drama.book_id}-${idx}`}
                    variants={item}
                    className="group relative"
                  >
                    <div className="relative">
                        {/* Heart Button - Sibling to Link */}
                        <div className="absolute top-2 left-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div 
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleFavorite(drama);
                                }}
                                className={`p-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                                    isFav ? 'bg-pink-600 text-white' : 'bg-black/40 text-white hover:bg-pink-600'
                                }`}
                            >
                                <Heart size={14} fill={isFav ? "currentColor" : "none"} />
                            </div>
                        </div>

                        <Link href={`/detail/${drama.book_id}`}>
                            <div className="aspect-3/4 rounded-xl overflow-hidden relative mb-4 shadow-sm group-hover:shadow-lg group-hover:shadow-pink-500/10 transition-all duration-300 border border-white/5 group-hover:border-pink-500/30">
                              <img 
                                src={drama.image} 
                                alt={drama.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm border border-white/10">
                                  <BookOpen size={10} /> {drama.episodes}
                              </div>
                              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                  <button className="w-full bg-pink-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-pink-700 transition-colors shadow-lg">
                                      Watch Now
                                  </button>
                              </div>
                            </div>
                            <h3 className="font-bold text-gray-200 text-sm line-clamp-2 min-h-[40px] mb-1 group-hover:text-pink-500 transition-colors leading-relaxed">
                              {drama.title}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Eye size={12} /> {drama.views}
                              </span>
                            </div>
                        </Link>
                    </div>
                  </motion.div>
              )})}
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
