
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  UserProfile, 
  AuditScores, 
  AuditResult, 
  Recommendation, 
  MaturityLevel,
  Question
} from './types';
import { 
  Icons, 
  STRATEGIC_QUESTIONS, 
  OPERATIONAL_QUESTIONS, 
  CAPABILITY_QUESTIONS,
  COUNTRIES,
  Country
} from './constants';
import LikertScale from './components/LikertScale';
import ResultsDashboard from './components/ResultsDashboard';
import { generateAIAuditAnalysis } from './services/gemini';

const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/a/macros/trustori.co/s/AKfycbw5GONnxWhLdrAo2eth3EKzcmh5-sZOFZvlRu37yaCalu3FZdqEVyz-Vctdqh-1traSKA/exec"; 

const LOADING_MESSAGES = [
  "Consulting The Brand Custodian database...",
  "Applying The Mark of Authenticity benchmarks...",
  "Initializing Luban Lock security protocols...",
  "Protecting originality, Empowering growth...",
  "Synchronizing diagnostic data with CRM...",
  "Synthesizing Strategic Maturity Report..."
];

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    company: '', name: '', title: '', email: '', phone: ''
  });

  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [touched, setTouched] = useState({
    company: false,
    name: false,
    email: false,
    phone: false
  });
  
  const [scores, setScores] = useState<AuditScores>({
    strategic: new Array(4).fill(-1),
    operational: new Array(8).fill(-1),
    capabilities: new Array(8).fill(-1)
  });
  
  const [result, setResult] = useState<AuditResult | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  useEffect(() => {
    let interval: any;
    if (isSubmitting) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const currentQuestions = useMemo(() => {
    if (step === 2) return STRATEGIC_QUESTIONS;
    if (step === 3) return OPERATIONAL_QUESTIONS;
    if (step === 4) return CAPABILITY_QUESTIONS;
    return [];
  }, [step]);

  const currentScoresKey = useMemo(() => {
    if (step === 2) return 'strategic';
    if (step === 3) return 'operational';
    if (step === 4) return 'capabilities';
    return null;
  }, [step]);

  const firstUnansweredIdx = useMemo(() => {
    if (!currentScoresKey) return -1;
    return scores[currentScoresKey].findIndex(s => s === -1);
  }, [scores, currentScoresKey]);

  const allAnsweredInCurrentStep = useMemo(() => {
    if (!currentScoresKey) return true;
    return scores[currentScoresKey].every(s => s !== -1);
  }, [scores, currentScoresKey]);

  // Robust Validation Logic
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9\s\-()]{6,15}$/;

  const validation = {
    company: {
      valid: profile.company.trim().length >= 2,
      error: profile.company.trim().length > 0 && profile.company.trim().length < 2 ? "Minimum 2 characters" : "Company is required"
    },
    name: {
      valid: profile.name.trim().length >= 2,
      error: profile.name.trim().length > 0 && profile.name.trim().length < 2 ? "Minimum 2 characters" : "Name is required"
    },
    email: {
      valid: emailRegex.test(profile.email),
      error: profile.email.length > 0 ? "Invalid email format" : "Email is required"
    },
    phone: {
      valid: profile.phone.trim().length > 0 && phoneRegex.test(profile.phone),
      error: profile.phone.trim().length > 0 ? "Invalid phone format" : "Phone is required"
    }
  };

  const isStep1Valid = validation.company.valid && validation.name.valid && validation.email.valid && validation.phone.valid;

  const handleScoreChange = (index: number, val: number) => {
    if (!currentScoresKey) return;
    setScores(prev => ({
      ...prev,
      [currentScoresKey]: prev[currentScoresKey].map((s, i) => i === index ? val : s)
    }));
  };

  const handleTouch = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const nextStep = () => {
    if (step === 1) {
      if (!isStep1Valid) {
        setShowErrors(true);
        setTouched({ company: true, name: true, email: true, phone: true });
        return;
      }
      setShowErrors(false);
    }
    if (step > 1 && !allAnsweredInCurrentStep) return;
    if (step < totalSteps) setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateRecommendations = (data: number[]): Recommendation[] => {
    const recs: Recommendation[] = [];
    if (data[1] < 6) recs.push({ title: "Serialization Audit", description: "Deploy unit-level unique IDs (UIDs) to establish the Luban Lock foundation for tracking.", category: "Foundation", impact: "High" });
    if (data[5] < 6) recs.push({ title: "Direct CRM Bridge", description: "Utilize the Mark of Authenticity to own 1st-party data instead of relying on retailer reports.", category: "Growth", impact: "High" });
    if (data[3] < 6) recs.push({ title: "Digital Authentication", description: "Layer encrypted digital signatures to eliminate the risk of structural replication.", category: "Security", impact: "High" });
    if (data[6] < 6) recs.push({ title: "Smart Passports", description: "Automate material tracking to meet emerging global ESG regulations without manual overhead.", category: "Compliance", impact: "Medium" });
    
    if (recs.length < 2) {
      recs.push({ title: "AI Predictive Flow", description: "Integrate scan-velocity data into predictive demand models for surgical supply chain rerouting.", category: "Advanced", impact: "Medium" });
    }
    return recs;
  };

  const handleFinish = async () => {
    if (!allAnsweredInCurrentStep) return;
    setIsSubmitting(true);
    
    const finalPhone = profile.phone ? `${selectedCountry.dial_code} ${profile.phone}` : "";
    const submissionProfile = { ...profile, phone: finalPhone };

    const avgStrategic = scores.strategic.reduce((a, b) => a + b, 0) / 4;
    const cats = [
      avgStrategic,
      (scores.operational[0] + scores.capabilities[0]) / 2,
      (scores.operational[1] + scores.capabilities[1]) / 2,
      (scores.operational[2] + scores.capabilities[2]) / 2,
      (scores.operational[3] + scores.capabilities[3]) / 2,
      (scores.operational[4] + scores.capabilities[4]) / 2,
      (scores.operational[5] + scores.capabilities[5]) / 2,
      (scores.operational[6] + scores.capabilities[6]) / 2,
      (scores.operational[7] + scores.capabilities[7]) / 2
    ];
    const radarLabels = ['Strategy', 'Data Capture', 'Visibility', 'Security', 'Serialization', 'Engagement', 'Compliance', 'Sustainability', 'Agility'];
    const radarData = radarLabels.map((name, i) => ({
      name, score: cats[i], goal: [10, 9, 8, 10, 10, 8, 9, 8, 9][i]
    }));
    const finalAvg = cats.reduce((a, b) => a + b, 0) / cats.length;
    const maturity: MaturityLevel = finalAvg > 7.5 ? 'High' : finalAvg > 4.5 ? 'Medium' : 'Low';
    
    try {
      const aiAnalysis = await generateAIAuditAnalysis(submissionProfile, scores, maturity, finalAvg);
      const auditResult: AuditResult = { 
        overallScore: finalAvg, 
        maturity, 
        radarData, 
        recommendations: calculateRecommendations(cats), 
        aiAnalysis 
      };
      
      setResult(auditResult);
      // @ts-ignore
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      
      if (GOOGLE_SHEET_WEBAPP_URL) {
        fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile: submissionProfile, scores, result: auditResult })
        }).catch(err => console.error("Sheet sync failed", err));
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <div className="fixed inset-0 pointer-events-none opacity-30 dot-grid z-0" />

      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 no-print ${step > 1 ? 'glass-panel shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto h-20 md:h-24 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3 md:gap-5 group cursor-pointer" onClick={() => !result && setStep(1)}>
            <div className={`transition-all duration-500 flex flex-col items-start`}>
               <Icons.FullLogo className={`h-6 sm:h-8 w-auto transition-colors duration-500 ${!result && step === 1 ? 'text-white' : 'text-trustori-dark'}`} />
               <span className={`text-[7px] sm:text-[9px] uppercase tracking-[0.4em] font-bold mt-1 transition-colors ${!result && step === 1 ? 'text-white/60' : 'text-gray-400'}`}>The Brand Custodian</span>
            </div>
          </div>
          {result && (
            <div className="hidden sm:flex items-center gap-4 md:gap-6">
               <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-trustori-blue bg-blue-50 px-3 py-1 rounded">Maturity Report 2025</span>
               <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 truncate max-w-[100px] md:max-w-none">{profile.company}</span>
            </div>
          )}
        </div>
      </nav>

      {!result && (
        <header className="bg-brand-mesh relative pt-32 pb-24 sm:pt-48 sm:pb-36 px-4 sm:px-8 overflow-hidden no-print">
          <div className="max-w-5xl mx-auto relative z-10 text-white animate-in slide-in-from-top duration-1000">
             <div className="inline-flex items-center gap-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg mb-6 sm:mb-10">
              <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-white">The Brand Custodian | Protecting Originality</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold leading-[0.85] mb-6 sm:mb-10 tracking-tighter text-shadow">
              Packaging <br />
              <span className="text-trustori-orange italic">Intelligence</span> Audit
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed font-medium">
              Protecting originality. Empowering growth. <br className="hidden sm:block" />
              <span className="text-white/50">Analyze operational blind spots and benchmark your global data infrastructure.</span>
            </p>
          </div>
        </header>
      )}

      <main className={`flex-1 max-w-6xl mx-auto w-full px-4 sm:px-8 pb-32 relative z-20 ${result ? 'mt-24 sm:mt-32' : '-mt-16 sm:-mt-24'}`}>
        {!result ? (
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-10 md:p-20 border border-slate-100 animate-in fade-in duration-700">
            
            <div className="mb-12 sm:mb-20">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <span className="text-trustori-blue font-bold uppercase tracking-widest text-[9px] sm:text-[10px] block mb-1 sm:mb-2">Diagnostic Context</span>
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-trustori-dark tracking-tighter">
                    {step === 1 ? 'Executive Identification' : 
                     step === 2 ? 'Strategic Posture' : 
                     step === 3 ? 'Operational Resiliency' : 'Technical Capability'}
                  </h3>
                </div>
                <div className="flex items-baseline gap-1 sm:self-end">
                  <span className="text-trustori-orange font-bold text-3xl sm:text-5xl tracking-tighter">0{step}</span>
                  <span className="text-gray-200 font-bold text-lg sm:text-xl">/0{totalSteps}</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 sm:h-2 overflow-hidden">
                <div className="bg-trustori-blue h-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {step === 1 && (
              <div className="animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-10 sm:gap-y-16">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-trustori-dark/40 mb-3 sm:mb-4">Enterprise Division / Brand Name *</label>
                    <input 
                      type="text" 
                      value={profile.company}
                      onBlur={() => handleTouch('company')}
                      onChange={e => setProfile({...profile, company: e.target.value})}
                      className={`w-full bg-slate-50 border-b-4 py-4 sm:py-8 px-2 sm:px-4 text-2xl sm:text-4xl md:text-6xl font-bold focus:border-trustori-blue outline-none transition-all placeholder:text-slate-200 text-trustori-dark tracking-tighter ${touched.company && !validation.company.valid ? 'border-red-400' : 'border-slate-100'}`}
                      placeholder="Global Brands Corp."
                    />
                    {touched.company && !validation.company.valid && <p className="text-red-500 text-[9px] sm:text-[10px] font-bold mt-2 sm:mt-3 uppercase tracking-widest">{validation.company.error}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-trustori-dark/40 mb-3 sm:mb-4">Strategic Representative *</label>
                    <input 
                      type="text" 
                      value={profile.name}
                      onBlur={() => handleTouch('name')}
                      onChange={e => setProfile({...profile, name: e.target.value})}
                      className={`w-full bg-slate-50 border-b-2 py-3 sm:py-5 px-2 sm:px-4 text-xl sm:text-2xl font-bold focus:border-trustori-blue outline-none transition-all ${touched.name && !validation.name.valid ? 'border-red-400' : 'border-slate-200'}`}
                      placeholder="Full Name"
                    />
                    {touched.name && !validation.name.valid && <p className="text-red-500 text-[9px] sm:text-[10px] font-bold mt-2 sm:mt-3 uppercase tracking-widest">{validation.name.error}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-trustori-dark/40 mb-3 sm:mb-4">Functional Title</label>
                    <input 
                      type="text" 
                      value={profile.title}
                      onChange={e => setProfile({...profile, title: e.target.value})}
                      className="w-full bg-slate-50 border-b-2 border-slate-200 py-3 sm:py-5 px-2 sm:px-4 text-xl sm:text-2xl font-bold focus:border-trustori-blue outline-none transition-all"
                      placeholder="e.g. Head of Supply Chain"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-trustori-dark/40 mb-3 sm:mb-4">Executive Correspondence *</label>
                    <input 
                      type="email" 
                      value={profile.email}
                      onBlur={() => handleTouch('email')}
                      onChange={e => setProfile({...profile, email: e.target.value})}
                      className={`w-full bg-slate-50 border-b-2 py-3 sm:py-5 px-2 sm:px-4 text-xl sm:text-2xl font-bold focus:border-trustori-blue outline-none transition-all ${touched.email && !validation.email.valid ? 'border-red-400' : 'border-slate-200'}`}
                      placeholder="executive@company.com"
                    />
                    {touched.email && !validation.email.valid && <p className="text-red-500 text-[9px] sm:text-[10px] font-bold mt-2 sm:mt-3 uppercase tracking-widest">{validation.email.error}</p>}
                  </div>
                  <div className="relative">
                    <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-trustori-dark/40 mb-3 sm:mb-4">Contact Number *</label>
                    <div className={`flex bg-slate-50 border-b-2 transition-all ${touched.phone && !validation.phone.valid ? 'border-red-400' : 'border-slate-200 focus-within:border-trustori-blue'}`}>
                      <div className="relative" ref={dropdownRef}>
                        <button 
                          type="button"
                          onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                          className="h-full px-3 sm:px-4 flex items-center gap-2 hover:bg-slate-100 transition-colors border-r border-slate-200 min-w-[80px] sm:min-w-[100px]"
                        >
                          <span className="text-lg sm:text-xl">{selectedCountry.flag}</span>
                          <span className="text-sm sm:text-base font-bold text-trustori-dark">{selectedCountry.dial_code}</span>
                        </button>
                        
                        {isCountryDropdownOpen && (
                          <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl z-[60] border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="max-h-60 overflow-y-auto">
                              {COUNTRIES.map((c) => (
                                <button
                                  key={`${c.code}-${c.dial_code}`}
                                  type="button"
                                  onClick={() => handleCountrySelect(c)}
                                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-xl">{c.flag}</span>
                                    <span className="text-sm font-bold text-trustori-dark">{c.name}</span>
                                  </div>
                                  <span className="text-xs font-bold text-trustori-blue opacity-50">{c.dial_code}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <input 
                        type="tel" 
                        value={profile.phone}
                        onBlur={() => handleTouch('phone')}
                        onChange={e => setProfile({...profile, phone: e.target.value.replace(/[^0-9\s\-()]/g, '')})}
                        className="flex-1 bg-transparent py-3 sm:py-5 px-3 sm:px-4 text-xl sm:text-2xl font-bold outline-none transition-all"
                        placeholder="000 0000 000"
                      />
                    </div>
                    {touched.phone && !validation.phone.valid && <p className="text-red-500 text-[9px] sm:text-[10px] font-bold mt-2 sm:mt-3 uppercase tracking-widest">{validation.phone.error}</p>}
                  </div>
                </div>
                {/* Remainder Text below the input area */}
                <div className="mt-12 text-center">
                  <p className="text-trustori-blue font-bold text-[10px] sm:text-xs uppercase tracking-[0.3em]">
                    in the box is compulsory to fill up
                  </p>
                </div>
              </div>
            )}

            {step > 1 && currentScoresKey && (
              <div className="space-y-16 sm:space-y-32">
                {currentQuestions.map((q, idx) => {
                  const currentScore = scores[currentScoresKey][idx];
                  const isAnswered = currentScore !== -1;
                  const isDimmed = idx > firstUnansweredIdx && firstUnansweredIdx !== -1;

                  return (
                    <div 
                      key={q.id} 
                      className={`group transition-all duration-700 animate-in fade-in slide-in-from-left ${isDimmed ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-12">
                        <span className={`text-2xl sm:text-4xl font-bold leading-none tracking-tighter transition-colors ${isAnswered ? 'text-trustori-blue/30' : 'text-slate-100 group-hover:text-trustori-blue/20'}`}>
                          0{idx + 1}
                        </span>
                        <div className="flex-1 w-full">
                          <label 
                            onClick={() => setActiveModal(q.id)}
                            className={`text-xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-colors flex items-center gap-4 sm:gap-6 leading-tight mb-8 sm:mb-12 ${isAnswered ? 'text-trustori-dark/60' : 'text-trustori-dark group-hover:text-trustori-blue cursor-help'}`}
                          >
                            {q.text}
                            <div className="flex-shrink-0 p-1.5 sm:p-2.5 rounded-full bg-slate-50 text-slate-200 group-hover:text-trustori-blue transition-colors shadow-inner">
                              <Icons.Info />
                            </div>
                          </label>
                          <LikertScale 
                            id={q.id}
                            labels={q.labels}
                            value={currentScore}
                            onChange={(val) => handleScoreChange(idx, val)}
                            feedback={currentScore === -1 ? "" : q.feedbacks[currentScore === 2 ? 0 : currentScore === 5 ? 1 : 2]}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-16 sm:mt-32 pt-8 sm:pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              {step > 1 ? (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="w-full md:w-auto px-6 py-3 sm:px-8 sm:py-4 text-slate-400 hover:text-trustori-dark font-bold transition-colors flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px] sm:text-sm"
                >
                  <Icons.ArrowLeft /> REVISE PREVIOUS
                </button>
              ) : <div className="hidden md:block" />}

              <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto">
                {step < totalSteps ? (
                  <button 
                    onClick={nextStep}
                    className="w-full md:w-auto px-8 py-5 sm:px-16 sm:py-7 bg-trustori-blue hover:bg-trustori-dark text-white font-bold rounded-xl sm:rounded-2xl shadow-3xl shadow-trustori-blue/30 transition-all flex items-center justify-center gap-4 sm:gap-5 text-lg sm:text-xl tracking-tighter"
                  >
                    CONTINUE
                    <Icons.ArrowRight />
                  </button>
                ) : (
                  <button 
                    disabled={isSubmitting || !allAnsweredInCurrentStep}
                    onClick={handleFinish}
                    className="w-full md:w-auto px-8 py-5 sm:px-16 sm:py-7 bg-trustori-orange hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl sm:rounded-2xl shadow-3xl shadow-orange-600/30 transition-all flex items-center justify-center gap-4 sm:gap-5 text-lg sm:text-xl tracking-tighter"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="loading-dots tracking-tight font-bold uppercase text-[10px] sm:text-xs">{LOADING_MESSAGES[loadingMsgIdx]}</span>
                      </div>
                    ) : (
                      <>
                        GENERATE REPORT
                        <Icons.Sparkles />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <ResultsDashboard 
            result={result} 
            profile={profile} 
            onReset={() => {
              setResult(null);
              setStep(1);
              setShowErrors(false);
              setTouched({ company: false, name: false, email: false, phone: false });
              setScores({
                strategic: new Array(4).fill(-1),
                operational: new Array(8).fill(-1),
                capabilities: new Array(8).fill(-1)
              });
            }} 
          />
        )}
      </main>

      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-trustori-dark/95 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 max-w-2xl w-full shadow-2xl relative border-t-[10px] sm:border-t-[16px] border-trustori-orange animate-in zoom-in duration-300">
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 sm:top-10 sm:right-10 text-gray-300 hover:text-trustori-dark transition-colors">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-orange-50 flex items-center justify-center text-trustori-orange shadow-inner"><Icons.Info /></div>
                <div>
                  <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-trustori-orange block mb-1 sm:mb-2">Concept Context</span>
                  <h3 className="text-2xl sm:text-4xl font-bold text-trustori-dark tracking-tighter leading-none">The Brand Custodian</h3>
                </div>
              </div>
              <p className="text-gray-600 text-lg sm:text-2xl leading-relaxed mb-10 sm:mb-16 font-medium tracking-tight">
                {[...STRATEGIC_QUESTIONS, ...OPERATIONAL_QUESTIONS, ...CAPABILITY_QUESTIONS].find(q => q.id === activeModal)?.explanation}
              </p>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-full bg-trustori-dark text-white font-bold py-5 sm:py-7 rounded-xl sm:rounded-2xl hover:bg-black transition-colors text-xl sm:text-2xl tracking-tighter"
              >
                RETURN TO AUDIT
              </button>
           </div>
        </div>
      )}

      <footer className="bg-white py-16 sm:py-32 border-t border-slate-100 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-24 items-start">
          <div className="flex flex-col items-start gap-6 sm:gap-8">
            <Icons.FullLogo className="h-8 sm:h-10 w-auto text-trustori-dark" />
            <div className="flex flex-col gap-2 sm:gap-3">
              <span className="text-trustori-blue font-bold uppercase tracking-[0.5em] text-[9px] sm:text-[11px]">The Brand Custodian</span>
              <p className="text-gray-400 text-lg sm:text-xl font-medium tracking-tight">Protecting originality. Empowering growth.</p>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-8 sm:gap-12">
             <div className="flex flex-wrap gap-6 sm:gap-12 text-[10px] sm:text-[12px] font-bold uppercase tracking-[0.4em] text-gray-400">
                <a href="#" className="hover:text-trustori-blue transition-colors">Data Ethics</a>
                <a href="#" className="hover:text-trustori-blue transition-colors">Compliance Hub</a>
                <a href="#" className="hover:text-trustori-blue transition-colors">API Docs</a>
             </div>
             <p className="text-[8px] sm:text-[10px] text-gray-300 font-bold uppercase tracking-[0.6em]">© 2025 Trustori Global Diagnostics</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
