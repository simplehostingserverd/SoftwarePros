"use client";

import { useEffect, useState } from "react";

interface OwlSpiritProps {
  className?: string;
}

export default function OwlSpirit({ className = "" }: OwlSpiritProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFlying, setIsFlying] = useState(true);

  useEffect(() => {
    // Start flying animation immediately
    const flyTimer = setTimeout(() => {
      setIsFlying(false);
      setIsLoaded(true);
    }, 2000); // 2 second flight

    return () => clearTimeout(flyTimer);
  }, []);

  return (
    <div
      className={`relative ${className} transform transition-all duration-2000 ease-out ${
        isFlying
          ? "translate-x-full translate-y-[-200px] scale-75 opacity-60 rotate-12"
          : isLoaded
            ? "translate-x-0 translate-y-0 scale-100 opacity-100 rotate-0"
            : "scale-95 opacity-0"
      }`}
      style={{
        transformOrigin: "center center"
      }}
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

      {/* Flying trail effect - only visible during flight */}
      {isFlying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 right-full w-32 h-1 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent blur-sm animate-pulse" />
          <div className="absolute top-1/2 right-full w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent blur-sm animate-pulse delay-150" />
        </div>
      )}

      {/* Floating particles effect - enhanced when not flying */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isFlying ? "opacity-30" : "opacity-100"}`}>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-300 opacity-75" />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping delay-700 opacity-75" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-ping delay-1000 opacity-60" />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping delay-500 opacity-70" />
      </div>

      {/* Mystical glow border - stronger when settled */}
      <div className={`absolute inset-0 rounded-xl border transition-all duration-1000 ${isFlying ? "border-purple-500/10" : "border-purple-500/30"} animate-pulse`} />

      {/* Wing flap effect during flight */}
      {isFlying && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/5 rounded-full animate-ping" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-400/10 rounded-full animate-ping delay-200" />
        </div>
      )}
    </div>
  );
}