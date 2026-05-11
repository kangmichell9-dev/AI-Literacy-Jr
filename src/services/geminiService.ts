
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateAIProfile(scores: {
  interest: number;
  usage: number;
  literacy: number;
  ethics: number;
}) {
  const prompt = `
    You are an AI Education Expert. A 13-year-old middle school student has taken an AI Literacy and Engagement test.
    The scores are out of maximum possible (Total questions in each category: Interest 6, Usage 4, Literacy 5, Ethics 5. Scores are 1-4 per question).
    
    Scores (Total points in category):
    - Interest (관심도): ${scores.interest} / 24
    - Usage (활용도): ${scores.usage} / 16
    - Literacy (이해도): ${scores.literacy} / 20
    - Ethics (윤리성): ${scores.ethics} / 20

    Based on these scores, please generate a cool "AI Identity Profile" for this student.
    Format your response as a JSON object with the following fields:
    - title: A creative and catchy name for their AI type (e.g., "Future AI Architect", "Critical AI Guardian", "Creative AI Prompt Maker").
    - description: A short, encouraging description of who they are in the AI world. (About 2-3 sentences).
    - strength: What they are currently good at.
    - mission: A "Future Mission" or "Learning Goal" for them to improve.
    - characterCategory: Choose one of ["EXPLORER", "NINJA", "SAGE", "GUARDIAN", "MASTER", "PIONEER"] based on the dominant score.
    - emoji: A single representative emoji.

    Language: Korean (Friendly and hip for a middle school student).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
