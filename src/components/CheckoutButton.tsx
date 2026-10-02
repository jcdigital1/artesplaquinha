import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';

interface CheckoutButtonProps {
  label?: string;
  sublabel?: string;
  size?: 'md' | 'lg';
  className?: string;
}

export const CHECKOUT_URL = 'https://go.pepperpay.com.br/ybvbo';

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  label = 'QUERO MINHAS ARTES',
  sublabel,
  size = 'lg',
  className = '',
}) => {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex flex-col items-center justify-center w-full max-w-md mx-auto text-center font-extrabold tracking-wide uppercase transition-all duration-300 rounded-2xl active:scale-[0.98] select-none text-[#030504] ${
        size === 'lg'
          ? 'py-4 px-6 text-base sm:text-lg'
          : 'py-3.5 px-5 text-sm sm:text-base'
      } ${className}`}
      style={{
        background: 'linear-gradient(180deg, #33FF85 0%, #00FF66 45%, #00C853 100%)',
        boxShadow:
          '0 0 25px rgba(0, 255, 102, 0.4), 0 10px 25px -5px rgba(0, 200, 83, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -2px 0 rgba(0, 100, 40, 0.35)',
      }}
    >
      {/* Light sheen sweep animation */}
      <span
        className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none animate-shimmer"
        aria-hidden="true"
      />

      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        <span>{label}</span>
        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
      </div>

      {sublabel && (
        <span className="relative z-10 text-[11px] font-semibold tracking-normal text-[#030504]/80 lowercase mt-0.5">
          {sublabel}
        </span>
      )}
    </a>
  );
};
