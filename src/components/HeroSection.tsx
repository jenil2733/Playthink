import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Smartphone, 
  DownloadCloud, 
  Gamepad2, 
  Users, 
  Star 
} from 'lucide-react';
import { sound } from './AudioFX';
import { ScrambleText } from './ScrambleText';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroSectionProps {
  onWatchReel: () => void;
  onExploreTitles: () => void;
}

const ROTATING_PHRASES = [
  'IMMERSIVE WORLDS.',
  'NEXT-GEN GAMES.',
  'CROSS-PLATFORM.',
  'MULTIPLAYER TITLES.',
  'MOBILE MASTERWORKS.',
  'DIGITAL LEGACIES.',
];

const STUDIO_STATS = [
  {
    icon: DownloadCloud,
    metric: '25M+',
    label: 'GLOBAL DOWNLOADS',
    detail: 'Across App Store & Google Play',
    accent: '#00E5FF',
  },
  {
    icon: Gamepad2,
    metric: '45+',
    label: 'PROJECTS DELIVERED',
    detail: 'Full-cycle mobile & cross-platform titles',
    accent: '#FFAB00',
  },
  {
    icon: Users,
    metric: '60+',
    label: 'GLOBAL CLIENTS',
    detail: 'Studios, publishers & indie partners',
    accent: '#00FF66',
  },
  {
    icon: Star,
    metric: '4.8 ★',
    label: 'PLAYER RATING',
    detail: 'Rated by millions of active gamers',
    accent: '#FF2A54',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onWatchReel: _onWatchReel, onExploreTitles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically cycle through phrases every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="hero"
      className="relative w-full min-h-screen overflow-hidden select-none bg-[#050505] text-white flex flex-col justify-between"
    >
      {/* =========================================================================
          THE BACKGROUND: REAL PLAYTHINK GAME STUDIO ENVIRONMENT (ATTACHED IMAGE)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* PlayThink Studio Image: Glowing Wall Logo, Unity Monitor & Handhelds */}
        <img
          src="/assets/aistudio/Gemini_Generated_Image_kjbd7bkjbd7bkjbd_44bdfb99.png"
          alt="PlayThink Game Studio"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.08] select-none scale-100"
        />

        {/* Cinematic Vignette Scrim - Ensures crisp headline contrast while revealing glowing studio elements */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 35%, rgba(5, 5, 8, 0.35) 0%, rgba(5, 5, 8, 0.76) 65%, #050505 100%)',
          }}
        />

        {/* Ambient Warm Golden & Cyan Studio Atmosphere Lights */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#FFAB00]/10 blur-[180px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00E5FF]/8 blur-[180px] pointer-events-none" />

        {/* Subtle Scanlines & Bottom Obsidian Gradient Fade */}
        <div className="absolute inset-0 scanlines-overlay opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* =========================================================================
          TOP HUD STATUS BAR (Hidden on mobile to preserve viewport height)
          ========================================================================= */}
      <div className="relative z-20 hidden sm:flex pt-24 sm:pt-28 px-6 sm:px-12 max-w-7xl mx-auto w-full items-center justify-between text-xs font-tech">
        {/* Left Status Marker */}
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1 bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
          <span className="text-[11px] font-tech tracking-wider text-neutral-300">
            STUDIO ONLINE // RAJKOT, IN
          </span>
        </div>

        {/* Right Mobile Architecture Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/10 text-neutral-300 font-tech text-[10px] tracking-wider uppercase backdrop-blur-md">
          <Smartphone className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>MOBILE GAMING SPECIALISTS // UNITY 6</span>
        </div>
      </div>

      {/* =========================================================================
          CORE HERO FOREGROUND: ZERO EXCESS SCROLLING ON MOBILE
          ========================================================================= */}
      <div className="relative z-20 px-4 sm:px-12 max-w-6xl mx-auto w-full my-auto pt-20 sm:pt-0 py-3 sm:py-6 text-center flex flex-col items-center">
        {/* Overline Kicker (Strictly one line on all screens) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-1.5 bg-black/70 border border-white/15 backdrop-blur-md mb-2 sm:mb-4 max-w-full"
        >
          <Gamepad2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFAB00] shrink-0" />
          <span className="font-tech text-[9px] sm:text-xs tracking-[0.12em] sm:tracking-[0.28em] text-neutral-200 uppercase whitespace-nowrap">
            UNITY 6 MOBILE ARCHITECTURE // RAJKOT
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAB00] animate-ping shrink-0" />
        </motion.div>

        {/* Main Rotating Kinetic Headline (Minimum distance between lines, tight cohesive lockup) */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center space-y-0.5 sm:space-y-1.5 py-0.5 sm:py-2 overflow-visible">
          {/* Line 1 (Static): "WE CREATE" */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-black text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-[0.16em] uppercase select-none leading-none"
          >
            WE CREATE
          </motion.div>

          {/* Line 2 (Animated / Cycling Phrases with ScrambleText - Tight Lockup) */}
          <div className="relative w-full h-[1.25em] flex items-center justify-center overflow-visible max-w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={ROTATING_PHRASES[currentIndex]}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ 
                  duration: 0.35, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="font-display font-black text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-tight sm:tracking-normal uppercase text-center leading-none"
              >
                <ScrambleText 
                  text={ROTATING_PHRASES[currentIndex]} 
                  duration={550} 
                  className="text-[#FFAB00] drop-shadow-[0_0_25px_rgba(255,171,0,0.65)] pt-2 sm:pt-3"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Hero Subtitle (Compact and legible on mobile) */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="mt-2 sm:mt-3.5 text-[9px] sm:text-[11px] md:text-xs text-neutral-400 font-subhead tracking-[0.2em] uppercase leading-snug sm:leading-relaxed max-w-md sm:max-w-lg mx-auto"
        >
          PLAYTHINK — THE GAME STUDIO // CRAFTING HIGH-PERFORMANCE 120 FPS MOBILE GAMES AND IMMERSIVE MULTIPLAYER TITLES POWERED BY UNITY 6.
        </motion.p>

        {/* Sleek Action CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="mt-3.5 sm:mt-5 flex flex-wrap items-center justify-center gap-3"
        >
          {/* Primary CTA: EXPLORE TITLES (A little bit smaller as requested) */}
          <button
            onClick={() => {
              sound.playClick();
              onExploreTitles();
            }}
            onMouseEnter={() => sound.playHover()}
            className="px-5 py-2 sm:px-6 sm:py-2.5 bg-white hover:bg-[#FFAB00] text-black font-tech font-bold text-[11px] sm:text-xs tracking-wider sm:tracking-widest uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_#FFAB00] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>EXPLORE TITLES</span>
            <ArrowRight className="w-3.5 h-3.5 text-black" />
          </button>
        </motion.div>

        {/* Studio Track Record & Performance Stats (Clients, Projects, Downloads, Rating) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
          className="mt-3.5 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5 w-full max-w-4xl"
        >
          {STUDIO_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.42 + i * 0.07 }}
                className="bg-black/75 border border-white/10 hover:border-white/30 p-2 sm:p-3.5 text-left backdrop-blur-md transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span 
                    className="font-tech text-sm sm:text-xl font-bold tracking-tight"
                    style={{ color: stat.accent }}
                  >
                    <AnimatedCounter value={stat.metric} delay={0.45 + i * 0.07} duration={1.5} />
                  </span>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-[9px] sm:text-[11px] font-tech text-white font-bold tracking-wider uppercase mb-0.5">
                  {stat.label}
                </div>
                <div className="text-[8px] sm:text-[10px] text-neutral-400 font-tech leading-tight line-clamp-1 sm:line-clamp-none">
                  {stat.detail}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* =========================================================================
          BOTTOM HUD / FOOTER TELEMETRY TICKER
          ========================================================================= */}
      <div className="relative z-20 pb-3 sm:pb-6 px-4 sm:px-12 max-w-7xl mx-auto w-full flex items-center justify-center pt-3 sm:pt-4 border-t border-white/10 text-[9px] sm:text-xs font-tech text-neutral-400">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[9px] sm:text-[10px] tracking-wider text-neutral-400">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
            APP STORE & GOOGLE PLAY CERTIFIED
          </span>
          <span className="hidden sm:inline">•</span>
          <span>SUB-6MS INPUT LATENCY</span>
          <span className="hidden sm:inline">•</span>
          <span>APPLE METAL 3 & VULKAN 1.3</span>
        </div>
      </div>
    </section>
  );
};

