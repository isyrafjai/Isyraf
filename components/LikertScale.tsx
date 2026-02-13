
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
      <div className="flex gap-4 sm:gap-8 mt-2">
        {options.map((opt, idx) => {
          const isActive = value === opt.score;
          const colors = [
            'border-trustori-orange bg-trustori-orange text-white',
            'border-trustori-lightblue bg-trustori-lightblue text-white',
            'border-trustori-blue bg-trustori-blue text-white'
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
              className="flex flex-col items-center gap-2 group flex-1 focus:outline-none"
            >
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? `${colors[idx]} scale-110 shadow-lg` 
                    : 'border-gray-200 bg-white text-gray-400 group-hover:border-gray-300'
                }`}
              >
                <span className="text-xs font-bold">{idx + 1}</span>
              </div>
              <span 
                className={`text-[10px] uppercase font-bold tracking-wider text-center transition-colors duration-300 ${
                  isActive ? textColors[idx] : 'text-gray-400 group-hover:text-gray-600'
                }`}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className={`text-xs font-semibold mt-4 transition-all duration-300 h-4 ${
        value === 2 ? 'text-trustori-orange' : 
        value === 5 ? 'text-trustori-lightblue' : 
        'text-trustori-blue'
      }`}>
        {feedback}
      </p>
    </div>
  );
};

export default LikertScale;
