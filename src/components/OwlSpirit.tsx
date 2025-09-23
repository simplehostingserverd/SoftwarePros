"use client";

import { useEffect, useState } from "react";

interface OwlSpiritProps {
  className?: string;
}

export default function OwlSpirit({ className = "" }: OwlSpiritProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add load animation delay
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative ${className} transform transition-all duration-1000 ${
        isLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-xl animate-pulse" />

      {/* 3D Owl Model */}
      <div className="relative z-10 sketchfab-embed-wrapper rounded-xl overflow-hidden shadow-2xl shadow-purple-500/30">
        <iframe
          title="Owl Spirit - SoftwarePros Mascot"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src="https://sketchfab.com/models/a5d277c61ef74c16a5ad93bb80172d41/embed?ui_theme=dark&dnt=1&autostart=1&camera=0&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
          className="w-full h-full border-0"
          style={{ minHeight: "400px" }}
        />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-300 opacity-75" />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-700 opacity-75" />
      </div>

      {/* Mystical glow border */}
      <div className="absolute inset-0 rounded-xl border border-purple-500/30 animate-pulse" />
    </div>
  );
}