
import React from 'react';

const ChakraBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Main Central Chakra - Smaller and to the right */}
      <div className="absolute top-1/3 right-10 transform translate-x-1/4 opacity-15">
        <div className="w-80 h-80 animate-spin-slow">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="chakraGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#FF6B35" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#8A2BE2" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#00CED1" stopOpacity="0.6" />
              </radialGradient>
              <radialGradient id="innerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                <stop offset="50%" stopColor="#FF1493" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#9370DB" stopOpacity="0.6" />
              </radialGradient>
            </defs>
            
            {/* Outer Ring */}
            <circle cx="200" cy="200" r="180" fill="none" stroke="url(#chakraGradient)" strokeWidth="4" opacity="0.8" />
            
            {/* Inner Rings */}
            <circle cx="200" cy="200" r="140" fill="none" stroke="url(#chakraGradient)" strokeWidth="3" opacity="0.7" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="url(#chakraGradient)" strokeWidth="2.5" opacity="0.6" />
            <circle cx="200" cy="200" r="60" fill="none" stroke="url(#chakraGradient)" strokeWidth="2" opacity="0.5" />
            
            {/* Main Chakra Petals */}
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
                  strokeWidth="3"
                  opacity="0.7"
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
                  stroke="url(#innerGradient)"
                  strokeWidth="2"
                  opacity="0.8"
                />
              );
            })}
            
            {/* Center Symbol */}
            <circle cx="200" cy="200" r="25" fill="url(#innerGradient)" opacity="0.7" />
            <circle cx="200" cy="200" r="15" fill="none" stroke="url(#chakraGradient)" strokeWidth="2" opacity="0.9" />
            <circle cx="200" cy="200" r="6" fill="url(#chakraGradient)" opacity="1" />
          </svg>
        </div>
      </div>
      
      {/* Left Side Chakra */}
      <div className="absolute top-1/2 left-10 transform -translate-x-1/4 opacity-12">
        <div className="w-64 h-64 animate-spin-reverse">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="leftChakraGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#8A2BE2" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0.7" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="160" fill="none" stroke="url(#leftChakraGradient)" strokeWidth="3" opacity="0.8" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="url(#leftChakraGradient)" strokeWidth="2" opacity="0.9" />
            <circle cx="200" cy="200" r="50" fill="url(#leftChakraGradient)" opacity="0.6" />
            
            {/* Petals */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45) * Math.PI / 180;
              const x1 = 200 + Math.cos(angle) * 50;
              const y1 = 200 + Math.sin(angle) * 50;
              const x2 = 200 + Math.cos(angle) * 140;
              const y2 = 200 + Math.sin(angle) * 140;
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#leftChakraGradient)"
                  strokeWidth="2"
                  opacity="0.7"
                />
              );
            })}
          </svg>
        </div>
      </div>
      
      {/* Top Right Small Chakra - Brighter */}
      <div className="absolute top-20 right-20 opacity-25">
        <div className="w-32 h-32 animate-spin-reverse">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="topRightGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                <stop offset="50%" stopColor="#FF1493" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.8" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#topRightGradient)" strokeWidth="2" opacity="0.9" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="url(#topRightGradient)" strokeWidth="1.5" opacity="1" />
            <circle cx="50" cy="50" r="12" fill="url(#topRightGradient)" opacity="0.8" />
            
            {/* Small petals */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * Math.PI / 180;
              const x1 = 50 + Math.cos(angle) * 12;
              const y1 = 50 + Math.sin(angle) * 12;
              const x2 = 50 + Math.cos(angle) * 35;
              const y2 = 50 + Math.sin(angle) * 35;
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#topRightGradient)"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
              );
            })}
          </svg>
        </div>
      </div>
      
      {/* Bottom Left Small Chakra - Brighter */}
      <div className="absolute bottom-20 left-20 opacity-25">
        <div className="w-28 h-28 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="bottomLeftGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#00CED1" stopOpacity="1" />
                <stop offset="50%" stopColor="#FF6B35" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#9370DB" stopOpacity="0.8" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="35" fill="none" stroke="url(#bottomLeftGradient)" strokeWidth="2" opacity="0.9" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="url(#bottomLeftGradient)" strokeWidth="1.5" opacity="1" />
            <circle cx="50" cy="50" r="10" fill="url(#bottomLeftGradient)" opacity="0.8" />
            
            {/* Small petals */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * Math.PI / 180;
              const x1 = 50 + Math.cos(angle) * 10;
              const y1 = 50 + Math.sin(angle) * 10;
              const x2 = 50 + Math.cos(angle) * 30;
              const y2 = 50 + Math.sin(angle) * 30;
              
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#bottomLeftGradient)"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Additional floating chakras */}
      <div className="absolute top-1/4 left-1/3 opacity-15">
        <div className="w-16 h-16 animate-spin-slow" style={{animationDelay: '2s'}}>
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#FFD700" strokeWidth="2" opacity="1" />
            <circle cx="25" cy="25" r="12" fill="none" stroke="#FF6B35" strokeWidth="1.5" opacity="1" />
            <circle cx="25" cy="25" r="5" fill="#8A2BE2" opacity="0.9" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-1/3 right-1/3 opacity-15">
        <div className="w-20 h-20 animate-spin-reverse" style={{animationDelay: '3s'}}>
          <svg viewBox="0 0 50 50" className="w-full h-full">
            <circle cx="25" cy="25" r="22" fill="none" stroke="#00CED1" strokeWidth="2" opacity="1" />
            <circle cx="25" cy="25" r="14" fill="none" stroke="#FF1493" strokeWidth="1.5" opacity="1" />
            <circle cx="25" cy="25" r="6" fill="#9370DB" opacity="0.9" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChakraBackground;
