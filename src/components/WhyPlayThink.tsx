import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from './AudioFX';
import { 
  Gamepad2, 
  Globe2, 
  Rocket, 
  Users2, 
  Zap,
  Activity,
  Check
} from 'lucide-react';

export const WhyPlayThink: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const pillars = [
    {
      id: '01',
      code: 'FULL-CYCLE',
      title: 'Full-Cycle Development',
      desc: 'Concept, art, engineering, QA, and liveops — we handle every stage so you can focus on your vision.',
      icon: <Gamepad2 className="w-5 h-5 text-[#FFAB00]" />,
      accent: '#FFAB00',
      badge: 'END-TO-END',
      status: 'VERIFIED // 100%',
    },
    {
      id: '02',
      code: 'MULTI-PLATFORM',
      title: 'Cross-Platform Expertise',
      desc: 'Seamless high-performance builds across mobile, PC, console, web, and spatial VR.',
      icon: <Globe2 className="w-5 h-5 text-[#00E5FF]" />,
      accent: '#00E5FF',
      badge: 'UNIFIED RUNTIME',
      status: 'NATIVE FPS // 120Hz',
    },
    {
      id: '03',
      code: 'PRECISION SPRINT',
      title: 'On-Time Delivery',
      desc: 'Agile sprints, transparent milestone builds, and strict scope control to lock timelines and budget.',
      icon: <Rocket className="w-5 h-5 text-[#00FF66]" />,
      accent: '#00FF66',
      badge: 'ON SCHEDULE',
      status: 'ZERO DRIFT // GUARANTEED',
    },
    {
      id: '04',
      code: 'DIRECT TALENT',
      title: 'Dedicated Teams',
      desc: 'Top-tier senior developers, 3D artists, and combat designers embedded directly into your pipeline.',
      icon: <Users2 className="w-5 h-5 text-[#FF2A54]" />,
      accent: '#FF2A54',
      badge: 'EMBEDDED FLEET',
      status: 'DIRECT ACCESS // SLACK',
    },
  ];

  return (
    <section id="why-playthink" className="py-10 sm:py-16 md:py-20 bg-[#050508] text-white relative select-none border-t border-white/10 overflow-hidden">
      {/* Background Subtle Cyber Glows */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#FFAB00]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-12 pb-4 sm:pb-6 border-b border-white/10"
        >
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 font-tech text-[10px] sm:text-xs text-[#FFAB00] uppercase tracking-widest mb-1.5">
              <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>03. WHY PLAYTHINK // PARTNERSHIP DNA</span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl md:text-4xl uppercase tracking-tight text-white">
              WHY STUDIOS & BRANDS CHOOSE US
            </h2>
          </div>
          <p className="text-neutral-400 font-subhead text-xs sm:text-sm max-w-md md:text-right">
            We don't just build games. We build partnerships — and we don't disappoint. Ever.
          </p>
        </motion.div>

        {/* Unique Compact 4-Column Cyber Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {pillars.map((pillar, index) => {
            const isHovered = activeCard === index;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
                onMouseEnter={() => {
                  sound.playHover();
                  setActiveCard(index);
                }}
                onMouseLeave={() => setActiveCard(null)}
                className="group relative bg-[#09090D] border border-white/10 hover:border-white/30 p-3.5 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden"
                style={{
                  boxShadow: isHovered 
                    ? `0 10px 25px rgba(0, 0, 0, 0.9), 0 0 25px ${pillar.accent}20` 
                    : '0 4px 15px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* Neon Top Circuit Accent */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
                  style={{ 
                    backgroundColor: pillar.accent,
                    opacity: isHovered ? 1 : 0.3
                  }}
                />

                {/* Corner Tech Bracket */}
                <div 
                  className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-colors duration-300"
                  style={{ borderColor: isHovered ? pillar.accent : 'rgba(255,255,255,0.1)' }}
                />

                <div>
                  {/* Top Bar: Icon & HUD Index */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-black/80 border border-white/10 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                      style={{
                        borderColor: isHovered ? pillar.accent : 'rgba(255,255,255,0.15)',
                        boxShadow: isHovered ? `0 0 15px ${pillar.accent}30` : 'none',
                      }}
                    >
                      {pillar.icon}
                    </div>

                    <div className="flex items-center gap-1.5 font-tech text-[9px] sm:text-[10px] text-neutral-500">
                      <span>[{pillar.id}]</span>
                    </div>
                  </div>

                  {/* Micro Tagline */}
                  <div className="font-tech text-[8px] sm:text-[9px] uppercase tracking-wider text-neutral-400 mb-1">
                    {pillar.code}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-sm sm:text-base md:text-lg text-white uppercase tracking-wide group-hover:text-white transition-colors mb-1.5 sm:mb-2">
                    {pillar.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-neutral-400 font-subhead text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Compact Bottom Telemetry */}
                <div className="pt-3 sm:pt-4 mt-3 sm:mt-5 border-t border-white/10 flex items-center justify-between font-tech text-[9px] sm:text-[10px]">
                  <span className="text-neutral-400 font-medium">
                    {pillar.badge}
                  </span>
                  <span 
                    className="font-bold flex items-center gap-1 text-[8px] sm:text-[9px]"
                    style={{ color: pillar.accent }}
                  >
                    <Check className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                    <span>{pillar.status}</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
