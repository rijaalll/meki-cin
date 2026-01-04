'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Eye, BookOpen, Clock, Star, Share2, Heart, ArrowLeft, Download } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFavorites } from '../hooks/useFavorites';

export default function DetailPage({ detail }) {
  const router = useRouter();
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 300], [1.2, 1]);
  const opacity = useTransform(scrollY, [0, 300], [0.5, 0.2]);
  const { toggleFavorite, isFavorite } = useFavorites();
  
  if (!detail) return null;

  const isFav = isFavorite(detail?.book_id);

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 2) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Fixed Back Button */}
      <div className="fixed top-20 md:top-24 left-4 md:left-8 z-50">
         <button 
           onClick={handleBack}
           className="p-3 bg-slate-950/50 backdrop-blur-md rounded-full text-white hover:bg-slate-900/80 transition-all inline-flex items-center justify-center border border-white/10 shadow-lg hover:scale-110 group"
         >
           <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
         </button>
      </div>

      {/* Background Hero with Gradient Overlay */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/20 z-10" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent z-20" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/60 to-transparent z-20" />
        <motion.div style={{ scale }} className="w-full h-full">
            <img 
              src={detail.thumbnail} 
              alt={detail.title}
              className="w-full h-full object-cover blur-sm opacity-50" 
            />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 -mt-40 md:-mt-48 relative z-30">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Poster Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-48 md:w-64 lg:w-80 shrink-0 mx-auto md:mx-0 md:sticky md:top-24 h-fit"
          >
            <div className="aspect-2/3 rounded-2xl overflow-hidden shadow-2xl relative border-4 border-slate-900/50 group">
              <img 
                src={detail.thumbnail} 
                alt={detail.title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 text-white pt-4 md:pt-12 text-center md:text-left"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {detail.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mb-8 text-sm md:text-base text-gray-300">
               <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
                  <BookOpen size={16} className="text-pink-500" />
                  <span>{detail.stats.total_episodes} Episodes</span>
               </div>
               <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span>4.8 Rating</span>
               </div>
               <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Eye size={16} className="text-blue-400" />
                  <span>{detail.stats.followers} Followers</span>
               </div>
               <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Clock size={16} className="text-green-400" />
                  <span>Updated {new Date(detail.upload_date).toLocaleDateString()}</span>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-10">
              <Link 
                href={`/stream/${detail.book_id}/1`}
                className="w-full sm:w-auto px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-pink-600/20 transform hover:scale-105"
              >
                <Play size={22} fill="currentColor" />
                Start Watching
              </Link>
              <div className="flex items-center gap-3">
                 <button 
                   onClick={() => toggleFavorite(detail)}
                   className={`p-4 rounded-xl transition-colors backdrop-blur-sm border border-white/5 ${
                     isFav 
                       ? 'bg-pink-600 text-white hover:bg-pink-700 shadow-lg shadow-pink-600/20 border-pink-500' 
                       : 'bg-white/10 hover:bg-white/20 text-white'
                   }`}
                 >
                   <Heart size={22} fill={isFav ? "currentColor" : "none"} />
                 </button>
                 <button className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors backdrop-blur-sm border border-white/5">
                   <Share2 size={22} />
                 </button>
                 <button className="p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors backdrop-blur-sm border border-white/5">
                   <Download size={22} />
                 </button>
              </div>
            </div>

            <div className="mb-12 max-w-4xl mx-auto md:mx-0">
               <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 justify-center md:justify-start">
                 <span className="w-1 h-6 bg-pink-500 rounded-full" />
                 Synopsis
               </h3>
               <p className="text-gray-400 leading-relaxed text-lg">
                 {detail.description}
               </p>
            </div>

            {/* Episode List */}
            <div className="max-w-5xl mx-auto md:mx-0">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 justify-center md:justify-start">
                 <span className="w-1 h-6 bg-pink-500 rounded-full" />
                 Episodes ({detail.stats.total_episodes})
               </h3>
               
               <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
                 {detail.episode_list.map((ep) => (
                   <Link 
                     key={ep.id}
                     href={`/stream/${detail.book_id}/${ep.episode}`}
                     className="bg-white/5 hover:bg-pink-600 hover:text-white text-gray-300 rounded-lg py-3 font-medium transition-all text-sm border border-white/5 hover:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 flex items-center justify-center"
                   >
                     {ep.episode}
                   </Link>
                 ))}
               </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
