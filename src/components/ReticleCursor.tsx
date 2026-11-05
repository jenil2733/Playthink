import React, { useEffect, useState } from 'react';

export const ReticleCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointers
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest('button, a, input, select, textarea, [data-interactive="true"]');
        setHovered(!!isInteractive);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-opacity duration-300"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        left: 0,
        top: 0,
      }}
    >
      {/* Center Precision Dot */}
      <div 
        className={`w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
          hovered ? 'bg-[#FFAB00] scale-150 shadow-[0_0_8px_#FFAB00]' : 'bg-white/80'
        }`}
      />

      {/* Reticle Brackets */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          hovered ? 'w-10 h-10 border-[#FFAB00]' : clicked ? 'w-5 h-5 border-[#FF2A54]' : 'w-7 h-7 border-white/30'
        }`}
      >
        {/* Top-Left Corner */}
        <span className="absolute top-0 left-0 w-2 h-0.5 bg-current" />
        <span className="absolute top-0 left-0 w-0.5 h-2 bg-current" />

        {/* Top-Right Corner */}
        <span className="absolute top-0 right-0 w-2 h-0.5 bg-current" />
        <span className="absolute top-0 right-0 w-0.5 h-2 bg-current" />

        {/* Bottom-Left Corner */}
        <span className="absolute bottom-0 left-0 w-2 h-0.5 bg-current" />
        <span className="absolute bottom-0 left-0 w-0.5 h-2 bg-current" />

        {/* Bottom-Right Corner */}
        <span className="absolute bottom-0 right-0 w-2 h-0.5 bg-current" />
        <span className="absolute bottom-0 right-0 w-0.5 h-2 bg-current" />
      </div>

      {/* Live HUD Coordinate Readout */}
      <div className="absolute left-4 top-4 hidden md:flex items-center gap-1.5 font-tech text-[9px] tracking-wider text-white/40 whitespace-nowrap">
        <span>X:{Math.round(pos.x)}</span>
        <span>Y:{Math.round(pos.y)}</span>
        {hovered && <span className="text-[#FFAB00] font-bold">[LOCK]</span>}
      </div>
    </div>
  );
};
