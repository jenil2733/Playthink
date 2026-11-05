export interface Game {
  id: string;
  title: string;
  tagline: string;
  category: 'RACING' | 'ACTION RPG' | 'TACTICAL SHOOTER' | 'DARK FANTASY';
  genre: string;
  year: string;
  platforms: ('iOS (App Store)' | 'Android (Google Play)' | 'iPadOS' | 'Foldables')[];
  posterUrl: string;
  videoUrl: string;
  description: string;
  rating: string;
  downloads: string;
  size: string;
  techSpecs: {
    engine: string;
    targetFps: string;
    pipeline: string;
    touchLatency: string;
  };
  features: string[];
}

export interface EngineModule {
  id: string;
  tabLabel: string;
  title: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string; unit?: string }[];
  accentColor: string;
  visualType: 'hdrp' | 'thermal' | 'touch' | 'netcode';
}

export interface StudioService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  accent: string;
  iconName: 'gamepad' | 'palette' | 'vr' | 'casino' | 'simulator' | 'uiux' | 'aiagent' | 'aiml';
  features: string[];
  techStack: string[];
  deliverables: string[];
}
