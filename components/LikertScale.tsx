
import React from 'react';

interface LikertScaleProps {
  id: string;
  labels: [string, string, string];
  value: number;
  onChange: (val: number) => void;
  feedback: string;
}

const LikertScale: React.FC<LikertScaleProps> = ({ labels, value, onChange, feedback }) => {
  const options = [
    { label: labels[0], score: 2 },
    { label: labels[1], score: 5 },
    { label: labels[2], score: 9 },
  ];

  return (
    <div className="w-full">
      <div className="flex gap-3 sm:gap-6 md:gap-10">
        {options.map((opt, idx) => {
          const isActive = value === opt.score;
          const bgColors = [
            'bg-trustori-orange text-white border-trustori-orange',
            'bg-trustori-lightblue text-white border-trustori-lightblue',
            'bg-trustori-blue text-white border-trustori-blue'
          ];
          const textColors = [
            'text-trustori-orange',
            'text-trustori-lightblue',
            'text-trustori-blue'
          ];

          return (
            <button
              key={idx}
              onClick={() => onChange(opt.score)}
              className="flex flex-col items-center gap-4 sm:gap-6 group flex-1 focus:outline-none"
            >
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl border-2 flex items-center justify-center transition-all duration-500 shadow-sm ${
                  isActive 
                    ? `${bgColors[idx]} scale-105 sm:scale-110 shadow-2xl` 
                    : 'border-slate-100 bg-slate-50 text-slate-300 group-hover:border-slate-200 group-hover:bg-white group-hover:text-slate-500'
                }`}
              >
                <span className="text-lg sm:text-xl md:text-3xl font-black">{idx + 1}</span>
              </div>
              <span 
                className={`text-[8px] sm:text-[11px] md:text-[13px] uppercase font-bold tracking-[0.15em] sm:tracking-[0.2em] text-center transition-colors duration-500 leading-tight h-6 sm:h-8 flex items-center px-1 sm:px-2 ${
                  isActive ? textColors[idx] : 'text-gray-400 group-hover:text-gray-600'
                }`}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-6 sm:mt-8 h-4 sm:h-6 flex items-center">
        <p className={`text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.1em] transition-all duration-500 ${
          value === 2 ? 'text-trustori-orange opacity-100' : 
          value === 5 ? 'text-trustori-lightblue opacity-100' : 
          value === 9 ? 'text-trustori-blue opacity-100' :
          'text-transparent opacity-0 translate-y-2'
        }`}>
          {feedback}
        </p>
      </div>
    </div>
  );
};

export default LikertScale;
