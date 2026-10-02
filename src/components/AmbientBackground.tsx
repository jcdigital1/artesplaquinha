import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#030504]">
      {/* Subtle tech grid mesh */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 102, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 102, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Top ambient green glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-b from-[#00FF66]/15 via-[#00C853]/5 to-transparent blur-[120px] rounded-full animate-glow-pulse" />

      {/* Middle right soft glow */}
      <div className="absolute top-[40%] -right-24 w-80 h-80 bg-[#00FF66]/8 blur-[100px] rounded-full" />

      {/* Middle left soft glow */}
      <div className="absolute top-[65%] -left-24 w-80 h-80 bg-[#00C853]/6 blur-[100px] rounded-full" />

      {/* Bottom intense radiant glow for final CTA */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-gradient-to-t from-[#00FF66]/20 via-[#00C853]/10 to-transparent blur-[130px] rounded-full" />

      {/* Subtle top vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#030504]/60 to-[#030504]" />
    </div>
  );
};
