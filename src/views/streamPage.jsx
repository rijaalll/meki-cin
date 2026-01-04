'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, ChevronDown, MonitorPlay, Calendar, Star, Film, Play, Pause, Maximize, Minimize } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StreamPage({ streamData, detailData, currentEpisode, bookId }) {
  const router = useRouter();
  const videoRef = useRef(null);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!streamData || !detailData) return null;

  const handleBack = () => {
    router.push(`/detail/${bookId}`);
  };

  const togglePlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsPlaying(true);
      return;
    }

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setShowControls(true);
      } else {
        videoRef.current.play();
        setShowControls(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percent = x / width;
      const newTime = percent * duration;
      
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleFullscreen = () => {
    setIsExpanded(!isExpanded);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* Navbar / Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center px-4"
      >
         <button 
           onClick={handleBack}
           className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2"
         >
           <ArrowLeft size={24} />
         </button>

         {/* Logo */}
         <Link href="/" className="flex items-center gap-2 group mr-6">
           <div className="bg-pink-600 p-1.5 rounded-lg text-white group-hover:bg-pink-500 transition-colors shadow-lg shadow-pink-500/20">
             <Play size={18} fill="currentColor" />
           </div>
           <span className="text-xl font-bold bg-linear-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent tracking-tight hidden sm:inline-block">
             Meki-Cin
           </span>
         </Link>

         <div className="h-6 w-px bg-white/10 mr-6 hidden sm:block"></div>

         <h1 className="font-bold text-lg md:text-xl truncate flex-1 pr-4">
           {detailData.title} <span className="text-pink-500 font-normal ml-2">Ep {currentEpisode}</span>
         </h1>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="pt-24 lg:grid lg:grid-cols-3 lg:gap-8 max-w-[1600px] mx-auto"
      >
        {/* Main Content - Video Player */}
        <div className="lg:col-span-2">
          <div className={`${
            isExpanded 
              ? 'fixed inset-0 z-50 bg-black flex items-center justify-center' 
              : 'sticky top-16 z-20 bg-slate-950 shadow-2xl shadow-black/80 pb-2 px-4'
          } transition-all duration-300`}>
             <div 
               className={`${
                 isExpanded ? 'w-full h-full' : 'aspect-video w-full'
               } bg-black relative group overflow-hidden rounded-md shadow-2xl transition-all duration-300`}
               onMouseEnter={() => setShowControls(true)}
               onMouseLeave={() => isPlaying && setShowControls(false)}
             >
               {!hasStarted ? (
                 <div className="absolute inset-0 z-10">
                   {/* Thumbnail Image */}
                   <div className="w-full h-full relative">
                      <img 
                        src={detailData.thumbnail} 
                        alt="Video Thumbnail" 
                        className="w-full h-full object-cover opacity-60"
                      />
                   </div>
                   
                   {/* Play Button Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                     <button 
                       onClick={togglePlay}
                       className="group/btn relative flex items-center justify-center h-20 w-20 md:h-24 md:w-24 bg-pink-600 hover:bg-pink-500 rounded-full text-white shadow-xl shadow-pink-600/30 transition-all duration-300 hover:scale-110 active:scale-95"
                     >
                       <Play size={40} className="ml-2 fill-current" />
                       <span className="absolute inset-0 rounded-full animate-ping bg-pink-600 opacity-20 group-hover/btn:opacity-40"></span>
                     </button>
                   </div>
                 </div>
               ) : (
                 <>
                   <video 
                     ref={videoRef}
                     className="w-full h-full object-contain cursor-pointer"
                     src={streamData.video_url}
                     poster={detailData.thumbnail}
                     onClick={togglePlay}
                     onTimeUpdate={handleTimeUpdate}
                     onLoadedMetadata={handleLoadedMetadata}
                     onEnded={() => setIsPlaying(false)}
                     autoPlay
                   >
                     Your browser does not support the video tag.
                   </video>

                   {/* Custom Controls Overlay */}
                   <div 
                      className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
                      onClick={() => {
                        // On mobile/interaction, ensure controls show up. 
                        // If we click the overlay background (not button), we can toggle play or just show controls.
                        // Let's rely on the video onClick for toggling play if clicking background, 
                        // but here we just ensure controls are visible.
                        if (!showControls) setShowControls(true);
                      }}
                   >
                      {/* Top Bar (Optional, can add back button here if fullscreen) */}
                      <div className="p-4 bg-gradient-to-b from-black/60 to-transparent">
                         {/* Empty for now or Title */}
                      </div>

                      {/* Center Play/Pause Button */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                         <button 
                           onClick={(e) => {
                             e.stopPropagation(); // Prevent double toggle if background also listens
                             togglePlay();
                           }}
                           className="pointer-events-auto group/center-btn relative flex items-center justify-center h-16 w-16 md:h-20 md:w-20 bg-black/40 hover:bg-pink-600/80 backdrop-blur-sm rounded-full text-white transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20 hover:border-pink-500"
                         >
                           {isPlaying ? (
                             <Pause size={32} className="fill-current" />
                           ) : (
                             <Play size={32} className="ml-1 fill-current" />
                           )}
                         </button>
                      </div>

                      {/* Bottom Controls Bar */}
                      <div className="p-4 flex flex-col gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        {/* Progress Bar */}
                        <div 
                           className="relative w-full h-1.5 bg-gray-600/50 rounded-full cursor-pointer group/progress touch-none"
                           onClick={handleSeek}
                        >
                           <div 
                             className="absolute top-0 left-0 h-full bg-pink-600 rounded-full"
                             style={{ width: `${(currentTime / duration) * 100}%` }}
                           >
                             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-pink-600 rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-md shadow-black"></div>
                           </div>
                        </div>

                        <div className="flex items-center justify-between text-sm font-medium">
                           <div className="flex items-center gap-4">
                             <button 
                               onClick={(e) => {
                                 e.stopPropagation();
                                 togglePlay();
                               }}
                               className="hover:text-pink-500 transition-colors pointer-events-auto"
                             >
                               {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current" />}
                             </button>
                             
                             <div className="flex items-center gap-1.5 text-xs text-gray-300 tracking-wide font-mono">
                               <span>{formatTime(currentTime)}</span>
                               <span className="text-gray-500">/</span>
                               <span>{formatTime(duration)}</span>
                             </div>
                           </div>

                           <div className="flex items-center gap-3">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFullscreen();
                                }}
                                className="hover:text-pink-500 transition-colors pointer-events-auto"
                              >
                                {isExpanded ? <Minimize size={20} /> : <Maximize size={20} />}
                              </button>
                           </div>
                        </div>
                      </div>
                   </div>
                 </>
               )}
             </div>
          </div>
        </div>

        {/* Sidebar - Episodes & Info */}
        <div className="lg:col-span-1 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 lg:overflow-y-auto lg:border-l lg:border-white/5 bg-slate-950/50 backdrop-blur-sm">
           <div className="p-4 md:p-6 space-y-6">
              {/* Episodes Accordion */}
              <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                <button 
                  onClick={() => setShowEpisodes(!showEpisodes)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-xl font-bold flex items-center gap-2">
                     <Menu size={20} className="text-pink-500" />
                     Episodes
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{detailData.episode_list.length} Total</span>
                    <ChevronDown size={20} className={`transition-transform duration-300 ${showEpisodes ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {showEpisodes && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 pt-0 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2 md:gap-3">
                         {detailData.episode_list.map((ep) => {
                           const isCurrent = ep.episode.toString() === currentEpisode.toString();
                           return (
                             <Link
                               key={ep.id}
                               href={`/stream/${bookId}/${ep.episode}`}
                               className={`
                                 relative p-3 rounded-lg text-center transition-all duration-200 border group
                                 ${isCurrent 
                                   ? 'bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-600/20' 
                                   : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:border-pink-500/30 hover:text-white'}
                               `}
                             >
                               <span className="font-semibold">{ep.episode}</span>
                               {isCurrent && (
                                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                  </span>
                               )}
                             </Link>
                           );
                         })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Info Block (Moved here) */}
              <div className="flex flex-col gap-4">
                 <div className="flex flex-col gap-2">
                   <h2 className="text-xl md:text-2xl font-bold leading-tight">{detailData.title}</h2>
                   <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                     <div className="flex items-center gap-1.5">
                       <MonitorPlay size={16} className="text-pink-500" />
                       <span>Episode {currentEpisode}</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <Star size={16} className="text-yellow-500" />
                       <span>{detailData.stats?.rating || 'N/A'}</span>
                     </div>
                     <div className="flex items-center gap-1.5">
                       <Calendar size={16} className="text-blue-500" />
                       <span>{new Date(detailData.upload_date).getFullYear()}</span>
                     </div>
                   </div>
                 </div>
                 
                 <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                    <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider text-gray-400">
                      <Film size={16} className="text-pink-500" />
                      Synopsis
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {detailData.description}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
    
  );
}
