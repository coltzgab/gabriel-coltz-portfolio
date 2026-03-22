import { BrandAnalysisResult } from '../types';
import { supabase } from '../lib/supabase';

export const analyzeBrand = async (description: string): Promise<BrandAnalysisResult> => {
  const prompt = `
Analyze this business description for a branding agency client: "${description}". 
Create a conceptual brand direction.
You MUST reply with a RAW JSON object exactly in this format in your message, do not add markdown backticks:
{
  "tagline": "A short, punchy, modern tagline max 6 words",
  "pillars": ["Pillar 1", "Pillar 2", "Pillar 3"],
  "vibe": "A visual vibe description like Minimalist Neo-Noir"
}
`;

  const { data, error } = await supabase.functions.invoke('gemini-chat', {
    body: { prompt, model: 'gemini-2.5-flash' }
  });

  if (error) {
    throw new Error(`Edge Function Error: ${error.message}`);
  }

  if (data && data.error) {
    throw new Error(`AI Service Error: ${data.error}`);
  }

  const text = data?.content;
  if (!text) throw new Error("No response from AI");

  try {
    const cleanJson = text.replace(/^```json/, '').replace(/```$/, '').trim();
    return JSON.parse(cleanJson) as BrandAnalysisResult;
  } catch (e: any) {
    throw new Error("Failed to parse AI response as JSON.");
  }
};