'use client';

import { motion } from 'framer-motion';
import { Play, Eye, BookOpen, Star, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';

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

export default function SearchPage({ results = [], query = '' }) {
  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Search Results for <span className="text-pink-500">"{query}"</span>
          </h1>
          <p className="text-gray-400">
            Found {results.length} results
          </p>
        </div>

        {results.length > 0 ? (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {results.map((drama, idx) => (
              <Link 
                href={`/detail/${drama.book_id}`} 
                key={`${drama.book_id}-${idx}`}
              >
                <motion.div 
                  variants={item}
                  className="group cursor-pointer"
                >
                  <div className="aspect-3/4 rounded-xl overflow-hidden relative mb-4 shadow-sm group-hover:shadow-lg group-hover:shadow-pink-500/10 transition-all duration-300 border border-white/5 group-hover:border-pink-500/30">
                    <img 
                      src={drama.image} 
                      alt={drama.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {drama.episodes && (
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm border border-white/10">
                        <BookOpen size={10} /> {drama.episodes}
                      </div>
                    )}
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
                      <Eye size={12} /> {drama.views || '0'}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <SearchIcon size={48} className="mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p>Try refreshing the page or searching for something else.</p>
          </div>
        )}
      </div>
    </div>
  );
}
