import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { errorList } from '../data/errors';
import TVScreen from '../components/TVScreen';
import RemoteControl from '../components/RemoteControl';

export default function ErrorDetailPage() {
  const { errorKey, subKey } = useParams();
  const navigate = useNavigate();
  const error = errorList.find(e => e.key === errorKey);
  const subError = error?.subErrors?.find(s => s.key === subKey);

  if (!error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#23272e] to-[#181c20] text-white">
        <h2 className="text-2xl font-bold mb-4">Ошибка не найдена</h2>
        <button className="mt-2 px-6 py-2 rounded bg-[#23272e] hover:bg-[#2b3a67] text-white" onClick={() => navigate('/error-select')}>Назад к списку ошибок</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#23272e] to-[#181c20] py-10 px-4">
      <button className="mb-6 px-5 py-2 rounded bg-[#23272e] hover:bg-[#2b3a67] text-white self-start" onClick={() => navigate('/error-select')}>← К списку ошибок</button>
      <h1 className="text-2xl font-bold text-white mb-2">{subError ? subError.title : error.title}</h1>
      <div className="text-gray-300 mb-8 text-lg">{subError ? subError.description : error.description}</div>
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl items-start justify-center">
        <div className="flex-1 flex justify-center">
          {/* ТВ с визуальной подсказкой (можно доработать под конкретную ошибку) */}
          <div className="w-full max-w-md">
            <TVScreen />
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          {/* Пульт */}
          <div className="w-full max-w-[120px]">
            <RemoteControl />
          </div>
        </div>
      </div>
    </div>
  );
} 