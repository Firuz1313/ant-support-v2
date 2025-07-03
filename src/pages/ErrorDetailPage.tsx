import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { errorList } from '../data/errors';
import TVScreen from '../components/TVScreen';
import RemoteControl from '../components/RemoteControl';
import { useTVControl } from '../context/TVControlContext';

export default function ErrorDetailPage() {
  const { errorKey, subKey } = useParams();
  const navigate = useNavigate();
  const error = errorList.find(e => e.key === errorKey);
  const subError = error?.subErrors?.find(s => s.key === subKey);
  const { tvState } = useTVControl();

  if (!error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#23272e] to-[#181c20] text-white">
        <h2 className="text-2xl font-bold mb-4">Ошибка не найдена</h2>
        <button className="mt-2 px-6 py-2 rounded bg-[#23272e] hover:bg-[#2b3a67] text-white" onClick={() => navigate('/error-select')}>Назад к списку ошибок</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#23272e] to-[#181c20] py-2 px-4">
      <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center">
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
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-0 md:gap-12 relative">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 60 }}>
          <TVScreen />
        </div>
        <div style={{ minWidth: 90, marginLeft: 0, marginTop: 32, marginBottom: 32, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', transform: 'translateX(24px)' }} className="md:ml-16 md:mt-0 md:mb-0">
          <RemoteControl />
        </div>
      </div>
    </div>
  );
} 