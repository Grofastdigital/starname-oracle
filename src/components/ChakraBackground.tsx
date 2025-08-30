
import React from 'react';

const ChakraBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Main Chakra */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
        <div className="w-96 h-96 animate-spin-slow">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="chakraGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </radialGradient>
            </defs>
            
            {/* Outer Ring */}
            <circle cx="200" cy="200" r="180" fill="none" stroke="url(#chakraGradient)" strokeWidth="2" opacity="0.5" />
            
            {/* Inner Rings */}
            <circle cx="200" cy="200" r="140" fill="none" stroke="url(#chakraGradient)" strokeWidth="1.5" opacity="0.4" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="url(#chakraGradient)" strokeWidth="1" opacity="0.3" />
            <circle cx="200" cy="200" r="60" fill="none" stroke="url(#chakraGradient)" strokeWidth="0.5" opacity="0.2" />
            
            {/* Chakra Petals */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * Math.PI / 180;
              const x1 = 200 + Math.cos(angle) * 60;
              const y1 = 200 + Math.sin(angle) * 60;
              const x2 = 200 + Math.cos(angle) * 180;
              const y2 = 200 + Math.sin(angle) * 180;
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#chakraGradient)"
                  strokeWidth="1"
                  opacity="0.3"
                />
              );
            })}
            
            {/* Inner Petals */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 + 22.5) * Math.PI / 180;
              const x1 = 200 + Math.cos(angle) * 40;
              const y1 = 200 + Math.sin(angle) * 40;
              const x2 = 200 + Math.cos(angle) * 100;
              const y2 = 200 + Math.sin(angle) * 100;
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#chakraGradient)"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
              );
            })}
            
            {/* Center Symbol */}
            <circle cx="200" cy="200" r="20" fill="url(#chakraGradient)" opacity="0.3" />
            <circle cx="200" cy="200" r="12" fill="none" stroke="url(#chakraGradient)" strokeWidth="1" opacity="0.5" />
            <circle cx="200" cy="200" r="4" fill="url(#chakraGradient)" opacity="0.6" />
          </svg>
        </div>
      </div>
      
      {/* Small Chakras */}
      <div className="absolute top-10 right-10 opacity-5">
        <div className="w-32 h-32 animate-spin-reverse">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.3" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="#6366f1" strokeWidth="0.8" opacity="0.4" />
            <circle cx="50" cy="50" r="10" fill="#8b5cf6" opacity="0.2" />
          </svg>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-10 opacity-5">
        <div className="w-24 h-24 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.3" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="#9333ea" strokeWidth="0.6" opacity="0.4" />
            <circle cx="50" cy="50" r="8" fill="#7c3aed" opacity="0.2" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChakraBackground;
