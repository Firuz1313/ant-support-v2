import React from 'react';
import { errorList } from '../data/errors';
import { Tooltip, TooltipTrigger, TooltipContent } from '../components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

export default function ErrorSelectionPage() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#23272e] to-[#181c20] py-10 px-4">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Выберите ошибку или проблему</h1>
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {errorList.map((err) => (
          <div key={err.key} className="bg-[#101624] rounded-xl shadow-lg p-5 flex flex-col gap-3">
            <button
              className="flex items-center gap-4 py-3 px-4 rounded-lg bg-gradient-to-r from-[#23272e] to-[#181c20] hover:from-[#2b3a67] hover:to-[#1e2a47] transition border-2 border-transparent hover:border-[#ffd600] focus:outline-none focus:ring-2 focus:ring-[#ffd600] text-white text-lg font-semibold group"
              onClick={() => err.subErrors ? setOpenSection(openSection === err.key ? null : err.key) : navigate(`/error/${err.key}`)}
              aria-expanded={openSection === err.key}
            >
              <span className="text-2xl flex-shrink-0">
                {React.createElement(err.icon)}
              </span>
              <span>{err.title}</span>
              {err.subErrors && (
                <span className="ml-auto text-base opacity-70 group-hover:opacity-100 transition">{openSection === err.key ? '▲' : '▼'}</span>
              )}
            </button>
            <div className="text-sm text-gray-300 mt-1 ml-2">{err.description}</div>
            {err.subErrors && openSection === err.key && (
              <div className="flex flex-col gap-2 mt-2 pl-6 border-l-2 border-[#ffd600]">
                {err.subErrors.map((sub) => (
                  <Tooltip key={sub.key}>
                    <TooltipTrigger asChild>
                      <button
                        className="flex items-center gap-3 py-2 px-3 rounded-md bg-[#181c20] hover:bg-[#23272e] transition text-white text-base font-medium border border-transparent hover:border-[#ffd600] focus:outline-none focus:ring-2 focus:ring-[#ffd600]"
                        onClick={() => navigate(`/error/${err.key}/${sub.key}`)}
                      >
                        <span className="text-xl flex-shrink-0">{React.createElement(sub.icon)}</span>
                        <span>{sub.title}</span>
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
        ))}
      </div>
    </div>
  );
} 