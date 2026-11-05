import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, ShieldAlert, Sparkles } from 'lucide-react';
import { Game } from '../types';
import { sound } from './AudioFX';

interface TrailerModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ game, isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      sound.playLaunch();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    sound.playClick();
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    sound.playClick();
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = parseFloat(e.target.value);
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFullscreen = () => {
    sound.playClick();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Theatrical Container */}
      <div 
        className="relative w-full max-w-5xl bg-[#09090C] border border-white/15 rounded-none shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Tactical Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0D0D11] border-b border-white/10 select-none">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FF2A54] animate-pulse" />
            <div>
              <div className="font-display font-bold text-xs sm:text-sm text-white tracking-widest uppercase flex items-center gap-2">
                {game.title}
                <span className="text-[10px] text-[#FFAB00] font-tech font-normal">[OFFICIAL CINEMATIC TRAILER]</span>
              </div>
              <div className="text-[10px] font-tech text-neutral-400">
                {game.techSpecs.engine} · {game.techSpecs.targetFps}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas Viewport */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            src={game.videoUrl}
            poster={game.posterUrl}
            autoPlay
            playsInline
            muted={isMuted}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />

          {/* Vignette & scanline subtle layer */}
          <div className="absolute inset-0 pointer-events-none scanlines-overlay opacity-30" />

          {/* Watermark in corner */}
          <div className="absolute top-4 right-4 pointer-events-none text-right font-tech text-[10px] text-white/50 bg-black/60 px-2 py-1 backdrop-blur-sm border border-white/10">
            PLAYTHINK // IN-ENGINE HDRP FOOTAGE
          </div>

          {/* Center Play/Pause Overlay Icon when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#FFAB00] text-black flex items-center justify-center shadow-[0_0_30px_#FFAB00] hover:scale-110 transition-transform cursor-pointer"
            >
              <Play className="w-7 h-7 fill-current ml-1" />
            </button>
          )}
        </div>

        {/* Custom Playback Scrubber & Controls Bar */}
        <div className="px-5 py-3 bg-[#0D0D11] border-t border-white/10 flex flex-col gap-2 select-none">
          {/* Progress Slider */}
          <div className="w-full relative flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-neutral-800 rounded-none accent-[#FFAB00] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-tech">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-[#FFAB00] transition-colors flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span className="hidden sm:inline">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>

              <button
                onClick={toggleMute}
                className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#FF2A54]" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isMuted ? 'UNMUTE' : 'MUTE'}</span>
              </button>

              <div className="text-neutral-400 tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration || 0)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-neutral-500 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-[#FFAB00]" />
                <span>RAYTRACED POST-FX</span>
              </div>
              <button
                onClick={handleFullscreen}
                className="text-neutral-400 hover:text-white transition-colors"
                title="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Game Synopsis & Key Technical Architecture footer strip */}
        <div className="px-5 py-3.5 bg-[#050505] border-t border-white/10 hidden sm:grid sm:grid-cols-3 gap-4 text-xs">
          <div className="col-span-2 text-neutral-400 leading-relaxed">
            <span className="text-white font-medium block mb-1">SYNOPSIS:</span>
            {game.description}
          </div>
          <div className="border-l border-white/10 pl-4 space-y-1 font-tech text-[11px]">
            <div className="text-neutral-500">STORES: <span className="text-white font-semibold">{game.platforms.join(' · ')}</span></div>
            <div className="text-neutral-500">PIPELINE: <span className="text-[#FFAB00]">{game.techSpecs.pipeline}</span></div>
            <div className="text-neutral-500">TOUCH RESPONSE: <span className="text-[#00FF66] font-bold">{game.techSpecs.touchLatency}</span></div>
            <div className="text-neutral-500">INSTALLS: <span className="text-white">{game.downloads} ({game.rating})</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
