
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { AuditResult, UserProfile, Recommendation } from '../types';
import { Icons } from '../constants';

interface ResultsDashboardProps {
  result: AuditResult;
  profile: UserProfile;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, profile, onReset }) => {
  return (
    <div className="space-y-12 sm:space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Executive Report Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8 lg:gap-10 border-b-2 border-trustori-blue/10 pb-10 sm:pb-12 no-print">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-trustori-blue font-bold uppercase tracking-[0.5em] text-[8px] sm:text-[10px]">Strategic Diagnostic Roadmap</span>
            <div className="h-px w-10 sm:w-16 bg-trustori-orange" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-trustori-dark tracking-tighter leading-none mb-4 sm:mb-6">
            Infrastructure <br />
            <span className="text-trustori-blue">Maturity Report</span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">Client</span>
              <span className="text-trustori-blue font-bold tracking-tight text-lg sm:text-xl">{profile.company}</span>
            </div>
            <span className="hidden sm:block text-slate-200">|</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">Auth ID</span>
              <span className="text-trustori-dark font-bold tracking-tight text-xs sm:text-sm opacity-50 font-mono">TRX-{Math.random().toString(36).substring(7).toUpperCase()}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center gap-3 bg-trustori-blue text-white hover:bg-trustori-dark font-bold py-4 sm:py-5 px-8 sm:px-10 rounded-xl shadow-2xl shadow-trustori-blue/20 transition-all text-base sm:text-lg w-full sm:w-auto"
          >
            <Icons.Print /> SAVE AS PDF
          </button>
          <button 
            onClick={onReset}
            className="flex items-center justify-center gap-2 text-gray-300 hover:text-trustori-dark font-bold py-4 sm:py-5 px-6 sm:px-8 transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            START NEW AUDIT
          </button>
        </div>
      </div>

      {/* Main Metric Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left: Summary Panel (Company Profile Style) */}
        <div className="lg:col-span-5 bg-trustori-blue rounded-[1.5rem] sm:rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col justify-center border-l-[10px] sm:border-l-[16px] border-trustori-orange">
          <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 pointer-events-none">
            <Icons.Asterisk className="w-48 h-48 sm:w-64 sm:h-64" />
          </div>
          <div className="relative z-10">
            <h3 className="text-white/60 uppercase tracking-widest text-[9px] sm:text-[11px] font-bold mb-8 sm:mb-12">01 Executive Posture Overview</h3>
            
            <div className="flex items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6">
              <span className={`text-7xl sm:text-9xl md:text-[10rem] font-bold tracking-tighter leading-none ${
                result.maturity === 'High' ? 'text-white' : 
                result.maturity === 'Medium' ? 'text-trustori-orange' : 
                'text-white/40'
              }`}>
                {result.overallScore.toFixed(1)}
              </span>
              <span className="text-xl sm:text-3xl text-white/30 font-bold tracking-tighter">/10</span>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 mb-10 sm:mb-14">
              <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded-full animate-pulse shadow-glow ${
                result.maturity === 'High' ? 'bg-green-400' : 
                result.maturity === 'Medium' ? 'bg-trustori-orange' : 'bg-red-500'
              }`} />
              <span className="text-xl sm:text-3xl font-bold tracking-tighter uppercase">{result.maturity} STAGE MATURITY</span>
            </div>

            <div className="p-6 sm:p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl shadow-inner">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                 <div className="h-3 sm:h-4 w-1 bg-trustori-orange" />
                 <span className="text-white/60 font-bold uppercase tracking-[0.3em] text-[8px] sm:text-[10px]">Diagnostic Synthesis</span>
              </div>
              <p className="text-white font-medium leading-relaxed italic text-lg sm:text-2xl tracking-tight">
                "{result.maturity === 'High' 
                  ? "Brand Pioneer. You are utilizing unit-level data as a strategic growth lever, ensuring uncompromised authenticity." 
                  : result.maturity === 'Medium'
                  ? "Transitionary State. Foundational steps have been taken, but data silos still introduce systemic risk."
                  : "Defensive Posture. Immediate implementation of the Luban Lock digital layer is required to protect brand equity."
                }"
              </p>
            </div>
          </div>
        </div>

        {/* Right: Radar Analytics Dashboard */}
        <div className="lg:col-span-7 bg-white rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-12 border border-slate-100 shadow-xl flex flex-col dot-grid">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-8 sm:mb-12">
            <div>
              <span className="text-trustori-blue font-bold uppercase tracking-[0.4em] text-[9px] sm:text-[10px] block mb-1 sm:mb-2">Metric Intelligence</span>
              <h4 className="text-3xl sm:text-4xl font-bold text-trustori-dark tracking-tighter leading-none">Intelligence Matrix</h4>
              <p className="text-gray-400 font-medium text-sm sm:text-base mt-2 sm:mt-4">Benchmarked against industry standards.</p>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={result.radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis 
                  dataKey="name" 
                  tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 700 }}
                />
                <Radar
                  name="Target Benchmark"
                  dataKey="goal"
                  stroke="#0047BA"
                  strokeWidth={1}
                  fill="#0047BA"
                  fillOpacity={0.05}
                />
                <Radar
                  name="Current Capability"
                  dataKey="score"
                  stroke="#FF671D"
                  strokeWidth={4}
                  fill="#FF671D"
                  fillOpacity={0.15}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-50">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-trustori-orange" />
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] text-gray-500">Actual Resilience</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-trustori-blue/20" />
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.4em] text-gray-500">Industry Leader Goal</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Roadmap Card (Personalized Services Style) */}
      {result.aiAnalysis && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-trustori-blue to-trustori-orange rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white rounded-[1.5rem] sm:rounded-3xl p-8 sm:p-16 shadow-2xl border border-slate-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-brand-mesh-vibrant opacity-5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mb-10 sm:mb-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-trustori-dark flex items-center justify-center text-white shadow-2xl shadow-trustori-dark/20">
                <Icons.Asterisk className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <span className="text-trustori-blue font-bold uppercase tracking-[0.5em] text-[9px] sm:text-[10px] block mb-1 sm:mb-2">Strategic Intelligence</span>
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tighter">AI Executive Summary</h3>
                <p className="text-gray-400 font-bold text-xs sm:text-sm tracking-tight">Personalized Roadmap for {profile.name}</p>
              </div>
            </div>
            
            <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed text-lg sm:text-xl font-medium">
              {result.aiAnalysis.split('\n').map((line, i) => {
                if (line.startsWith('###')) {
                  return (
                    <div key={i} className="flex items-center gap-4 sm:gap-5 mt-10 sm:mt-16 mb-6 sm:mb-8 first:mt-0">
                      <div className="h-6 sm:h-8 w-1 sm:w-1.5 bg-trustori-orange" />
                      <h4 className="text-trustori-dark font-bold text-xl sm:text-3xl uppercase tracking-tighter leading-none">{line.replace('###', '')}</h4>
                    </div>
                  );
                }
                return line.trim() ? <p key={i} className="mb-6 sm:mb-8 opacity-80 tracking-tight leading-relaxed">{line}</p> : null;
              })}
            </div>
          </div>
        </div>
      )}

      {/* Recommended Priority Initiatives (Applications Style) */}
      <div>
        <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-4xl font-bold tracking-tighter">Priority Initiatives</h3>
          <div className="h-0.5 flex-1 bg-slate-100"></div>
          <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-gray-300">Section 04</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {result.recommendations.map((rec, i) => (
            <div key={i} className="bg-white p-8 sm:p-12 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl border-t-[8px] sm:border-t-[12px] border-trustori-blue hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 sm:p-6 opacity-5 group-hover:opacity-20 transition-all">
                 <Icons.Asterisk className="w-12 h-12 sm:w-16 sm:h-16" />
              </div>
              <div className="flex items-center justify-between mb-8 sm:mb-10">
                <div className={`text-[8px] sm:text-[10px] font-bold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full uppercase tracking-[0.2em] sm:tracking-[0.3em] ${
                   rec.impact === 'High' ? 'bg-orange-50 text-trustori-orange' : 'bg-blue-50 text-trustori-blue'
                }`}>
                  {rec.impact} Impact
                </div>
                <div className="text-slate-100 font-bold text-xl sm:text-3xl tracking-tighter">0{i+1}</div>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-trustori-dark group-hover:text-trustori-blue transition-colors leading-tight tracking-tighter">
                {rec.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-bold tracking-tight">
                {rec.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Global Reach Call to Action (Poster Style) */}
      <div className="bg-brand-mesh rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-20 text-center text-white relative overflow-hidden shadow-3xl no-print">
        <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] flex items-center justify-center border border-white/20">
              <Icons.Asterisk className="w-10 h-10 sm:w-12 h-12" />
            </div>
          </div>
          <h3 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 sm:mb-10 tracking-tighter leading-tight sm:leading-none">
            The future starts <br className="sm:hidden" /> <span className="text-trustori-orange italic">right here.</span>
          </h3>
          <p className="text-lg sm:text-2xl mb-12 sm:mb-16 leading-relaxed max-w-3xl mx-auto font-medium opacity-80">
            Join the global tier of brands utilizing unit-level data to protect originality and empower responsible growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
            <button className="bg-trustori-orange hover:bg-orange-600 text-white font-bold py-5 sm:py-7 px-10 sm:px-14 rounded-xl sm:rounded-2xl shadow-3xl shadow-orange-600/30 transition-all flex items-center justify-center gap-4 sm:gap-5 text-xl sm:text-2xl tracking-tighter">
              Consult Now
              <Icons.ArrowRight />
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-5 sm:py-7 px-10 sm:px-14 rounded-xl sm:rounded-2xl transition-all border border-white/20 backdrop-blur-md text-xl sm:text-2xl tracking-tighter">
              View Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
