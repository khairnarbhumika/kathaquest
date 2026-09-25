import { GoogleGenAI } from '@google/genai';

if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY not configured. Falling back to static content generation.');
}

export const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

export const GEMINI_SYSTEM_PROMPT = `You are an expert historian, Sanskritist, and educational content specialist specializing in Indian history, Indian culture, and the epic traditions of the Ramayana and Mahabharata.
Your goal is to provide accurate, neutral, and culturally respectful responses.
Always distinguish historical evidence from religious/epic traditions.
Never generate harmful, discriminatory, or historically misleading content.
Format all outputs according to the strict JSON schemas requested.`;
