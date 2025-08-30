
import React from 'react';

const StarField = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="constellation-pattern animate-constellation absolute inset-0 opacity-40"></div>
      
      {/* Floating stars */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-primary rounded-full animate-float opacity-60"></div>
      <div className="absolute top-32 right-20 w-1 h-1 bg-accent rounded-full animate-float opacity-80" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-64 left-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-float opacity-70" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-32 right-1/3 w-1 h-1 bg-accent rounded-full animate-float opacity-90" style={{animationDelay: '3s'}}></div>
      <div className="absolute bottom-64 left-1/3 w-2 h-2 bg-primary rounded-full animate-float opacity-50" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-1/2 right-10 w-1 h-1 bg-accent rounded-full animate-float opacity-75" style={{animationDelay: '1.5s'}}></div>
    </div>
  );
};

export default StarField;
