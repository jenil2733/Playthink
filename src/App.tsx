/**
 * PLAYTHINK — THE GAME STUDIO
 * Official Mobile Gaming Experience Powered by Unity
 */

import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { ReticleCursor } from './components/ReticleCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedGames } from './components/FeaturedGames';
import { OurServices } from './components/OurServices';
import { WhyPlayThink } from './components/WhyPlayThink';
import { StudioDNA } from './components/StudioDNA';
import { CommandCenter } from './components/CommandCenter';
import { TrailerModal } from './components/TrailerModal';
import { FLAGSHIP_GAMES } from './data/studioData';
import { Game } from './types';
import { sound } from './components/AudioFX';

export default function App() {
  const [bootCompleted, setBootCompleted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [selectedTrailerGame, setSelectedTrailerGame] = useState<Game | null>(null);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [inquiredService, setInquiredService] = useState<string>('');

  // Toggle Web Audio API tactical sounds
  const handleToggleAudio = () => {
    const newState = sound.toggleSound();
    setAudioEnabled(newState);
  };

  // Open trailer modal for a specific game
  const handleOpenGameTrailer = (game: Game) => {
    setSelectedTrailerGame(game);
    setIsTrailerModalOpen(true);
  };

  // Open studio reel (Project Eclipse as marquee reel)
  const handleOpenStudioReel = () => {
    setSelectedTrailerGame(FLAGSHIP_GAMES[0]);
    setIsTrailerModalOpen(true);
  };

  // Smooth scroll to contact mission briefing
  const handleLaunchProject = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll to featured games
  const handleExploreTitles = () => {
    const gamesElem = document.getElementById('games');
    if (gamesElem) {
      gamesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Service Inquiry from OurServices to CommandCenter
  const handleInquireService = (serviceName: string) => {
    setInquiredService(serviceName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] relative font-subhead selection:bg-[#FFAB00] selection:text-black">
      {/* 1. Cinematic Boot Sequence */}
      {!bootCompleted && (
        <Preloader onComplete={() => setBootCompleted(true)} />
      )}

      {/* 2. Custom Interactive Gaming Reticle Cursor */}
      <ReticleCursor />

      {/* 3. Subtle CRT Scanline & Grain Texture */}
      <div className="fixed inset-0 pointer-events-none scanlines-overlay opacity-15 z-30" />

      {/* 4. Tactical Navbar */}
      <Navbar
        onLaunchProject={handleLaunchProject}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
      />

      {/* 5. Main Site Sections */}
      <main>
        {/* Full-Bleed Video Hero Section */}
        <HeroSection
          onWatchReel={handleOpenStudioReel}
          onExploreTitles={handleExploreTitles}
        />

        {/* Flagship Games Showcase */}
        <FeaturedGames onSelectGame={handleOpenGameTrailer} />

        {/* Our Comprehensive Services Fleet */}
        <OurServices onInquireService={handleInquireService} />

        {/* Why Studios & Brands Choose PlayThink */}
        <WhyPlayThink />

        {/* Studio DNA & Kinetic Marquee */}
        <StudioDNA />

        {/* Mission Briefing Command Center & Tactical Footer */}
        <CommandCenter inquiredService={inquiredService} />
      </main>

      {/* 6. Full-Screen Theatrical Trailer Modal */}
      <TrailerModal
        game={selectedTrailerGame}
        isOpen={isTrailerModalOpen}
        onClose={() => setIsTrailerModalOpen(false)}
      />
    </div>
  );
}
