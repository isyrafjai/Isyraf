
import React, { useState, useEffect, useMemo } from 'react';
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
  CAPABILITY_QUESTIONS 
} from './constants';
import LikertScale from './components/LikertScale';
import ResultsDashboard from './components/ResultsDashboard';
import { generateAIAuditAnalysis } from './services/gemini';

/**
 * PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE
 * To capture data in your Google Sheet.
 */
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
  const [profile, setProfile] = useState<UserProfile>({
    company: '', name: '', title: '', email: '', phone: ''
  });
  const [scores, setScores] = useState<AuditScores>({
    strategic: new Array(4).fill(2),
    operational: new Array(8).fill(2),
    capabilities: new Array(8).fill(2)
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

  const currentQuestions = useMemo(() => {
    if (step === 2) return STRATEGIC_QUESTIONS;
    if (step === 3) return OPERATIONAL_QUESTIONS;
    if (step === 4) return CAPABILITY_QUESTIONS;
    return [];
  }, [step]);

  const handleScoreChange = (index: number, val: number) => {
    const key = step === 2 ? 'strategic' : step === 3 ? 'operational' : 'capabilities';
    setScores(prev => ({
      ...prev,
      [key]: prev[key].map((s, i) => i === index ? val : s)
    }));
  };

  const validateStep1 = () => {
    return profile.company && profile.name && profile.email;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
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

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    function randomInRange(min: number, max: number) { return Math.random() * (max - min) + min; }
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      // @ts-ignore
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      // @ts-ignore
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const syncDataToGoogleSheet = async (data: { profile: UserProfile, scores: AuditScores, result: AuditResult }) => {
    if (!GOOGLE_SHEET_WEBAPP_URL) return;
    try {
      await fetch(GOOGLE_SHEET_WEBAPP_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors often, or standard POST with proper headers
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      console.log("Diagnostic data synchronized with Google Sheet.");
    } catch (err) {
      console.error("Sheet synchronization failed:", err);
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
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
      const aiAnalysis = await generateAIAuditAnalysis(profile, scores, maturity, finalAvg);
      const auditResult: AuditResult = { 
        overallScore: finalAvg, 
        maturity, 
        radarData, 
        recommendations: calculateRecommendations(cats), 
        aiAnalysis 
      };
      
      setResult(auditResult);
      fireConfetti();
      
      // Background Sync to Sheet
      await syncDataToGoogleSheet({ profile, scores, result: auditResult });
      
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Background Dot Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-30 dot-grid z-0" />

      {/* Brand Nav */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 no-print ${step > 1 ? 'glass-panel shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto h-24 flex items-center justify-between px-8">
          <div className="flex items-center gap-5 group cursor-pointer" onClick={() => !result && setStep(1)}>
            <div className={`transition-all duration-500 flex flex-col items-start`}>
               <Icons.FullLogo className={`h-8 w-auto transition-colors duration-500 ${!result && step === 1 ? 'text-white' : 'text-trustori-dark'}`} />
               <span className={`text-[9px] uppercase tracking-[0.4em] font-bold mt-1.5 transition-colors ${!result && step === 1 ? 'text-white/60' : 'text-gray-400'}`}>The Brand Custodian</span>
            </div>
          </div>
          {result && (
            <div className="hidden lg:flex items-center gap-6">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-trustori-blue bg-blue-50 px-3 py-1 rounded">Maturity Report 2025</span>
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{profile.company}</span>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Header */}
      {!result && (
        <header className="bg-brand-mesh relative pt-48 pb-36 px-8 overflow-hidden no-print">
          <div className="max-w-5xl mx-auto relative z-10 text-white animate-in slide-in-from-top duration-1000">
             <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg mb-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-white">品牌守护者 | 守护原创，启迪成长</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-bold leading-[0.85] mb-10 tracking-tighter">
              Packaging <br />
              <span className="text-trustori-orange italic">Intelligence</span> Audit
            </h1>
            <p className="text-2xl text-white/80 max-w-3xl leading-relaxed font-medium">
              Protecting originality. Empowering growth. <br />
              <span className="text-white/50">Analyze operational blind spots and benchmark your global data infrastructure.</span>
            </p>
          </div>
        </header>
      )}

      {/* Content Wrapper */}
      <main className={`flex-1 max-w-6xl mx-auto w-full px-8 pb-32 relative z-20 ${result ? 'mt-32' : '-mt-24'}`}>
        {!result ? (
          <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-slate-100 animate-in fade-in duration-700">
            
            {/* Step Status */}
            <div className="mb-16">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <span className="text-trustori-blue font-bold uppercase tracking-widest text-[10px] block mb-1">Diagnostic Context</span>
                  <h3 className="text-4xl font-bold text-trustori-dark tracking-tighter">
                    {step === 1 ? 'Executive Identification' : 
                     step === 2 ? 'Strategic Posture' : 
                     step === 3 ? 'Operational Resiliency' : 'Technical Capability'}
                  </h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-trustori-orange font-bold text-4xl tracking-tighter">0{step}</span>
                  <span className="text-gray-200 font-bold text-xl">/0{totalSteps}</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-trustori-blue h-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Profile Step */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in duration-500">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-widest text-trustori-dark/30 mb-4">Enterprise Division / Brand Name *</label>
                  <input 
                    type="text" 
                    value={profile.company}
                    onChange={e => setProfile({...profile, company: e.target.value})}
                    className="w-full bg-slate-50 border-b-4 border-slate-200 py-6 px-4 text-4xl font-bold focus:border-trustori-blue outline-none transition-all placeholder:text-slate-200 text-trustori-dark tracking-tighter"
                    placeholder="Global Brands Corp."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-trustori-dark/30 mb-4">Strategic Representative *</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={e => setProfile({...profile, name: e.target.value})}
                    className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 px-4 text-xl font-bold focus:border-trustori-blue outline-none transition-all"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-trustori-dark/30 mb-4">Functional Title</label>
                  <input 
                    type="text" 
                    value={profile.title}
                    onChange={e => setProfile({...profile, title: e.target.value})}
                    className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 px-4 text-xl font-bold focus:border-trustori-blue outline-none transition-all"
                    placeholder="e.g. Head of Supply Chain"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-trustori-dark/30 mb-4">Executive Correspondence *</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={e => setProfile({...profile, email: e.target.value})}
                    className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 px-4 text-xl font-bold focus:border-trustori-blue outline-none transition-all"
                    placeholder="executive@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-trustori-dark/30 mb-4">Contact Number</label>
                  <input 
                    type="tel" 
                    value={profile.phone}
                    onChange={e => setProfile({...profile, phone: e.target.value})}
                    className="w-full bg-slate-50 border-b-2 border-slate-200 py-4 px-4 text-xl font-bold focus:border-trustori-blue outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            )}

            {/* Survey Steps */}
            {step > 1 && (
              <div className="space-y-20">
                {currentQuestions.map((q, idx) => {
                  const key = step === 2 ? 'strategic' : step === 3 ? 'operational' : 'capabilities';
                  const currentScore = scores[key][idx];
                  return (
                    <div key={q.id} className="group animate-in fade-in slide-in-from-left duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
                      <div className="flex items-start gap-8">
                        <span className="text-5xl font-bold text-slate-100 group-hover:text-trustori-blue/10 transition-colors leading-none tracking-tighter">0{idx + 1}</span>
                        <div className="flex-1">
                          <label 
                            onClick={() => setActiveModal(q.id)}
                            className="text-3xl font-bold text-trustori-dark group-hover:text-trustori-blue transition-colors cursor-help flex items-center gap-4 leading-none tracking-tight"
                          >
                            {q.text}
                            <div className="p-2 rounded-full bg-slate-50 text-slate-200 group-hover:text-trustori-blue transition-colors">
                              <Icons.Info />
                            </div>
                          </label>
                          <div className="mt-10">
                            <LikertScale 
                              id={q.id}
                              labels={q.labels}
                              value={currentScore}
                              onChange={(val) => handleScoreChange(idx, val)}
                              feedback={q.feedbacks[currentScore === 2 ? 0 : currentScore === 5 ? 1 : 2]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer Navigation */}
            <div className="mt-28 pt-12 border-t border-slate-100 flex items-center justify-between">
              {step > 1 ? (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="px-8 py-4 text-slate-400 hover:text-trustori-dark font-bold transition-colors flex items-center gap-3"
                >
                  <Icons.ArrowLeft /> REVISE PREVIOUS
                </button>
              ) : <div />}

              <div className="flex items-center gap-6">
                {step < totalSteps ? (
                  <button 
                    onClick={nextStep}
                    disabled={step === 1 && !validateStep1()}
                    className="px-12 py-5 bg-trustori-blue hover:bg-trustori-dark disabled:opacity-20 text-white font-bold rounded-xl shadow-2xl shadow-trustori-blue/20 transition-all flex items-center gap-4 text-lg"
                  >
                    CONTINUE DIAGNOSTIC
                    <Icons.ArrowRight />
                  </button>
                ) : (
                  <button 
                    disabled={isSubmitting}
                    onClick={handleFinish}
                    className="px-12 py-5 bg-trustori-orange hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-2xl shadow-orange-600/20 transition-all flex items-center gap-4 text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="loading-dots tracking-tight font-bold uppercase text-xs">{LOADING_MESSAGES[loadingMsgIdx]}</span>
                      </div>
                    ) : (
                      <>
                        GENERATE MATURITY REPORT
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
              setScores({
                strategic: new Array(4).fill(2),
                operational: new Array(8).fill(2),
                capabilities: new Array(8).fill(2)
              });
            }} 
          />
        )}
      </main>

      {/* Concept Explainer Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-trustori-dark/95 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="bg-white rounded-[2rem] p-12 max-w-xl w-full shadow-2xl relative border-t-[12px] border-trustori-orange animate-in zoom-in duration-300">
              <button onClick={() => setActiveModal(null)} className="absolute top-8 right-8 text-gray-300 hover:text-trustori-dark transition-colors">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-trustori-orange shadow-inner"><Icons.Info /></div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-trustori-orange block mb-1">Concept Context</span>
                  <h3 className="text-4xl font-bold text-trustori-dark tracking-tighter leading-none">The Brand Custodian</h3>
                </div>
              </div>
              <p className="text-gray-600 text-xl leading-relaxed mb-12 font-medium">
                {[...STRATEGIC_QUESTIONS, ...OPERATIONAL_QUESTIONS, ...CAPABILITY_QUESTIONS].find(q => q.id === activeModal)?.explanation}
              </p>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-full bg-trustori-dark text-white font-bold py-6 rounded-2xl hover:bg-black transition-colors text-xl tracking-tight"
              >
                RETURN TO AUDIT
              </button>
           </div>
        </div>
      )}

      {/* Brand Footer */}
      <footer className="bg-white py-24 border-t border-slate-100 no-print">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-4">
              <Icons.FullLogo className="h-8 w-auto text-trustori-dark" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-trustori-blue font-bold uppercase tracking-[0.4em] text-[10px]">品牌守护者 | The Brand Custodian</span>
              <p className="text-gray-400 text-base font-medium tracking-tight">Protecting originality. Empowering growth. <br />守护原创，启迪成长</p>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-10">
             <div className="flex gap-12 text-[11px] font-bold uppercase tracking-[0.4em] text-gray-400">
                <a href="#" className="hover:text-trustori-blue transition-colors">Data Ethics</a>
                <a href="#" className="hover:text-trustori-blue transition-colors">Compliance Hub</a>
                <a href="#" className="hover:text-trustori-blue transition-colors">API Docs</a>
             </div>
             <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.5em]">© 2025 Trustori Global Diagnostics</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
