
export interface UserProfile {
  company: string;
  name: string;
  title: string;
  email: string;
  phone: string;
}

export type MaturityLevel = 'Low' | 'Medium' | 'High';

export interface AuditScores {
  strategic: number[]; // 4 questions
  operational: number[]; // 8 questions
  capabilities: number[]; // 8 questions
}

export interface Recommendation {
  title: string;
  description: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface AuditResult {
  overallScore: number;
  maturity: MaturityLevel;
  radarData: { name: string; score: number; goal: number }[];
  recommendations: Recommendation[];
  aiAnalysis?: string;
}

export interface Question {
  id: string;
  text: string;
  explanation: string;
  labels: [string, string, string];
  feedbacks: [string, string, string];
}
