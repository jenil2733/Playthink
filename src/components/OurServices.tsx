import React from 'react';
import { motion } from 'framer-motion';
import { STUDIO_SERVICES } from '../data/servicesData';
import { StudioService } from '../types';
import { sound } from './AudioFX';
import { 
  Gamepad2, 
  Palette, 
  Glasses, 
  Dices, 
  ShieldCheck, 
  LayoutGrid, 
  Bot, 
  BrainCircuit, 
  Cpu, 
  Layers, 
  Send, 
  Sparkles
} from 'lucide-react';

interface OurServicesProps {
  onInquireService?: (serviceName: string) => void;
}

export const OurServices: React.FC<OurServicesProps> = ({ onInquireService }) => {
  const renderServiceIcon = (iconName: StudioService['iconName'], className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'gamepad':
        return <Gamepad2 className={className} />;
      case 'palette':
        return <Palette className={className} />;
      case 'vr':
        return <Glasses className={className} />;
      case 'casino':
        return <Dices className={className} />;
      case 'simulator':
        return <ShieldCheck className={className} />;
      case 'uiux':
        return <LayoutGrid className={className} />;
      case 'aiagent':
        return <Bot className={className} />;
      case 'aiml':
        return <BrainCircuit className={className} />;
      default:
        return <Cpu className={className} />;
    }
  };

  const handleCardClick = (serviceTitle: string) => {
    sound.playClick();
    if (onInquireService) {
      onInquireService(serviceTitle);
    } else {
      const contactElem = document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="services" className="py-12 sm:py-24 md:py-32 bg-[#060609] text-white relative select-none border-t border-white/10 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FFAB00]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#00E5FF]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-3xl mb-8 sm:mb-16"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 font-tech text-[10px] sm:text-xs text-[#FFAB00] uppercase tracking-widest mb-2 sm:mb-3">
            <Layers className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
            <span>02. EXPANDED FLEET // FULL-SPECTRUM CAPABILITIES</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight text-white leading-tight">
            OUR SERVICES
          </h2>
          <p className="mt-2 sm:mt-3 text-neutral-400 font-subhead text-xs sm:text-base md:text-lg leading-relaxed">
            Comprehensive game development solutions tailored to your vision.
          </p>
        </motion.div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {STUDIO_SERVICES.map((service, index) => {
            const indexStr = String(index + 1).padStart(2, '0');

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: (index % 2 === 0 ? -10 : 10) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.25, 1, 0.5, 1] }}
                onClick={() => handleCardClick(service.title)}
                onMouseEnter={() => sound.playHover()}
                className="group relative bg-[#0D0D12] border border-white/10 hover:border-white/30 p-4 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden cursor-pointer"
                style={{
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
                }}
              >
                {/* Top Subtle Cyber Glow Bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300 opacity-30 group-hover:opacity-100"
                  style={{ backgroundColor: service.accent }}
                />

                <div>
                  {/* Card Header: Icon & Index */}
                  <div className="flex items-start justify-between mb-3.5 sm:mb-5">
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                      style={{ 
                        color: service.accent,
                        borderColor: `${service.accent}40`,
                        boxShadow: `0 0 20px ${service.accent}20` 
                      }}
                    >
                      {renderServiceIcon(service.iconName, 'w-5 h-5 sm:w-6 sm:h-6')}
                    </div>
                    <span className="font-tech text-[10px] sm:text-xs text-neutral-500 font-bold tracking-widest">
                      [{indexStr}]
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="font-tech text-[9px] sm:text-[10px] tracking-wider text-neutral-400 uppercase mb-1 sm:mb-2">
                    {service.category}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-base sm:text-lg md:text-xl text-white uppercase tracking-wide group-hover:text-white transition-colors mb-1.5 sm:mb-3">
                    {service.title}
                  </h3>

                  {/* Description from user prompt */}
                  <p className="text-neutral-400 font-subhead text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Footer with Tech Stack Badges */}
                <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className="text-[9px] sm:text-[10px] font-tech text-neutral-500 uppercase tracking-wider">
                    TECH STACK
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {service.techStack.slice(0, 2).map((tech) => (
                      <span 
                        key={tech} 
                        className="text-[8px] sm:text-[9px] font-tech px-1.5 sm:px-2 py-0.5 bg-black/50 text-neutral-400 border border-white/5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Studio Fleet Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
          className="mt-8 sm:mt-14 p-4 sm:p-8 bg-[#0D0D12] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <div className="font-tech text-[10px] sm:text-xs text-[#FFAB00] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5 sm:gap-2">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>CUSTOM PRODUCTION PIPELINES AVAILABLE</span>
            </div>
            <div className="font-display font-bold text-base sm:text-xl text-white uppercase tracking-wide">
              HAVE A SPECIFIC ENGINE OR BESPOKE PROJECT REQUIREMENT?
            </div>
            <p className="text-neutral-400 font-subhead text-xs sm:text-sm max-w-xl">
              From standalone game modules to full turnkey publishing suites, our technical team architects tailored solutions for studios worldwide.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playLaunch();
              const contactElem = document.getElementById('contact');
              if (contactElem) {
                contactElem.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onMouseEnter={() => sound.playHover()}
            className="w-full md:w-auto px-5 py-3 sm:px-6 sm:py-3.5 bg-white hover:bg-[#FFAB00] text-black font-tech font-bold text-[11px] sm:text-xs tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_#FFAB00]"
          >
            <Send className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current text-black" />
            <span>DISPATCH CUSTOM BRIEFING</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
