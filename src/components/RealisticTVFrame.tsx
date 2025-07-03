import React from 'react';

export default function RealisticTVFrame({ children, width = 900, height = 480 }) {
  return (
    <div style={{ position: 'relative', width, height: height + 56, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Неоновая подсветка сзади */}
      <div style={{
        position: 'absolute',
        top: 30,
        left: '50%',
        transform: `translateX(-50%)`,
        width: width * 0.98,
        height: height * 0.92,
        zIndex: 0,
        filter: 'blur(32px)',
        pointerEvents: 'none',
        opacity: 0.7,
        animation: 'tv-neon-glow 3.2s ease-in-out infinite alternate',
        background: 'radial-gradient(ellipse at center, #00eaff 0%, #0055ff 60%, transparent 100%)',
      }} />
      <style>{`
        @keyframes tv-neon-glow {
          0% { opacity: 0.55; filter: blur(28px); }
          50% { opacity: 0.85; filter: blur(38px); }
          100% { opacity: 0.55; filter: blur(28px); }
        }
      `}</style>
      <svg width={width} height={height + 56} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
        {/* Корпус */}
        <rect x="0" y="0" width={width} height={height} rx="24" fill="#181c20" stroke="#444" strokeWidth="8" />
        {/* Экран (чуть меньше корпуса) */}
        <rect x="16" y="12" width={width - 32} height={height - 24} rx="12" fill="#111" />
        {/* Левая ножка с градиентом и тенью */}
        <g>
          <rect x={width * 0.18} y={height + 8} width={width * 0.16} height="18" rx="7" fill="url(#legGrad)" />
          <ellipse cx={width * 0.18 + (width * 0.08)} cy={height + 26} rx={width * 0.08} ry="6" fill="#222" opacity="0.45" />
        </g>
        {/* Правая ножка с градиентом и тенью */}
        <g>
          <rect x={width * 0.66} y={height + 8} width={width * 0.16} height="18" rx="7" fill="url(#legGrad)" />
          <ellipse cx={width * 0.66 + (width * 0.08)} cy={height + 26} rx={width * 0.08} ry="6" fill="#222" opacity="0.45" />
        </g>
        {/* Градиент для ножек */}
        <defs>
          <linearGradient id="legGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bbb" />
            <stop offset="60%" stopColor="#444" />
            <stop offset="100%" stopColor="#181c20" />
          </linearGradient>
        </defs>
      </svg>
      {/* Интерфейс внутри экрана */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 16,
        width: width - 32,
        height: height - 24,
        borderRadius: 12,
        overflow: 'hidden',
        background: '#181c20',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </div>
    </div>
  );
} 