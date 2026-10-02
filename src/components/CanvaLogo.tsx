import React from 'react';

interface CanvaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CanvaLogo: React.FC<CanvaLogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Official Canva Gradient Circle Icon */}
      <div
        className={`${iconSizes[size]} rounded-full flex items-center justify-center shadow-lg relative overflow-hidden shrink-0`}
        style={{
          background: 'linear-gradient(135deg, #00C4CC 0%, #7D2AE8 50%, #FF007A 100%)',
          boxShadow: '0 0 12px rgba(0, 196, 204, 0.35)',
        }}
      >
        <span
          className="text-white font-serif font-black italic select-none"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: size === 'sm' ? '12px' : size === 'md' ? '16px' : '20px',
            lineHeight: 1,
            transform: 'translate(-0.5px, -0.5px)',
          }}
        >
          C
        </span>
      </div>
      <span className={`font-extrabold tracking-tight text-white ${textSizes[size]}`}>
        Canva
      </span>
    </div>
  );
};
