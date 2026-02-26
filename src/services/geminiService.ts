import { GoogleGenAI, Type } from "@google/genai";
import { BrandAnalysisResult } from '../types';

let aiInstance: any = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("AI API Key missing. Diagnostic features will be disabled.");
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const analyzeBrand = async (description: string): Promise<BrandAnalysisResult> => {
  const modelId = 'gemini-3-flash-preview';

  const ai = getAI();
  if (!ai) throw new Error("Serviço de IA não configurado. Por favor, adicione a chave GEMINI_API_KEY.");

  const response = await ai.models.generateContent({
    model: modelId,
    contents: `Analyze this business description for a branding agency client: "${description}". 
    Create a conceptual brand direction.
    Return 3 distinct items: 
    1. A short, punchy, modern tagline (max 6 words).
    2. 3 Strategic Content Pillars (short phrases).
    3. A visual vibe description (e.g., "Minimalist Neo-Noir").`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tagline: { type: Type.STRING },
          pillars: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          vibe: { type: Type.STRING }
        },
        required: ["tagline", "pillars", "vibe"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");

  return JSON.parse(text) as BrandAnalysisResult;
};