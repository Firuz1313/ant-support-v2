import React from 'react';
import { errorList } from '../data/errors';
import { Tooltip, TooltipTrigger, TooltipContent } from '../components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

export default function ErrorSelectionPage() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  // Открывает только один раздел, плавно закрывая остальные
  const handleSectionToggle = (key: string) => {
    setOpenSection(prev => (prev === key ? null : key));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#23272e] via-[#2b3a67] to-[#181c20] py-10 px-4 transition-colors duration-700">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">Выберите ошибку или проблему</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {errorList.map((err) => (
          <div
            key={err.key}
            className="bg-[#101624cc] rounded-2xl shadow-xl p-6 flex flex-col gap-4 transition-all duration-500 hover:scale-[1.025] hover:shadow-2xl"
            style={{ minHeight: 120 }}
          >
            <button
              className={`flex items-center gap-4 py-3 px-5 rounded-xl bg-gradient-to-r from-[#23272e] to-[#181c20] hover:from-[#2b3a67] hover:to-[#1e2a47] transition-all duration-300 border-none focus:outline-none focus:ring-2 focus:ring-[#ffd600] text-white text-lg font-semibold group shadow-md ${openSection === err.key ? 'ring-2 ring-[#ffd600] scale-[1.03]' : ''}`}
              onClick={() => err.subErrors ? handleSectionToggle(err.key) : navigate(`/error/${err.key}`)}
              aria-expanded={openSection === err.key}
              tabIndex={0}
            >
              <span className="text-2xl flex-shrink-0 opacity-90 group-hover:scale-110 transition-transform duration-300">
                {React.createElement(err.icon)}
              </span>
              <span className="truncate">{err.title}</span>
              {err.subErrors && (
                <span className="ml-auto text-base opacity-60 group-hover:opacity-100 transition-transform duration-300">{openSection === err.key ? '▲' : '▼'}</span>
              )}
            </button>
            <div className="text-sm text-gray-300 mt-1 ml-2 select-none">{err.description}</div>
            {/* Плавное раскрытие подразделов только у выбранного раздела */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${openSection === err.key ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}
              style={{ willChange: 'max-height, opacity' }}
            >
              {err.subErrors && openSection === err.key && (
                <div className="flex flex-col gap-2 pl-4 md:pl-6 border-l-2 border-[#ffd600]/60">
                  {err.subErrors.map((sub) => (
                    <Tooltip key={sub.key}>
                      <TooltipTrigger asChild>
                        <button
                          className="flex items-center gap-3 py-2 px-4 rounded-lg bg-[#181c20cc] hover:bg-[#23272e] transition-all duration-300 text-white text-base font-medium border-none focus:outline-none focus:ring-2 focus:ring-[#ffd600] shadow-sm"
                          onClick={() => navigate(`/error/${err.key}/${sub.key}`)}
                          tabIndex={0}
                        >
                          <span className="text-xl flex-shrink-0 opacity-90 group-hover:scale-110 transition-transform duration-300">{React.createElement(sub.icon)}</span>
                          <span className="truncate text-left">{sub.title}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        {sub.description}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 