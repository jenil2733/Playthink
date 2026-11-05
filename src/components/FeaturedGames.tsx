import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Smartphone, Tablet, ChevronRight, Star, Download, Flame, Zap } from 'lucide-react';
import { FLAGSHIP_GAMES } from '../data/studioData';
import { Game } from '../types';
import { sound } from './AudioFX';
import { AnimatedCounter } from './AnimatedCounter';

interface FeaturedGamesProps {
  onSelectGame: (game: Game) => void;
}

export const FeaturedGames: React.FC<FeaturedGamesProps> = ({ onSelectGame }) => {
  const [hoveredGameId, setHoveredGameId] = useState<string | null>(null);

  return (
    <section id="games" className="py-12 sm:py-24 md:py-32 bg-[#050505] text-white relative select-none">
      {/* Background Section Glow Accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#FFAB00]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#FF2A54]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="pb-6 sm:pb-12 border-b border-white/10"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 font-tech text-[10px] sm:text-xs text-[#FFAB00] uppercase tracking-widest mb-1.5 sm:mb-2">
            <Smartphone className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>01. MOBILE PRODUCTION LINE // FLAGSHIP TITLES</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight text-white">
            FLAGSHIP MOBILE TITLES
          </h2>
          <p className="mt-1.5 sm:mt-2 text-neutral-400 font-subhead text-xs sm:text-base max-w-xl leading-relaxed">
            Engineered exclusively for iOS and Android. Zero compromise, hardware-accelerated Vulkan & Metal 3 graphics, and buttery 120 FPS fluidity.
          </p>
        </motion.div>

        {/* Asymmetric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mt-6 sm:mt-12">
          {FLAGSHIP_GAMES.map((game, index) => {
            const isHovered = hoveredGameId === game.id;

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.98, y: 12 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 1, 0.5, 1] }}
                onMouseEnter={() => {
                  sound.playHover();
                  setHoveredGameId(game.id);
                }}
                onMouseLeave={() => setHoveredGameId(null)}
                className="group relative bg-[#0D0D11] border border-white/10 hover:border-[#FFAB00]/70 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl"
              >
                {/* Media Container (Poster Art with Video Crossfade) */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
                  {/* Poster Image */}
                  <img
                    src={game.posterUrl}
                    alt={game.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                      isHovered ? 'opacity-0' : 'opacity-100'
                    }`}
                  />

                  {/* Looping Gameplay Video Preview on Hover */}
                  <video
                    src={game.videoUrl}
                    poster={game.posterUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      isHovered ? 'opacity-100 scale-105' : 'opacity-0'
                    }`}
                  />

                  {/* Gradient Scrim & Scanline Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11] via-transparent to-black/30 pointer-events-none" />
                  <div className="absolute inset-0 scanlines-overlay opacity-20 pointer-events-none" />

                  {/* Top Badge: Mobile Store Support & Rating */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-tech z-10">
                    <div className="flex items-center gap-2 px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/10 text-white">
                      <Smartphone className="w-3.5 h-3.5 text-[#00FF66]" />
                      <span className="text-[10px]">iOS & ANDROID</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[#FFAB00] font-bold text-[10px] tracking-wider flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span><AnimatedCounter value={game.rating} /></span>
                      </div>
                      <div className="px-2.5 py-1 bg-[#FFAB00] text-black font-bold text-[10px] tracking-wider uppercase">
                        <AnimatedCounter value={game.downloads} /> INSTALLS
                      </div>
                    </div>
                  </div>

                  {/* Live Hover HUD Overlay */}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-none ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="px-4 py-2 bg-white text-black font-tech font-bold text-xs tracking-widest flex items-center gap-2 shadow-[0_0_20px_#FFAB00]">
                      <Play className="w-4 h-4 fill-current text-black" />
                      <span>WATCH MOBILE TRAILER</span>
                    </div>
                    <div className="text-[10px] font-tech text-[#FFAB00] mt-2 tracking-wider">
                      TOUCH POLLING: {game.techSpecs.touchLatency}
                    </div>
                  </div>
                </div>

                {/* Card Content & Telemetry */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Genre Kicker */}
                    <div className="flex items-center justify-between text-[11px] sm:text-xs font-tech text-neutral-400 mb-1.5 sm:mb-2">
                      <span className="text-[#FFAB00] font-semibold">{game.genre}</span>
                      <span className="text-[#00FF66] font-mono text-[10px] sm:text-[11px]">{game.techSpecs.targetFps}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-lg sm:text-2xl text-white tracking-wide uppercase group-hover:text-[#FFAB00] transition-colors">
                      {game.title}
                    </h3>

                    {/* Tagline & Description */}
                    <p className="mt-1 text-xs sm:text-sm text-neutral-400 font-subhead line-clamp-2">
                      {game.tagline}
                    </p>
                  </div>

                  {/* Mobile Spec Matrix */}
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 grid grid-cols-3 gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-tech">
                    <div>
                      <span className="text-neutral-500 block text-[8px] sm:text-[9px] uppercase">MOBILE ENGINE</span>
                      <span className="text-neutral-300 truncate block">{game.techSpecs.engine.split(' ')[0]} {game.techSpecs.engine.split(' ')[1]}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[8px] sm:text-[9px] uppercase">TOUCH LATENCY</span>
                      <span className="text-[#00FF66] truncate block">{game.techSpecs.touchLatency}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[8px] sm:text-[9px] uppercase">INSTALL SIZE</span>
                      <span className="text-neutral-300 truncate block">{game.size}</span>
                    </div>
                  </div>

                  {/* Trigger Action */}
                  <button
                    onClick={() => {
                      sound.playLaunch();
                      onSelectGame(game);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="mt-4 sm:mt-6 w-full py-2.5 sm:py-3 bg-white/5 hover:bg-white hover:text-black border border-white/10 text-white font-tech text-[11px] sm:text-xs tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                  >
                    <span>VIEW MOBILE GAME HUB</span>
                    <ChevronRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
