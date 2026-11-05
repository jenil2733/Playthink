import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { STUDIO_DETAILS } from '../data/studioData';
import { sound } from './AudioFX';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowUp, 
  Radio, 
  CheckCircle2, 
  AlertCircle,
  Gamepad,
  Layers,
  Sparkles,
  Terminal
} from 'lucide-react';

interface CommandCenterProps {
  inquiredService?: string;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ inquiredService }) => {
  const [missionType, setMissionType] = useState<string>('GAME DEVELOPMENT');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'TRANSMITTING' | 'DISPATCHED' | 'ERROR'>('IDLE');

  useEffect(() => {
    if (inquiredService) {
      setMissionType(inquiredService.toUpperCase());
      setMessage((prev) => prev || `Inquiring about project specifications for ${inquiredService}...`);
    }
  }, [inquiredService]);

  const missionTypes = [
    { id: 'GAME DEVELOPMENT', label: 'GAME DEVELOPMENT', sub: 'Full-cycle mobile, PC, console, web' },
    { id: 'DESIGN & ART', label: 'DESIGN & ART', sub: '2D/3D art, rigs, environments & VFX' },
    { id: 'AR & VR DEVELOPMENT', label: 'AR & VR DEVELOPMENT', sub: 'VisionOS, Quest 3 & WebXR portals' },
    { id: 'CASINO & SLOT GAMES', label: 'CASINO & SLOT GAMES', sub: 'RNG certified slots, poker & table games' },
    { id: 'VR TRAINING SIMULATORS', label: 'VR TRAINING SIMULATORS', sub: 'Enterprise, healthcare & defense digital twins' },
    { id: 'UI/UX DESIGN', label: 'UI/UX DESIGN', sub: 'Player HUDs, mobile touch ergonomics' },
    { id: 'AI AGENT', label: 'AI AGENT', sub: 'Autonomous NPCs, living dialogue & squad AI' },
    { id: 'AI/ML DEVELOPMENT', label: 'AI/ML DEVELOPMENT', sub: 'Procedural PCG, SBMM matchmaking & balance' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !email.trim() || !message.trim()) {
      sound.playClick();
      setStatus('ERROR');
      return;
    }

    sound.playLaunch();
    setStatus('TRANSMITTING');

    // Build formatted message for WhatsApp dispatch
    const textLines = [
      '🎮 *PLAYTHINK — NEW MISSION BRIEFING*',
      '--------------------------------',
      `🎯 *MISSION:* ${missionType}`,
      `👤 *COMMANDER / STUDIO:* ${name.trim() || 'Confidential'}`,
      `📱 *PHONE:* ${phone.trim()}`,
      `✉️ *EMAIL:* ${email.trim()}`,
      '',
      '📝 *GAME OVERVIEW & REQUIREMENTS:*',
      message.trim(),
      '',
      '⚡ Transmitted via PlayThink Command Terminal'
    ];

    const waText = textLines.join('\n');
    const destinationPhone = '919265069599'; // PlayThink HQ Direct Line
    const targetUrl = `https://wa.me/${destinationPhone}?text=${encodeURIComponent(waText)}`;
    setWhatsappUrl(targetUrl);

    setTimeout(() => {
      setStatus('DISPATCHED');
      // Forward to WhatsApp
      try {
        const link = document.createElement('a');
        link.href = targetUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.warn('Direct redirect prevented:', err);
      }
    }, 700);
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    sound.playClick();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-24 md:py-32 bg-[#050505] text-white relative select-none overflow-hidden">
      {/* Background Ambient Cyber Glows */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#FFAB00]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#FF2A54]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-6 sm:mb-14"
        >
          <div className="flex items-center gap-1.5 sm:gap-2 font-tech text-[10px] sm:text-xs text-[#FFAB00] uppercase tracking-widest mb-1.5 sm:mb-2">
            <Radio className="w-3 sm:w-3.5 h-3 sm:h-3.5 animate-pulse" />
            <span>05. COMMAND CENTER // MISSION DISPATCH</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl uppercase tracking-tight text-white">
            INITIATE COMMUNICATIONS
          </h2>
          <p className="mt-1.5 sm:mt-2 text-neutral-400 font-subhead text-xs sm:text-base max-w-2xl leading-relaxed">
            Whether you require end-to-end game production, Unity 6 HDRP optimization, or co-development support, transmit your project briefing to our core engineering leads.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Mission Briefing Terminal (7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-7 bg-[#0D0D12] border border-white/15 p-4 sm:p-8 shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 font-tech text-xs text-neutral-300">
                <Terminal className="w-4 h-4 text-[#FFAB00]" />
                <span className="font-bold text-[11px] sm:text-xs">MISSION SPECIFICATION INTAKE</span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-tech text-neutral-500">TERMINAL: PT-RAJKOT-01</span>
            </div>

            {status === 'DISPATCHED' ? (
              <div className="py-14 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#00FF66]/20 border border-[#00FF66] text-[#00FF66] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,255,102,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl uppercase tracking-wider text-white">
                  DISPATCH FORWARDED TO WHATSAPP
                </h3>
                <p className="text-neutral-300 font-subhead text-sm max-w-md mx-auto leading-relaxed">
                  Your mission briefing details have been prepared and dispatched. Click below to continue directly in WhatsApp chat with PlayThink Command (+91 92650 69599).
                </p>

                {whatsappUrl && (
                  <div className="pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playLaunch()}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#00FF66] hover:bg-white text-black font-tech font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(0,255,102,0.4)] cursor-pointer"
                    >
                      <Phone className="w-4 h-4 fill-current" />
                      <span>OPEN IN WHATSAPP CHAT (+91 92650 69599)</span>
                    </a>
                  </div>
                )}

                <div className="pt-4 font-tech text-xs text-[#FFAB00]">
                  FREQ: Playthinkstudio@gmail.com // HOTLINE: +91 92650 69599
                </div>
                <button
                  onClick={() => {
                    sound.playClick();
                    setStatus('IDLE');
                  }}
                  className="mt-4 px-6 py-2 bg-white/10 hover:bg-white text-white hover:text-black font-tech text-xs tracking-wider transition-colors uppercase cursor-pointer"
                >
                  TRANSMIT ANOTHER BRIEFING
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* 1. Mission Type Selector */}
                <div>
                  <label className="block text-[10px] sm:text-xs font-tech text-neutral-400 mb-1.5 sm:mb-2 uppercase tracking-wider">
                    SELECT MISSION TYPE
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    {missionTypes.map((type) => {
                      const isSelected = missionType === type.id;
                      return (
                        <button
                          type="button"
                          key={type.id}
                          onClick={() => {
                            sound.playClick();
                            setMissionType(type.id);
                          }}
                          onMouseEnter={() => sound.playHover()}
                          className={`p-2.5 sm:p-3 text-left border transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? 'bg-white text-black border-white font-bold'
                              : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <div className="font-tech text-[11px] sm:text-xs uppercase">{type.label}</div>
                          <div className={`text-[9px] sm:text-[10px] mt-0.5 truncate ${isSelected ? 'text-neutral-800' : 'text-neutral-500'}`}>
                            {type.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Commander / Studio Name & Phone Number (WhatsApp) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-tech text-neutral-400 mb-1 sm:mb-1.5 uppercase tracking-wider">
                      COMMANDER / STUDIO NAME
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kojima / Paradox Interactive"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 px-3 py-2 sm:py-2.5 text-xs font-tech text-white placeholder-neutral-600 focus:border-[#FFAB00] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-tech text-neutral-400 mb-1 sm:mb-1.5 uppercase tracking-wider">
                      PHONE NUMBER (WHATSAPP) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 92650 XXXXX / +1..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 px-3 py-2 sm:py-2.5 text-xs font-tech text-white placeholder-neutral-600 focus:border-[#FFAB00] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 3. Frequency (Work Email) */}
                <div>
                  <label className="block text-[10px] sm:text-xs font-tech text-neutral-400 mb-1 sm:mb-1.5 uppercase tracking-wider">
                    FREQUENCY (WORK EMAIL) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="executive@publisher.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 px-3 py-2 sm:py-2.5 text-xs font-tech text-white placeholder-neutral-600 focus:border-[#FFAB00] focus:outline-none"
                  />
                </div>

                {/* 4. Project Synopsis */}
                <div>
                  <label className="block text-[10px] sm:text-xs font-tech text-neutral-400 mb-1 sm:mb-1.5 uppercase tracking-wider">
                    MISSION BRIEFING / GAME OVERVIEW *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe game mechanics, target release timeline, engine requirements, and current milestone progress..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 p-2.5 sm:p-3 text-xs font-tech text-white placeholder-neutral-600 focus:border-[#FFAB00] focus:outline-none resize-none"
                  />
                </div>

                {status === 'ERROR' && (
                  <div className="flex items-center gap-2 text-xs font-tech text-[#FF2A54] bg-[#FF2A54]/10 p-2.5 sm:p-3 border border-[#FF2A54]/30">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>PLEASE COMPLETE REQUIRED FIELDS (PHONE NUMBER, EMAIL, AND BRIEFING)</span>
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={status === 'TRANSMITTING'}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full py-3.5 sm:py-4 bg-white hover:bg-[#00FF66] text-black font-tech font-bold text-xs tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_#00FF66]"
                >
                  <Send className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-current text-black" />
                  <span>
                    {status === 'TRANSMITTING' ? 'REDIRECTING TO WHATSAPP TRANSMISSION...' : 'TRANSMIT BRIEFING TO WHATSAPP'}
                  </span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Official Holographic Studio Card (5 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 space-y-4 sm:space-y-6"
          >
            <div className="bg-[#0D0D12] border border-white/15 p-4 sm:p-8 relative overflow-hidden group shadow-2xl">
              {/* Subtle Holographic Grid Overlay */}
              <div className="absolute inset-0 scanlines-overlay opacity-20 pointer-events-none" />

              <div className="relative z-10 space-y-4 sm:space-y-6">
                {/* Logo & Headline */}
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
                  <img 
                    src="/assets/aistudio/PlayThink__3__59c86e86.png" 
                    alt="PLAYTHINK — THE GAME STUDIO" 
                    className="h-8 sm:h-10 w-auto object-contain" 
                  />
                  <div className="text-[9px] sm:text-[10px] font-tech text-[#FFAB00] px-2 py-0.5 bg-black/60 border border-white/10 shrink-0">
                    GLOBAL HQ
                  </div>
                </div>

                {/* Contact Items */}
                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-white/10 text-xs font-tech">
                  {/* Studio Headquarters */}
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#FFAB00] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-neutral-500 text-[9px] sm:text-[10px] uppercase">STUDIO HEADQUARTERS</div>
                      <div className="text-white font-medium text-xs sm:text-sm leading-relaxed mt-0.5">
                        {STUDIO_DETAILS.headquarters}
                      </div>
                    </div>
                  </div>

                  {/* Direct Comms Mobile */}
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Phone className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#00FF66] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-neutral-500 text-[9px] sm:text-[10px] uppercase">DIRECT COMMS (MOBILE)</div>
                      <a
                        href={`tel:${STUDIO_DETAILS.phoneRaw}`}
                        onClick={() => sound.playClick()}
                        className="text-white font-bold text-xs sm:text-sm tracking-wide hover:text-[#00FF66] transition-colors block mt-0.5"
                      >
                        {STUDIO_DETAILS.phone}
                      </a>
                    </div>
                  </div>

                  {/* Official Frequency Email */}
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Mail className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-neutral-500 text-[9px] sm:text-[10px] uppercase">OFFICIAL FREQUENCY (EMAIL)</div>
                      <a
                        href={`mailto:${STUDIO_DETAILS.email}`}
                        onClick={() => sound.playClick()}
                        className="text-white font-medium text-xs sm:text-sm hover:text-[#00E5FF] transition-colors block mt-0.5 truncate"
                      >
                        {STUDIO_DETAILS.email}
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-neutral-500 text-[9px] sm:text-[10px] uppercase">OPERATIONAL HOURS</div>
                      <div className="text-neutral-300 text-xs mt-0.5">{STUDIO_DETAILS.workingHours}</div>
                    </div>
                  </div>
                </div>

                {/* Direct Map / Satellite Badge */}
                <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-[10px] font-tech text-neutral-500">
                  <span>COORDINATES: 22.3039° N, 70.8022° E</span>
                  <span className="text-[#00FF66]">RAJKOT // ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Quick Dispatch Hotline Strip */}
            <div className="bg-black/50 border border-white/10 p-3.5 sm:p-5 flex items-center justify-between font-tech text-xs">
              <div>
                <span className="text-neutral-400 block text-[9px] sm:text-[10px]">FAST DIRECT INQUIRY?</span>
                <span className="text-white font-bold text-xs sm:text-sm">CALL PRODUCTION DESK</span>
              </div>
              <a
                href={`tel:${STUDIO_DETAILS.phoneRaw}`}
                onClick={() => sound.playClick()}
                className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 bg-[#00FF66]/20 border border-[#00FF66] text-[#00FF66] hover:bg-[#00FF66] hover:text-black font-bold transition-colors text-[10px] sm:text-[11px]"
              >
                CALL NOW
              </a>
            </div>
          </motion.div>
        </div>

        {/* Tactical Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
          className="mt-14 sm:mt-24 md:mt-32 pt-8 sm:pt-12 border-t border-white/10 relative"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 relative z-10">
            {/* Brand Lockup - Main Logo */}
            <div className="flex items-center">
              <img
                src="/assets/aistudio/PlayThink__3__59c86e86.png"
                alt="PLAYTHINK — THE GAME STUDIO"
                className="h-8 sm:h-11 w-auto object-contain"
              />
            </div>

            {/* Social / Studio Links */}
            <div className="flex items-center flex-wrap justify-center gap-3.5 sm:gap-6 font-tech text-[11px] sm:text-xs text-neutral-400">
              <button type="button" onClick={() => scrollToSection('games')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">GAMES</button>
              <button type="button" onClick={() => scrollToSection('services')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">SERVICES</button>
              <button type="button" onClick={() => scrollToSection('why-playthink')} className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left">WHY US</button>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-[#FFAB00] transition-colors">DISCORD</a>
              <a href="https://artstation.com" target="_blank" rel="noreferrer" className="hover:text-[#FFAB00] transition-colors">ARTSTATION</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#FFAB00] transition-colors">YOUTUBE</a>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 border border-white/15 hover:border-white text-neutral-300 hover:text-white font-tech text-[11px] sm:text-xs tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#FFAB00]" />
            </button>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-tech text-neutral-500 sm:text-neutral-600 gap-2 sm:gap-4 relative z-10 text-center sm:text-left">
            <div>
              © {new Date().getFullYear()} PLAYTHINK — THE GAME STUDIO. ALL RIGHTS RESERVED. PREMIER MOBILE GAMING POWERED BY UNITY 6.
            </div>
            <div>
              DESIGNED IN RAJKOT, INDIA FOR THE WORLD.
            </div>
          </div>

          {/* Huge Faded Kinetic Typography in Background */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-5 font-display font-black text-5xl sm:text-8xl md:text-9xl lg:text-[140px] text-white tracking-widest whitespace-nowrap">
            PLAYTHINK
          </div>
        </motion.div>
      </div>
    </section>
  );
};
