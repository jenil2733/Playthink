import React from 'react';
import { motion } from 'framer-motion';
import { STUDIO_METRICS } from '../data/studioData';
import { Shield, Target, Flame, Terminal, Code2, Users, Award } from 'lucide-react';
import { sound } from './AudioFX';
import { AnimatedCounter } from './AnimatedCounter';

export const StudioDNA: React.FC = () => {
  const tickerText = 'PLAYTHINK — ARCHITECTS OF MOBILE GAMING — 120 FPS FLUIDITY IN YOUR PALM — CRAFTED IN RAJKOT FOR THE WORLD — ';

  const pillars = [
    {
      id: '01',
      title: 'ZERO-THROTTLE 120 FPS MOBILE',
      desc: 'Mobile games die when chips overheat. We engineer proprietary thermal governors that sustain 60–120 FPS without draining batteries or causing thermal throttling.',
      icon: <Target className="w-5 h-5 text-[#FFAB00]" />,
    },
    {
      id: '02',
      title: 'SUB-7MS TOUCH & TACTIC HAPTICS',
      desc: 'Touch controls must never feel sloppy. Our custom 480Hz hardware touch dispatcher and micro-taptic vibration waves give players tactile console feedback on glass.',
      icon: <Flame className="w-5 h-5 text-[#FF2A54]" />,
    },
    {
      id: '03',
      title: 'LOW-LEVEL VULKAN & METAL 3',
      desc: 'Bypassing engine bloat with bespoke compute shaders, hardware ASTC texture compression, and sub-1.8GB memory footprints on iOS and Android.',
      icon: <Code2 className="w-5 h-5 text-[#00E5FF]" />,
    },
  ];

  return (
    <section id="studio-dna" className="py-10 sm:py-20 md:py-24 bg-[#08080C] text-white relative overflow-hidden select-none border-t border-white/10">
      {/* 1. Kinetic Typography Marquee */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="w-full bg-[#0D0D11] border-y border-white/10 py-3 sm:py-5 overflow-hidden whitespace-nowrap flex select-none"
      >
        <div className="flex animate-marquee font-display font-black text-sm sm:text-2xl md:text-3xl text-white tracking-[0.2em] uppercase">
          <span className="text-white">{tickerText}</span>
          <span className="text-[#FFAB00]">{tickerText}</span>
          <span className="text-white">{tickerText}</span>
          <span className="text-[#FF2A54]">{tickerText}</span>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-20">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 font-tech text-[10px] sm:text-xs text-[#FFAB00] uppercase tracking-widest mb-2 sm:mb-3">
            <Shield className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>04. STUDIO DNA // MOBILE CORE PHILOSOPHY</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight text-white">
            WE ARCHITECT MOBILE WORLDS THAT DEMAND RESPECT
          </h2>
          <p className="mt-2 sm:mt-3 text-neutral-400 font-subhead text-xs sm:text-base leading-relaxed">
            Headquartered in Rajkot, India, PlayThink is dedicated exclusively to proving that mobile gaming can rival top-tier consoles in visual spectacle, frame consistency, and competitive depth.
          </p>
        </motion.div>

        {/* Bold Stats Grid with Incremented Numbers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-20">
          {STUDIO_METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
              onMouseEnter={() => sound.playHover()}
              className="bg-[#0D0D12] border border-white/10 hover:border-[#FFAB00]/50 p-3.5 sm:p-8 flex flex-col justify-between transition-all duration-200 group"
            >
              <div className="font-hud font-black text-2xl sm:text-4xl md:text-5xl text-white group-hover:text-[#FFAB00] transition-colors tabular-nums">
                <AnimatedCounter value={metric.value} />
              </div>
              <div className="mt-2.5 sm:mt-4 pt-2.5 sm:pt-4 border-t border-white/10">
                <div className="font-tech text-[11px] sm:text-sm font-bold text-white uppercase tracking-wider">
                  {metric.label}
                </div>
                <div className="font-tech text-[8px] sm:text-[10px] text-neutral-500 mt-0.5 sm:mt-1 truncate">
                  {metric.note}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Culture & Pillars Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="bg-[#0A0A0E] border border-white/10 p-4 sm:p-8 flex flex-col justify-between hover:border-white/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5 sm:mb-6">
                  {pillar.icon}
                  <span className="font-tech text-[10px] sm:text-xs text-neutral-600 font-bold">
                    [PILLAR {pillar.id}]
                  </span>
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-white uppercase tracking-wide">
                  {pillar.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-neutral-400 font-subhead text-xs sm:text-sm leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              <div className="mt-4 sm:mt-8 pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between font-tech text-[9px] sm:text-[10px] text-neutral-500">
                <span>VERIFIED STANDARD</span>
                <span className="text-[#00FF66]">ENFORCED</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
