import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusLog, setStatusLog] = useState('ALLOCATING SHADER BUFFERS...');

  useEffect(() => {
    const logs = [
      'ALLOCATING MOBILE SHADER BUFFERS...',
      'CALIBRATING 480HZ SUB-8MS TOUCH DISPATCHER...',
      'LOADING METAL 3 & VULKAN 1.3 COMPUTE PASSES...',
      'INITIALIZING ZERO-THROTTLE THERMAL GOVERNOR...',
      'CONNECTING TO RAJKOT MOBILE FLEET...',
      'MOBILE RIG ARMED. READY TO LAUNCH.',
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 250);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const bounded = Math.min(next, 100);

        // Update technical log message based on progress
        const logIndex = Math.min(
          Math.floor((bounded / 100) * logs.length),
          logs.length - 1
        );
        setStatusLog(logs[logIndex]);

        return bounded;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Background Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 171, 0, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* Decorative Corner HUD brackets */}
      <div className="absolute top-8 left-8 text-[11px] font-tech text-neutral-500 hidden sm:block">
        <div>CORE // PLAYTHINK OS v6.2</div>
        <div className="text-neutral-600">SYS_AUTH: VERIFIED</div>
      </div>

      <div className="absolute top-8 right-8 text-[11px] font-tech text-neutral-500 text-right hidden sm:block">
        <div>GEO: 22.3039° N, 70.8022° E</div>
        <div className="text-neutral-600">RAJKOT HQ // ONLINE</div>
      </div>

      {/* Center Main Logo & Holographic Pulse */}
      <div className="relative mb-10 flex flex-col items-center">
        <div className="relative w-72 sm:w-96 flex items-center justify-center p-3">
          {/* Pulsing Aura */}
          <div className="absolute inset-0 bg-[#FFAB00]/15 blur-2xl animate-pulse" />
          
          {/* Main Logo */}
          <img
            src="/assets/aistudio/PlayThink__3__59c86e86.png"
            alt="PLAYTHINK — THE GAME STUDIO"
            className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:scale-105 transition-transform duration-300"
          />

          {/* Reticle Ring */}
          <div className="absolute -inset-3 border border-dashed border-[#FFAB00]/40 rounded animate-pulse" />
        </div>
      </div>

      {/* Progress & Telemetry Terminal */}
      <div className="w-full max-w-md space-y-3">
        {/* Percentage Counter and HUD */}
        <div className="flex justify-between items-end font-tech text-xs">
          <div className="text-white/60">
            INITIALIZING UNITY 6 MOBILE PIPELINE
          </div>
          <div className="font-hud text-lg text-[#FFAB00] font-bold tabular-nums">
            {progress.toString().padStart(3, '0')}%
          </div>
        </div>

        {/* Progress Bar with Gaming Cut Corner */}
        <div className="w-full h-1.5 bg-neutral-900 border border-white/10 rounded-none overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#FF2A54] via-[#FFAB00] to-white transition-all duration-75 ease-out shadow-[0_0_12px_#FFAB00]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Live System Log */}
        <div className="flex items-center justify-between text-[11px] font-tech text-neutral-500 pt-1">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 bg-[#FFAB00] animate-ping inline-block rounded-full" />
            <span className="text-neutral-400 truncate">{statusLog}</span>
          </div>
          <span className="shrink-0 text-neutral-600">120 FPS</span>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="mt-8 px-4 py-1.5 text-[10px] font-tech tracking-widest text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors uppercase cursor-pointer"
      >
        [ SKIP SEQUENCE ]
      </button>
    </div>
  );
};
