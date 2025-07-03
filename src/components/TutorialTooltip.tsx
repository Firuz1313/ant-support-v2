import React, { useEffect, useState } from 'react';
import { useTutorial } from '../context/TutorialContext';

export const TutorialTooltip: React.FC = () => {
  const { steps, currentStep, nextStep, prevStep } = useTutorial();
  const step = steps[currentStep];
  const [position, setPosition] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    if (step?.targetSelector) {
      const el = document.querySelector(step.targetSelector);
      if (el) {
        const rect = el.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX + rect.width / 2,
          width: rect.width,
        });
      } else {
        setPosition(null);
      }
    } else {
      setPosition(null);
    }
  }, [step]);

  if (!step) return null;

  if (step.isFinal) {
    return (
      <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%, 0)', zIndex: 9999, background: '#FFD600', color: '#222', padding: 20, borderRadius: 10, fontWeight: 600, fontSize: 18, boxShadow: '0 2px 16px #ffe06699' }}>
        {step.text}
      </div>
    );
  }

  if (!position) return null;

  // Разделяем жирный заголовок и обычный текст (если в тексте есть ": ")
  let title = '';
  let desc = step.text;
  if (step.text.includes(':')) {
    const idx = step.text.indexOf(':');
    title = step.text.slice(0, idx + 1);
    desc = step.text.slice(idx + 1).trim();
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: position.top - 90, // чуть выше иконки
        left: position.left,
        transform: 'translate(-50%, 0)',
        zIndex: 9999,
        pointerEvents: 'none', // чтобы не мешать кликам по иконке
      }}
    >
      <div
        style={{
          background: '#FFD600',
          color: '#222',
          padding: '10px 16px 12px 16px',
          borderRadius: 10,
          minWidth: 180,
          maxWidth: 240,
          fontWeight: 400,
          fontSize: 15,
          boxShadow: '0 2px 12px #ffe06699',
          position: 'relative',
          textAlign: 'center',
          border: '1.5px solid #e6b800',
          pointerEvents: 'auto',
        }}
      >
        {title && <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{title}</div>}
        <div style={{ whiteSpace: 'pre-line', fontSize: 14.5 }}>{desc}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10 }}>
          {step.showPrev && <button onClick={prevStep} style={{ padding: '3px 14px', borderRadius: 6, border: 'none', background: '#23272e', color: '#FFD600', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Назад</button>}
          {step.showNext && <button onClick={nextStep} style={{ padding: '3px 14px', borderRadius: 6, border: 'none', background: '#23272e', color: '#FFD600', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Далее</button>}
        </div>
        {/* Стрелка */}
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: -13,
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '13px solid #FFD600',
          filter: 'drop-shadow(0 1px 1px #e6b800)',
          transform: 'translateX(-50%)',
        }} />
      </div>
    </div>
  );
}; 