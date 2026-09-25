import { ai, GEMINI_SYSTEM_PROMPT } from './geminiClient.js';
import { query } from '../db/index.js';

export interface HintResponse {
  hint: string;
  historicalContext: string;
}

export async function generateQuestionHint(questionId: string): Promise<HintResponse> {
  const qRes = await query(
    `SELECT prompt, options, explanation, category_slug FROM quiz_questions WHERE id = $1`,
    [questionId]
  );

  if (qRes.rows.length === 0) {
    throw new Error('Question not found');
  }

  const question = qRes.rows[0];

  if (ai) {
    try {
      const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const prompt = `${GEMINI_SYSTEM_PROMPT}
      
Question: "${question.prompt}"
Category: "${question.category_slug}"
Options: ${JSON.stringify(question.options)}

Task: Generate a subtle educational hint that helps the player deduce the correct answer without giving away the answer directly. Also provide a short 1-2 sentence context explaining the source or background.
Return JSON strictly matching schema:
{
  "hint": "string",
  "historicalContext": "string"
}`;

      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        if (parsed.hint && parsed.historicalContext) {
          return {
            hint: parsed.hint,
            historicalContext: parsed.historicalContext,
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API hint generation failed, using fallback:', err);
    }
  }

  // Fallback hint generator using stored explanation
  const explanation = question.explanation || '';
  const firstSentence = explanation.split('.')[0] + '.';
  return {
    hint: `Think about the core historical/literary themes connected to ${question.category_slug.replace('-', ' ')}. ${firstSentence}`,
    historicalContext: `In ${question.category_slug.replace('-', ' ')} records, key terms and dates are documented in primary classical sources.`,
  };
}
