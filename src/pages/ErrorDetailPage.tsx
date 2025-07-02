import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { errorList } from '../data/errors';
import { errorSteps } from '../data/errorSteps';
import TVScreen from '../components/TVScreen';
import RemoteControl from '../components/RemoteControl';
import { useTVControl } from '../context/TVControlContext';

export default function ErrorDetailPage() {
  const { errorKey, subKey } = useParams();
  const navigate = useNavigate();
  const error = errorList.find(e => e.key === errorKey);
  const subError = error?.subErrors?.find(s => s.key === subKey);
  const steps = errorSteps?.[errorKey]?.[subKey] || [];
  const [step, setStep] = React.useState(0);
  const [downCount, setDownCount] = React.useState(0);
  const [showSecondHint, setShowSecondHint] = React.useState(false);
  const { tvState } = useTVControl();

  React.useEffect(() => {
    if (errorKey === 'channel-editor' && subKey === 'delete' && step === 1 && !showSecondHint) {
      const handler = (e: any) => {
        if (e?.detail?.key === 'down') {
          setDownCount(prev => {
            if (prev < 1) return prev + 1;
            setShowSecondHint(true);
            return 2;
          });
        }
      };
      window.addEventListener('virtual-remote-press', handler);
      return () => window.removeEventListener('virtual-remote-press', handler);
    }
  }, [errorKey, subKey, step, showSecondHint]);

  React.useEffect(() => {
    if (step !== 1) {
      setDownCount(0);
      setShowSecondHint(false);
    }
  }, [step]);

  // Автоматический переход на шаг 2 после открытия модалки редактора каналов
  React.useEffect(() => {
    if (
      errorKey === 'channel-editor' &&
      subKey === 'delete' &&
      step === 0 &&
      tvState.channelEditorOpen
    ) {
      setStep(1);
    }
  }, [errorKey, subKey, step, tvState.channelEditorOpen]);

  if (!error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#23272e] to-[#181c20] text-white">
        <h2 className="text-2xl font-bold mb-4">Ошибка не найдена</h2>
        <button className="mt-2 px-6 py-2 rounded bg-[#23272e] hover:bg-[#2b3a67] text-white" onClick={() => navigate('/error-select')}>Назад к списку ошибок</button>
      </div>
    );
  }

  const currentStep = steps[step];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#23272e] to-[#181c20] py-10 px-4">
      <div className="relative w-full max-w-3xl mx-auto mb-6 mt-2 flex flex-col items-center">
        <button
          className="px-5 py-2 rounded bg-[#23272e] hover:bg-[#2b3a67] text-white font-medium whitespace-nowrap self-start absolute left-0 top-0"
          style={{ left: '-24px' }}
          onClick={() => navigate('/error-select')}
        >
          ← К списку ошибок
        </button>
        <h1 className="text-2xl font-bold text-white text-center w-full">{subError ? subError.title : error.title}</h1>
        <style>{`
          @media (max-width: 768px) {
            .error-back-btn { position: static !important; margin-bottom: 10px; }
          }
        `}</style>
      </div>
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl items-start justify-center">
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-md">
            <TVScreen highlight={{
              ...currentStep?.tvHighlight,
              step,
              errorKey,
              subKey,
              key: (errorKey === 'channel-editor' && subKey === 'delete' && step === 1) ? 'delete-all' : undefined
            }} />
          </div>
          {/* Подсказка под ТВ */}
          {errorKey === 'channel-editor' && subKey === 'delete' && step === 0 && (
            <div style={{
              marginTop: 15,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginLeft: 40,
            }}>
              <div style={{
                background: '#fff9c4',
                color: '#23272e',
                borderRadius: 7,
                boxShadow: '0 0 16px 2px #ffe066, 0 2px 8px #ffe06655',
                padding: '5px 12px',
                fontSize: 13.5,
                fontWeight: 500,
                border: '1px solid #ffe066',
                minWidth: 170,
                maxWidth: 320,
                textAlign: 'center',
                letterSpacing: 0.05,
                lineHeight: 1.25,
                whiteSpace: 'pre-line',
                display: 'flex',
                alignItems: 'center',
              }}>
                Выберите 'Редактор каналов'.\nДля выбора нажмите OK на пульте.
              </div>
              <img
                src="/robi.png"
                alt="Робот-подсказчик"
                style={{
                  width: 110,
                  height: 110,
                  marginLeft: 32,
                  objectFit: 'contain',
                  flexShrink: 0,
                  filter: 'drop-shadow(0 0 36px #40cfff) drop-shadow(0 0 64px #a259ff)',
                  animation: 'robo-pulse 1.6s cubic-bezier(0.4,0,0.2,1) infinite',
                  transition: 'filter 0.3s, transform 0.3s',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const audio = new Audio('/src/data/audio/delete chanels.mp3');
                  audio.play();
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.93)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <style>{`
                @keyframes robo-pulse {
                  0% {
                    transform: scale(1);
                    filter: drop-shadow(0 0 36px #40cfff) drop-shadow(0 0 64px #a259ff);
                  }
                  30% {
                    transform: scale(1.08);
                    filter: drop-shadow(0 0 60px #40cfff) drop-shadow(0 0 96px #a259ff);
                  }
                  50% {
                    transform: scale(1.13);
                    filter: drop-shadow(0 0 80px #40cfff) drop-shadow(0 0 120px #a259ff);
                  }
                  70% {
                    transform: scale(1.08);
                    filter: drop-shadow(0 0 60px #40cfff) drop-shadow(0 0 96px #a259ff);
                  }
                  100% {
                    transform: scale(1);
                    filter: drop-shadow(0 0 36px #40cfff) drop-shadow(0 0 64px #a259ff);
                  }
                }
              `}</style>
            </div>
          )}
          {errorKey === 'channel-editor' && subKey === 'delete' && step === 1 && tvState.channelEditorIndex !== 2 && (
            <div style={{
              marginTop: 15,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginLeft: 40,
            }}>
              <div style={{
                background: '#fff9c4',
                color: '#23272e',
                borderRadius: 7,
                boxShadow: '0 0 16px 2px #ffe066, 0 2px 8px #ffe06655',
                padding: '5px 12px',
                fontSize: 13.5,
                fontWeight: 500,
                border: '1px solid #ffe066',
                minWidth: 170,
                maxWidth: 320,
                textAlign: 'center',
                letterSpacing: 0.05,
                lineHeight: 1.25,
                whiteSpace: 'pre-line',
                display: 'flex',
                alignItems: 'center',
              }}>
                Перейдите в раздел 'Удалить все'.\nДважды нажмите стрелку вниз.
              </div>
            </div>
          )}
          {errorKey === 'channel-editor' && subKey === 'delete' && step === 1 && tvState.channelEditorIndex === 2 && (
            <div style={{
              marginTop: 15,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginLeft: 40,
            }}>
              <div style={{
                background: '#fff9c4',
                color: '#23272e',
                borderRadius: 7,
                boxShadow: '0 0 16px 2px #ffe066, 0 2px 8px #ffe06655',
                padding: '5px 12px',
                fontSize: 13.5,
                fontWeight: 500,
                border: '1px solid #ffe066',
                minWidth: 170,
                maxWidth: 320,
                textAlign: 'center',
                letterSpacing: 0.05,
                lineHeight: 1.25,
                whiteSpace: 'pre-line',
                display: 'flex',
                alignItems: 'center',
              }}>
                Выберите пункт. Для выбора нажмите OK.
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-[120px]">
            <RemoteControl highlight={(() => {
              if (errorKey === 'channel-editor' && subKey === 'delete' && step === 1 && tvState.channelEditorIndex === 2) {
                return { key: 'ok' };
              }
              if (errorKey === 'channel-editor' && subKey === 'delete' && step === 1) {
                return { key: 'down' };
              }
              return currentStep?.remoteHighlight;
            })()} />
          </div>
        </div>
      </div>
      {currentStep && step === 0 && (
        <div className="w-full flex justify-center mt-8">
          {/* Подсказка теперь будет встроена в TVScreen, здесь не нужна */}
        </div>
      )}
    </div>
  );
} 