import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { sound } from './AudioFX';

interface NavbarProps {
  onLaunchProject: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onLaunchProject, 
  audioEnabled, 
  onToggleAudio 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'GAMES', targetId: 'games' },
    { label: 'SERVICES', targetId: 'services' },
    { label: 'WHY PLAYTHINK', targetId: 'why-playthink' },
    { label: 'STUDIO DNA', targetId: 'studio-dna' },
    { label: 'CONTACT', targetId: 'contact' },
  ];

  const handleNavClick = (targetId: string) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone - Official Panoramic Logo */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center shrink-0 group focus:outline-none py-1 cursor-pointer bg-transparent border-0 p-0 text-left"
          title="PLAYTHINK — THE GAME STUDIO"
          aria-label="Scroll to top"
        >
          <img
            src="/assets/aistudio/PlayThink__3__59c86e86.png"
            alt="PLAYTHINK — THE GAME STUDIO"
            className="h-9 sm:h-11 md:h-12 w-auto max-w-[240px] sm:max-w-[320px] object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </button>

        {/* Zone 2: Sleek HUD Nav Links with Bracket Hover */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-tech tracking-widest text-neutral-400">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavClick(item.targetId)}
              onMouseEnter={() => sound.playHover()}
              className="group relative py-1 hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="text-[#FFAB00] opacity-0 group-hover:opacity-100 transition-opacity font-bold mr-0.5">
                [
              </span>
              <span>{item.label}</span>
              <span className="text-[#FFAB00] opacity-0 group-hover:opacity-100 transition-opacity font-bold ml-0.5">
                ]
              </span>
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Desktop/Tablet CTA Button (Hidden on mobile screens as requested) */}
          <button
            onClick={() => {
              sound.playLaunch();
              onLaunchProject();
            }}
            onMouseEnter={() => sound.playHover()}
            className="hidden md:inline-flex px-5 sm:px-6 py-2.5 text-xs font-tech font-bold tracking-widest text-black bg-white hover:bg-[#FFAB00] transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_#FFAB00] whitespace-nowrap shrink-0 clip-path-polygon"
          >
            [ START A PROJECT ]
          </button>

          {/* Beautiful Cyber Mobile Menu Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2.5 text-neutral-300 hover:text-white bg-black/60 hover:bg-black/85 border border-white/15 hover:border-[#FFAB00]/60 rounded-sm backdrop-blur-md transition-all active:scale-95 cursor-pointer flex items-center justify-center shadow-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#FFAB00]" />
            ) : (
              <div className="w-5 h-4 flex flex-col justify-between items-end">
                <span className="w-5 h-0.5 bg-white rounded-full transition-all" />
                <span className="w-3.5 h-0.5 bg-[#FFAB00] rounded-full transition-all" />
                <span className="w-4.5 h-0.5 bg-white rounded-full transition-all" />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Beautiful Cyber Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07070A]/95 backdrop-blur-2xl border-b border-white/15 px-6 py-6 mt-3 space-y-5 animate-in slide-in-from-top duration-300 shadow-2xl">
          <div className="flex flex-col divide-y divide-white/5 font-tech text-sm tracking-wider">
            {navItems.map((item, idx) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item.targetId)}
                className="text-left py-3.5 text-neutral-300 hover:text-[#FFAB00] transition-colors flex items-center justify-between group cursor-pointer w-full"
              >
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-2.5">
                  <span className="text-[#FFAB00] text-[10px] font-mono">0{idx + 1}.</span>
                  <span className="font-semibold text-xs tracking-widest">{item.label}</span>
                </span>
                <span className="text-neutral-500 group-hover:text-[#FFAB00] text-xs transition-colors">→</span>
              </button>
            ))}
          </div>

          {/* In-Drawer Project Launch Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                sound.playLaunch();
                setMobileMenuOpen(false);
                onLaunchProject();
              }}
              className="w-full py-3.5 bg-white hover:bg-[#FFAB00] text-black font-tech font-bold text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2"
            >
              <span>[ START A PROJECT ]</span>
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-tech text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
              <span>RAJKOT HQ // ONLINE</span>
            </div>
            <span>UNITY 6 HDRP</span>
          </div>
        </div>
      )}
    </header>
  );
};
