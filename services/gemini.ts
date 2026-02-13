
import { GoogleGenAI } from "@google/genai";
import { UserProfile, AuditScores, MaturityLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateAIAuditAnalysis(
  profile: UserProfile,
  scores: AuditScores,
  maturity: MaturityLevel,
  overallScore: number
): Promise<string> {
  const prompt = `
    Act as a senior Supply Chain Data Architect and Global Brand Custodian for Trustori.
    Analyze the following packaging infrastructure audit data for:
    Client: ${profile.company}
    Representative: ${profile.name} (${profile.title})

    Data Context (Scores 1-10, where 10 is Industry Best Practice):
    - Maturity Classification: ${maturity}
    - Aggregate Performance Score: ${overallScore.toFixed(1)}/10
    - Strategic Readiness (Leadership Mindset): ${scores.strategic.join(", ")}
    - Operational Resilience (Risk Mitigation): ${scores.operational.join(", ")}
    - System Interoperability (Capabilities): ${scores.capabilities.join(", ")}

    Provide a structured strategic roadmap in exactly three sections using Markdown:

    ### I. EXECUTIVE POSTURE
    Describe where ${profile.company} sits relative to Fortune 500 leaders. Be authoritative. If scores are low, emphasize the competitive disadvantage of "Blind Packaging". If high, emphasize the opportunity for "Market Dominance through Data".

    ### II. CRITICAL RISK VECTOR
    Pinpoint the single most dangerous gap in their current data loop (e.g., lack of 1st-party data, vulnerability to grey markets, or manual compliance burdens). Explain the financial and brand reputation cost of inaction.

    ### III. THE TRUSTORI ADVANTAGE: FIRST MOVE
    Provide a concrete, actionable "First 90 Days" recommendation. Focus on shifting packaging from a "Static Cost Center" to an "Active Data Asset". Use bold headers for key terms.

    Tone: Sophisticated, urgent but professional, visionary. Do not use generic AI greetings or conclusions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Diagnostic summary currently under refinement by our analysts.";
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return "Strategic analysis encountered a processing delay. Please proceed with the automated score breakdown below.";
  }
}
